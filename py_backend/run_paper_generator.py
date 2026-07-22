#!/usr/bin/env python3
"""
run_paper_generator.py — Terminal CLI for Prashan question paper generator.

Usage:
    python run_paper_generator.py
    python run_paper_generator.py --debug
    python run_paper_generator.py --list-chapters
"""
import os
import sys
import uuid
import argparse
from datetime import datetime

os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.getcwd())

from dotenv import load_dotenv
load_dotenv()

from paper_generator.config import QDRANT_COLLECTION, PAPER_SECTIONS, get_qdrant_client
from paper_generator.graph import build_graph


def get_available_chapters(subject: str, class_num: int) -> list:
    client = get_qdrant_client()
    try:
        offset = None
        chapters = set()
        
        # Map Hindi Course A / B to "Hindi" for Qdrant lookup
        qdrant_subject = subject
        if "hindi" in subject.lower():
            qdrant_subject = "Hindi"

        while True:
            results, offset = client.scroll(
                collection_name=QDRANT_COLLECTION,
                scroll_filter={
                    "must": [
                        {"key": "subject", "match": {"value": qdrant_subject}},
                        {"key": "class",   "match": {"value": class_num}},
                    ]
                },
                limit=100,
                offset=offset,
                with_payload=["chapter_title"],
                with_vectors=False,
            )
            for r in results:
                ch = r.payload.get("chapter_title")
                if ch:
                    chapters.add(ch)
            if offset is None:
                break
        return sorted(chapters)
    except Exception as e:
        print(f"  Warning: Could not fetch chapters from Qdrant: {e}")
        return []


def print_distribution_preview(chapters: list):
    n = len(chapters)
    print("\n" + "\u2500" * 60)
    print("DISTRIBUTION PREVIEW")
    print("\u2500" * 60)
    print(f"{'Section':<12} {'Type':<15} {'Count':>6} {'Per Q':>6} {'Total':>7}")
    print("\u2500" * 60)
    for sec_key, sec_info in PAPER_SECTIONS.items():
        print(f"Section {sec_key:<5} {sec_info['type']:<15} {sec_info['count']:>6} "
              f"{sec_info['marks_per_q']:>6}  {sec_info['total']:>6}")
    print("\u2500" * 60)
    print(f"{'TOTAL':>40}  {sum(v['total'] for v in PAPER_SECTIONS.values()):>6}")
    print("\u2500" * 60)
    print(f"\nChapters selected: {n}")
    for ch in chapters:
        print(f"  \u2022 {ch}")
    print()


