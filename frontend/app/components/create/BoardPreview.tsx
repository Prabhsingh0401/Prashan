import { BoardPaperForm } from "../../types/create/types";

interface BoardPreviewProps {
  form: BoardPaperForm;
}

export function BoardPreview({ form }: BoardPreviewProps) {
  const { formatting: fmt } = form;

  const headerStyle: React.CSSProperties = {
    fontFamily: fmt.headerFontFamily,
    fontSize: fmt.headerFontSize,
    fontWeight: fmt.headerFontWeight,
    fontStyle: fmt.headerFontStyle,
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: fmt.headingFontFamily,
    fontSize: fmt.headingFontSize,
    fontWeight: fmt.headingFontWeight,
    fontStyle: fmt.headingFontStyle,
  };

  const bodyStyle: React.CSSProperties = {
    fontFamily: fmt.bodyFontFamily,
    fontSize: fmt.bodyFontSize,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-black/10 p-6 aspect-[8.5/11] text-black dark:text-black overflow-hidden">
      <div className="text-center mb-4">
        <h1 style={headerStyle} className="uppercase tracking-wide leading-snug">
          {form.schoolName || "SCHOOL NAME"}
        </h1>
        <p style={headerStyle} className="mt-1 uppercase">
          {form.examName || "EXAMINATION NAME"}
        </p>
        <p style={headerStyle} className="mt-0.5 uppercase">
          SUBJECT: {form.subject || "____________"}
        </p>
        <p style={headerStyle} className="mt-0.5 uppercase">
          CLASS-{form.class || "___"} ({form.board || "BOARD"})
        </p>
      </div>

      <div style={bodyStyle} className="flex justify-between font-bold mb-1 mt-3">
        <span>TIME ALLOWED: {form.duration || "3 HRS"}</span>
        <span>M.M: {form.maxMarks || "80"}</span>
      </div>

      {form.date && (
        <p style={bodyStyle} className="text-black/60 mb-3">Date: {form.date}</p>
      )}

      <div className="space-y-4 mt-4">
        {form.questions.length === 0 ? (
          <p style={bodyStyle} className="text-black/40 text-center py-8">
            Add questions in Step 2...
          </p>
        ) : (
          form.questions.map((q, index) => (
            <div key={q.id}>
              <p style={headingStyle}>
                <span>Q{index + 1}.</span>{" "}
                {q.question || "Question text..."}
                <span style={bodyStyle} className="ml-2 text-black/50">({q.marks} marks)</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
