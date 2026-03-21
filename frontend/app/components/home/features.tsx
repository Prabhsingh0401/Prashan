"use client";

import {
  ArrowRight,
  Check,
  BookOpen,
  FileText,
  Sparkles,
  SlidersHorizontal,
  School,
  Wand2,
  Download,
  SquarePen,
} from "lucide-react";

const steps = [
  { label: "Class & Subject", done: true },
  { label: "Chapters", done: true },
  { label: "Question Config", done: true },
  { label: "Header Setup", done: true },
  { label: "AI Generate", done: true },
  { label: "Export", done: false, active: true },
];

export function Features() {
  return (
    <section
      id="features"
      className="w-full max-w-[1400px] mx-auto px-4 py-5 relative z-10 font-sans"
    >
      <div className="flex flex-col items-center text-center mb-16 scroll-animate">
        <div className="mb-6 inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 px-3 py-1 text-sm font-medium backdrop-blur-md">
          <Sparkles className="mr-2 h-4 w-4 text-foreground/50" />
          <span>How it works</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-6 max-w-3xl leading-[1.1]">
          Paper ready in <br className="hidden sm:block" /> six steps.
        </h2>

        <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl font-medium tracking-tight leading-relaxed mb-8">
          Sign in, configure your paper, let AI draft and format every question
          in LaTeX — then export as PDF or Word in one click.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 rounded-[2rem] overflow-hidden
                bg-white/30 dark:bg-white/[0.04]
                backdrop-blur-2xl
                border border-white/60 dark:border-white/10
                shadow-[0px_1px_0.5px_rgba(0,0,0,0),0px_4.4px_2.2px_rgba(0,0,0,0.01),0px_11.7px_5.9px_rgba(0,0,0,0.02),0px_33px_16.5px_rgba(0,0,0,0.04),0px_60px_30px_rgba(0,0,0,0.07),inset_0px_1px_0px_rgba(255,255,255,0.7),inset_0px_-1px_0px_rgba(0,0,0,0.06)]
                dark:shadow-[0px_4.4px_2.2px_rgba(0,0,0,0.06),0px_11.7px_5.9px_rgba(0,0,0,0.10),0px_33px_16.5px_rgba(0,0,0,0.15),0px_60px_30px_rgba(0,0,0,0.20),inset_0px_1px_0px_rgba(255,255,255,0.10),inset_0px_-1px_0px_rgba(0,0,0,0.30)]
            "
      >
        <div
          className="p-8 lg:p-10 border-b md:border-r border-white/50 dark:border-white/5
                    flex flex-col justify-between min-h-[320px] group scroll-animate stagger-0
                    bg-white/20 dark:bg-white/[0.03]
                    hover:bg-white/30 dark:hover:bg-white/[0.05]
                    transition-colors duration-300
                "
        >
          <div>
            <div className="flex items-center gap-2 mb-6 text-[10px] font-mono font-bold tracking-widest text-foreground/50 uppercase">
              <BookOpen size={13} strokeWidth={2.5} />
              <span>Step 1 — Paper Setup</span>
            </div>

            <h3 className="text-xl font-bold text-foreground tracking-tight mb-5 leading-[1.2]">
              Pick class, subject <br />& chapters.
            </h3>

            <div className="flex flex-col gap-2 w-full">
              {[
                { label: "Class", value: "Class X", done: true },
                { label: "Subject", value: "Mathematics", done: true },
                { label: "Chapters", value: "3 selected", done: true },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl
                                        bg-white dark:bg-white/5
                                        border border-black/8 dark:border-white/10
                                        shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_1px_3px_rgba(0,0,0,0.04)]
                                    "
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-foreground/40 uppercase w-14">
                      {row.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {row.value}
                    </span>
                  </div>
                  <Check size={14} className="text-foreground/60" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="p-8 lg:p-10 border-b md:border-r border-white/50 dark:border-white/5
                    flex flex-col justify-between min-h-[320px] group scroll-animate stagger-1
                    bg-white/20 dark:bg-white/[0.03]
                    hover:bg-white/30 dark:hover:bg-white/[0.05]
                    transition-colors duration-300
                "
        >
          <div>
            <div className="flex items-center gap-2 mb-6 text-[10px] font-mono font-bold tracking-widest text-foreground/50 uppercase">
              <SlidersHorizontal size={13} strokeWidth={2.5} />
              <span>Step 2 — Question Config</span>
            </div>

            <h3 className="text-xl font-bold text-foreground tracking-tight mb-5 leading-[1.2]">
              Set types, count <br />& weightage.
            </h3>

            <div className="flex flex-col gap-2">
              {[
                { type: "MCQ", marks: "1 mark", count: "10 Qs" },
                { type: "Short Answer", marks: "3 marks", count: "5 Qs" },
                { type: "Long Answer", marks: "5 marks", count: "3 Qs" },
              ].map((q) => (
                <div
                  key={q.type}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl
                                        bg-white dark:bg-white/5
                                        border border-black/8 dark:border-white/10
                                        shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_1px_3px_rgba(0,0,0,0.04)]
                                    "
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {q.type}
                    </span>
                    <span className="text-[10px] font-mono text-foreground/40 border border-black/8 dark:border-white/10 px-1.5 py-0.5 rounded-md">
                      {q.marks}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-foreground/60">
                    {q.count}
                  </span>
                </div>
              ))}
              <div className="flex justify-between px-3.5 pt-2 text-[11px] font-mono font-bold tracking-widest text-foreground/50 uppercase border-t border-black/5 dark:border-white/5 mt-1">
                <span>Total</span>
                <span className="text-foreground">40 Marks</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-8 lg:p-10 border-b border-white/50 dark:border-white/5
                    flex flex-col justify-between min-h-[320px] group scroll-animate stagger-2
                    bg-white/20 dark:bg-white/[0.03]
                    hover:bg-white/30 dark:hover:bg-white/[0.05]
                    transition-colors duration-300
                "
        >
          <div>
            <div className="flex items-center gap-2 mb-6 text-[10px] font-mono font-bold tracking-widest text-foreground/50 uppercase">
              <School size={13} strokeWidth={2.5} />
              <span>Step 3 — Paper Header</span>
            </div>

            <h3 className="text-xl font-bold text-foreground tracking-tight mb-5 leading-[1.2]">
              Brand your paper <br />
              your way.
            </h3>

            <div
              className="w-full rounded-2xl bg-white dark:bg-white/5 border border-black/8 dark:border-white/10
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_8px_rgba(0,0,0,0.05)]
                            overflow-hidden"
            >
              <div className="p-4 border-b border-black/5 dark:border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                  <School size={16} className="text-foreground/50" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-foreground tracking-tight truncate">
                    Public School
                  </span>
                  <span className="text-[9px] font-mono text-foreground/40 tracking-widest uppercase">
                    Class X · Mathematics · PA-1
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-[10px] font-mono text-foreground/40">
                  Time: 2 hrs &nbsp;|&nbsp; MM: 40
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-foreground/60">
                  <SquarePen size={10} />
                  Editable
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-white/50 dark:border-white/5
                    flex flex-col justify-between group cursor-pointer scroll-animate stagger-3
                    bg-white/25 dark:bg-white/[0.02]
                    hover:bg-white/35 dark:hover:bg-white/[0.04]
                    transition-colors duration-300
                "
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-mono font-bold tracking-widest text-foreground/60 uppercase">
                Curriculum
              </span>
              <ArrowRight
                size={14}
                className="text-foreground/20 group-hover:text-foreground/60 transition-all group-hover:translate-x-1"
              />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground tracking-tight leading-[1.15]">
              Mapped to <br className="hidden lg:block" /> every board.
            </h3>
            <p className="text-foreground/60 text-[15px] leading-relaxed font-medium">
              CBSE, ICSE, and all State Boards. Questions are automatically
              scoped to the exact chapters and difficulty levels you selected —
              no extra setup.
            </p>
          </div>
          <div className="flex gap-2 mt-8 flex-wrap">
            {["CBSE", "ICSE", "State Board"].map((b) => (
              <span
                key={b}
                className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg border border-black/8 dark:border-white/10 text-foreground/60 bg-white/60 dark:bg-white/5"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div
          className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-white/50 dark:border-white/5
                    flex flex-col justify-between group cursor-pointer scroll-animate stagger-4
                    bg-white/25 dark:bg-white/[0.02]
                    hover:bg-white/35 dark:hover:bg-white/[0.04]
                    transition-colors duration-300
                "
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-mono font-bold tracking-widest text-foreground/60 uppercase">
                AI Engine
              </span>
              <ArrowRight
                size={14}
                className="text-foreground/20 group-hover:text-foreground/60 transition-all group-hover:translate-x-1"
              />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground tracking-tight leading-[1.15]">
              AI writes. <br className="hidden lg:block" /> AI formats.
            </h3>
            <p className="text-foreground/60 text-[15px] leading-relaxed font-medium">
              Questions are generated and instantly laid out — correct spacing,
              neat numbering, proper sections. Exactly how a printed paper
              should look, automatically.
            </p>
          </div>
          <div className="mt-8 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-4 py-3 text-[12px] text-foreground/60 leading-relaxed overflow-hidden space-y-1.5">
            <p className="font-bold text-foreground/80 text-[11px] tracking-widest uppercase font-mono">
              Section B — Short Answer
            </p>
            <p>
              <span className="font-semibold text-foreground">Q1.</span> Find
              the roots of x² − 5x + 6 = 0.{" "}
              <span className="text-foreground/30">[3 marks]</span>
            </p>
            <p>
              <span className="font-semibold text-foreground">Q2.</span> State
              and prove the mid-point theorem.{" "}
              <span className="text-foreground/30">[3 marks]</span>
            </p>
            <p className="flex items-center gap-1 text-foreground/30">
              Q3. Generating
              <span className="inline-block w-1.5 h-3 bg-foreground/30 animate-pulse ml-0.5" />
            </p>
          </div>
        </div>

        <div
          className="p-8 lg:p-12 flex flex-col justify-between group cursor-pointer scroll-animate stagger-5
                    bg-white/10 dark:bg-white/[0.04]
                    hover:bg-white/20 dark:hover:bg-white/[0.06]
                    transition-colors duration-300
                "
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-mono font-bold tracking-widest text-foreground uppercase">
                Export
              </span>
              <ArrowRight
                size={14}
                className="text-foreground/40 group-hover:text-foreground transition-all group-hover:translate-x-1"
              />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground tracking-tight leading-[1.15]">
              Live edit. <br className="hidden lg:block" /> One-click export.
            </h3>
            <p className="text-foreground/60 text-[15px] leading-relaxed font-medium">
              Review and tweak every question in the live editor. When you're
              happy, export a print-ready PDF or editable Word file instantly.
            </p>
          </div>
          <div className="mt-8 flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
              <Download size={13} />
              Export PDF
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-foreground text-xs font-semibold">
              <FileText size={13} />
              Export Word
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
