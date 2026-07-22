import json
import redis
import os

# Upstash requires TLS (rediss://) and only supports db=0 on the free tier.
# We use REDIS_URL (rediss://...) if set, else fall back to host/port for local dev.
_REDIS_URL = os.getenv("REDIS_URL")  # e.g. rediss://default:<pass>@<host>:6379

if _REDIS_URL:
    r = redis.from_url(_REDIS_URL, decode_responses=True)
else:
    REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
    REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", None)
    r = redis.Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        password=REDIS_PASSWORD,
        ssl=bool(_REDIS_URL),
        decode_responses=True,
    )

SESSION_TTL = 3600  # 1 hour
# Key prefix replaces db=3 — Upstash free tier only supports db=0
KEY_PREFIX = "prashan:session:"

def save_session(session_id: str, data: dict):
    r.setex(f"{KEY_PREFIX}{session_id}", SESSION_TTL, json.dumps(data))

def get_session(session_id: str) -> dict | None:
    raw = r.get(f"{KEY_PREFIX}{session_id}")
    return json.loads(raw) if raw else None

def delete_session(session_id: str):
    r.delete(f"{KEY_PREFIX}{session_id}")

def extend_session(session_id: str):
    r.expire(f"{KEY_PREFIX}{session_id}", SESSION_TTL)
