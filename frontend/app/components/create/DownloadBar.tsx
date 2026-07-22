"use client";

import { useState } from "react";
import { downloadPaper } from "../../../services/paperApi";
import { cn } from "@/lib/utils";

interface DownloadBarProps {
  sessionId: string;
}

type Format = "pdf" | "docx" | "tex";

interface FormatOption {
  format: Format;
  label: string;
  icon: string;
  description: string;
}

const FORMAT_OPTIONS: FormatOption[] = [
  { format: "pdf",  label: "PDF",  icon: "📄", description: "Print-ready PDF via LaTeX" },
  { format: "docx", label: "DOCX", icon: "📝", description: "Editable Word document" },
  { format: "tex",  label: "LaTeX", icon: "⌨️", description: "Raw .tex source file" },
];

export function DownloadBar({ sessionId }: DownloadBarProps) {
  const [loading, setLoading] = useState<Format | null>(null);
  const [error, setError]     = useState<string | null>(null);

  const handleDownload = async (format: Format) => {
    if (loading) return;
    setLoading(format);
    setError(null);
    try {
      await downloadPaper(sessionId, format);
    } catch (e) {
      setError((e as Error).message ?? "Download failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="shrink-0 mt-3">
      <p className="text-[10px] text-foreground/50 mb-1.5 font-medium uppercase tracking-wide">
        Download
      </p>

      <div className="flex gap-2">
        {FORMAT_OPTIONS.map(({ format, label, icon, description }) => (
          <button
            key={format}
            onClick={() => handleDownload(format)}
            disabled={!!loading}
            aria-label={`Download as ${label}`}
            title={description}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
              "border border-white/10 backdrop-blur-sm",
              "bg-gradient-to-b from-white/10 to-white/5",
              "hover:from-white/20 hover:to-white/10",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              loading === format && "animate-pulse",
            )}
          >
            <span>{icon}</span>
            <span>{loading === format ? "…" : label}</span>
          </button>
        ))}
      </div>

      {error && (
        <p className="text-[10px] text-red-500 mt-1.5">⚠ {error}</p>
      )}
    </div>
  );
}
