#!/usr/bin/env python3
"""
api_server.py — FastAPI HTTP wrapper around the Prashan paper generator LangGraph pipeline.

Run with:
    uvicorn api_server:app --host 0.0.0.0 --port 8001 --reload
"""
import os
import sys

# ── Force UTF-8 on Windows (avoids charmap codec errors from Unicode in prints) ──
os.environ["PYTHONUTF8"] = "1"
os.environ["PYTHONIOENCODING"] = "utf-8"
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

import uuid
import subprocess
import tempfile
from datetime import datetime
from typing import List, Optional, Dict, Any

os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.getcwd())

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException, BackgroundTasks, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from pydantic import BaseModel, Field, ConfigDict
import json

from paper_generator.graph import build_graph
from lib.session_store import save_session, get_session

app = FastAPI(title="Prashan Paper Generator API", version="1.0.0")

# Security: API Key for internal communication
INTERNAL_API_KEY = os.getenv("INTERNAL_API_KEY", "dev-key-123")

def verify_internal_key(x_api_key: str = Header(None)):
    if x_api_key != INTERNAL_API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized internal request")
    return x_api_key

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response schemas ───────────────────────────────────────────────

class SectionConfig(BaseModel):
    """One section of a CBSE paper (maps to a letter section A/B/C…)."""
    key: str          # e.g. "mcq", "ar", "vsa"
    label: str        # display name
    marksPerQ: int
    count: int
    group: Optional[str] = None
    note: Optional[str] = None


class FormattingConfig(BaseModel):
    headerFontFamily: str = "Times New Roman"
    headerFontSize: int = 14
    headerFontWeight: str = "bold"
    headingFontFamily: str = "Times New Roman"
    headingFontSize: int = 12
    headingFontWeight: str = "bold"
    bodyFontFamily: str = "Times New Roman"
    bodyFontSize: int = 11


class GenerateRequest(BaseModel):
    sessionId: Optional[str] = None
    schoolName: str
    examName: str
    subject: str
    subSubjects: List[str] = []        # e.g. ["History", "Geography"]
    classNum: int = Field(..., alias="class_num")
    year: str = "2025-26"
    timeAllowed: str = "3 hrs"
    totalMarks: int = 80
    chapters: List[str]
    sections: List[SectionConfig]      # from BoardWizard CBSE sections
    formatting: Optional[FormattingConfig] = None

    model_config = ConfigDict(populate_by_name=True)


class GenerateResponse(BaseModel):
    sessionId: str
    latex: str
    status: str = "done"


# ── Helpers ───────────────────────────────────────────────────────────────────

FONT_MAP = {
    "Times New Roman": "ptm",
    "Arial":           "phv",
    "Helvetica":       "phv",
    "serif":           "ptm",
    "sans-serif":      "phv",
    "monospace":       "pcr",
}


def sections_to_paper_sections(sections: List[SectionConfig]) -> Dict[str, Dict[str, Any]]:
    """
    Convert SubjectSection[] into the PAPER_SECTIONS dict format expected by the orchestrator.
    """
    active = [s for s in sections if s.count > 0]
    active.sort(key=lambda s: s.marksPerQ)

    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    paper_sections: Dict[str, Dict[str, Any]] = {}

    for i, sec in enumerate(active):
        letter = letters[i] if i < len(letters) else f"SEC{i}"
        norm_type = sec.key
        if "_" in norm_type and not norm_type.startswith("case_"):
            norm_type = norm_type.split("_")[-1]
            
        paper_sections[letter] = {
            "type":       norm_type,
            "original_key": sec.key,
            "label":      sec.label,
            "count":      sec.count,
            "marks_per_q": sec.marksPerQ,
            "total":      sec.count * sec.marksPerQ,
            "sub_subject": sec.group,
        }

    return paper_sections


def build_initial_state(req: GenerateRequest, stem: str) -> dict:
    print(f"\n[API] Building initial state for {req.schoolName} / {req.examName}")
    paper_sections = sections_to_paper_sections(req.sections)

    fmt = req.formatting or FormattingConfig()
    header_font  = FONT_MAP.get(fmt.headerFontFamily, "ptm")
    heading_font = FONT_MAP.get(fmt.headingFontFamily, "ptm")
    body_font    = FONT_MAP.get(fmt.bodyFontFamily, "ptm")

    import re
    clean_chapters = [re.sub(r"^Chapter \d+: ", "", ch) for ch in req.chapters]

    state = {
        "school_name":          req.schoolName,
        "exam_title":           req.examName,
        "subject":              req.subject,
        "sub_subjects":         req.subSubjects,
        "class_num":            req.classNum,
        "year":                 req.year,
        "time_allowed":         req.timeAllowed,
        "total_marks":          req.totalMarks,
        "chapters":             clean_chapters,
        "paper_sections":       paper_sections,
        "formatting": {
            "header_font":      header_font,
            "header_font_size": fmt.headerFontSize,
            "header_weight":    "\\bfseries" if fmt.headerFontWeight == "bold" else "",
            "heading_font":     heading_font,
            "heading_font_size":fmt.headingFontSize,
            "heading_weight":   "\\bfseries" if fmt.headingFontWeight == "bold" else "",
            "body_font":        body_font,
            "body_font_size":   fmt.bodyFontSize,
        },
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
        "session_id":           stem,
        "chapter_progress":     {},
        "token_usage":          {"calls": 0, "approx_tokens": 0},
        "errors":               [],
        "current_phase":        "orchestrating",
    }
    return state


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "service": "prashan-paper-generator"}


