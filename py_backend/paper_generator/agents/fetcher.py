"""
fetcher.py — Generates questions from Qdrant context via OpenRouter.
"""
import json
import time
import uuid
import requests
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from paper_generator.config import (
    OPENROUTER_API_KEY, OPENROUTER_BASE_URL, OPENROUTER_HEADERS,
    MODEL_FETCHER, MODEL_FALLBACK, QDRANT_COLLECTION,
    QDRANT_TOP_K, MAX_RETRIES, RETRY_DELAY_SECONDS, MAX_TOKENS_PER_CALL,
    get_qdrant_client
)
from paper_generator.state import PaperGeneratorState, Question, CaseSet, FetchTask

_EMBED_CLIENT = None
_EMBED_MODEL = None

def get_embed_client():
    global _EMBED_CLIENT
    if _EMBED_CLIENT is None:
        embed_url = os.getenv("EMBEDDING_API_URL")
        if embed_url and "hf.space" in embed_url:
            from gradio_client import Client
            print(f"  [FETCHER] Connecting to remote embedding API: {embed_url} ...")
            _EMBED_CLIENT = Client(embed_url)
    return _EMBED_CLIENT

def get_embed_model():
    global _EMBED_MODEL
    if _EMBED_MODEL is None:
        from sentence_transformers import SentenceTransformer
        print("  [FETCHER] Loading multilingual-e5-large embedding model locally...")
        _EMBED_MODEL = SentenceTransformer("intfloat/multilingual-e5-large")
    return _EMBED_MODEL


def embed_query(text: str) -> list:
    client = get_embed_client()
    if client:
        try:
            vec = client.predict(text=text, is_query=True, api_name="/embed")
            return vec
        except Exception as e:
            print(f"  [FETCHER] Remote embedding failed: {e}. Falling back to local.")
            
    model = get_embed_model()
    vec = model.encode(f"query: {text}", normalize_embeddings=True)
    return vec.tolist()


def load_prompt(question_type: str, marks: int = 1) -> str:
    """
    Load the prompt template for a specific question type.
    Includes fallback logic if a specific prompt file is missing.
    """
    prompts_dir = os.path.join(os.path.dirname(__file__), "..", "prompts")
    prompt_path = os.path.join(prompts_dir, f"fetcher_{question_type}.txt")
    
    if os.path.exists(prompt_path):
        with open(prompt_path, "r") as f:
            return f.read()
            
    # Fallback logic
    print(f"  [FETCHER] \u26a0\ufe0f Prompt file not found: {prompt_path}. Using fallback.")
    
    # Map common marks to basic types
    fallback_type = "sa" if marks >= 3 else "vsa"
    if question_type == "mcq" or question_type == "ar":
        fallback_type = "mcq"
        
    fallback_path = os.path.join(prompts_dir, f"fetcher_{fallback_type}.txt")
    with open(fallback_path, "r") as f:
        return f.read()


def search_qdrant(chapter: str, subject: str, class_num: int, query_text: str) -> list:
    client = get_qdrant_client()
    
    # Map sub-subjects like "Hindi Course A" or "Hindi Course B" to "Hindi" for Qdrant lookup
    qdrant_subject = subject
    if "hindi" in subject.lower():
        qdrant_subject = "Hindi"

    # We include both subject and chapter in the query string to guide the semantic search
    query_vec = embed_query(f"{subject} {chapter} {query_text}")

    # We filter strictly by subject and class, but rely on semantic search for the chapter.
    # This is because the vision model often fails to extract the chapter title on every page,
    # leading to null values in the metadata for ~40% of the chunks.
    resp = client.query_points(
        collection_name=QDRANT_COLLECTION,
        query=query_vec,
        query_filter={
            "must": [
                {"key": "subject", "match": {"value": qdrant_subject}},
                {"key": "class",   "match": {"value": class_num}},
            ]
        },
        limit=QDRANT_TOP_K,
        with_payload=True,
        with_vectors=False,
    )
    return resp.points


def format_chunks_for_prompt(results: list) -> str:
    lines = []
    for i, r in enumerate(results):
        payload = r.payload
        ct = payload.get("content_type", "text")
        sec = payload.get("section_title", "")
        text = payload.get("text", "")
        lines.append(f"[CHUNK {i+1} | {ct} | {sec}]\n{text}\n")
    return "\n---\n".join(lines)


def call_openrouter(system_prompt: str, user_message: str, model: str = None, attempt: int = 1) -> str:
    if model is None:
        model = MODEL_FETCHER

    from lib.llm_client import call_llm_sync
    from paper_generator.config import MODEL_FETCHER_FALLBACK
    fallback = os.getenv("MODEL_FETCHER_FALLBACK") or MODEL_FETCHER_FALLBACK

    return call_llm_sync(
        system_prompt=system_prompt,
        user_message=user_message,
        model=model,
        fallback_model=fallback,
        temperature=0.3
    )