def main():
    parser = argparse.ArgumentParser(description="Prashan Question Paper Generator")
    parser.add_argument("--debug", action="store_true", help="Enable verbose output")
    parser.add_argument("--list-chapters", action="store_true", help="List available chapters and exit")
    args = parser.parse_args()

    print("\n" + "\u2550" * 60)
    print("  PRASHAN \u2014 QUESTION PAPER GENERATOR")
    print("  Powered by LangGraph + OpenRouter")
    print("\u2550" * 60 + "\n")

    if not os.getenv("OPENROUTER_API_KEY"):
        print("ERROR: OPENROUTER_API_KEY not set in .env file.")
        sys.exit(1)

    print("Fill in paper details (press Enter to use default where shown):\n")

    school_name  = input("School name [Greenfields Public School]: ").strip() or "Greenfields Public School"
    exam_title   = input("Exam title  [Periodic Assessment - I]:   ").strip() or "Periodic Assessment - I"

    subject_input = input("Subject     [Social Science]:            ").strip() or "Social Science"
    subject = subject_input.title()

    class_input   = input("Class       [10]:                        ").strip() or "10"
    class_num     = int(class_input)

    year          = input("Academic year [2026-27]:                 ").strip() or "2026-27"
    time_allowed  = input("Time allowed  [3 hrs]:                   ").strip() or "3 hrs"

    print(f"\nFetching available chapters for {subject} Class {class_num} from Qdrant...")
    available = get_available_chapters(subject, class_num)

    if not available:
        print(f"\n\u26a0\ufe0f  No chapters found for Subject='{subject}', Class={class_num}.")
        print("  Check that the Qdrant DB is populated and subject/class names match exactly.")
        manual = input("  Enter chapter names manually (comma-separated), or press Enter to exit: ").strip()
        if not manual:
            sys.exit(1)
        available = [ch.strip() for ch in manual.split(",")]

    if args.list_chapters:
        print(f"\nAvailable chapters ({len(available)}):")
        for i, ch in enumerate(available, 1):
            print(f"  {i:>3}. {ch}")
        sys.exit(0)

    print(f"\nAvailable chapters ({len(available)}):")
    for i, ch in enumerate(available, 1):
        print(f"  {i:>3}. {ch}")

    chapter_input = input("\nSelect chapters by number (comma-separated, e.g. 1,2,3): ").strip()
    selected_indices = [int(x.strip()) - 1 for x in chapter_input.split(",") if x.strip().isdigit()]
    chapters = [available[i] for i in selected_indices if 0 <= i < len(available)]

    if not chapters:
        print("No valid chapters selected. Exiting.")
        sys.exit(1)

    print_distribution_preview(chapters)

    confirm = input("Proceed with generation? (y/n) [y]: ").strip().lower() or "y"
    if confirm != "y":
        print("Aborted.")
        sys.exit(0)

    subject_abbr = "".join(w[0] for w in subject.split())[:4].upper()
    date_str     = datetime.now().strftime("%Y%m%d_%H%M%S")
    stem         = f"{subject_abbr}_X_{date_str}"

    initial_state = {
        "school_name":          school_name,
        "exam_title":           exam_title,
        "subject":              subject,
        "class_num":            class_num,
        "year":                 year,
        "time_allowed":         time_allowed,
        "total_marks":          80,
        "chapters":             chapters,
        "distribution":         {},
        "fetch_queue":          [],
        "completed_tasks":      [],
        "fetched_pool":         [],
        "verified_pool":        [],
        "rejected_pool":        [],
        "case_sets":            [],
        "refetch_queue":        [],
        "max_refetch_attempts": 2,
        "latex_paper":          "",
        "latex_answer_key":     "",
        "output_filename_stem": stem,
        "session_id":           str(uuid.uuid4()),
        "chapter_progress":     {},
        "token_usage":          {"calls": 0, "approx_tokens": 0},
        "errors":               [],
        "current_phase":        "orchestrating",
    }

    print("\n" + "\u2550" * 60)
    print("  STARTING GENERATION")
    print("\u2550" * 60)

    graph = build_graph()

    try:
        final_state = graph.invoke(initial_state)
    except KeyboardInterrupt:
        print("\n\nInterrupted by user.")
        sys.exit(0)
    except Exception as e:
        print(f"\n\u274c Graph error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

    print("\n" + "\u2550" * 60)
    print("  GENERATION COMPLETE")
    print("\u2550" * 60)
    print(f"  Questions verified: {len(final_state.get('verified_pool', []))}")
    print(f"  Questions rejected: {len(final_state.get('rejected_pool', []))}")
    print(f"  Case sets:          {len(final_state.get('case_sets', []))}")
    print(f"  API calls made:     {final_state.get('token_usage', {}).get('calls', '?')}")

    if final_state.get("errors"):
        print(f"\n  Warnings ({len(final_state['errors'])}):")
        for err in final_state["errors"]:
            print(f"    \u26a0\ufe0f  {err}")

    paper_path = os.path.join("outputs", "question_papers", f"{stem}.tex")

    print(f"\n  Output file:")
    print(f"    \U0001f4c4 {paper_path}")
    print("\n  To compile PDF: pdflatex " + paper_path)
    print("\u2550" * 60 + "\n")


if __name__ == "__main__":
    main()
