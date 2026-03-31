import { BoardPaperForm } from "../../types/create/types";

interface BoardPreviewProps {
  form: BoardPaperForm;
}

export function BoardPreview({ form }: BoardPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-black/10 p-6 aspect-[8.5/11] text-black dark:text-black font-serif">
      <div className="text-center mb-4">
        <h1 className="text-base font-bold uppercase tracking-wide leading-snug">
          {form.schoolName || "SCHOOL NAME"}
        </h1>
        <p className="text-sm font-bold mt-1 uppercase">
          {form.examName || "EXAMINATION NAME"}
        </p>
        <p className="text-sm font-bold mt-0.5 uppercase">
          SUBJECT: {form.subject || "____________"}
        </p>
        <p className="text-sm font-bold mt-0.5 uppercase">
          CLASS-{form.class || "___"} ({form.board || "BOARD"})
        </p>
      </div>

      <div className="flex justify-between text-sm font-bold mb-1 mt-3">
        <span>TIME ALLOWED: {form.duration || "3 HRS"}</span>
        <span>M.M: {form.maxMarks || "80"}</span>
      </div>

      {form.date && (
        <p className="text-xs text-black/60 mb-3">Date: {form.date}</p>
      )}

      <div className="space-y-4 mt-4">
        {form.questions.length === 0 ? (
          <p className="text-xs text-black/40 text-center py-8">
            Add questions in Step 2...
          </p>
        ) : (
          form.questions.map((q, index) => (
            <div key={q.id} className="text-sm">
              <p>
                <span className="font-bold">Q{index + 1}.</span>{" "}
                {q.question || "Question text..."}
                <span className="ml-2 text-black/50 text-xs">({q.marks} marks)</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