def parse_questions_json(raw: str, task: FetchTask) -> list:
    if raw is None:
        return []
    raw = raw.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip().strip("```")

    try:
        items = json.loads(raw)
    except json.JSONDecodeError:
        import re
        match = re.search(r'\[.*\]', raw, re.DOTALL)
        if match:
            try:
                items = json.loads(match.group())
            except json.JSONDecodeError:
                print(f"  \u26a0\ufe0f  Could not parse JSON from fetcher response. Raw:\n{raw[:300]}")
                return []
        else:
            print(f"  \u26a0\ufe0f  Could not parse JSON from fetcher response. Raw:\n{raw[:300]}")
            return []

    questions = []
    for item in items:
        q: Question = {
            "question_id":      str(uuid.uuid4()),
            "section":          task["section"],
            "question_type":    task["question_type"],
            "chapter":          task["chapter"],
            "subject":          task["subject"],
            "question_text":    item.get("question", ""),
            "options":          item.get("options", None),
            "correct_answer":   item.get("correct_answer", ""),
            "marks":            task["marks_per_q"],
            "bloom_level":      item.get("bloom_level", "remember"),
            "source_chunk_text": item.get("source_chunk_text", ""),
            "verified":         False,
            "rejection_reason": None,
        }
        questions.append(q)
    return questions


def fetch_case_set(task: FetchTask, results: list) -> CaseSet:
    import uuid

    # Collect a few relevant chunks to form a better passage, but limited to avoid excessive length
    chunks = []
    seen_text = set()
    for r in results:
        txt = r.payload.get("text", "").strip()
        if r.payload.get("content_type") in ("paragraph", "bullet_list", "example") and txt:
            # Basic dedup
            if txt.lower()[:50] not in seen_text:
                chunks.append(txt)
                seen_text.add(txt.lower()[:50])
        if len(chunks) >= 3:
            break

    raw_passage = "\n\n".join(chunks)
    passage_id = str(results[0].id) if results else ""

    system_prompt = load_prompt("case")
    user_message = (
        f"Subject: {task['subject']}\n"
        f"Chapter: {task['chapter']}\n\n"
        f"RAW TEXTBOOK CHUNKS:\n{raw_passage}\n\n"
        f"INSTRUCTIONS:\n"
        f"1. Synthesize a clean, coherent, and NON-REPETITIVE passage (approx 150-250 words) from the chunks.\n"
        f"2. Generate exactly 3 sub-questions based ONLY on that passage:\n"
        f"   (a) One MCQ (1 mark)\n"
        f"   (b) One VSA (1 mark)\n"
        f"   (c) One SA (2 marks)\n"
        f"3. Return as a JSON object:\n"
        f"{{\n"
        f"  \"cleaned_passage\": \"...\",\n"
        f"  \"sub_questions\": [{{ \"question\": \"...\", \"options\": [...], \"correct_answer\": \"...\", \"bloom_level\": \"...\" }}, ...]\n"
        f"}}\n"
        f"Ensure sub_questions follows the schema of regular questions but without chapter/subject fields."
    )

    raw = call_openrouter(system_prompt, user_message)
    
    # Parse the new JSON structure
    try:
        data = json.loads(raw.strip("```json").strip("```").strip())
        cleaned_passage = data.get("cleaned_passage", raw_passage)
        items = data.get("sub_questions", [])
    except:
        # Fallback if LLM fails JSON
        cleaned_passage = raw_passage
        items = parse_questions_json(raw, task)

    sub_qs = []
    marks_map = [1, 1, 2]
    for i, item in enumerate(items[:3]):
        q: Question = {
            "question_id":      str(uuid.uuid4()),
            "section":          task["section"],
            "question_type":    "mcq" if i == 0 else "vsa" if i == 1 else "sa",
            "chapter":          task["chapter"],
            "subject":          task["subject"],
            "question_text":    item.get("question", item.get("question_text", "")),
            "options":          item.get("options", None),
            "correct_answer":   item.get("correct_answer", ""),
            "marks":            marks_map[i],
            "bloom_level":      item.get("bloom_level", "apply"),
            "source_chunk_text": cleaned_passage,
            "verified":         False,
            "rejection_reason": None,
        }
        sub_qs.append(q)

    case_set: CaseSet = {
        "set_id":          str(uuid.uuid4()),
        "chapter":         task["chapter"],
        "passage":         cleaned_passage,
        "passage_source":  passage_id,
        "sub_questions":   sub_qs,
    }
    return case_set


