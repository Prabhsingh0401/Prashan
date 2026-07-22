"""
verifier.py — Quality verification + deduplication.
"""
import json
import numpy as np
import uuid
from typing import List, Tuple

from paper_generator.config import (
    OPENROUTER_BASE_URL, OPENROUTER_HEADERS, MODEL_VERIFIER, MODEL_FALLBACK,
    DEDUP_SIMILARITY_THRESHOLD, PAPER_SECTIONS, OVERFETCH_RATIO, MAX_TOKENS_PER_CALL,
    MAX_RETRIES, RETRY_DELAY_SECONDS
)
from paper_generator.state import PaperGeneratorState, Question, FetchTask
import requests
import time
import os

_EMBED_MODEL = None

def get_embed_model():
    global _EMBED_MODEL
    if _EMBED_MODEL is None:
        from sentence_transformers import SentenceTransformer
        _EMBED_MODEL = SentenceTransformer("intfloat/multilingual-e5-large")
    return _EMBED_MODEL


def embed_texts(texts: List[str]) -> np.ndarray:
    model = get_embed_model()
    vecs = model.encode([f"passage: {t}" for t in texts], normalize_embeddings=True)
    return vecs


def cosine_dedup(questions: List[Question], threshold: float) -> Tuple[List[Question], List[Question]]:
    if len(questions) <= 1:
        return questions, []

    texts = [q["question_text"] for q in questions]
    vecs  = embed_texts(texts)

    keep   = []
    reject = []
    kept_vecs = []

    for i, (q, vec) in enumerate(zip(questions, vecs)):
        is_dup = False
        for kv in kept_vecs:
            sim = float(np.dot(vec, kv))
            if sim >= threshold:
                is_dup = True
                break
        if is_dup:
            q["rejection_reason"] = f"Near-duplicate (cosine sim >= {threshold})"
            reject.append(q)
        else:
            keep.append(q)
            kept_vecs.append(vec)

    return keep, reject


def load_verifier_prompt() -> str:
    prompt_path = os.path.join(os.path.dirname(__file__), "..", "prompts", "verifier.txt")
    with open(prompt_path, "r") as f:
        return f.read()


def call_verifier_llm(questions: List[Question], section_type: str) -> List[dict]:
    system_prompt = load_verifier_prompt()
    q_json = json.dumps([{
        "question_id":    q["question_id"],
        "question_text":  q["question_text"],
        "options":        q.get("options"),
        "correct_answer": q["correct_answer"],
        "source_chunk":   q.get("source_chunk_text", "")[:500],
        "marks":          q["marks"],
    } for q in questions], indent=2)

    user_msg = (
        f"Section type: {section_type.upper()}\n"
        f"Verify these {len(questions)} questions.\n\n"
        f"{q_json}\n\n"
        f"Return ONLY a JSON array: "
        f'[{{"question_id": "...", "approved": true/false, "reason": "..."}}]'
    )

    from lib.llm_client import call_llm_sync
    from paper_generator.config import MODEL_VERIFIER_FALLBACK
    fallback = os.getenv("MODEL_VERIFIER_FALLBACK") or MODEL_VERIFIER_FALLBACK

    try:
        content = call_llm_sync(
            system_prompt=system_prompt,
            user_message=user_msg,
            model=MODEL_VERIFIER,
            fallback_model=fallback,
            temperature=0.1
        )
        raw = content.strip()
        raw = raw.strip("```json").strip("```").strip()
        return json.loads(raw)
    except Exception as e:
        print(f"  \u26a0\ufe0f  Verifier error (falling back to auto-approval): {e}")
        return [{"question_id": q["question_id"], "approved": True, "reason": "verifier_failed"} for q in questions]


def verify(state: PaperGeneratorState) -> PaperGeneratorState:
    fetched = list(state["fetched_pool"])
    if not fetched:
        print("[VERIFIER] No questions to verify.")
        return {**state, "current_phase": "layout"}

    print(f"\n[VERIFIER] Verifying {len(fetched)} questions...")

    # Use dynamic sections from state (sent by API / BoardWizard)
    active_sections = state.get("paper_sections") or PAPER_SECTIONS

    by_section: dict = {}
    for q in fetched:
        by_section.setdefault(q["section"], []).append(q)

    verified_pool = []
    rejected_pool = list(state.get("rejected_pool", []))
    refetch_queue = list(state.get("refetch_queue", []))

    for sec_key, questions in by_section.items():
        sec_config = active_sections.get(sec_key, {})
        qtype = sec_config.get("type", "mcq")
        print(f"  [VERIFIER] Section {sec_key} ({qtype}) \u2014 {len(questions)} questions")

        unique, dupes = cosine_dedup(questions, DEDUP_SIMILARITY_THRESHOLD)
        print(f"    Dedup: {len(unique)} unique, {len(dupes)} duplicates removed")
        rejected_pool.extend(dupes)

        batch_size = 20
        llm_approved = []
        for i in range(0, len(unique), batch_size):
            batch = unique[i:i+batch_size]
            results = call_verifier_llm(batch, qtype)
            result_map = {r["question_id"]: r for r in results}

            for q in batch:
                verdict = result_map.get(q["question_id"], {"approved": True})
                if verdict.get("approved", True):
                    q["verified"] = True
                    llm_approved.append(q)
                else:
                    q["rejection_reason"] = verdict.get("reason", "LLM rejected")
                    rejected_pool.append(q)

        print(f"    LLM check: {len(llm_approved)} approved, {len(unique)-len(llm_approved)} rejected")

        needed = sec_config.get("count", 99)

        bloom_order = ["analyze", "apply", "understand", "remember"]
        llm_approved.sort(key=lambda q: bloom_order.index(q.get("bloom_level", "remember")) if q.get("bloom_level") in bloom_order else 3)

        if len(llm_approved) > needed:
            extras = llm_approved[needed:]
            for q in extras:
                q["rejection_reason"] = "Excess \u2014 trimmed after verification"
                rejected_pool.append(q)
            llm_approved = llm_approved[:needed]

        verified_pool.extend(llm_approved)

        shortfall = needed - len(llm_approved)
        if shortfall > 0:
            print(f"    \u26a0\ufe0f  Shortfall of {shortfall} {qtype} questions \u2014 queuing refetch")
            chapters_for_type = list({q["chapter"] for q in questions})
            ch = chapters_for_type[0] if chapters_for_type else state["chapters"][0]
            refetch_task: FetchTask = {
                "task_id":      str(uuid.uuid4()),
                "chapter":      ch,
                "subject":      state["subject"],
                "class_num":    state["class_num"],
                "section":      sec_key,
                "question_type": qtype,
                "count_needed": shortfall + 2,
                "marks_per_q":  sec_config.get("marks_per_q", 1),
                "attempt":      2,
            }
            refetch_queue.append(refetch_task)

    print(f"[VERIFIER] Done \u2014 {len(verified_pool)} verified, {len(rejected_pool)} rejected")

    return {
        **state,
        "verified_pool":   verified_pool,
        "rejected_pool":   rejected_pool,
        "refetch_queue":   refetch_queue,
        "current_phase":   "layout" if not refetch_queue else "refetching",
        "fetched_pool":    [],
    }
