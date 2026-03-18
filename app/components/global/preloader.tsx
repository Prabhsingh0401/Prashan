"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

type Phase = "init" | "loading" | "logoOut" | "done";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("init");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("loading"), 20);
    const t2 = setTimeout(() => setPhase("logoOut"), 800);
    const t3 = setTimeout(() => setPhase("done"), 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!mounted || phase === "done") return null;

  // Per-phase transform / opacity — exact match to Framer component logic
  let logoTranslateY = 0;
  let logoOpacity = 1;

  if (phase === "init") {
    logoTranslateY = 80;
    logoOpacity = 0;
  } else if (phase === "logoOut") {
    logoTranslateY = -80;
    logoOpacity = 0;
  }

  const bgOpacity = phase === "logoOut" ? 0 : 1;
  const easing = "cubic-bezier(.7,.2,.2,1)";
  const transition = `all 0.7s ${easing}`;

  // Use the white logo on dark, black logo on light (same logic as navbar)
  const logoSrc =
    resolvedTheme === "dark" ? "/prashan_logo.svg" : "/prashan_logo_black.svg";
  const bgColor = resolvedTheme === "dark" ? "#000000" : "#ffffff";

  return (
    <div
      aria-label="Loading"
      role="status"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        opacity: bgOpacity,
        transition: `opacity 0.7s ${easing}`,
        pointerEvents: "all",
      }}
    >
      <Image
        src={logoSrc}
        alt="Prashan"
        width={80}
        height={80}
        priority
        draggable={false}
        style={{
          width: 80,
          height: 80,
          objectFit: "contain",
          transition,
          transform: `translateY(${logoTranslateY}px)`,
          opacity: logoOpacity,
          willChange: "transform, opacity",
          userSelect: "none",
        }}
      />
    </div>
  );
}
