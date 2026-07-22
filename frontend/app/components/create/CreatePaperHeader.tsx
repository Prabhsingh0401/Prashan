import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff, Download, Loader2, FileText, FileCode } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import { ProfileMenu } from "../shared/ProfileMenu";
import { PaperType, BoardPaperForm, AssignmentForm } from "../../types/create/types";
import { downloadPaper } from "../../../services/paperApi";
import { cn } from "@/lib/utils";

interface CreatePaperHeaderProps {
  paperType: PaperType | null;
  form: BoardPaperForm | AssignmentForm;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  isGenerating: boolean;
  sessionId?: string;
  onGenerate: () => void;
  onBack: () => void;
}

export function CreatePaperHeader({
  paperType,
  form,
  showPreview,
  setShowPreview,
  isGenerating,
  sessionId,
  onGenerate,
  onBack,
}: CreatePaperHeaderProps) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const chaptersSelected = ("chapters" in form) ? (form.chapters?.length > 0) : true;
  const canGenerate = chaptersSelected && !isGenerating && !isDownloading;

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = async (format: "pdf" | "docx" | "tex") => {
    if (!sessionId || isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadPaper(sessionId, format);
      setShowDownloadMenu(false);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <header className="flex-shrink-0 z-40 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-2.5 max-w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-black/5 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/15 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5">
              <img src="/prashan_logo.svg" alt="Prashan Logo" className="hidden dark:block object-contain w-full h-full" />
              <img src="/prashan_logo_black.svg" alt="Prashan Logo" className="block dark:hidden object-contain w-full h-full" />
            </div>
            <span className="text-sm font-bold tracking-tight hidden sm:block">Prashan</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-black/10 dark:bg-white/10 mx-1" />
          <h1 className="font-semibold text-sm text-foreground">
            {paperType === "board" ? "Board Aligned Paper" : "Class Assignment"}
          </h1>
        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-1.5 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-black/5 dark:border-white/10 text-xs hidden md:flex items-center gap-1.5 hover:bg-white/70 dark:hover:bg-white/15 transition-colors"
          >
            {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {showPreview ? "Hide" : "Preview"}
          </button>
          <ThemeToggle />

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => {
                if (sessionId) {
                  setShowDownloadMenu(!showDownloadMenu);
                } else {
                  onGenerate();
                }
              }}
              disabled={(!canGenerate && !sessionId) || isDownloading}
              className={cn(
                "btn-glass btn-glass-primary !px-4 !py-1.5 !text-xs font-bold transition-all",
                (!canGenerate && !sessionId) && "opacity-50 cursor-not-allowed"
              )}
            >
              {isGenerating || isDownloading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : sessionId ? (
                <Download className="h-3.5 w-3.5" />
              ) : (
                <FileCode className="h-3.5 w-3.5" />
              )}
              {isGenerating ? "Generating..." : isDownloading ? "Exporting..." : sessionId ? "Download" : "Generate"}
            </button>

            {showDownloadMenu && sessionId && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 shadow-2xl shadow-black/20 p-2 animate-in fade-in zoom-in-95 duration-200">
                <p className="px-3 py-2 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                  Export Format
                </p>
                <button
                  onClick={() => handleDownload("pdf")}
                  disabled={isDownloading}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group text-left",
                    isDownloading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Adobe PDF</p>
                    <p className="text-[10px] text-foreground/50">Print ready</p>
                  </div>
                </button>
                <button
                  onClick={() => handleDownload("docx")}
                  disabled={isDownloading}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group text-left",
                    isDownloading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Word DOCX</p>
                    <p className="text-[10px] text-foreground/50">Editable doc</p>
                  </div>
                </button>
                <div className="h-px bg-black/5 dark:bg-white/5 my-1 mx-2" />
                <button
                  onClick={() => handleDownload("tex")}
                  disabled={isDownloading}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group text-left",
                    isDownloading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-500/10 flex items-center justify-center text-neutral-500 group-hover:scale-110 transition-transform">
                    {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileCode className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">LaTeX Source</p>
                    <p className="text-[10px] text-foreground/50">Raw code</p>
                  </div>
                </button>
              </div>
            )}
          </div>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
