"use client";

import { cn } from "@/lib/utils";
import { Stepper } from "./Stepper";
import { BoardPaperForm, CHAPTERS, SUBJECTS_10, SUBJECTS_12 } from "../../types/create/types";

interface BoardWizardProps {
  step: number;
  setStep: (step: number) => void;
  form: BoardPaperForm;
  setForm: React.Dispatch<React.SetStateAction<BoardPaperForm>>;
}

export function BoardWizard({ step, setStep, form, setForm }: BoardWizardProps) {
  const subjects = form.class === "10" ? SUBJECTS_10 : SUBJECTS_12;
  const availableChapters = CHAPTERS[form.subject] || [];

  return (
    <div className="h-[500px] flex flex-col overflow-hidden">
      <Stepper currentStep={step} totalSteps={3} />

      <div className="flex-1 overflow-hidden">
        {step === 1 && (
          <div className="h-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
            <div className="space-y-2 flex-1">
              <div>
                <h2 className="text-base font-semibold text-foreground">School & Paper Details</h2>
                <p className="text-xs text-foreground/50">Enter basic exam information</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Board</label>
                  <select
                    value={form.board}
                    onChange={(e) => setForm({ ...form, board: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-neutral-100/80 dark:bg-neutral-800 text-foreground text-sm cursor-pointer appearance-none pr-8"
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State">State</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Class</label>
                  <div className="flex gap-2">
                    {["10", "12"].map((cls) => (
                      <button
                        key={cls}
                        onClick={() => setForm({ ...form, class: cls, subject: "", chapters: [] })}
                        className={cn(
                          "flex-1 py-1.5 px-3 rounded-lg border text-sm font-medium transition-all cursor-pointer",
                          form.class === cls
                            ? "border-black dark:border-white bg-black/5 dark:bg-white/10"
                            : "border-black/10 dark:border-white/10 hover:border-black/20"
                        )}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">School Name</label>
                <input
                  type="text"
                  value={form.schoolName}
                  onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                  placeholder="Your school name"
                  className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Exam Name</label>
                <input
                  type="text"
                  value={form.examName}
                  onChange={(e) => setForm({ ...form, examName: e.target.value })}
                  placeholder="Half Yearly Exam"
                  className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Max Marks</label>
                  <input
                    type="text"
                    value={form.maxMarks}
                    onChange={(e) => setForm({ ...form, maxMarks: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Duration</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="3 Hours"
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 mt-3">
              <button
                onClick={() => setStep(2)}
                disabled={!form.schoolName || !form.examName}
                className={cn(
                  "btn-glass btn-glass-primary !px-4 !py-2 text-sm",
                  (!form.schoolName || !form.examName) && "opacity-50 cursor-not-allowed"
                )}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="h-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
            <div className="space-y-2 flex-1 overflow-hidden">
              <div>
                <h2 className="text-base font-semibold text-foreground">Subject & Chapters</h2>
                <p className="text-xs text-foreground/50">Select subject and chapters</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value, chapters: [] })}
                  className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-neutral-100/80 dark:bg-neutral-800 text-foreground text-sm cursor-pointer appearance-none pr-8"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {form.subject && availableChapters.length > 0 && (
                <div className="flex-1 overflow-hidden flex flex-col">
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Chapters ({form.chapters.length} selected)
                  </label>
                  <div className="flex-1 overflow-y-auto scrollbar-thin p-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5">
                    <div className="flex flex-wrap gap-1">
                      {availableChapters.map((chapter) => (
                        <button
                          key={chapter}
                          onClick={() => {
                            if (form.chapters.includes(chapter)) {
                              setForm({ ...form, chapters: form.chapters.filter((c) => c !== chapter) });
                            } else {
                              setForm({ ...form, chapters: [...form.chapters, chapter] });
                            }
                          }}
                          className={cn(
                            "px-2 py-1 rounded-md border text-xs cursor-pointer transition-all",
                            form.chapters.includes(chapter)
                              ? "border-black/20 dark:border-white/30 bg-black/5 dark:bg-white/10"
                              : "border-black/5 dark:border-white/10"
                          )}
                        >
                          {chapter.replace(/^Chapter \d+: /, "")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-2 mt-3">
              <button
                onClick={() => setStep(1)}
                className="btn-glass btn-glass-icon !rounded-xl !py-2 !px-4 text-sm font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.subject || form.chapters.length === 0}
                className={cn(
                  "btn-glass btn-glass-primary !px-4 !py-2 text-sm",
                  (!form.subject || form.chapters.length === 0) && "opacity-50 cursor-not-allowed"
                )}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="h-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
            <div className="space-y-2 flex-1">
              <div>
                <h2 className="text-base font-semibold text-foreground">Question Setup</h2>
                <p className="text-xs text-foreground/50">Configure marks distribution</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-medium text-foreground/70">Question Types</h3>
                
                {(["mcq", "short", "long"] as const).map((type) => {
                  const qt = form.questionTypes[type];
                  return (
                    <div
                      key={type}
                      className="flex items-center gap-2 p-2 rounded-lg border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-800/50"
                    >
                      <span className="w-16 text-sm font-medium capitalize">
                        {type === "mcq" ? "MCQ" : type === "short" ? "Short" : "Long"}
                      </span>
                      <div className="flex-1 flex gap-2">
                        <div className="flex-1">
                          <input
                            type="number"
                            min="0"
                            placeholder="Q"
                            value={qt.count}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                questionTypes: {
                                  ...form.questionTypes,
                                  [type]: { ...qt, count: Number(e.target.value) },
                                },
                              })
                            }
                            className="w-full px-2 py-1.5 rounded-lg border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-700 text-sm"
                          />
                        </div>
                        <span className="text-xs text-foreground/50 self-center">×</span>
                        <div className="flex-1">
                          <input
                            type="number"
                            min="1"
                            placeholder="M"
                            value={qt.marks}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                questionTypes: {
                                  ...form.questionTypes,
                                  [type]: { ...qt, marks: Number(e.target.value) },
                                },
                              })
                            }
                            className="w-full px-2 py-1.5 rounded-lg border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-700 text-sm"
                          />
                        </div>
                        <span className="text-xs text-foreground/50 self-center">=</span>
                        <span className="w-8 text-sm self-center text-foreground/70">
                          {qt.count * qt.marks}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-2 mt-3">
              <button
                onClick={() => setStep(2)}
                className="btn-glass btn-glass-icon !rounded-xl !py-2 !px-4 text-sm font-medium"
              >
                Back
              </button>
              <button
                onClick={() => {}}
                className="btn-glass btn-glass-primary !px-4 !py-2 text-sm"
              >
                Generate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
