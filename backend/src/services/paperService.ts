/**
 * paperService.ts
 * HTTP client that forwards requests to the Python FastAPI paper generator.
 * Uses node-fetch-compatible patterns that work across Node 16+.
 */
import https from "https";
import http from "http";
import { Readable } from "stream";

const PYTHON_API_BASE = process.env.PYTHON_API_URL ?? "http://localhost:8001";
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY ?? "dev-key-123";

export interface SectionConfig {
  key: string;
  label: string;
  marksPerQ: number;
  count: number;
  group?: string;
  note?: string;
}

export interface FormattingConfig {
  headerFontFamily: string;
  headerFontSize: number;
  headerFontWeight: string;
  headingFontFamily: string;
  headingFontSize: number;
  headingFontWeight: string;
  bodyFontFamily: string;
  bodyFontSize: number;
}

export interface GeneratePayload {
  schoolName: string;
  examName: string;
  subject: string;
  class_num: number;
  year: string;
  timeAllowed: string;
  totalMarks: number;
  chapters: string[];
  sections: SectionConfig[];
  formatting: FormattingConfig;
}

export interface GenerateResult {
  sessionId: string;
  latex: string;
  status: string;
}

/**
 * Proxy a generation request to the Python API via NDJSON stream.
 * Returns the raw http.IncomingMessage stream from FastAPI.
 */
export function streamGeneratePaper(payload: GeneratePayload): Promise<http.IncomingMessage> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(`${PYTHON_API_BASE}/generate`);
    const data = JSON.stringify(payload);

    const options: http.RequestOptions = {
      hostname: parsed.hostname,
      port:     parsed.port || (parsed.protocol === "https:" ? 443 : 80),
      path:     parsed.pathname + parsed.search,
      method:   "POST",
      headers: {
        "Content-Type":   "application/json",
        "Content-Length": Buffer.byteLength(data),
        "X-API-Key":      INTERNAL_API_KEY,
      },
    };

    const lib = parsed.protocol === "https:" ? https : http;
    const req = lib.request(options, (res) => {
      if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(`FastAPI generation error ${res.statusCode}`));
        return;
      }
      resolve(res);
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

/**
 * Trigger the paper generation on Python API without waiting for it to complete.
 * The Python endpoint will return a 200 OK immediately once enqueued to Celery.
 */
