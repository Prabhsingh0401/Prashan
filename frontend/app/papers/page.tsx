"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { listPapers } from "@/services/paperApi";
import { Loader2, FileText, Download, ExternalLink, ArrowLeft } from "lucide-react";

export default function PapersPage() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPapers() {
      try {
        const data = await listPapers();
        setPapers(data);
      } catch (err) {
        console.error("Failed to fetch papers", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6 mt-24 sm:mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Link
              href="/dashboard"
              className="btn-glass btn-glass-icon relative !p-2 !rounded-xl transition-all shrink-0 mt-0.5"
            >
              <ArrowLeft className="h-4 w-4 text-foreground/70" />
            </Link>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">Your Papers</h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">A complete list of your generated question papers.</p>
            </div>
          </div>
          <Link
            href="/dashboard/create?type=board"
            className="btn-glass btn-glass-primary flex items-center justify-center !px-4 !py-2 !rounded-xl !text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto text-center"
          >
            Create Paper
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-foreground/20" />
          </div>
        ) : papers && papers.length > 0 ? (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-md overflow-hidden shadow-sm shadow-black/5 dark:shadow-black/20">
            <div className="divide-y divide-black/10 dark:divide-white/10">
              {papers.map((paper) => (
                <div
                  key={paper.sessionId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-black dark:text-white shrink-0 mt-0.5">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-base truncate pr-2 text-black dark:text-white">
                          {paper.examName || paper.subject}
                        </h4>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              paper.status === "done"
                                ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                                : paper.status === "error"
                                ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                                : "bg-yellow-500 animate-pulse"
                            }`}
                          />
                          <span className="text-[9px] uppercase tracking-wider font-bold text-neutral-600 dark:text-neutral-400">
                            {paper.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{paper.schoolName}</p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400 dark:text-neutral-500">
                        <span>Class {paper.classNum}</span>
                        <span>•</span>
                        <span>{paper.subject}</span>
                        <span>•</span>
                        <span>{new Date(paper.createdAt).toLocaleDateString()}</span>
                      </div>
                      {paper.status === "error" && paper.lastError && (
                        <p className="text-xs text-red-500 font-medium bg-red-500/5 dark:bg-red-500/10 p-1.5 rounded max-w-lg">
                          {paper.lastError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center shrink-0">
                    {paper.pdfUrl ? (
                      <a
                        href={paper.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-glass btn-glass-secondary flex items-center justify-center !px-4 !py-2 !rounded-xl !text-xs font-bold transition-all gap-2"
                      >
                        <Download className="h-3.5 w-3.5 text-foreground/75" />
                        Download
                      </a>
                    ) : (
                      <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed border border-black/5 dark:border-white/5">
                        Processing
                      </div>
                    )}
                    <Link
                      href={`/dashboard/create?type=board&sessionId=${paper.sessionId}`}
                      className="btn-glass btn-glass-icon relative !p-2.5 !rounded-xl transition-all"
                    >
                      <ExternalLink className="h-4 w-4 text-foreground/75" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12 rounded-2xl border border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 flex items-center justify-center min-h-[260px]">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-neutral-400 dark:text-neutral-500" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-black dark:text-white">Your library is empty</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                You haven't generated any papers yet. Start by creating a board paper or an assignment.
              </p>
              <Link
                href="/dashboard/create?type=board"
                className="btn-glass btn-glass-primary inline-block px-5 py-2.5 text-sm font-semibold rounded-xl transition-all"
              >
                Create first paper
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
