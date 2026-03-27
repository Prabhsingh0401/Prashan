"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { PaperType, AssignmentForm, BoardPaperForm, initialAssignmentForm, initialBoardForm } from "../../types/create/types";
import { CreatePaperHeader } from "../../components/create/CreatePaperHeader";
import { DraggablePreview } from "../../components/create/DraggablePreview";
import { AssignmentWizard } from "../../components/create/AssignmentWizard";
import { BoardWizard } from "../../components/create/BoardWizard";

function CreatePaperContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paperType = searchParams.get("type") as PaperType | null;

  const [showPreview, setShowPreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [assignmentStep, setAssignmentStep] = useState(1);
  const [boardStep, setBoardStep] = useState(1);
  const [previewZoom, setPreviewZoom] = useState(0.6);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  const [boardForm, setBoardForm] = useState<BoardPaperForm>(initialBoardForm);
  const [assignmentForm, setAssignmentForm] = useState<AssignmentForm>(initialAssignmentForm);

  useEffect(() => {
    if (!paperType) {
      router.push("/dashboard");
    }
  }, [paperType, router]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  if (!paperType) return null;

  return (
    <div className="h-screen bg-neutral-50 dark:bg-black flex flex-col overflow-hidden">
      <CreatePaperHeader
        paperType={paperType}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        previewZoom={previewZoom}
        setPreviewZoom={setPreviewZoom}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        onBack={() => router.push("/dashboard")}
      />

      <main className="flex-1 flex overflow-hidden">
        <div
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300",
            showPreview && "md:w-1/2"
          )}
        >
          <div className="p-4 md:p-5 max-w-2xl mx-auto">
            {paperType === "board" ? (
              <BoardWizard
                step={boardStep}
                setStep={setBoardStep}
                form={boardForm}
                setForm={setBoardForm}
              />
            ) : (
              <AssignmentWizard
                step={assignmentStep}
                setStep={setAssignmentStep}
                form={assignmentForm}
                setForm={setAssignmentForm}
              />
            )}
          </div>
        </div>

        {showPreview && (
          <DraggablePreview
            paperType={paperType}
            assignmentForm={assignmentForm}
            boardForm={boardForm}
            zoom={previewZoom}
            pan={pan}
            isDragging={isDragging}
            onMouseDown={(e) => {
              setIsDragging(true);
              dragStart.current = { x: e.clientX, y: e.clientY };
              panStart.current = { x: pan.x, y: pan.y };
            }}
            onMouseMove={(e) => {
              if (isDragging) {
                const dx = e.clientX - dragStart.current.x;
                const dy = e.clientY - dragStart.current.y;
                setPan({ x: panStart.current.x + dx, y: panStart.current.y + dy });
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          />
        )}
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-foreground/40" />
    </div>
  );
}

export default function CreatePaperPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CreatePaperContent />
    </Suspense>
  );
}
