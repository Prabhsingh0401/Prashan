/**
 * services/paperApi.ts
 * Frontend API client for paper generation and download.
 */
import { BoardPaperForm } from "@/app/types/create/types";
import { logout } from "./authService";

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface GenerateResult {
  sessionId: string;
  latex: string;
  status: string;
}

function mapFormToPayload(form: BoardPaperForm) {
  return {
    schoolName:  form.schoolName,
    examName:    form.examName,
    subject:     form.subject,
    subSubjects: form.subSubjects,
    class_num:   parseInt(form.class, 10),
    year:        new Date().getFullYear() + "-" + (new Date().getFullYear() + 1 - 2000),
    timeAllowed: form.duration ? `${form.duration} hrs` : "3 hrs",
    totalMarks:  parseInt(form.maxMarks, 10) || 80,
    chapters:    form.chapters.map((ch) => ch.replace(/^Chapter \d+: /, "")),
    sections:    form.sections.filter((s) => s.count > 0),
    formatting: {
      headerFontFamily:  form.formatting.headerFontFamily,
      headerFontSize:    form.formatting.headerFontSize,
      headerFontWeight:  form.formatting.headerFontWeight,
      headingFontFamily: form.formatting.headingFontFamily,
      headingFontSize:   form.formatting.headingFontSize,
      headingFontWeight: form.formatting.headingFontWeight,
      bodyFontFamily:    form.formatting.bodyFontFamily,
      bodyFontSize:      form.formatting.bodyFontSize,
    },
  };
}

export interface StreamEvent {
  type: "progress" | "done" | "error";
  agent?: string;
  message?: string;
  sessionId?: string;
  latex?: string;
}

export async function generatePaper(
  form: BoardPaperForm,
  onProgress?: (event: StreamEvent) => void
): Promise<GenerateResult> {
  const token = localStorage.getItem("token");
  const payload = mapFormToPayload(form);
  
  // Step 1: POST to enqueue the job
  const res = await fetch(`${BACKEND}/paper/generate`, {
    method:  "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body:    JSON.stringify(payload),
  });

  if (!res.ok) {
    if (res.status === 401) {
      await logout();
      throw new Error("Session expired. Please login again.");
    }
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error: string }).error ?? "Generation failed");
  }

  const { sessionId } = await res.json();
  if (!sessionId) {
    throw new Error("Response did not contain a valid session ID.");
  }

  // Step 2: Open SSE stream using custom fetch to support auth headers
  const streamRes = await fetch(`${BACKEND}/paper/status/stream/${sessionId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!streamRes.ok) {
    throw new Error(`Failed to subscribe to progress updates: ${streamRes.statusText}`);
  }

  const reader = streamRes.body?.getReader();
  if (!reader) throw new Error("No response stream body available");

  const decoder = new TextDecoder();
  let buffer = "";
  let finalResult: GenerateResult | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    
    // SSE uses two newlines \n\n to split events
    const parts = buffer.split("\n\n");
    buffer = parts.pop() || "";

    for (const part of parts) {
      const line = part.trim();
      if (!line) continue;
      
      // SSE prefix is "data: "
      if (line.startsWith("data:")) {
        const jsonStr = line.replace(/^data:\s*/, "").trim();
        try {
          const event = JSON.parse(jsonStr);
          const mappedEvent: StreamEvent = {
            type: event.phase === "done" ? "done" : event.phase === "error" ? "error" : "progress",
            agent: event.phase,
            message: event.message,
            sessionId: sessionId,
          };

          if (onProgress) {
            onProgress(mappedEvent);
          }

          if (event.phase === "done") {
            finalResult = {
              sessionId: sessionId,
              latex: event.message || "",
              status: "done",
            };
          } else if (event.phase === "error") {
            throw new Error(event.message || "Generation failed");
          }
        } catch (e) {
          console.warn("Failed to parse SSE event data:", jsonStr, e);
        }
      }
    }
  }

  if (!finalResult) throw new Error("Progress stream ended without a 'done' event.");
  return finalResult;
}

export async function listPapers(): Promise<any[]> {
  try {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const res = await fetch(`${BACKEND}/paper/list`, {
      headers: { 
        "Authorization": `Bearer ${token}`
      },
    });

    if (res.status === 401) {
      console.warn("Session expired or unauthorized");
      await logout();
      return [];
    }

    if (!res.ok) throw new Error("Failed to fetch papers");
    return res.json();
  } catch (err) {
    console.error("listPapers error:", err);
    return [];
  }
}


export async function getPaperStatus(sessionId: string): Promise<any> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BACKEND}/paper/status/${sessionId}`, {
    headers: { 
      "Authorization": `Bearer ${token}`
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      await logout();
      throw new Error("Session expired. Please login again.");
    }
    throw new Error("Failed to fetch status");
  }
  return res.json();
}

export async function downloadPaper(
  sessionId: string,
  format: "pdf" | "docx" | "tex",
): Promise<void> {
  const token = localStorage.getItem("token");
  const url = `${BACKEND}/paper/${encodeURIComponent(sessionId)}/download?format=${format}`;
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) {
    if (res.status === 401) {
      await logout();
      throw new Error("Session expired. Please login again.");
    }
    throw new Error(`Download failed: ${res.statusText}`);
  }

  const blob = await res.blob();
  const disposition = res.headers.get("content-disposition");
  let filename = `${sessionId}.${format}`;
  if (disposition && disposition.includes("filename=")) {
    const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1];
    }
  }

  const a    = document.createElement("a");
  a.href     = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