def fetch(state: PaperGeneratorState) -> PaperGeneratorState:
    queue = list(state.get("fetch_queue", []))
    if not queue:
        queue = list(state.get("refetch_queue", []))
        if not queue:
            return {**state, "current_phase": "verifying"}
        task = queue.pop(0)
        refetch_queue = queue
        fetch_queue = state["fetch_queue"]
    else:
        task = queue.pop(0)
        fetch_queue = queue
        refetch_queue = state.get("refetch_queue", [])

    chapter = task["chapter"]
    qtype   = task["question_type"]
    count   = task["count_needed"]
    is_refetch = task.get("attempt", 1) > 1

    print(f"[FETCHER] {chapter[:35]:35s} | {qtype:12s} | need {count} questions (attempt {task['attempt']})")

    if is_refetch:
        print(f"  [REPHRASE] Refetch attempt detected. Rephrasing/re-generating with intelligence instead of re-searching Qdrant.")
        rejected_for_task = [q for q in state.get("rejected_pool", []) 
                           if q["chapter"] == chapter and q["question_type"] == qtype]
        rejected_text = "\n".join([f"- {q['question_text']} (Reason: {q.get('rejection_reason','')})" for q in rejected_for_task[:3]])
        
        # Try to reuse context from rejected questions to fulfill "don't refetch" (don't re-search Qdrant)
        context_text = "\n---\n".join(list(set(q.get("source_chunk_text", "") for q in rejected_for_task if q.get("source_chunk_text"))))
        if not context_text:
            # Fallback only if no source chunks were preserved
            results = search_qdrant(chapter, task["subject"], task["class_num"], f"{qtype} {chapter}")
            context_text = format_chunks_for_prompt(results)
    else:
        results = search_qdrant(chapter, task["subject"], task["class_num"], f"{qtype} {chapter}")
        if not results:
            print(f"  \u26a0\ufe0f  No Qdrant results for this chapter+subject. Skipping.")
            return {
                **state,
                "fetch_queue":   fetch_queue,
                "refetch_queue": refetch_queue,
                "errors": state["errors"] + [f"No Qdrant content: {chapter} / {qtype}"],
            }
        context_text = format_chunks_for_prompt(results)

    if qtype in ("case_based", "cs"):
        # For case based, we still need results for fetch_case_set if it's the first time,
        # but if it's a refetch, we might want to rephrase the existing one.
        # For now, if it's a refetch and we skipped Qdrant, we'll need to handle it.
        if is_refetch and not locals().get('results'):
             # If we don't have results but need them for Case Study, we might have to search once
             # OR we could modify fetch_case_set to accept context_text.
             # For simplicity, if it's a Case Study refetch, we'll allow one search if needed.
             results = search_qdrant(chapter, task["subject"], task["class_num"], f"{qtype} {chapter}")
        
        case_set = fetch_case_set(task, results)
        print(f"  \u2713 Case set generated for {chapter}")
        return {
            **state,
            "fetch_queue":     fetch_queue,
            "refetch_queue":   refetch_queue,
            "case_sets":       state["case_sets"] + [case_set],
            "completed_tasks": state["completed_tasks"] + [task["task_id"]],
            "token_usage": {
                "calls": state["token_usage"]["calls"] + 1,
                "approx_tokens": state["token_usage"]["approx_tokens"] + 2000,
            },
        }

    system_prompt = load_prompt(qtype, task.get("marks_per_q", 1))
    
    extra_instructions = ""
    if is_refetch:
        system_prompt += "\n\nNOTE: This is a RE-GENERATION attempt. Previous questions were rejected. Be more creative and ensure high quality."
        extra_instructions = (
            f"\nAvoid these previously rejected patterns or topics if possible:\n{rejected_text}\n"
            f"Please REPHRASE or generate NEW questions that are more accurate and within the chapter scope. "
            f"If the provided textbook context is insufficient, use your intelligence to generate relevant questions "
            f"consistent with the chapter topic and Grade 10 CBSE standards."
        )

    user_message = (
        f"Subject: {task['subject']}\n"
        f"Chapter: {task['chapter']}\n"
        f"Generate exactly {count} {qtype.upper()} questions ({task['marks_per_q']} mark each).\n\n"
        f"TEXTBOOK CONTENT (use ONLY this \u2014 do not use external knowledge):\n\n"
        f"{context_text}"
        f"{extra_instructions}"
    )

    raw = call_openrouter(system_prompt, user_message)
    questions = parse_questions_json(raw, task)

    print(f"  \u2713 {len(questions)} questions parsed")

    return {
        **state,
        "fetch_queue":      fetch_queue,
        "refetch_queue":    refetch_queue,
        "fetched_pool":     state["fetched_pool"] + questions,
        "completed_tasks":  state["completed_tasks"] + [task["task_id"]],
        "token_usage": {
            "calls": state["token_usage"]["calls"] + 1,
            "approx_tokens": state["token_usage"]["approx_tokens"] + len(context_text.split()) * 2,
        },
    }
