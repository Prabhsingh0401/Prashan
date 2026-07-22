"""
orchestrator.py — Input validation + distribution computation.
NO LLM CALLS IN THIS FILE.
"""
import sys
import uuid
from typing import List, Tuple, Dict, Any
from paper_generator.config import QDRANT_COLLECTION, PAPER_SECTIONS, OVERFETCH_RATIO, get_qdrant_client
from paper_generator.state import PaperGeneratorState, FetchTask
import math
from paper_generator.constants import CHAPTERS

def resolve_subject_and_chapter(chapter: str, main_subject: str, sub_subjects: List[str]) -> Tuple[str, str]:
    """
    Find which sub-subject a chapter belongs to and return the correctly cased title.
    Returns (resolved_subject, correctly_cased_chapter_title).
    """
    import re
    def normalize(name: str) -> str:
        n = name.lower()
        n = re.sub(r'\b(the|of|and|national|indian)\b', '', n)
        # Strip common punctuation, quotes, brackets, and spaces but keep all letters, numbers, and marks (including Devanagari)
        n = re.sub(r'[\s\-\'\’\"\.\,\!\?\(\)\[\]\{\}\:\;\_\/\\\|]+', '', n)
        return n

    # Normalize input for search
    search_ch = normalize(chapter)
    
    # Check selected sub-subjects first
    for sub in (sub_subjects or []):
        for c in CHAPTERS.get(sub, []):
            if normalize(c) == search_ch:
                return sub, c
                
    # Fallback to main subject list
    for c in CHAPTERS.get(main_subject, []):
        if normalize(c) == search_ch:
            return main_subject, c
            
    # Check all subjects as a last resort
    for sub, chapters in CHAPTERS.items():
        for c in chapters:
            if normalize(c) == search_ch:
                return sub, c

    return main_subject, chapter


def compute_distribution(state: PaperGeneratorState, chapters: List[str], paper_sections: dict) -> dict:
    """
    Distribute question counts from sections across selected chapters.
    Ensures sub-subject specific sections only go to chapters of that sub-subject.
    Uses section letters (A, B, C...) as keys to prevent collisions.
    """
    distribution = {ch: {} for ch in chapters}
    
    # 1. Resolve subjects for all selected chapters
    sub_to_chaps = {}
    for ch in chapters:
        sub, _ = resolve_subject_and_chapter(ch, state["subject"], state.get("sub_subjects", []))
        sub_to_chaps.setdefault(sub, []).append(ch)

    # 2. Distribute each section
    for letter, sec in paper_sections.items():
        qtype = sec["type"]
        count = sec["count"]
        sub = sec.get("sub_subject")
        
        # Filter chapters by sub-subject (e.g. Geography MCQ only goes to Geography chapters)
        targets = sub_to_chaps.get(sub, [])
        if not targets:
            # Fallback: if sub-subject doesn't match any chapters (e.g. user selected section but no chapters for it)
            # or it's a non-split subject like Math, use all available chapters.
            targets = chapters
            
        n = len(targets)
        if n == 0 or count == 0:
            continue
            
        if qtype in ("case_based", "cs"):
            # Distribute Case Studies: give one to each of the first few target chapters
            for i in range(count):
                ch = targets[i % n]
                distribution[ch][letter] = distribution[ch].get(letter, 0) + 1
        else:
            # Equal distribution across chapters in this sub-subject
            base = count // n
            rem  = count % n
            for i, ch in enumerate(targets):
                distribution[ch][letter] = base + (1 if i < rem else 0)
                
    return distribution


def build_fetch_queue(state: PaperGeneratorState, distribution: dict, paper_sections: dict) -> List[FetchTask]:
    """
    Convert the distribution map into a list of tasks for the fetcher agent.
    """
    queue = []

    for chapter, section_counts in distribution.items():
        # Resolve the specific sub-subject and get the correct casing for Qdrant
        actual_subject, actual_chapter = resolve_subject_and_chapter(chapter, state["subject"], state.get("sub_subjects", []))
        
        for section_letter, count in section_counts.items():
            if count == 0:
                continue
            
            section_info = paper_sections[section_letter]
            norm_qtype = section_info["type"]
            
            overfetch_count = math.ceil(count * OVERFETCH_RATIO)
            task: FetchTask = {
                "task_id": str(uuid.uuid4()),
                "chapter": actual_chapter,
                "subject": actual_subject,
                "class_num": state["class_num"],
                "section": section_letter,
                "question_type": norm_qtype,
                "count_needed": overfetch_count,
                "marks_per_q": section_info.get("marks_per_q", 1),
                "attempt": 1,
            }
            queue.append(task)

    return queue


def validate_chapters_in_qdrant(chapters: List[str], main_subject: str, sub_subjects: List[str]) -> List[str]:
    client = get_qdrant_client()
    missing = []
    for chapter in chapters:
        actual_subject, actual_chapter = resolve_subject_and_chapter(chapter, main_subject, sub_subjects)
        
        # Map Hindi Course A / B to "Hindi" for Qdrant lookup
        qdrant_subject = actual_subject
        if "hindi" in actual_subject.lower():
            qdrant_subject = "Hindi"

        try:
            resp, _ = client.scroll(
                collection_name=QDRANT_COLLECTION,
                scroll_filter={
                    "must": [
                        {"key": "subject",       "match": {"value": qdrant_subject}},
                        {"key": "chapter_title", "match": {"value": actual_chapter}},
                    ]
                },
                limit=1,
                with_payload=False,
                with_vectors=False,
            )
            if not resp:
                missing.append(chapter)
        except Exception as e:
            missing.append(chapter)
    return missing


def orchestrate(state: PaperGeneratorState) -> PaperGeneratorState:
    print(f"\n[ORCHESTRATOR] Validating chapters in Qdrant...")

    missing = validate_chapters_in_qdrant(state["chapters"], state["subject"], state.get("sub_subjects", []))
    if missing:
        print(f"  \u26a0\ufe0f  WARNING: No Qdrant content found for: {missing}")
        print(f"  These chapters may produce poor or empty questions.")

    # Use dynamic paper_sections from state (sent by API / BoardWizard),
    # falling back to the global PAPER_SECTIONS constant for CLI use.
    active_sections = state.get("paper_sections") or PAPER_SECTIONS

    print(f"[ORCHESTRATOR] Computing distribution for {len(state['chapters'])} chapters...")
    distribution = compute_distribution(state, state["chapters"], active_sections)

    for ch, counts in distribution.items():
        print(f"  {ch[:40]:40s} \u2192 {counts}")

    fetch_queue = build_fetch_queue(state, distribution, active_sections)
    print(f"[ORCHESTRATOR] Built {len(fetch_queue)} fetch tasks.\n")

    return {
        "paper_sections": active_sections,   # persist so layout agent can use it
        "distribution": distribution,
        "fetch_queue": fetch_queue,
        "completed_tasks": [],
        "fetched_pool": [],
        "verified_pool": [],
        "rejected_pool": [],
        "case_sets": [],
        "refetch_queue": [],
        "max_refetch_attempts": 2,
        "token_usage": {"calls": 0, "approx_tokens": 0},
        "errors": [],
        "current_phase": "fetching",
        "chapter_progress": {ch: "pending" for ch in state["chapters"]},
    }
