"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../theme/theme-toggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="fixed top-4 inset-x-4 max-w-5xl mx-auto z-50">
            {/* SVG Filter for Liquid Glass Effect */}
            <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="liquid-glass">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>

            <nav className="relative bg-white/10 dark:bg-black/10 border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl ring-1 ring-inset ring-white/20 dark:ring-white/5">
                {/* Liquid Glass Underlayer */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none -z-10">
                    <div className="absolute inset-x-0 -top-full -bottom-full [filter:url(#liquid-glass)] backdrop-blur-2xl bg-white/10 dark:bg-black/10 scale-110"></div>
                </div>

                {/* Main bar */}
                <div className="flex items-center justify-between p-3 px-5 relative z-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-1 rtl:space-x-reverse transition-opacity hover:opacity-80">
                        <Image
                            src="/prashan_logo.svg"
                            alt="Prashan Logo"
                            width={32}
                            height={32}
                            className="invert dark:invert-0"
                            priority
                        />
                    </Link>

                    {/* Desktop nav links */}
                    <ul className="hidden lg:flex items-center font-medium space-x-10">
                        <li>
                            <Link
                                href="#"
                                className="text-foreground font-semibold"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="text-foreground/80 hover:text-foreground transition-colors"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="text-foreground/80 hover:text-foreground transition-colors"
                            >
                                Pricing
                            </Link>
                        </li>
                    </ul>

                    {/* Right controls */}
                    <div className="flex items-center gap-2">
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
                                <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
                                {isMobileMenuOpen
                                    ? <X className="w-5 h-5" />
                                    : <Menu className="w-5 h-5" />
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile drawer */}
                <div
                    id="navbar-mobile-menu"
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <ul className="flex flex-col font-medium px-5 pb-4 pt-1 space-y-1 border-t border-black/5 dark:border-white/5">
                        <li>
                            <Link
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2.5 px-3 rounded-xl text-foreground font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2.5 px-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2.5 px-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
