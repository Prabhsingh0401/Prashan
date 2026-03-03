"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../theme/theme-toggle";
import { Menu, ChevronDown, X } from "lucide-react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

            <nav className="relative overflow-hidden bg-white/20 dark:bg-black/20 border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl ring-1 ring-inset ring-white/20 dark:ring-white/5">
                {/* Visual Glass Distortion Underlayer */}
                <div className="absolute inset-x-0 -top-full -bottom-full -z-10 [filter:url(#liquid-glass)] backdrop-blur-2xl bg-white/10 dark:bg-black/20 pointer-events-none scale-110"></div>

                <div className="flex flex-wrap items-center justify-between p-3 px-5 relative z-10">
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

                    <div className="flex items-center md:order-2 space-x-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-foreground/70 rounded-xl md:hidden hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition-colors"
                            aria-controls="navbar-multi-level-dropdown"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                    <div
                        className={`${isMobileMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto md:order-1`}
                        id="navbar-multi-level-dropdown"
                    >
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-12 rtl:space-x-reverse md:flex-row md:mt-0 relative max-md:border max-md:border-black/5 max-md:dark:border-white/5 max-md:rounded-2xl max-md:bg-white/20 max-md:dark:bg-white/5 max-md:backdrop-blur-md">
                            <li>
                                <Link
                                    href="#"
                                    className="block py-2 px-3 text-foreground rounded-lg md:bg-transparent md:text-foreground md:p-0 font-semibold"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="relative group">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center justify-between w-full py-2 px-3 rounded-lg font-medium text-foreground/80 md:w-auto hover:bg-black/5 md:hover:bg-transparent md:border-0 md:hover:text-foreground md:p-0 dark:hover:bg-white/5 md:dark:hover:bg-transparent transition-colors group"
                                >
                                    Services
                                    <ChevronDown className={`w-4 h-4 ms-1.5 opacity-70 group-hover:opacity-100 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {/* Dropdown menu actual body */}
                                <div
                                    className={`${isDropdownOpen ? 'block' : 'hidden'} md:absolute top-full left-0 z-10 w-44 bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 rounded-xl shadow-lg mt-2 md:mt-4 overflow-hidden`}
                                >
                                    <ul className="py-2 text-sm text-foreground/80 font-medium">
                                        <li>
                                            <Link href="#" className="block px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                                SaaS Analytics
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="block px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                                Enterprise
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="block px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-red-500 hover:text-red-600 dark:hover:text-red-400">
                                                Sign out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="block py-2 px-3 text-foreground/80 rounded-lg hover:bg-black/5 md:hover:bg-transparent md:border-0 md:hover:text-foreground md:p-0 dark:hover:bg-white/5 md:dark:hover:bg-transparent transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="block py-2 px-3 text-foreground/80 rounded-lg hover:bg-black/5 md:hover:bg-transparent md:border-0 md:hover:text-foreground md:p-0 dark:hover:bg-white/5 md:dark:hover:bg-transparent transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
