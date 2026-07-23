import asyncio
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
import httpx
import os

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

# Global cap — tune based on your OpenRouter tier
LLM_SEMAPHORE = asyncio.Semaphore(5)

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=15),
    retry=retry_if_exception_type((httpx.HTTPStatusError, httpx.TimeoutException, httpx.ConnectTimeout, httpx.ConnectError))
)
async def call_llm(system_prompt: str, user_message: str, model: str, fallback_model: str = None, temperature: float = 0.3) -> str:
    async with LLM_SEMAPHORE:
        try:
            return await _call_openrouter(system_prompt, user_message, model, temperature)
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 429 and fallback_model:
                print(f"  [LLM CLIENT] Rate limited (429) on {model}. Retrying with fallback: {fallback_model}")
                return await _call_openrouter(system_prompt, user_message, fallback_model, temperature)
            raise
        except (httpx.ConnectTimeout, httpx.ConnectError) as e:
            if fallback_model:
                print(f"  [LLM CLIENT] Connection timeout to OpenRouter on {model}. Retrying with fallback: {fallback_model}")
                return await _call_openrouter(system_prompt, user_message, fallback_model, temperature)
            raise

async def _call_openrouter(system_prompt: str, user_message: str, model: str, temperature: float) -> str:
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": os.getenv("OPENROUTER_SITE_URL", "https://prashan.co.in"),
        "X-Title": os.getenv("OPENROUTER_SITE_NAME", "Prashan"),
    }
    
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": user_message})
    
    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature
    }

    timeout_config = httpx.Timeout(120.0, connect=30.0)
    async with httpx.AsyncClient(timeout=timeout_config) as client:
        response = await client.post(
            OPENROUTER_BASE_URL,
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        data = response.json()
        if "choices" not in data or not data["choices"]:
            raise httpx.HTTPStatusError("No choices in response", request=response.request, response=response)
        
        content = data["choices"][0]["message"]["content"]
        if content is None:
            raise httpx.HTTPStatusError("Null content in response", request=response.request, response=response)
            
        return content

def run_async(coro):
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = None

    if loop and loop.is_running():
        import nest_asyncio
        nest_asyncio.apply()
        return loop.run_until_complete(coro)

    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    return loop.run_until_complete(coro)

def call_llm_sync(system_prompt: str, user_message: str, model: str, fallback_model: str = None, temperature: float = 0.3) -> str:
    return run_async(call_llm(system_prompt, user_message, model, fallback_model, temperature))
