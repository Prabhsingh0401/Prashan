"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../theme/theme-toggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-4 inset-x-4 max-w-5xl mx-auto z-50">
      <nav
        className={cn(
          "relative rounded-2xl transition-all duration-300",
          "bg-white/95 dark:bg-black/80",
          "backdrop-blur-xl saturate-[1.8]",
          "border border-white/40 dark:border-white/10",
          "shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)]",
          "dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]",
        )}
      >
        {/* Subtle top glare/glint */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50 dark:opacity-20 z-0"></div>

        {/* Main bar */}
        <div className="flex items-center justify-between p-3 px-5 relative z-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-1 rtl:space-x-reverse transition-opacity hover:opacity-80"
          >
            <Image
              src="/prashan_logo.svg"
              alt="Prashan Logo"
              width={32}
              height={32}
              className="invert dark:invert-0"
              priority
            />
          </Link>

          {/* Desktop nav links - centered */}
          <ul className="hidden lg:flex items-center font-medium absolute left-1/2 -translate-x-1/2 space-x-10">
            <li>
              <Link
                href="/"
                className="text-foreground font-semibold"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                About
              </Link>
            </li>
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <Link
              href="/auth"
              className="btn-glass btn-glass-icon !rounded-xl !py-2 !px-4 text-sm font-medium"
            >
              Get Started
            </Link>
            <ThemeToggle />

            {/* Glassy hamburger — mobile/tablet only */}
            <div className="lg:hidden">
              <button
                id="navbar-mobile-toggle"
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn-glass btn-glass-icon !p-2"
                aria-controls="navbar-mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? "Close menu" : "Open menu"}
                </span>
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          id="navbar-mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col font-medium px-5 pb-4 pt-1 space-y-1 border-t border-black/5 dark:border-white/5">
            <li>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