@app.post("/generate")
def generate_paper(req: GenerateRequest, api_key: str = Depends(verify_internal_key)):
    """
    Queue the paper generation using Celery worker.
    Returns immediately once queued.
    """
    if not os.getenv("OPENROUTER_API_KEY"):
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY not configured")

    subject_abbr = "".join(w[0] for w in req.subject.split())[:4].upper()
    date_str     = datetime.now().strftime("%Y%m%d_%H%M%S")
    stem         = f"{subject_abbr}_X_{date_str}"
    session_id   = req.sessionId or stem

    from worker import generate_paper_task
    # Trigger Celery task asynchronously
    generate_paper_task.delay(
        session_id=session_id,
        specs=req.dict(by_alias=True),
        user_id="internal-node"
    )

    return {"status": "queued", "sessionId": session_id}


class SyncRequest(BaseModel):
    sessionId: str
    latex: str

@app.post("/sync-latex")
def sync_latex(req: SyncRequest, api_key: str = Depends(verify_internal_key)):
    """
    Restore a session in Redis from provided LaTeX.
    Used for recovery if the Python API restarted.
    """
    session_id = req.sessionId
    save_session(session_id, {
        "latex":     req.latex,
        "stem":      session_id,
        "tex_path":  os.path.join("outputs", "question_papers", f"{session_id}.tex"),
        "errors":    [],
    })
    return {"status": "synced", "sessionId": session_id}


@app.get("/download/{session_id}")
def download_paper(session_id: str, format: str = "pdf", api_key: str = Depends(verify_internal_key)):
    """
    Proxy download handler. Protected by internal API key.
    """
    tex_path = os.path.join("outputs", "question_papers", f"{session_id}.tex")
    session = get_session(session_id)
    if not session:
        if os.path.exists(tex_path):
            try:
                with open(tex_path, "r", encoding="utf-8") as f:
                    latex_content = f.read()
                session = {
                    "latex":     latex_content,
                    "stem":      session_id,
                    "tex_path":  tex_path,
                    "errors":    [],
                }
                save_session(session_id, session)
            except Exception as e:
                print(f"[API] Error loading existing tex for {session_id}: {e}")
                raise HTTPException(status_code=500, detail="Error loading existing tex")
        else:
            raise HTTPException(status_code=404, detail="Session not found")

    if not os.path.exists(tex_path):
        os.makedirs(os.path.dirname(tex_path), exist_ok=True)
        with open(tex_path, "w", encoding="utf-8") as f:
            f.write(session["latex"])

    if format == "pdf":
        out_dir = os.path.dirname(tex_path)
        try:
            subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", "-output-directory", out_dir, tex_path],
                capture_output=True, timeout=60,
            )
            pdf_path = tex_path.replace(".tex", ".pdf")
            if os.path.exists(pdf_path):
                return FileResponse(pdf_path, media_type="application/pdf", filename=f"{session['stem']}.pdf")
        except Exception as e:
            print(f"[API] Error compiling PDF: {e}")
        return FileResponse(tex_path, media_type="text/plain", filename=f"{session['stem']}.tex")

    elif format == "docx":
        docx_path = tex_path.replace(".tex", ".docx")
        try:
            subprocess.run(["pandoc", tex_path, "-o", docx_path], check=True, capture_output=True, timeout=60)
            if os.path.exists(docx_path):
                return FileResponse(docx_path, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document", filename=f"{session['stem']}.docx")
        except Exception as e:
            print(f"[API] Error compiling DOCX: {e}")
            if isinstance(e, subprocess.CalledProcessError):
                print(f"[API] Pandoc stderr: {e.stderr.decode('utf-8', errors='ignore')}")
        return FileResponse(tex_path, media_type="text/plain", filename=f"{session['stem']}.tex")

    elif format == "tex":
        return FileResponse(tex_path, media_type="text/plain", filename=f"{session['stem']}.tex")

    raise HTTPException(status_code=400, detail="Invalid format")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api_server:app", host="0.0.0.0", port=8001, reload=True)
