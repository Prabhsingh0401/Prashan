"use client";

import { ArrowLeft, Eye, EyeOff, Download, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import { ProfileMenu } from "../shared/ProfileMenu";
import { PaperType } from "../../types/create/types";

interface CreatePaperHeaderProps {
  paperType: PaperType | null;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  previewZoom: number;
  setPreviewZoom: (zoom: number) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  onBack: () => void;
}

export function CreatePaperHeader({
  paperType,
  showPreview,
  setShowPreview,
  previewZoom,
  setPreviewZoom,
  isGenerating,
  onGenerate,
  onBack,
}: CreatePaperHeaderProps) {
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
          {showPreview && (
            <div className="hidden md:flex items-center gap-1 mr-2">
              <button
                onClick={() => setPreviewZoom(Math.max(0.3, previewZoom - 0.1))}
                className="p-1.5 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-black/5 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/15 transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs text-foreground/50 w-12 text-center">
                {Math.round(previewZoom * 100)}%
              </span>
              <button
                onClick={() => setPreviewZoom(Math.min(1.5, previewZoom + 0.1))}
                className="p-1.5 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-black/5 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/15 transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-1.5 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-black/5 dark:border-white/10 text-xs hidden md:flex items-center gap-1.5 hover:bg-white/70 dark:hover:bg-white/15 transition-colors"
          >
            {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {showPreview ? "Hide" : "Preview"}
          </button>
          <ThemeToggle />
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="btn-glass btn-glass-primary !px-4 !py-1.5 !text-xs"
          >
            {isGenerating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            Generate
          </button>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
