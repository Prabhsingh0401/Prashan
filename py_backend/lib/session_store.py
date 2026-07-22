import json
import redis
import os

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))

r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=3, decode_responses=True)

SESSION_TTL = 3600  # 1 hour

def save_session(session_id: str, data: dict):
    r.setex(f"session:{session_id}", SESSION_TTL, json.dumps(data))

def get_session(session_id: str) -> dict | None:
    raw = r.get(f"session:{session_id}")
    return json.loads(raw) if raw else None

def delete_session(session_id: str):
    r.delete(f"session:{session_id}")

def extend_session(session_id: str):
    r.expire(f"session:{session_id}", SESSION_TTL)
