"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Stepper } from "./Stepper";
import { FormattingStep } from "./FormattingStep";
import {
  BoardPaperForm,
  CHAPTERS,
  SUBJECTS_10,
  SUBJECTS_12,
  SOCIAL_SCIENCE_SUBJECTS,
  SCIENCE_SUBJECTS,
  CBSE_SUBJECT_FORMATS,
  SubjectSection,
} from "../../types/create/types";

interface BoardWizardProps {
  step: number;
  setStep: (step: number) => void;
  form: BoardPaperForm;
  setForm: React.Dispatch<React.SetStateAction<BoardPaperForm>>;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

// ─── helpers ────────────────────────────────────────────────────────────────

/** Total marks from current section counts */
function calcTotal(sections: SubjectSection[]): number {
  return sections.reduce((sum, s) => sum + s.count * s.marksPerQ, 0);
}

/** Load the CBSE preset for a given subject into the form's sections */
function loadPreset(subject: string, subSubjects?: string[]): SubjectSection[] {
  const preset = CBSE_SUBJECT_FORMATS[subject];
  if (!preset) return [];
  
  let filteredPreset = preset;
  
  // Filter by sub-subjects if it's a split subject like Science or Social Science
  if (subSubjects && subSubjects.length > 0 && (subject === "Science" || subject === "Social Science")) {
     filteredPreset = preset.filter(s => {
       const group = s.group ?? "";
       return subSubjects.some(sub => {
         if (sub === "Civics" && group === "Political Science") return true;
         return group.includes(sub);
       });
     });
  }
  
  // deep-clone so edits don't mutate the constant
  return filteredPreset.map((s) => ({ ...s }));
}

function getQuestionType(key: string): string {
  const k = key.toLowerCase();
  if (k.includes("mcq") || k.includes("ar") || k.includes("gram") || k.includes("gr") || k.includes("read") || k.includes("up") || k.includes("ext")) {
    return "MCQ";
  }
  if (k.includes("vsa") || k.includes("sa") || k.includes("tb2") || k.includes("tb4") || k.includes("sup")) {
    return "Short Answer";
  }
  if (k.includes("la")) {
    return "Long Answer";
  }
  if (k.includes("cs") || k.includes("case")) {
    return "Case Study";
  }
  if (k.includes("map")) {
    return "Map Work";
  }
  if (k.includes("writ") || k.includes("para") || k.includes("lett") || k.includes("cv") || k.includes("adv") || k.includes("notice") || k.includes("story")) {
    return "Writing & Creative";
  }
  return "Other";
}

function autoBalance(
  sections: SubjectSection[],
  activeTypes: string[],
  targetMarks: number
): SubjectSection[] {
  const result = sections.map(s => {
    const type = getQuestionType(s.key);
    if (!activeTypes.includes(type)) {
      return { ...s, count: 0 };
    }
    return { ...s };
  });

  const activeSections = result.filter(s => activeTypes.includes(getQuestionType(s.key)));
  if (activeSections.length === 0) return result;

  const activeDefaultMarks = activeSections.reduce((sum, s) => sum + (s.defaultCount || 0) * s.marksPerQ, 0);

  if (activeDefaultMarks > 0) {
    const ratio = targetMarks / activeDefaultMarks;
    for (const s of result) {
      if (activeTypes.includes(getQuestionType(s.key))) {
        s.count = Math.max(0, Math.round((s.defaultCount || 0) * ratio));
      }
    }
  } else {
    for (const s of result) {
      if (activeTypes.includes(getQuestionType(s.key))) {
        s.count = 0;
      }
    }
  }

  let currentTotal = result.reduce((sum, s) => sum + s.count * s.marksPerQ, 0);
  let diff = targetMarks - currentTotal;

  if (diff > 0) {
    const sortedActive = [...result]
      .filter(s => activeTypes.includes(getQuestionType(s.key)))
      .sort((a, b) => b.marksPerQ - a.marksPerQ);

    let attempts = 0;
    while (diff > 0 && attempts < 100) {
      attempts++;
      let added = false;
      for (const s of sortedActive) {
        if (s.marksPerQ <= diff) {
          const match = result.find(r => r.key === s.key);
          if (match) {
            match.count += 1;
            diff -= s.marksPerQ;
            added = true;
            break;
          }
        }
      }
      if (!added && sortedActive.length > 0) {
        const smallest = sortedActive[sortedActive.length - 1];
        const match = result.find(r => r.key === smallest.key);
        if (match) {
          match.count += 1;
          diff -= smallest.marksPerQ;
        }
      }
    }
  } else if (diff < 0) {
    const sortedActive = [...result]
      .filter(s => activeTypes.includes(getQuestionType(s.key)))
      .sort((a, b) => b.marksPerQ - a.marksPerQ);

    let attempts = 0;
    while (diff < 0 && attempts < 100) {
      attempts++;
      let removed = false;
      for (const s of sortedActive) {
        if (s.count > 0 && s.marksPerQ <= -diff) {
          const match = result.find(r => r.key === s.key);
          if (match && match.count > 0) {
            match.count -= 1;
            diff += s.marksPerQ;
            removed = true;
            break;
          }
        }
      }
      if (!removed) {
        const withCount = sortedActive.filter(s => {
          const match = result.find(r => r.key === s.key);
          return match && match.count > 0;
        });
        if (withCount.length > 0) {
          const smallest = withCount[withCount.length - 1];
          const match = result.find(r => r.key === smallest.key);
          if (match) {
            match.count -= 1;
            diff += smallest.marksPerQ;
          }
        } else {
          break;
        }
      }
    }
  }

  return result;
}

function handleSectionCountAndBalance(
  key: string,
  rawValue: string,
  sections: SubjectSection[],
  activeTypes: string[],
  targetMarks: number
): SubjectSection[] {
  const value = Math.max(0, parseInt(rawValue, 10) || 0);
  const updated = sections.map(s => (s.key === key ? { ...s, count: value } : s));
  
  let currentTotal = updated.reduce((sum, s) => sum + s.count * s.marksPerQ, 0);
  let diff = targetMarks - currentTotal;
  
  if (diff === 0) return updated;
  
  const otherActive = updated.filter(
    s => s.key !== key && activeTypes.includes(getQuestionType(s.key))
  );
  
  if (otherActive.length === 0) return updated;
  
  const sortedOthers = [...otherActive].sort((a, b) => b.marksPerQ - a.marksPerQ);
  
  if (diff > 0) {
    let attempts = 0;
    while (diff > 0 && attempts < 100) {
      attempts++;
      let added = false;
      for (const s of sortedOthers) {
        if (s.marksPerQ <= diff) {
          const match = updated.find(r => r.key === s.key);
          if (match) {
            match.count += 1;
            diff -= s.marksPerQ;
            added = true;
            break;
          }
        }
      }
      if (!added && sortedOthers.length > 0) {
        const smallest = sortedOthers[sortedOthers.length - 1];
        const match = updated.find(r => r.key === smallest.key);
        if (match) {
          match.count += 1;
          diff -= smallest.marksPerQ;
        }
      }
    }
  } else if (diff < 0) {
    let attempts = 0;
    while (diff < 0 && attempts < 100) {
      attempts++;
      let removed = false;
      for (const s of sortedOthers) {
        const match = updated.find(r => r.key === s.key);
        if (match && match.count > 0 && s.marksPerQ <= -diff) {
          match.count -= 1;
          diff += s.marksPerQ;
          removed = true;
          break;
        }
      }
      if (!removed) {
        const withCount = sortedOthers.filter(s => {
          const match = updated.find(r => r.key === s.key);
          return match && match.count > 0;
        });
        if (withCount.length > 0) {
          const smallest = withCount[withCount.length - 1];
          const match = updated.find(r => r.key === smallest.key);
          if (match) {
            match.count -= 1;
            diff += smallest.marksPerQ;
          }
        } else {
          break;
        }
      }
    }
  }
  
  return updated;
}

// ─── component ──────────────────────────────────────────────────────────────

export function BoardWizard({
  step,
  setStep,
  form,
  setForm,
  onGenerate,
  isGenerating,
}: BoardWizardProps) {
  const subjects = form.class === "10" ? SUBJECTS_10 : SUBJECTS_12;
  const isSocialScience = form.subject === "Social Science";
  const isScience = form.subject === "Science";
  const isSplitSubject = isSocialScience || isScience;
  const subSubjectList = isSocialScience
    ? SOCIAL_SCIENCE_SUBJECTS
    : isScience
      ? SCIENCE_SUBJECTS
      : [];
  const availableChapters = isSplitSubject
    ? form.subSubjects.flatMap((sub) => CHAPTERS[sub] || [])
    : CHAPTERS[form.subject] || [];

  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const targetMarks = Number(form.maxMarks) || 80;

  // Discovered unique types from form.sections
  const uniqueTypes = Array.from(
    new Set(form.sections.map((s) => getQuestionType(s.key))),
  );

  // Initialize activeTypes when form.sections are loaded
  useEffect(() => {
    if (form.sections.length > 0 && activeTypes.length === 0) {
      const types = Array.from(
        new Set(form.sections.map((s) => getQuestionType(s.key))),
      );
      setActiveTypes(types);
    }
  }, [form.sections, activeTypes.length]);

  // ── Step 3: auto-load the CBSE preset when subject changes ──────────────
  useEffect(() => {
    if (form.subject && step === 3) {
      const preset = loadPreset(form.subject, form.subSubjects);
      if (preset.length > 0 && form.sections.length === 0) {
        const types = Array.from(new Set(preset.map((s) => getQuestionType(s.key))));
        const balanced = autoBalance(preset, types, targetMarks);
        setActiveTypes(types);
        setForm((prev) => ({ ...prev, sections: balanced }));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.subject, step]);

  // Auto-balance when targetMarks changes or entering Step 3
  useEffect(() => {
    if (step === 3 && form.sections.length > 0) {
      const currentTotal = form.sections.reduce((sum, s) => sum + s.count * s.marksPerQ, 0);
      if (currentTotal !== targetMarks) {
        const types = activeTypes.length > 0
          ? activeTypes
          : Array.from(new Set(form.sections.map((s) => getQuestionType(s.key))));
        if (activeTypes.length === 0) {
          setActiveTypes(types);
        }
        const balanced = autoBalance(form.sections, types, targetMarks);
        setForm((prev) => ({ ...prev, sections: balanced }));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, targetMarks]);

  /** When teacher changes the count of a section */
  function handleSectionCount(key: string, rawValue: string) {
    const balanced = handleSectionCountAndBalance(
      key,
      rawValue,
      form.sections,
      activeTypes,
      targetMarks,
    );
    setForm((prev) => ({ ...prev, sections: balanced }));
  }

  /** Reset all section counts to CBSE defaults */
  function resetToDefaults() {
    const defaultSections = loadPreset(form.subject, form.subSubjects);
    const types = Array.from(
      new Set(defaultSections.map((s) => getQuestionType(s.key))),
    );
    setActiveTypes(types);
    setForm((prev) => ({
      ...prev,
      sections: defaultSections,
    }));
  }

  function handleToggleType(type: string) {
    let nextActive: string[];
    if (activeTypes.includes(type)) {
      if (activeTypes.length === 1) return; // Don't allow deselecting all types
      nextActive = activeTypes.filter((t) => t !== type);
    } else {
      nextActive = [...activeTypes, type];
    }
    setActiveTypes(nextActive);

    const balanced = autoBalance(form.sections, nextActive, targetMarks);
    setForm((prev) => ({ ...prev, sections: balanced }));
  }

  const currentTotal = calcTotal(form.sections);
  const delta = currentTotal - targetMarks;
  const isExact = delta === 0;

  // Group sections by their optional `group` property
  const groupMap = new Map<string, SubjectSection[]>();
  for (const s of form.sections) {
    // Only include active types in the rendering
    if (!activeTypes.includes(getQuestionType(s.key))) continue;
    
    const g = s.group ?? "__default__";
    if (!groupMap.has(g)) groupMap.set(g, []);
    groupMap.get(g)!.push(s);
  }
  
  // Filter groups based on selected sub-subjects if it's a split subject
  const filteredGroupedSections = Array.from(groupMap.entries())
    .map(([group, sections]) => ({ group, sections }))
    .filter(({ group }) => {
      if (!isSplitSubject || form.subSubjects.length === 0 || group === "__default__") {
        return true;
      }
      // Assuming the group name matches or contains the sub-subject name (e.g., "Geography" or "Section A – Biology")
      return form.subSubjects.some(sub => {
        if (sub === "Civics" && group === "Political Science") return true;
        return group.includes(sub);
      });
    });

  const hasCbseFormat = CBSE_SUBJECT_FORMATS[form.subject] !== undefined;

  return (
    <div className="h-[500px] flex flex-col overflow-hidden">
      <Stepper currentStep={step} totalSteps={4} />

      <div className="flex-1 overflow-hidden">
        {/* ── STEP 1 ──────────────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="h-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
            <div className="space-y-2 flex-1">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  School &amp; Paper Details
                </h2>
                <p className="text-xs text-foreground/50">
                  Enter basic exam information
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Board
                  </label>
                  <select
                    value="CBSE"
                    disabled
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-neutral-100/80 dark:bg-neutral-800 text-foreground/50 text-sm cursor-not-allowed appearance-none pr-8"
                  >
                    <option value="CBSE">CBSE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Class
                  </label>
                  <div className="flex gap-2">
                    {["10"].map((cls) => (
                      <button
                        key={cls}
                        onClick={() =>
                          setForm({
                            ...form,
                            class: cls,
                            subject: "",
                            subSubjects: [],
                            chapters: [],
                            sections: [],
                          })
                        }
                        className={cn(
                          "flex-1 py-1.5 px-3 rounded-lg border text-sm font-medium transition-all cursor-pointer",
                          form.class === cls
                            ? "border-black dark:border-white bg-black/5 dark:bg-white/10"
                            : "border-black/10 dark:border-white/10 hover:border-black/20",
                        )}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  value={form.schoolName}
                  onChange={(e) =>
                    setForm({ ...form, schoolName: e.target.value })
                  }
                  placeholder="Your school name"
                  className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">
                  Exam Name
                </label>
                <input
                  type="text"
                  value={form.examName}
                  onChange={(e) =>
                    setForm({ ...form, examName: e.target.value })
                  }
                  placeholder="Half Yearly Exam"
                  className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Max Marks
                  </label>
                  <input
                    type="number"
                    value={form.maxMarks}
                    onChange={(e) =>
                      setForm({ ...form, maxMarks: e.target.value, sections: [] })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Duration
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="1"
                      value={form.duration}
                      onChange={(e) =>
                        setForm({ ...form, duration: e.target.value })
                      }
                      placeholder="3"
                      className="w-full px-3 py-1.5 pr-12 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm"
                    />
                    <span className="absolute right-3 text-sm text-foreground/50 pointer-events-none">
                      hrs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 mt-3">
              <button
                onClick={() => setStep(2)}
                disabled={!form.schoolName || !form.examName}
                className={cn(
                  "btn-glass btn-glass-primary !px-4 !py-2 text-sm font-bold",
                  (!form.schoolName || !form.examName) &&
                    "opacity-50 cursor-not-allowed",
                )}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 ──────────────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="h-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
            <div className="space-y-2 flex-1 overflow-hidden">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Subject &amp; Chapters
                </h2>
                <p className="text-xs text-foreground/50">
                  Select subject and chapters
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject: e.target.value,
                      subSubjects: [],
                      chapters: [],
                      sections: [], // reset so preset is re-loaded in step 3
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-neutral-100/80 dark:bg-neutral-800 text-foreground text-sm cursor-pointer appearance-none pr-8"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {isSplitSubject && (
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Sub-Subjects ({form.subSubjects.length} selected)
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {subSubjectList.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          if (form.subSubjects.includes(sub)) {
                            setForm({
                              ...form,
                              subSubjects: form.subSubjects.filter(
                                (s) => s !== sub,
                              ),
                              chapters: [],
                            });
                          } else {
                            setForm({
                              ...form,
                              subSubjects: [...form.subSubjects, sub],
                              chapters: [],
                            });
                          }
                        }}
                        className={cn(
                          "px-2 py-1 rounded-md border text-xs cursor-pointer transition-all",
                          form.subSubjects.includes(sub)
                            ? "border-black/20 dark:border-white/30 bg-black/5 dark:bg-white/10"
                            : "border-black/10 dark:border-white/10",
                        )}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {((form.subject && !isSplitSubject) ||
                form.subSubjects.length > 0) &&
                availableChapters.length > 0 && (
                  <div className="flex-1 overflow-hidden flex flex-col">
                    <label className="block text-xs font-medium text-foreground/70 mb-1">
                      Chapters ({form.chapters.length} selected)
                    </label>
                    <div className="max-h-[140px] overflow-y-auto scrollbar-thin scrollbar-thin-enhanced p-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5">
                      {isSplitSubject ? (
                        form.subSubjects.map((sub) => (
                          <div key={sub} className="mb-3 last:mb-0">
                            <h4 className="text-xs font-semibold text-foreground/70 mb-1.5 px-1">
                              {sub}
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {(CHAPTERS[sub] || []).map((chapter) => (
                                <button
                                  key={chapter}
                                  onClick={() => {
                                    if (form.chapters.includes(chapter)) {
                                      setForm({
                                        ...form,
                                        chapters: form.chapters.filter(
                                          (c) => c !== chapter,
                                        ),
                                      });
                                    } else {
                                      setForm({
                                        ...form,
                                        chapters: [...form.chapters, chapter],
                                      });
                                    }
                                  }}
                                  className={cn(
                                    "px-2 py-1 rounded-md border text-xs cursor-pointer transition-all",
                                    form.chapters.includes(chapter)
                                      ? "border-black/20 dark:border-white/30 bg-black/5 dark:bg-white/10"
                                      : "border-black/5 dark:border-white/10",
                                  )}
                                >
                                  {chapter.replace(/^Chapter \d+: /, "")}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {availableChapters.map((chapter) => (
                            <button
                              key={chapter}
                              onClick={() => {
                                if (form.chapters.includes(chapter)) {
                                  setForm({
                                    ...form,
                                    chapters: form.chapters.filter(
                                      (c) => c !== chapter,
                                    ),
                                  });
                                } else {
                                  setForm({
                                    ...form,
                                    chapters: [...form.chapters, chapter],
                                  });
                                }
                              }}
                              className={cn(
                                "px-2 py-1 rounded-md border text-xs cursor-pointer transition-all",
                                form.chapters.includes(chapter)
                                  ? "border-black/20 dark:border-white/30 bg-black/5 dark:bg-white/10"
                                  : "border-black/5 dark:border-white/10",
                              )}
                            >
                              {chapter.replace(/^Chapter \d+: /, "")}
                            </button>
                          ))}
                        </div>
                      )}
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
                onClick={() => {
                  // load CBSE preset when entering step 3
                  if (form.sections.length === 0 && form.subject) {
                    const preset = loadPreset(form.subject, form.subSubjects);
                    setForm((prev) => ({ ...prev, sections: preset }));
                  }
                  setStep(3);
                }}
                disabled={
                  !form.subject ||
                  (isSplitSubject && form.subSubjects.length === 0) ||
                  form.chapters.length === 0
                }
                className={cn(
                  "btn-glass btn-glass-primary !px-4 !py-2 text-sm font-bold",
                  (!form.subject ||
                    (isSplitSubject && form.subSubjects.length === 0) ||
                    form.chapters.length === 0) &&
                    "opacity-50 cursor-not-allowed",
                )}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 — Question Format ─────────────────────────────────────── */}
        {step === 3 && (
          <div className="h-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col gap-3">
            {/* Header row */}
            <div className="flex items-start justify-between gap-2 shrink-0">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Question Format
                </h2>
                <p className="text-xs text-foreground/50">
                  CBSE prescribed format for{" "}
                  <span className="font-medium text-foreground/70">
                    {form.subject}
                  </span>
                  . Adjust question counts — totals must equal{" "}
                  <span className="font-semibold text-foreground/80">
                    {targetMarks} marks
                  </span>
                  .
                </p>
              </div>
              {hasCbseFormat && (
                <button
                  onClick={resetToDefaults}
                  className="shrink-0 text-[10px] px-2 py-1 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-foreground/60"
                >
                  Reset defaults
                </button>
              )}
            </div>

            {/* Question Type Selection Pills */}
            {uniqueTypes.length > 1 && (
              <div className="shrink-0 flex flex-col gap-1.5 bg-black/5 dark:bg-white/5 p-2 rounded-xl border border-black/5 dark:border-white/5">
                <span className="text-[10px] font-medium text-foreground/50">
                  Toggle question types to include:
                </span>
                <div className="flex flex-wrap gap-1">
                  {uniqueTypes.map((type) => {
                    const isActive = activeTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleToggleType(type)}
                        className={cn(
                          "px-2.5 py-0.5 rounded-full border text-[10px] font-semibold cursor-pointer transition-all",
                          isActive
                            ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-sm"
                            : "border-black/10 dark:border-white/10 text-foreground/50 hover:border-black/25 dark:hover:border-white/25 bg-transparent",
                        )}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Marks progress bar — styled like btn-glass-primary */}
            <div className="shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-foreground/50">
                  Marks allocated
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold tabular-nums",
                    isExact
                      ? "text-emerald-600 dark:text-emerald-400"
                      : delta > 0
                        ? "text-red-500 dark:text-red-400"
                        : "text-amber-500 dark:text-amber-400",
                  )}
                >
                  {currentTotal} / {targetMarks}
                  {!isExact && (
                    <span className="ml-1 font-normal text-[10px]">
                      ({delta > 0 ? "+" : ""}{delta})
                    </span>
                  )}
                </span>
              </div>

              {isExact ? (
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  <span>✓</span> Total matches {targetMarks} marks — ready to proceed
                </p>
              ) : (
                <p className="text-[10px] text-foreground/40 mt-1">
                  Adjust question counts so the total equals {targetMarks} marks
                </p>
              )}
            </div>

            {/* Column headers */}
            <div className="shrink-0 grid grid-cols-[1fr_60px_36px_60px_36px] gap-x-2 px-1">
              <span className="text-[10px] font-medium text-foreground/40">Section</span>
              <span className="text-[10px] font-medium text-foreground/40 text-center">Questions</span>
              <span className="text-[10px] font-medium text-foreground/40 text-center">Marks</span>
              <span className="text-[10px] font-medium text-foreground/40 text-center">Each</span>
              <span className="text-[10px] font-medium text-foreground/40 text-center">Total</span>
            </div>

            {/* Scrollable section list */}
            <div className="flex-1 overflow-y-auto scrollbar-thin space-y-3 pr-0.5">
              {hasCbseFormat ? (
                filteredGroupedSections.map(({ group, sections }) => (
                  <div key={group}>
                    {group !== "__default__" && (
                      <p className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wide mb-1.5 px-1">
                        {group}
                      </p>
                    )}
                    <div className="space-y-1">
                      {sections.map((section) => {
                        const sectionTotal = section.count * section.marksPerQ;
                        return (
                          <div
                            key={section.key}
                            className="grid grid-cols-[1fr_60px_36px_60px_36px] gap-x-2 items-center px-2 py-1.5 rounded-lg bg-white dark:bg-neutral-800/60 border border-black/5 dark:border-white/10"
                          >
                            {/* Label */}
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-foreground truncate">
                                {section.label}
                                {section.sublabel && (
                                  <span className="text-foreground/40 font-normal ml-1">
                                    {section.sublabel}
                                  </span>
                                )}
                              </p>
                              {section.note && (
                                <p className="text-[9px] text-foreground/40 leading-tight">
                                  {section.note}
                                </p>
                              )}
                            </div>

                            {/* Count input */}
                            <input
                              type="number"
                              min="0"
                              value={section.count}
                              onChange={(e) =>
                                handleSectionCount(section.key, e.target.value)
                              }
                              className="w-full px-2 py-1 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-700 text-sm text-center"
                            />

                            {/* × */}
                            <span className="text-foreground/40 text-xs text-center">×</span>

                            {/* Marks per Q input */}
                            <input
                              type="number"
                              min="0.5"
                              step="0.5"
                              value={section.marksPerQ}
                              onChange={(e) => {
                                const newMarks = Math.max(0.5, parseFloat(e.target.value) || 0.5);
                                const updatedSections = form.sections.map((s) =>
                                  s.key === section.key ? { ...s, marksPerQ: newMarks } : s
                                );
                                const balanced = autoBalance(updatedSections, activeTypes, targetMarks);
                                setForm((prev) => ({ ...prev, sections: balanced }));
                              }}
                              className="w-full px-1 py-1 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-700 text-sm text-center font-mono"
                            />

                            {/* Section total */}
                            <span
                              className={cn(
                                "text-sm font-semibold text-center font-mono",
                                sectionTotal > 0
                                  ? "text-foreground"
                                  : "text-foreground/30",
                              )}
                            >
                              {sectionTotal}
                            </span>

                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                /* Fallback for subjects without a CBSE format */
                <div className="text-center py-8 text-sm text-foreground/40">
                  No CBSE format defined for <strong>{form.subject}</strong>.<br />
                  Please adjust question types below.
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-1 shrink-0">
              <button
                onClick={() => setStep(2)}
                className="btn-glass btn-glass-icon !rounded-xl !py-2 !px-4 text-sm font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!isExact}
                className={cn(
                  "btn-glass btn-glass-primary !px-4 !py-2 text-sm font-bold",
                  !isExact && "opacity-50 cursor-not-allowed",
                )}
                title={
                  !isExact
                    ? `Total marks must equal ${targetMarks} (currently ${currentTotal})`
                    : undefined
                }
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4 ──────────────────────────────────────────────────────── */}
        {step === 4 && (
          <FormattingStep
            formatting={form.formatting}
            onChange={(updated) => setForm({ ...form, formatting: updated })}
            onBack={() => setStep(3)}
            onNext={onGenerate ?? (() => {})}
            nextLabel={isGenerating ? "Generating…" : "Generate Paper"}
            nextDisabled={isGenerating}
          />
        )}
      </div>
    </div>
  );
}