export function triggerPythonGeneration(payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(`${PYTHON_API_BASE}/generate`);
    const data = JSON.stringify(payload);

    const options: http.RequestOptions = {
      hostname: parsed.hostname,
      port:     parsed.port || (parsed.protocol === "https:" ? 443 : 80),
      path:     parsed.pathname,
      method:   "POST",
      headers: {
        "Content-Type":   "application/json",
        "Content-Length": Buffer.byteLength(data),
        "X-API-Key":      INTERNAL_API_KEY,
      },
    };

    const lib = parsed.protocol === "https:" ? https : http;
    const req = lib.request(options, (res) => {
      let buffer = "";
      res.on("data", (chunk) => { buffer += chunk; });
      res.on("end", () => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`FastAPI trigger error ${res.statusCode}: ${buffer}`));
          return;
        }
        try {
          resolve(JSON.parse(buffer));
        } catch (e) {
          resolve({ status: "ok", raw: buffer });
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

/**
 * Call the Python API via NDJSON stream and log LangGraph progress.
 */
function postJsonStream(url: string, body: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const data = JSON.stringify(body);

    const options: http.RequestOptions = {
      hostname: parsed.hostname,
      port:     parsed.port || (parsed.protocol === "https:" ? 443 : 80),
      path:     parsed.pathname + parsed.search,
      method:   "POST",
      headers: {
        "Content-Type":   "application/json",
        "Content-Length": Buffer.byteLength(data),
        "X-API-Key":      INTERNAL_API_KEY,
      },
    };

    const lib = parsed.protocol === "https:" ? https : http;
    const req = lib.request(options, (res) => {
      let buffer = "";
      res.on("data", (chunk: Buffer) => {
        buffer += chunk.toString("utf8");
        let newlineIdx;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, newlineIdx).trim();
          buffer = buffer.slice(newlineIdx + 1);
          if (!line) continue;
          
          try {
            const event = JSON.parse(line);
            if (event.type === "progress") {
               console.log(`[LangGraph] Agent working: ${event.agent}`);
            } else if (event.type === "error") {
               reject(new Error(event.message));
            } else if (event.type === "done") {
               console.log(`[LangGraph] Generation done! Session: ${event.sessionId}`);
               resolve(event);
            }
          } catch (e) {
            // Ignore non-JSON lines or debugging print pollution
          }
        }
      });
      res.on("end", () => {
         // Handle end of stream if done was somehow missed
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

/**
 * Call the Python API to generate a question paper (Legacy/Simple).
 */
export async function generatePaper(payload: GeneratePayload): Promise<GenerateResult> {
  console.log(`\n[Backend] Starting paper generation for ${payload.subject}...`);
  return (await postJsonStream(`${PYTHON_API_BASE}/generate`, payload)) as GenerateResult;
}

/**
 * Restore an in-memory session in the Python API using existing LaTeX.
 */
export function syncLatex(sessionId: string, latex: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = `${PYTHON_API_BASE}/sync-latex`;
    const parsed = new URL(url);
    const data = JSON.stringify({ sessionId, latex });

    const options: http.RequestOptions = {
      hostname: parsed.hostname,
      port:     parsed.port || (parsed.protocol === "https:" ? 443 : 80),
      path:     parsed.pathname,
      method:   "POST",
      headers: {
        "Content-Type":   "application/json",
        "Content-Length": Buffer.byteLength(data),
        "X-API-Key":      INTERNAL_API_KEY,
      },
    };

    const lib = parsed.protocol === "https:" ? https : http;
    const req = lib.request(options, (res) => {
      if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(`Sync error ${res.statusCode}`));
        return;
      }
      resolve();
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

/**
 * Proxy a download request to the Python API — returns an IncomingMessage stream.
 * If latex is provided, will attempt to re-sync if the session is missing (404/400).
 */
export function downloadPaper(
  sessionId: string,
  format: "pdf" | "docx" | "tex",
  latex?: string
): Promise<{ stream: Readable; contentType: string; filename: string }> {
  const attemptDownload = (): Promise<{ stream: Readable; contentType: string; filename: string }> => {
    return new Promise((resolve, reject) => {
      const url = `${PYTHON_API_BASE}/download/${encodeURIComponent(sessionId)}?format=${format}`;
      const parsed = new URL(url);
      const lib = parsed.protocol === "https:" ? https : http;

      const options: http.RequestOptions = {
        headers: {
          "X-API-Key": INTERNAL_API_KEY,
        },
      };

      const req = lib.get(url, options, (res) => {
        // Python API returns 404 (or 400) if session not in memory
        if (res.statusCode === 404 || res.statusCode === 400) {
           reject({ statusCode: res.statusCode, message: `Download error ${res.statusCode}` });
           return;
        }
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`Download error ${res.statusCode}`));
          return;
        }
        const rawCt = res.headers["content-type"];
        const ct = Array.isArray(rawCt) ? rawCt[0] : (rawCt ?? "application/octet-stream");
        const ext = ct.includes("pdf") ? "pdf" : ct.includes("wordprocessing") ? "docx" : "tex";
        resolve({ stream: res, contentType: ct, filename: `${sessionId}.${ext}` });
      });

      req.on("error", reject);
    });
  };

  return attemptDownload().catch(async (err: any) => {
    // If it's a 404/400 and we have LaTeX, try to sync once then retry
    if ((err.statusCode === 404 || err.statusCode === 400) && latex) {
      console.log(`[paperService] Session ${sessionId} missing in Python API, attempting re-sync...`);
      await syncLatex(sessionId, latex);
      return attemptDownload();
    }
    throw err;
  });
}

