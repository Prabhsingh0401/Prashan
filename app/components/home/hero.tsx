"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import { submitWaitlist } from "@/actions/waitlist";

export function Hero() {
    const [isEmailInputVisible, setIsEmailInputVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleJoinWaitlist = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await submitWaitlist(email);
            if (result.success) {
                alert(`You're in! We've sent a welcome email to ${email}.`);
                setIsEmailInputVisible(false);
                setEmail("");
            } else {
                alert(result.error || "Something went wrong.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to join waitlist. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative w-full flex flex-col items-center justify-center min-h-[90vh] pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
            {/* Massive Background Watermark / Shadow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none flex justify-center items-center w-full z-0 opacity-40 mix-blend-overlay">
                <span className="text-[12rem] sm:text-[16rem] md:text-[24rem] lg:text-[32rem] font-extrabold text-foreground/20 blur-sm sm:blur-md leading-none tracking-tighter whitespace-nowrap">
                    प्रशन
                </span>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                {/* Apple-style "New" badge */}
                <div className="mb-8 inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 px-3 py-1 text-sm font-medium backdrop-blur-md transition-colors hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
                    <span className="flex h-2 w-2 rounded-full bg-[#541325] mr-2 animate-pulse"></span>
                    <span>Introducing प्रशन</span>
                    <ChevronRight className="ml-1 h-4 w-4 text-foreground/50" />
                </div>

                {/* Massive Headline Typography - Apple Style */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6 max-w-4xl leading-[1.1] md:leading-[1.05]">
                    The ultimate <br className="hidden md:block" /> paper generator.
                </h1>

                {/* Clean, readable sub-headline */}
                <p className="mt-4 text-xl sm:text-2xl text-foreground/60 max-w-2xl mb-12 font-medium tracking-tight leading-relaxed">
                    Pro-level formatting. Intelligent curriculum mapping. Designed radically for teachers who want their time back.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 w-full">
                    {/* Primary CTA - High Contrast */}
                    {isEmailInputVisible ? (
                        <form
                            onSubmit={handleJoinWaitlist}
                            className="w-full sm:w-auto flex items-center p-1 sm:p-1.5 rounded-full bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5 transition-all duration-300 animate-in fade-in zoom-in-95"
                        >
                            <input
                                type="email"
                                placeholder="name@school.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-transparent px-4 py-2 sm:py-2.5 text-sm sm:text-base outline-none text-foreground placeholder:text-foreground/40 w-full sm:w-64"
                                required
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center whitespace-nowrap disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        Joining...
                                        <Loader2 className="ml-1.5 h-4 w-4 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Join
                                        <ArrowRight className="ml-1.5 h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <button
                            onClick={() => setIsEmailInputVisible(true)}
                            className="flex-1 w-full sm:w-auto px-4 sm:px-8 py-3.5 sm:py-4 rounded-full bg-foreground text-background font-semibold text-[13px] sm:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-black/10 dark:shadow-white/5 flex items-center justify-center whitespace-nowrap"
                        >
                            Join the waitlist
                        </button>
                    )}

                    {/* Secondary CTA - Subtle/Ghost */}
                    {!isEmailInputVisible && (
                        <Link
                            href="#learn-more"
                            className="flex-1 w-full sm:w-auto px-4 sm:px-8 py-3.5 sm:py-4 rounded-full bg-black/5 dark:bg-white/5 text-foreground font-semibold text-[13px] sm:text-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 flex items-center justify-center group whitespace-nowrap"
                        >
                            Learn more
                            <ChevronRight className="ml-0.5 sm:ml-1 h-3.5 w-3.5 sm:h-5 sm:w-5 text-foreground/50 group-hover:text-foreground transition-colors group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>

                {/* Trust/Social proof text */}
                <p className="mt-12 text-sm text-foreground/40 font-medium">
                    Available soon.
                </p>
            </div>
        </section>
    );
}
