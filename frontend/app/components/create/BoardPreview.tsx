import { BoardPaperForm } from "../../types/create/types";

interface BoardPreviewProps {
  form: BoardPaperForm;
}

export function BoardPreview({ form }: BoardPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-black/10 p-5 aspect-[8.5/11] text-black dark:text-black">
      <div className="text-center pb-4 mb-6">
        <h1 className="text-lg font-bold">{form.schoolName || "School Name"}</h1>
        <p className="text-sm font-medium mt-1">{form.examName || "Examination Name"}</p>
      </div>

      <div className="flex justify-between text-sm mb-6">
        <div>
          <span className="font-medium">Subject: </span>
          {form.subject || "____________"}
        </div>
        <div>
          <span className="font-medium">Class: </span>
          {form.class || "____"}
        </div>
      </div>

      <div className="flex justify-between text-sm mb-6">
        <div>
          <span className="font-medium">Board: </span>
          {form.board}
        </div>
        <div>
          <span className="font-medium">Max Marks: </span>
          {form.maxMarks || "80"}
        </div>
      </div>

      <div className="flex justify-between text-sm mb-8">
        <div>
          <span className="font-medium">Date: </span>
          {form.date || "____________"}
        </div>
        <div>
          <span className="font-medium">Duration: </span>
          {form.duration || "3 Hours"}
        </div>
      </div>

      <div className="space-y-4">
        {form.questions.length === 0 ? (
          <p className="text-sm text-black/40 text-center py-8">
            Add questions in Step 2...
          </p>
        ) : (
          form.questions.map((q, index) => (
            <div key={q.id} className="text-sm">
              <p className="font-medium">
                {index + 1}. {q.question || "Question text..."}
                <span className="ml-2 text-black/50">({q.marks} marks)</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
