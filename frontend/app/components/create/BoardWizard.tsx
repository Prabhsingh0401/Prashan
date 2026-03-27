"use client";

import { cn } from "@/lib/utils";
import { Stepper } from "./Stepper";
import { BoardPaperForm } from "../../types/create/types";

interface BoardWizardProps {
  step: number;
  setStep: (step: number) => void;
  form: BoardPaperForm;
  setForm: React.Dispatch<React.SetStateAction<BoardPaperForm>>;
}

export function BoardWizard({ step, setStep, form, setForm }: BoardWizardProps) {
  return (
    <div className="space-y-2">
      <Stepper currentStep={step} totalSteps={2} />

      {step === 1 && (
        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="space-y-3">
            <div>
              <h2 className="text-base font-semibold text-foreground">Paper Details</h2>
              <p className="text-xs text-foreground/50">Enter exam information</p>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">School Name</label>
                <input
                  type="text"
                  value={form.schoolName}
                  onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                  placeholder="Delhi Public School"
                  className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">Exam Name</label>
                <input
                  type="text"
                  value={form.examName}
                  onChange={(e) => setForm({ ...form, examName: e.target.value })}
                  placeholder="Half Yearly Exam"
                  className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Board</label>
                  <select
                    value={form.board}
                    onChange={(e) => setForm({ ...form, board: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-neutral-100/80 dark:bg-neutral-800 text-foreground text-sm cursor-pointer appearance-none pr-8"
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
                        onClick={() => setForm({ ...form, class: cls })}
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
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Maths"
                    className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Max Marks</label>
                  <input
                    type="text"
                    value={form.maxMarks}
                    onChange={(e) => setForm({ ...form, maxMarks: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">Duration</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="3 Hours"
                    className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setStep(2)}
                className="btn-glass btn-glass-primary !px-4 !py-2 text-sm"
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
                  value={form.maxMarks}
                  onChange={(e) => setForm({ ...form, maxMarks: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                />
              </div>
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
                    <span className="w-20 text-sm font-medium capitalize">
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
                          className="w-full px-2 py-2 rounded-lg border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-700 text-sm"
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
                          className="w-full px-2 py-2 rounded-lg border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-700 text-sm"
                        />
                      </div>
                      <span className="text-xs text-foreground/50 self-center">=</span>
                      <span className="w-10 text-sm self-center text-foreground/70">
                        {qt.count * qt.marks}
                      </span>
                    </div>
                  </div>
                );
              })}
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
