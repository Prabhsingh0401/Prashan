import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start">
            <Navbar />
            <div className="flex-1 flex min-h-[90vh] w-full items-center justify-center px-4 sm:px-8 lg:px-16 pt-45 sm:pt-40 pb-20 relative z-10 overflow-hidden">



            {/* Main Content Container (Unchanged Layout) */}
            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center relative z-10">

                {/* Left Column: Influential Heading */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6rem] font-bold tracking-tighter text-foreground leading-[1.08] pr-4">
                        Teachers <span className="text-foreground/30 relative select-none">
                            <span className="line-through decoration-[3px] decoration-red-500/60 dark:decoration-red-400/60">should type.</span>
                        </span>
                        <br className="hidden md:block" />
                        <span className="block mt-2">Teachers should teach.</span>
                    </h1>
                </div>

                {/* Right Column: Mission Content */}
                <div className="flex flex-col space-y-6 md:space-y-8 text-lg sm:text-xl lg:text-xl text-foreground/75 font-medium leading-relaxed max-w-2xl">
                    <p>
                        Every year, brilliant educators waste countless hours fighting with document formatting, hunting for questions across scattered textbooks, and painstakingly copy-pasting from past papers.
                    </p>
                    <p>
                        <strong className="text-foreground">Prashan was built out of pure frustration with this status quo.</strong>
                    </p>
                    <p>
                        Our mission is simple: to give teachers their time back. We leverage modern AI and curated Indian educational datasets to build accurate, print-ready, board-aligned question papers in minutes not hours.
                    </p>

                    <div className="pt-6 sm:pt-8 flex flex-col items-start gap-8">
                        {/* Social proof trust line */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex space-x-0.5">
                                {[
                                    { letter: "R", bg: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.3)", text: "rgb(124,58,237)" },
                                    { letter: "P", bg: "rgba(5,150,105,0.15)", border: "rgba(5,150,105,0.3)", text: "rgb(5,150,105)" },
                                    { letter: "A", bg: "rgba(220,38,38,0.15)", border: "rgba(220,38,38,0.3)", text: "rgb(220,38,38)" },
                                    { letter: "S", bg: "rgba(217,119,6,0.15)", border: "rgba(217,119,6,0.3)", text: "rgb(217,119,6)" },
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
                                <span className="text-foreground font-semibold">100+ teachers</span> already on the waitlist
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mt-2">
                            <Link href="/" className="w-full sm:w-auto">
                                <button className="btn-glass btn-glass-primary w-full sm:w-auto !px-8 !py-4 !text-base sm:!text-lg">
                                    <span>Claim my free spot</span>
                                </button>
                            </Link>
                            <Link
                                href="/#features"
                                className="btn-glass btn-glass-secondary w-full sm:w-auto !px-8 !py-4 !text-base sm:!text-lg group"
                            >
                                See how it works
                                <ChevronRight className="h-5 w-5 text-foreground/50 group-hover:text-foreground transition-all group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </main>
    );
}
