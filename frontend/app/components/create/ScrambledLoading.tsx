"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const SCRAMBLE_CHARS = ".:|/\\-+~*@#%^&";

interface Phase {
  label: string;
  text: string;
}

const PHASES: Phase[] = [
  { label: "parsing curriculum blueprint", text: "parsing curriculum blueprint for CBSE class 10" },
  { label: "fetching question bank", text: "fetching question bank aligned to NCERT syllabus" },
  { label: "orchestrating paper structure", text: "orchestrating section A B C and D layout" },
  { label: "weighting marks distribution", text: "weighting marks across schema" },
  { label: "validating bloom's taxonomy", text: "validating cognitive levels knowledge application analysis" },
  { label: "compiling final output", text: "compiling your paper" },
];

const PHASE_MAP: Record<string, number> = {
  "orchestrating": 0,
  "fetching":      1,
  "verifying":     2,
  "refetching":    3,
  "layout":        4,
  "done":          5,
};

function ScrambledWord({ 
  word, 
  state 
}: { 
  word: string; 
  state: "pending" | "active" | "done" 
}) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (state === "pending") {
      setDisplay("");
      return;
    }

    if (state === "done") {
      setDisplay(word);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        word
          .split("")
          .map((char, index) => {
            if (index < iterations / 3) {
              return word[index];
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      if (iterations >= word.length * 3) {
        clearInterval(interval);
        setDisplay(word);
      }
      iterations++;
    }, 40);

    return () => clearInterval(interval);
  }, [word, state]);

  return (
    <span
      className={cn(
        "transition-colors duration-300",
        state === "pending" && "text-muted-foreground/30",
        state === "active" && "text-violet-500 dark:text-violet-400",
        state === "done" && "text-emerald-500 dark:text-emerald-400"
      )}
    >
      {display || (state === "pending" ? word : "")}
    </span>
  );
}

export function ScrambledLoading({ 
  subject, 
  classNum,
  phase 
}: { 
  subject?: string; 
  classNum?: string;
  phase?: string;
}) {
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);
  const [resolvedWordsCount, setResolvedWordsCount] = useState(0);

  // Use real phase from props if available, otherwise fallback to loop
  useEffect(() => {
    if (phase && PHASE_MAP[phase] !== undefined) {
      setCurrentPhaseIdx(PHASE_MAP[phase]);
    }
  }, [phase]);

  const phases = React.useMemo(() => {
    const p = [...PHASES];
    if (subject) {
      p[1] = { ...p[1], text: `fetching question bank for ${subject}` };
    }
    if (classNum) {
      p[0] = { ...p[0], text: `parsing curriculum blueprint for CBSE class ${classNum}` };
    }
    return p;
  }, [subject, classNum]);

  const currentPhase = phases[currentPhaseIdx];
  const words = currentPhase.text.split(" ");

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setResolvedWordsCount((prev) => {
        if (prev < words.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(wordInterval);
  }, [words.length, currentPhaseIdx]);

  useEffect(() => {
    if (resolvedWordsCount === words.length && !phase) {
      const timer = setTimeout(() => {
        if (currentPhaseIdx < phases.length - 1) {
          setCurrentPhaseIdx((prev) => prev + 1);
          setResolvedWordsCount(0);
        } else {
          setCurrentPhaseIdx(1); 
          setResolvedWordsCount(0);
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [resolvedWordsCount, words.length, currentPhaseIdx, phases.length, phase]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black/90 p-10 font-mono overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl">
      <div className="text-muted-foreground/40 text-[10px] mb-8 uppercase tracking-widest flex justify-between items-center">
        <span>// generating board-aligned paper</span>
        <span className="animate-pulse">● SESSION_ACTIVE</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="text-[clamp(14px,2.2vw,18px)] leading-[1.8] mb-12 min-h-[4em] max-w-lg flex flex-wrap justify-center gap-x-4">
          {words.map((word, i) => (
            <ScrambledWord
              key={`${currentPhaseIdx}-${i}`}
              word={word}
              state={
                i < resolvedWordsCount
                  ? "done"
                  : i === resolvedWordsCount
                  ? "active"
                  : "pending"
              }
            />
          ))}
        </div>

        <div className="w-full max-w-xs text-center">
          <span className="text-[10px] text-violet-500/80 dark:text-violet-400/80 uppercase font-bold tracking-wider">
            {currentPhase.label}
          </span>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex justify-between items-end opacity-40">
        <div className="space-y-1">
          <p className="text-[9px] uppercase tracking-tighter">Subject: {subject || "Social Science"}</p>
          <p className="text-[9px] uppercase tracking-tighter">Engine: LangGraph AI</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-tighter">© 2026 PRASHAN</p>
        </div>
      </div>
    </div>
  );
}
