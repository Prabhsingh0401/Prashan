import { PaperType, AssignmentForm, BoardPaperForm } from "../../types/create/types";
import { AssignmentPreview } from "./AssignmentPreview";
import { BoardPreview } from "./BoardPreview";
import { ScrambledLoading } from "./ScrambledLoading";

interface PaperPreviewProps {
  paperType: PaperType | null;
  assignmentForm: AssignmentForm;
  boardForm: BoardPaperForm;
  latex?: string;
  sessionId?: string;
  generating?: boolean;
  phase?: string;
}

export function PaperPreview({
  paperType,
  assignmentForm,
  boardForm,
  latex,
  sessionId,
  generating,
  phase,
}: PaperPreviewProps) {
  return (
    <div className="hidden md:flex w-1/2 bg-neutral-100 dark:bg-neutral-900 border-l border-black/10 dark:border-white/10 h-[calc(100vh-64px)] p-4 overflow-hidden items-stretch justify-stretch">
      {generating && !latex ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[8.5in] h-[11in] flex-shrink-0">
            <ScrambledLoading 
              subject={paperType === "board" ? boardForm.subject : assignmentForm.subject} 
              classNum={paperType === "board" ? boardForm.class : assignmentForm.class} 
              phase={phase}
            />
          </div>
        </div>
      ) : paperType === "board" ? (
        <BoardPreview
          form={boardForm}
          latex={latex}
          sessionId={sessionId}
          generating={generating}
        />
      ) : (
        <div className="w-full h-full overflow-y-auto flex items-start justify-center">
          <div className="w-[8.5in] h-[11in] flex-shrink-0">
            <AssignmentPreview form={assignmentForm} />
          </div>
        </div>
      )}
    </div>
  );
}
