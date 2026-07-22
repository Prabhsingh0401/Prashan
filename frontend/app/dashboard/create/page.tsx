"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import {
  PaperType,
  AssignmentForm,
  BoardPaperForm,
  initialAssignmentForm,
  initialBoardForm,
} from "../../types/create/types";
import { CreatePaperHeader } from "../../components/create/CreatePaperHeader";
import { PaperPreview } from "../../components/create/DraggablePreview";
import { AssignmentWizard } from "../../components/create/AssignmentWizard";
import { BoardWizard } from "../../components/create/BoardWizard";
import { generatePaper, getPaperStatus } from "../../../services/paperApi";
import { Toast } from "../../components/ui/toast";

function CreatePaperContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paperType = searchParams.get("type") as PaperType | null;
  const initialSessionId = searchParams.get("sessionId");

  const [showPreview, setShowPreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Generation results
  const [latex, setLatex] = useState<string | undefined>(undefined);
  const [sessionId, setSessionId] = useState<string | undefined>(initialSessionId || undefined);
  const [progressPhase, setProgressPhase] = useState<string | undefined>(undefined);

  const [assignmentStep, setAssignmentStep] = useState(1);
  const [boardStep, setBoardStep] = useState(1);


  const [boardForm, setBoardForm] = useState<BoardPaperForm>(initialBoardForm);
  const [assignmentForm, setAssignmentForm] = useState<AssignmentForm>(initialAssignmentForm);

  useEffect(() => {
    if (!paperType) {
      router.push("/dashboard");
    }
  }, [paperType, router]);

  // Recovery System: Check for active session on mount
  useEffect(() => {
    if (initialSessionId) {
      const pollStatus = async () => {
        try {
          const status = await getPaperStatus(initialSessionId);
          if (status.latex) setLatex(status.latex);
          if (status.status === 'processing' || status.status === 'uploading') {
            setIsGenerating(true);
            setProgressPhase(status.status);
            // Re-poll after 5 seconds
            setTimeout(pollStatus, 5000);
          } else if (status.status === 'done') {
            setIsGenerating(false);
            setProgressPhase(undefined);
            setLatex(status.latex);
          }
        } catch (err) {
          console.error("Recovery polling error:", err);
        }
      };
      pollStatus();
    } else {
      // Check localStorage for a recently started session that didn't finish
      const savedSession = localStorage.getItem("active_paper_session");
      if (savedSession) {
        const { id, type } = JSON.parse(savedSession);
        if (type === paperType) {
          router.push(`/dashboard/create?type=${type}&sessionId=${id}`);
        }
      }
    }
  }, [initialSessionId, paperType, router]);

  const handleGenerate = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setShowToast(false);
    setProgressPhase(undefined);
    // Clear previous result so preview shows skeleton
    setLatex(undefined);
    setSessionId(undefined);

    try {
      if (paperType === "board") {
        const result = await generatePaper(boardForm, (event) => {
          if (event.type === "progress") {
            setProgressPhase(event.agent);
            console.log(`[Stream] Progress: ${event.agent}`);
          }
          if (event.sessionId) {
            setSessionId(event.sessionId);
            // Save to localStorage for recovery
            localStorage.setItem("active_paper_session", JSON.stringify({ id: event.sessionId, type: "board" }));
          }
        });
        setLatex(result.latex);
        setSessionId(result.sessionId);
        localStorage.removeItem("active_paper_session");
      } else {
        // Assignment path — placeholder until wired
        await new Promise((r) => setTimeout(r, 1500));
      }
    } catch (err) {
      const errorMsg = (err as Error).message ?? "Generation failed";
      const isLimitError = errorMsg.toLowerCase().includes("limit");
      const msg = isLimitError
        ? errorMsg
        : process.env.NODE_ENV === "production"
          ? "We encountered a problem, please try again later"
          : errorMsg;
      setToastMessage(msg);
      setShowToast(true);
      console.error("[create/page] handleGenerate error:", err);
      localStorage.removeItem("active_paper_session");
    } finally {
      setIsGenerating(false);
    }

  };

  if (!paperType) return null;

  return (
    <div className="h-screen bg-neutral-50 dark:bg-black flex flex-col overflow-hidden">
      <CreatePaperHeader
        paperType={paperType}
        form={paperType === "board" ? boardForm : assignmentForm}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        isGenerating={isGenerating}
        sessionId={sessionId}
        onGenerate={handleGenerate}
        onBack={() => router.push("/dashboard")}
      />

      {/* Error toast */}
      <Toast
        type="error"
        title={toastMessage.toLowerCase().includes("limit") ? "Generation Limit Reached" : "Generation Failed"}
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
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
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                // Optional: Pass progressPhase if BoardWizard needs to display it
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
          <PaperPreview
            paperType={paperType}
            assignmentForm={assignmentForm}
            boardForm={boardForm}
            latex={latex}
            sessionId={sessionId}
            generating={isGenerating}
            phase={progressPhase}
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
