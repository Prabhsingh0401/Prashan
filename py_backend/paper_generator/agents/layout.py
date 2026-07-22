"""
layout.py — Assembles LaTeX question paper using the dynamic Jinja2 template.
Reads paper_sections from state (set by orchestrator / API server),
falling back to global PAPER_SECTIONS for CLI use.
"""
import os
import re
from datetime import datetime
from jinja2 import Environment, FileSystemLoader
from paper_generator.state import PaperGeneratorState, Question
from paper_generator.config import PAPER_SECTIONS


def group_by_section(verified_pool: list, paper_sections: dict) -> dict:
    by_section = {k: [] for k in paper_sections.keys()}
    for q in verified_pool:
        sec = q.get("section", list(paper_sections.keys())[0])
        if sec in by_section:
            by_section[sec].append(q)
    return by_section


def format_options_latex(options: list) -> str:
    if not options:
        return ""
    labels = ["(a)", "(b)", "(c)", "(d)"]
    parts = []
    
    # Clean options and calculate lengths
    clean_opts = [str(opt).strip() for opt in options[:4]]
    max_len = max(len(opt) for opt in clean_opts)
    total_len = sum(len(opt) for opt in clean_opts)
    
    # 1. Long options: Each on its own line (4 lines)
    if max_len > 35 or total_len > 100:
        for i, opt in enumerate(clean_opts):
            parts.append(f"\\textbf{{{labels[i]}}} {opt}")
        return " \\\\\n    ".join(parts)
        
    # 2. Medium options: 2x2 grid
    if max_len > 15 or total_len > 45:
        for i, opt in enumerate(clean_opts):
            parts.append(f"\\makebox[0.48\\linewidth][l]{{\\textbf{{{labels[i]}}} {opt}}}")
        rows = []
        for i in range(0, len(parts), 2):
            row = " ".join(parts[i:i+2])
            rows.append(row)
        return " \\\\\n    ".join(rows)
        
    # 3. Short options: All on one line
    for i, opt in enumerate(clean_opts):
        parts.append(f"\\makebox[0.24\\linewidth][l]{{\\textbf{{{labels[i]}}} {opt}}}")
    return " ".join(parts)


def build_question_number_map(by_section: dict) -> dict:
    qnum_map = {}
    counter = 1
    for sec_key in sorted(by_section.keys()):
        for q in by_section[sec_key]:
            qnum_map[q["question_id"]] = counter
            counter += 1
    return qnum_map


def layout(state: PaperGeneratorState) -> PaperGeneratorState:
    print(f"\n[LAYOUT] Assembling question paper...")

    # Use dynamic sections from state (API path) or fall back to global (CLI path)
    paper_sections = state.get("paper_sections") or PAPER_SECTIONS
    formatting = state.get("formatting") or {}

    template_dir = os.path.join(os.path.dirname(__file__), "..", "templates")
    env = Environment(loader=FileSystemLoader(template_dir))
    paper_template = env.get_template("paper.tex.jinja2")

    by_section = group_by_section(state["verified_pool"], paper_sections)
    qnum_map   = build_question_number_map(by_section)
    case_sets  = state.get("case_sets", [])

    # Preprocess case sets to ensure they have dynamic instruction headers and total marks calculated
    for cs in case_sets:
        if "instruction" not in cs or not cs["instruction"]:
            cs["instruction"] = "Read the following passage and answer the questions that follow:"
        if "total_marks" not in cs:
            cs["total_marks"] = sum(sq.get("marks", 1) for sq in cs.get("sub_questions", []))

    # Preprocess questions to split Assertion and Reason onto separate lines
    for q in state.get("verified_pool", []):
        sec_type = paper_sections.get(q.get("section"), {}).get("type", "")
        if q.get("question_type") == "ar" or sec_type == "ar":
            q["question_text"] = re.sub(r'\s*(?:\\\\)?\s*(Reason\s*\(R\)\s*:?)', r'\\\\ \1', q["question_text"], flags=re.IGNORECASE)

    template_vars = {
        # Paper header fields
        "school_name":        state["school_name"],
        "exam_title":         state["exam_title"],
        "subject":            state["subject"].upper(),
        "class_num":          state["class_num"],
        "year":               state["year"],
        "time_allowed":       state["time_allowed"],
        "total_marks":        state["total_marks"],
        # Dynamic section config (drives the section loop in the template)
        "paper_sections":     paper_sections,
        # Question data
        "by_section":         by_section,
        "case_sets":          case_sets,
        "qnum_map":           qnum_map,
        # Formatting / font overrides from BoardWizard
        "header_font":        formatting.get("header_font", "ptm"),
        "header_font_size":   formatting.get("header_font_size", 14),
        "header_weight":      formatting.get("header_weight", "\\bfseries"),
        "heading_font":       formatting.get("heading_font", "ptm"),
        "heading_font_size":  formatting.get("heading_font_size", 12),
        "heading_weight":     formatting.get("heading_weight", "\\bfseries"),
        "body_font":          formatting.get("body_font", "ptm"),
        "body_font_size":     formatting.get("body_font_size", 11),
        # Helpers
        "format_options":     format_options_latex,
    }

    paper_latex = paper_template.render(**template_vars)

    os.makedirs("outputs/question_papers", exist_ok=True)
    stem = state.get("output_filename_stem", f"paper_{datetime.now().strftime('%Y%m%d_%H%M%S')}")
    paper_path = os.path.join("outputs", "question_papers", f"{stem}.tex")
    with open(paper_path, "w", encoding="utf-8") as f:
        f.write(paper_latex)

    print(f"[LAYOUT] ✓ Paper saved: {paper_path}")

    return {
        "latex_paper":   paper_latex,
        "current_phase": "done",
    }
