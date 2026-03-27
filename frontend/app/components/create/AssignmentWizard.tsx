"use client";

import { cn } from "@/lib/utils";
import { Stepper } from "./Stepper";
import { AssignmentForm, CHAPTERS, SUBJECTS_10, SUBJECTS_12 } from "../../types/create/types";

interface AssignmentWizardProps {
  step: number;
  setStep: (step: number) => void;
  form: AssignmentForm;
  setForm: React.Dispatch<React.SetStateAction<AssignmentForm>>;
}

export function AssignmentWizard({ step, setStep, form, setForm }: AssignmentWizardProps) {
  const subjects = form.class === "10" ? SUBJECTS_10 : SUBJECTS_12;
  const availableChapters = CHAPTERS[form.subject] || [];

  return (
    <div className="space-y-2">
      <Stepper currentStep={step} totalSteps={2} />

      {step === 1 && (
        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="space-y-3">
            <div>
              <h2 className="text-base font-semibold text-foreground">Basic Details</h2>
              <p className="text-xs text-foreground/50">Select class, subject, and chapters</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Class</label>
                <div className="flex gap-2">
                  {["10", "12"].map((cls) => (
                    <button
                      key={cls}
                      onClick={() => setForm({ ...form, class: cls, subject: "", chapters: [] })}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all cursor-pointer",
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

              <div className="relative">
                <label className="block text-xs font-medium text-foreground/70 mb-1">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value, chapters: [] })}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-neutral-100/80 dark:bg-neutral-800 text-foreground text-sm cursor-pointer appearance-none pr-8"
                >
                  <option value="">Select</option>
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {form.subject && availableChapters.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">
                  Chapters ({form.chapters.length})
                </label>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto scrollbar-thin">
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
                      {chapter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-foreground/70 mb-1">Instructions</label>
              <textarea
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                placeholder="Optional..."
                rows={1}
                className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm focus:outline-none focus:ring-1 resize-none"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setStep(2)}
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
        </div>
      )}

      {step === 2 && (
        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="space-y-3">
            <div>
              <h2 className="text-base font-semibold text-foreground">Question Setup</h2>
              <p className="text-xs text-foreground/50">Configure marks distribution</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Total Marks</label>
                <input
                  type="number"
                  value={form.totalMarks}
                  onChange={(e) => setForm({ ...form, totalMarks: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-foreground/70">Question Types</h3>
              
              {(["mcq", "short", "long"] as const).map((type) => (
                <div
                  key={type}
                  className="flex items-center gap-2 p-2 rounded-lg border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-800/50"
                >
                  <span className="w-20 text-sm font-medium capitalize">
                    {type === "mcq" ? "MCQ" : type === "short" ? "Short" : "Long"}
                  </span>
                  <div className="flex-1 flex gap-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        min="0"
                        placeholder="Q"
                        value={form.questionTypes[type].count}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            questionTypes: {
                              ...form.questionTypes,
                              [type]: { ...form.questionTypes[type], count: Number(e.target.value) },
                            },
                          })
                        }
                        className="w-full px-2 py-2 rounded-lg border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-700 text-sm"
                      />
                    </div>
                    <span className="text-xs text-foreground/50 self-center">×</span>
                    <div className="flex-1">
                      <input
                        type="number"
                        min="1"
                        placeholder="M"
                        value={form.questionTypes[type].marks}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            questionTypes: {
                              ...form.questionTypes,
                              [type]: { ...form.questionTypes[type], marks: Number(e.target.value) },
                            },
                          })
                        }
                        className="w-full px-2 py-2 rounded-lg border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-700 text-sm"
                      />
                    </div>
                    <span className="text-xs text-foreground/50 self-center">=</span>
                    <span className="w-10 text-sm self-center text-foreground/70">
                      {form.questionTypes[type].count * form.questionTypes[type].marks}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-1">
              <button
                onClick={() => setStep(1)}
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
        </div>
      )}
    </div>
  );
}
