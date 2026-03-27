"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Prashan?",
    answer:
      "Prashan is an AI-powered question paper generator for Indian teachers. Create board-aligned, professionally formatted exam papers in under 3 minutes for CBSE, ICSE, and State Boards.",
  },
  {
    question: "Which boards are supported?",
    answer:
      "Prashan supports CBSE, ICSE, and all major State Boards. Questions are automatically mapped to specific board curricula for classes 1-12.",
  },
  {
    question: "How long does it take?",
    answer:
      "Generate a complete, formatted question paper in under 3 minutes — from selecting chapters to final export.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes, free during early access. No credit card required. Start creating question papers at no cost.",
  },
  {
    question: "What formats can I export?",
    answer:
      "Export as print-ready PDF or editable Word document. All formatting is handled automatically.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="w-full max-w-[1400px] mx-auto px-4 py-16 md:py-24 relative z-10 font-sans"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12 scroll-animate">
          <div className="mb-6 inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 px-3 py-1 text-sm font-medium backdrop-blur-md">
            <HelpCircle className="mr-2 h-4 w-4 text-foreground/50" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-6 max-w-3xl leading-[1.1]">
            Common questions
            <br className="hidden sm:block" /> about Prashan
          </h2>

          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl font-medium tracking-tight leading-relaxed">
            Everything you need to know about Prashan and how it helps
            teachers create better question papers faster.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-xl overflow-hidden transition-all duration-200",
                "bg-white/20 dark:bg-white/[0.03]",
                "border border-white/40 dark:border-white/10",
                "hover:bg-white/30 dark:hover:bg-white/[0.05] hover:border-white/50 dark:hover:border-white/15",
                openIndex === index && "bg-white/40 dark:bg-white/[0.06] border-white/50 dark:border-white/15"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm sm:text-base font-medium text-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-foreground/40 flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180 text-foreground/60"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="px-4 pb-4 text-sm text-foreground/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-foreground/60">
            Still have questions?{" "}
            <a
              href="mailto:theprashanai@gmail.com"
              className="text-foreground font-medium hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
