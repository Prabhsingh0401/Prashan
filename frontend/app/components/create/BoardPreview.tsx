"use client";

import { useState, useEffect } from "react";
import { BoardPaperForm } from "../../types/create/types";

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface BoardPreviewProps {
  form: BoardPaperForm;
  latex?: string;        // set after generation
  sessionId?: string;    // set after generation
  generating?: boolean; // true while the API call is in flight
}

export function BoardPreview({ form, latex, sessionId, generating }: BoardPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (sessionId) {
      const fetchPdf = async () => {
        try {
          const token = localStorage.getItem("token");
          const url = `${BACKEND}/paper/${encodeURIComponent(sessionId)}/download?format=pdf`;
          const res = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          if (res.ok) {
            const blob = await res.blob();
            objectUrl = URL.createObjectURL(blob);
            setPdfUrl(objectUrl);
          }
        } catch (err) {
          console.error("Failed to fetch preview PDF:", err);
        }
      };
      fetchPdf();
    } else {
      setPdfUrl(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [sessionId]);

  const isNew = !sessionId && !latex;

  return (
    <div className="flex flex-col gap-3 h-full w-full">
      <div className="flex-1 overflow-hidden h-full w-full">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0 rounded-2xl bg-white"
            title="Question Paper Preview"
          />
        ) : (
          <div className="flex flex-col h-full bg-white dark:bg-black/90 p-10 font-mono overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl justify-between">
            <div className="text-muted-foreground/40 text-[10px] uppercase tracking-widest flex justify-between items-center">
              <span>{isNew ? "// preview" : "// generation complete"}</span>
              {isNew ? (
                <span className="text-violet-500 font-bold">● IDLE</span>
              ) : (
                <span className="text-emerald-500 font-bold">● READY</span>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-center py-20">
              <p className="text-[clamp(14px,2.2vw,18px)] leading-[1.8] text-foreground font-mono">
                {isNew ? "Start generating your paper." : "Your paper is ready to download."}
              </p>
            </div>
            <div className="pt-6 border-t border-black/5 dark:border-white/5 flex justify-between items-end opacity-40">
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-tighter">© 2026 PRASHAN</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
