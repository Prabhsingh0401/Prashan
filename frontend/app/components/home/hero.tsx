"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import { submitWaitlist } from "@/actions/waitlist";
import { Toast } from "../ui/toast";

const painPoints = [
  "copy-pasting from old papers.",
  "begging others for a computer.",
  "fighting with Word margins at 11 PM.",
  "redoing the format after every edit.",
  "hunting questions across 5 textbooks.",
  "waiting on someone else to type it up.",
];

export function Hero() {
  const [isEmailInputVisible, setIsEmailInputVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [painIndex, setPainIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    type: "success" | "error";
  }>({
    isVisible: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setPainIndex((i) => (i + 1) % painPoints.length);
        setAnimating(false);
      }, 350);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ isVisible: true, message, type });
  };

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitWaitlist(email);
      if (result.success) {
        showToast(`Check your inbox / spam at ${email}!`, "success");
        setIsEmailInputVisible(false);
        setEmail("");
      } else {
        showToast(result.error || "Something went wrong.", "error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      showToast("Failed to join waitlist. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="relative w-full flex flex-col items-center justify-center min-h-[95vh] pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background brand text for visual depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none flex justify-center items-center w-full z-0 opacity-30 mix-blend-overlay">
        <span 
          className="text-[12rem] sm:text-[16rem] md:text-[24rem] lg:text-[30rem] font-extrabold text-foreground/20 blur-sm sm:blur-md leading-none tracking-tighter whitespace-nowrap"
          aria-hidden="true"
        >
          प्रशन
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center animate-hero-in">
        {/* Status badge */}
        <div 
          className="mb-8 inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 px-3 py-1 text-sm font-medium backdrop-blur-md"
          role="status"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
          Early access — Free for teachers
        </div>

        {/* Main headline - AI SEO: Contains descriptive keywords */}
        <h1 
          id="hero-heading"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-foreground mb-4 max-w-4xl leading-[1.08]"
        >
          Stop wasting your
          <br className="hidden sm:block" /> time.
        </h1>

        {/* Animated pain point - shows problem teachers face */}
        <div className="h-28 sm:h-24 md:h-20 flex items-center justify-center mb-6 overflow-hidden px-4 w-full">
          <p
            aria-live="polite"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground/55 transition-all duration-350"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(-12px)" : "translateY(0)",
              transitionDuration: "350ms",
              transitionTimingFunction: "cubic-bezier(.7,.2,.2,1)",
            }}
          >
            {painPoints[painIndex]}
          </p>
        </div>

        {/* Value proposition - AI SEO: Contains key search terms */}
        <p className="text-lg sm:text-xl text-foreground/55 max-w-3xl mb-4 font-medium tracking-tight leading-relaxed">
          Prashan builds your question paper in under 3 minutes — formatted, 
          board-aligned for CBSE, ICSE & State Boards, and print-ready. 
          No prompting. No formatting. No stress.
        </p>

        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          <div className="flex space-x-0.5">
            {[
              {
                letter: "R",
                bg: "rgba(124,58,237,0.15)",
                border: "rgba(124,58,237,0.3)",
                text: "rgb(124,58,237)",
              },
              {
                letter: "P",
                bg: "rgba(5,150,105,0.15)",
                border: "rgba(5,150,105,0.3)",
                text: "rgb(5,150,105)",
              },
              {
                letter: "A",
                bg: "rgba(220,38,38,0.15)",
                border: "rgba(220,38,38,0.3)",
                text: "rgb(220,38,38)",
              },
              {
                letter: "S",
                bg: "rgba(217,119,6,0.15)",
                border: "rgba(217,119,6,0.3)",
                text: "rgb(217,119,6)",
              },
            ].map((avatar, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold select-none overflow-hidden"
                style={{
                  backgroundColor: avatar.bg,
                  border: `1px solid ${avatar.border}`,
                  color: avatar.text,
                  zIndex: 4 - i,
                  boxShadow: `inset 0px 1px 0px rgba(255,255,255,0.2), 0px 1px 4px rgba(0,0,0,0.10)`,
                }}
              >
                {avatar.letter}
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground/50 font-medium">
            <span className="text-foreground font-semibold">100+ teachers</span>{" "}
            already on the waitlist
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-lg">
          {isEmailInputVisible ? (
            <form
              onSubmit={handleJoinWaitlist}
              className="w-full flex items-center p-1 sm:p-1.5 rounded-full bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5 transition-all duration-300"
            >
              <input
                type="email"
                placeholder="your@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2 sm:py-2.5 text-sm sm:text-base outline-none text-foreground placeholder:text-foreground/40 min-w-0"
                required
                autoFocus
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glass btn-glass-primary !py-2.5 !px-5 !text-sm flex-shrink-0"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-1.5 font-bold">
                    Joining... <Loader2 className="h-4 w-4 animate-spin" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-bold">
                    Claim my spot <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </button>
            </form>
          ) : (
            <>
              <button
                id="hero-join-waitlist"
                onClick={() => setIsEmailInputVisible(true)}
                className="btn-glass btn-glass-primary w-full sm:w-auto !px-8 !py-4 !text-base sm:!text-lg"
              >
                <span className="font-bold">Claim my free spot</span>
              </button>
              <Link
                id="hero-learn-more"
                href="#features"
                className="btn-glass btn-glass-secondary w-full sm:w-auto !px-8 !py-4 !text-base sm:!text-lg group"
              >
                <span className="font-bold">See how it works</span>
                <ChevronRight className="h-5 w-5 text-foreground/50 group-hover:text-foreground transition-all group-hover:translate-x-1" />
              </Link>
            </>
          )}
        </div>

        <p className="mt-5 text-xs text-foreground/30 font-medium">
          Free during early access · No credit card · Unsubscribe anytime
        </p>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </section>
  );
}
