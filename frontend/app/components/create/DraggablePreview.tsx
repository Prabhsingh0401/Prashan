import { PaperType, AssignmentForm, BoardPaperForm } from "../../types/create/types";
import { AssignmentPreview } from "./AssignmentPreview";
import { BoardPreview } from "./BoardPreview";

interface DraggablePreviewProps {
  paperType: PaperType | null;
  assignmentForm: AssignmentForm;
  boardForm: BoardPaperForm;
  zoom: number;
  pan: { x: number; y: number };
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

export function DraggablePreview({
  paperType,
  assignmentForm,
  boardForm,
  zoom,
  pan,
  isDragging,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
}: DraggablePreviewProps) {
  return (
    <div
      className="relative hidden md:flex w-1/2 bg-white dark:bg-black overflow-hidden cursor-grab active:cursor-grabbing select-none items-start justify-center pt-4"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'top center',
        }}
        className="w-[8.5in] h-[11in] flex-shrink-0 mx-auto"
      >
        {paperType === "board" ? (
          <BoardPreview form={boardForm} />
        ) : (
          <AssignmentPreview form={assignmentForm} />
        )}
      </div>
    </div>
  );
}
