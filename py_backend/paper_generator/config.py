import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_HEADERS = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": os.getenv("OPENROUTER_SITE_URL", "https://prashan.co.in"),
    "X-Title": os.getenv("OPENROUTER_SITE_NAME", "Prashan"),
}

MODEL_FETCHER          = "nvidia/nemotron-3-ultra-550b-a55b:free"
MODEL_FETCHER_FALLBACK = "nvidia/nemotron-3-super-120b-a12b:free"

MODEL_VERIFIER         = "nvidia/nemotron-3-ultra-550b-a55b:free"
MODEL_VERIFIER_FALLBACK = "google/gemma-4-26b-a4b-it:free"

MODEL_LAYOUT           = "nvidia/nemotron-3-nano-30b-a3b:free"
MODEL_FALLBACK         = "google/gemma-4-26b-a4b-it:free"


MAX_RETRIES = 3
RETRY_DELAY_SECONDS = 65
MAX_TOKENS_PER_CALL = 16384

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_PATH = os.getenv("QDRANT_PATH", "./qdrant_db")
QDRANT_COLLECTION = "ncert_chunks"
QDRANT_TOP_K = 15


def get_qdrant_client():
    from qdrant_client import QdrantClient
    if QDRANT_URL and QDRANT_API_KEY:
        return QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
    return QdrantClient(path=QDRANT_PATH)

DEDUP_SIMILARITY_THRESHOLD = 0.90

PAPER_SECTIONS = {
    "A": {"type": "mcq",        "count": 20, "marks_per_q": 1,  "total": 20},
    "B": {"type": "vsa",        "count": 4,  "marks_per_q": 2,  "total": 8},
    "C": {"type": "sa",         "count": 6,  "marks_per_q": 3,  "total": 18},
    "D": {"type": "la",         "count": 4,  "marks_per_q": 5,  "total": 20},
    "E": {"type": "case_based", "count": 2,  "marks_per_q": 7,  "total": 14},
}
TOTAL_MARKS = 80

OVERFETCH_RATIO = 1.4
