from typing import TypedDict, List, Optional, Dict, Any

class FetchTask(TypedDict):
    task_id: str
    chapter: str
    subject: str
    class_num: int
    section: str
    question_type: str
    count_needed: int
    marks_per_q: int
    attempt: int

class Question(TypedDict):
    question_id: str
    section: str
    question_type: str
    chapter: str
    subject: str
    question_text: str
    options: Optional[List[str]]
    correct_answer: str
    marks: int
    bloom_level: str
    source_chunk_text: str
    verified: bool
    rejection_reason: Optional[str]

class CaseSet(TypedDict):
    set_id: str
    chapter: str
    passage: str
    passage_source: str
    sub_questions: List[Question]

class PaperGeneratorState(TypedDict):
    school_name: str
    exam_title: str
    subject: str
    class_num: int
    year: str
    time_allowed: str
    total_marks: int
    chapters: List[str]
    # Dynamic section config from BoardWizard (overrides global PAPER_SECTIONS)
    paper_sections: Optional[Dict[str, Dict[str, Any]]]
    # Font/size formatting from teacher preferences
    formatting: Optional[Dict[str, Any]]
    distribution: Dict[str, Dict[str, int]]
    fetch_queue: List[FetchTask]
    completed_tasks: List[str]
    fetched_pool: List[Question]
    verified_pool: List[Question]
    rejected_pool: List[Question]
    case_sets: List[CaseSet]
    refetch_queue: List[FetchTask]
    max_refetch_attempts: int
    latex_paper: str
    latex_answer_key: str
    output_filename_stem: str
    session_id: str
    chapter_progress: Dict[str, str]
    token_usage: Dict[str, int]
    errors: List[str]
    current_phase: str
