"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatCard from '../components/dashboard/StatCard';
import QuickActions from '../components/dashboard/QuickActions';
import { listPapers } from '@/services/paperApi';
import { Loader2, FileText, Download, ExternalLink } from 'lucide-react';

export default function DashboardPage() {
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
    <div className="space-y-8 mt-20">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back!</h2>
        <p className="text-foreground/60">Here's an overview of your recent activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Recent Papers"
          value={papers.length.toString()}
          description={papers.length > 0 ? "Check your generated papers below." : "You haven't generated any papers yet."}
        />

        <StatCard
          title="Usage Stats"
          value={`${papers.length} / 10`}
          description="Free generation credits used this month."
        />

        <QuickActions />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold tracking-tight mb-4">Your Library</h3>

        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-foreground/20" />
          </div>
        ) : papers && papers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {papers.map((paper) => (
              <div key={paper.sessionId} className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 space-y-4 backdrop-blur-md">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-black dark:text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/5">
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      paper.status === 'done' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                      paper.status === 'error' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' :
                      'bg-yellow-500 animate-pulse'
                    }`} />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-foreground/70">
                      {paper.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm line-clamp-1">{paper.examName || paper.subject}</h4>
                  <p className="text-xs text-foreground/50">{paper.schoolName}</p>
                  <p className="text-[10px] text-foreground/30 mt-1">
                    {new Date(paper.createdAt).toLocaleDateString()} • Class {paper.classNum}
                  </p>
                  {paper.status === 'error' && paper.lastError && (
                    <p className="text-[10px] text-red-500 mt-2 line-clamp-2 font-medium bg-red-500/5 p-1 rounded">
                      {paper.lastError}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex gap-2">
                  {paper.pdfUrl ? (
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-glass btn-glass-icon !py-2 !px-3 !text-[10px] !font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Download className="h-3 w-3" />
                      PDF Download
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-foreground/30 text-[10px] font-bold uppercase tracking-wider cursor-not-allowed border border-black/5">
                      Processing...
                    </div>
                  )}
                  <Link
                    href={`/dashboard/create?type=board&sessionId=${paper.sessionId}`}
                    className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl border border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 flex items-center justify-center min-h-[260px]">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-foreground/20" />
              </div>
              <h4 className="text-lg font-bold mb-2">Your library is empty</h4>
              <p className="text-sm text-foreground/50 mb-6">
                You haven't generated any papers yet. Start by creating a board paper or an assignment.
              </p>
              <Link
                href="/dashboard/create?type=board"
                className="w-full btn-glass btn-glass-icon !py-2.5 !text-sm cursor-pointer"
              >
                Create first paper
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
