"use client";

import { useEffect, useRef } from "react";
import { Clock, Zap, Target, User } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  number: string;
  unit: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  delay: string;
}

const stats: Stat[] = [
  {
    number: "10×",
    unit: "",
    label: "Faster creation",
    sublabel: "A full paper in under 3 minutes — not 3 hours.",
    icon: <Zap className="w-5 h-5" />,
    delay: "0ms",
  },
  {
    number: "3",
    unit: "hrs",
    label: "Saved per paper",
    sublabel: "Time back in your day, every single time.",
    icon: <Clock className="w-5 h-5" />,
    delay: "100ms",
  },
  {
    number: "100%",
    unit: "",
    label: "Format accuracy",
    sublabel: "Formatting is handled automatically. You do nothing.",
    icon: <Target className="w-5 h-5" />,
    delay: "200ms",
  },
  {
    number: "0",
    unit: "prompts",
    label: "Zero prompting",
    sublabel: "No ChatGPT back-and-forth. No searching. Just done.",
    icon: <User className="w-5 h-5" />,
    delay: "300ms",
  },
];

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const bottomStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Stats grid animation with enhanced stagger
      const statCards = statsGridRef.current?.children;
      if (statCards) {
        gsap.fromTo(
          statCards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Bottom strip animation
      gsap.fromTo(
        bottomStripRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomStripRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-[1400px] mx-auto px-4 py-8 relative z-10 font-sans"
    >
      {/* Main glassy container */}
      <div
        className="relative rounded-[2rem] overflow-hidden
                bg-white/30 dark:bg-white/[0.04]
                backdrop-blur-2xl
                border border-white/60 dark:border-white/10
                shadow-[0px_1px_0.5px_rgba(0,0,0,0),0px_4.4px_2.2px_rgba(0,0,0,0.01),0px_11.7px_5.9px_rgba(0,0,0,0.02),0px_33px_16.5px_rgba(0,0,0,0.04),0px_60px_30px_rgba(0,0,0,0.07),inset_0px_1px_0px_rgba(255,255,255,0.7),inset_0px_-1px_0px_rgba(0,0,0,0.06)]
                dark:shadow-[0px_4.4px_2.2px_rgba(0,0,0,0.06),0px_11.7px_5.9px_rgba(0,0,0,0.10),0px_33px_16.5px_rgba(0,0,0,0.15),0px_60px_30px_rgba(0,0,0,0.20),inset_0px_1px_0px_rgba(255,255,255,0.10),inset_0px_-1px_0px_rgba(0,0,0,0.30)]
                px-5 sm:px-10 lg:px-16 py-10 lg:py-14
            "
      >
        {/* Top label + headline */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 px-3 py-1 text-sm font-medium backdrop-blur-md mb-5">
              <span className="flex h-2 w-2 rounded-full bg-[#541325] mr-2 animate-pulse" />
              By the numbers
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground leading-[1.1] max-w-lg">
              Teachers get their <br className="hidden sm:block" />
              time back.
            </h2>
          </div>
          <p className="text-foreground/55 text-[15px] leading-relaxed font-medium max-w-xs sm:text-right">
            No more depending on colleagues, searching question banks, or
            wrestling with formatting.
          </p>
        </div>

        {/* Stats grid */}
        <div
          ref={statsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-between gap-5 p-6 sm:p-6 md:p-8
                                bg-white/60 dark:bg-black/40
                                hover:bg-white/80 dark:hover:bg-white/[0.06]
                                transition-colors duration-300
                            `}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center
                                bg-white dark:bg-white/10
                                border border-black/8 dark:border-white/10
                                shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_4px_rgba(0,0,0,0.06)]
                                text-foreground/60
                            "
              >
                {stat.icon}
              </div>

              {/* Number */}
              <div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground leading-none tabular-nums">
                    {stat.number}
                  </span>
                  {stat.unit && (
                    <span className="text-base md:text-lg font-semibold text-foreground/50 tracking-tight">
                      {stat.unit}
                    </span>
                  )}
                </div>

                <p className="text-[13px] font-bold text-foreground tracking-tight mb-1">
                  {stat.label}
                </p>
                <p className="text-[12px] text-foreground/50 font-medium leading-snug hidden sm:block">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip — independence statement */}
        <div
          ref={bottomStripRef}
          className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3
                    px-5 py-4 rounded-2xl
                    bg-black/[0.03] dark:bg-white/[0.03]
                    border border-black/5 dark:border-white/5
                "
        >
          <p className="text-sm font-semibold text-foreground/70">
            Fully self-serve. No IT dependency. No design skills. No formatting
            needed.
          </p>
          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
            {["Independent", "Instant", "Accurate"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-lg
                                    border border-black/8 dark:border-white/10
                                    bg-white/70 dark:bg-white/5
                                    text-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
