import { AssignmentForm } from "../../types/create/types";

interface AssignmentPreviewProps {
  form: AssignmentForm;
}

export function AssignmentPreview({ form }: AssignmentPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-black/10 p-6 aspect-[8.5/11] text-black dark:text-black font-serif">
      <div className="text-center mb-4">
        <h1 className="text-base font-bold uppercase tracking-wide leading-snug">
          SCHOOL NAME
        </h1>
        <p className="text-sm font-bold mt-1 uppercase">CLASS ASSIGNMENT</p>
        <p className="text-sm font-bold mt-0.5 uppercase">
          SUBJECT: {form.subject || "____________"}
        </p>
        <p className="text-sm font-bold mt-0.5 uppercase">
          CLASS-{form.class || "___"}
        </p>
      </div>

      <div className="flex justify-between text-sm font-bold mb-1 mt-3">
        <span>TIME ALLOWED: ___</span>
        <span>M.M: {form.totalMarks || "___"}</span>
      </div>

      {form.chapters.length > 0 && (
        <div className="text-sm mb-4">
          <span className="font-medium">Chapters: </span>
          {form.chapters.join(", ")}
        </div>
      )}

      {form.instructions && (
        <div className="text-sm mb-6 p-3 bg-neutral-50 rounded">
          <span className="font-medium">Instructions: </span>
          {form.instructions}
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-medium text-sm text-black/60 uppercase">Questions</h3>

        {form.questionTypes.mcq.count > 0 && (
          <div className="text-sm">
            <p className="font-medium">Section A: Multiple Choice Questions</p>
            <p className="text-black/50 ml-4">
              {form.questionTypes.mcq.count} questions × {form.questionTypes.mcq.marks} marks each
            </p>
          </div>
        )}

        {form.questionTypes.short.count > 0 && (
          <div className="text-sm">
            <p className="font-medium">Section B: Short Answer Questions</p>
            <p className="text-black/50 ml-4">
              {form.questionTypes.short.count} questions × {form.questionTypes.short.marks} marks each
            </p>
          </div>
        )}

        {form.questionTypes.long.count > 0 && (
          <div className="text-sm">
            <p className="font-medium">Section C: Long Answer Questions</p>
            <p className="text-black/50 ml-4">
              {form.questionTypes.long.count} questions × {form.questionTypes.long.marks} marks each
            </p>
          </div>
        )}

        {form.questionTypes.mcq.count === 0 &&
          form.questionTypes.short.count === 0 &&
          form.questionTypes.long.count === 0 && (
            <p className="text-sm text-black/40 text-center py-8">
              Configure questions in Step 2...
            </p>
          )}
      </div>
    </div>
  );
}
