import os
import sys
import json
import redis
from celery import Celery

# Add current dir to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from api_server import GenerateRequest, build_initial_state
from paper_generator.graph import build_graph
from lib.session_store import save_session

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://127.0.0.1:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://127.0.0.1:6379/0")

celery_app = Celery(
    "prashan",
    broker=CELERY_BROKER_URL,
    backend=CELERY_RESULT_BACKEND
)

# Upstash: use REDIS_URL (rediss://) for TLS; fall back to host/port for local dev.
# Pub/sub uses key prefix "prashan:progress:" instead of db=2 (Upstash free tier: db=0 only)
_REDIS_URL = os.getenv("REDIS_URL")
if _REDIS_URL:
    r_pub = redis.from_url(_REDIS_URL)
else:
    REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
    REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", None)
    r_pub = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, password=REDIS_PASSWORD)

PROGRESS_PREFIX = "prashan:progress:"

def publish_progress(session_id: str, phase: str, message: str = ""):
    r_pub.publish(f"{PROGRESS_PREFIX}{session_id}", json.dumps({
        "phase": phase,
        "message": message
    }))

@celery_app.task(bind=True)
def generate_paper_task(self, session_id: str, specs: dict, user_id: str):
    try:
        print(f"[Celery Worker] Starting session {session_id} for user {user_id}")
        publish_progress(session_id, "orchestrating")

        # Build Pydantic GenerateRequest to reuse initial state logic
        req = GenerateRequest(**specs)
        
        # Extract stem prefix
        from datetime import datetime
        subject_abbr = "".join(w[0] for w in req.subject.split())[:4].upper()
        date_str = datetime.now().strftime("%Y%m%d_%H%M%S")
        stem = f"{subject_abbr}_X_{date_str}"

        initial_state = build_initial_state(req, stem)
        initial_state["session_id"] = session_id

        graph = build_graph()
        final_state = initial_state
        
        for output in graph.stream(initial_state, stream_mode="values"):
            final_state = output
            phase = output.get("current_phase", "processing")
            publish_progress(session_id, phase)

        latex = final_state.get("latex_paper", "")
        if not latex:
            raise ValueError("No LaTeX output produced by Layout agent")

        # Save in Redis session store
        save_session(session_id, {
            "latex":     latex,
            "stem":      stem,
            "tex_path":  os.path.join("outputs", "question_papers", f"{stem}.tex"),
            "errors":    final_state.get("errors", []),
        })

        publish_progress(session_id, "done", latex)
        return {"status": "success", "sessionId": session_id}

    except Exception as exc:
        import traceback
        traceback.print_exc()
        publish_progress(session_id, "error", str(exc))
        raise exc
