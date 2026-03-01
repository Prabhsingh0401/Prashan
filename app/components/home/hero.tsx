import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative w-full flex flex-col items-center justify-center min-h-[90vh] pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                {/* Apple-style "New" badge */}
                <div className="mb-8 inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 px-3 py-1 text-sm font-medium backdrop-blur-md transition-colors hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                    <span>Introducing Prashan AI 1.0</span>
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
                <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 mt-4 w-full">
                    {/* Primary CTA - High Contrast */}
                    <Link
                        href="#waitlist"
                        className="flex-1 sm:flex-none px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-foreground text-background font-semibold text-sm sm:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-black/10 dark:shadow-white/5 flex items-center justify-center whitespace-nowrap"
                    >
                        Join the waitlist
                    </Link>

                    {/* Secondary CTA - Subtle/Ghost */}
                    <Link
                        href="#learn-more"
                        className="flex-1 sm:flex-none px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-black/5 dark:bg-white/5 text-foreground font-semibold text-sm sm:text-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 flex items-center justify-center group whitespace-nowrap"
                    >
                        Learn more
                        <ChevronRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5 text-foreground/50 group-hover:text-foreground transition-colors group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Trust/Social proof text */}
                <p className="mt-12 text-sm text-foreground/40 font-medium">
                    Available soon.
                </p>
            </div>
        </section>
    );
}
