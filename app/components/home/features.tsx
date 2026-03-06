import { ArrowRight, Check, FileText, Terminal, Printer, Sparkles, Wand2, Calculator } from "lucide-react";

export function Features() {
    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 py-5 relative z-10 font-sans">

            {/* Header Area styled like the Hero section */}
            <div className="flex flex-col items-center text-center mb-16">
                <div className="mb-6 inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 px-3 py-1 text-sm font-medium backdrop-blur-md">
                    <Sparkles className="mr-2 h-4 w-4 text-foreground/50" />
                    <span>How it works</span>
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-6 max-w-3xl leading-[1.1]">
                    Magic behind <br className="hidden sm:block" /> the scenes.
                </h2>

                <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl font-medium tracking-tight leading-relaxed mb-8">
                    Upload your raw syllabus or question bank. Let the system handle mapping, drafting, and typography completely autonomously.
                </p>
            </div>

            {/* Grid Container with rounded corners to match Apple bento layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 bg-white/40 dark:bg-black/10 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] overflow-hidden">

                {/* ROW 1 */}
                {/* Cell 1: Visual 1 - 3 Vertical Cards */}
                <div className="p-8 lg:p-10 border-b md:border-r border-black/5 dark:border-white/5 flex flex-col items-center justify-center min-h-[300px] group bg-white/20 dark:bg-black/20">
                    <div className="w-full max-w-[320px] flex flex-col space-y-4">

                        {/* Card 1 */}
                        <div className="w-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-4 flex items-center justify-between shadow-sm rounded-2xl group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 text-foreground flex items-center justify-center bg-black/5 dark:bg-white/5">
                                    <FileText size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[14px] font-semibold text-foreground tracking-tight">Curriculum Mapped</p>
                                    <p className="text-[9px] text-foreground/50 font-mono tracking-widest uppercase mt-0.5">CBSE / ICSE / STATE BOARDS</p>
                                </div>
                            </div>
                            <Check size={18} className="text-foreground" />
                        </div>

                        {/* Card 2 */}
                        <div className="w-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-4 flex items-center justify-between shadow-sm rounded-2xl group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 text-foreground flex items-center justify-center bg-black/5 dark:bg-white/5">
                                    <Wand2 size={18} />
                                </div>
                                <div className="flex-col flex">
                                    <p className="text-[14px] font-semibold text-foreground tracking-tight">Format Perfected</p>
                                    <p className="text-[9px] text-foreground/50 font-mono tracking-widest uppercase mt-0.5">TYPOGRAPHY + LAYOUT</p>
                                </div>
                            </div>
                            <Check size={18} className="text-foreground" />
                        </div>

                        {/* Card 3 */}
                        <div className="w-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-4 flex items-center justify-between shadow-sm rounded-2xl group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 text-foreground flex items-center justify-center bg-black/5 dark:bg-white/5">
                                    <Calculator size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[14px] font-semibold text-foreground tracking-tight">Difficulty Balanced</p>
                                    <p className="text-[9px] text-foreground/50 font-mono tracking-widest uppercase mt-0.5">BLOOMS TAXONOMY</p>
                                </div>
                            </div>
                            <Check size={18} className="text-foreground" />
                        </div>

                    </div>
                </div>

                {/* Cell 2: Visual 2 */}
                <div className="p-8 lg:p-10 border-b md:border-r border-black/5 dark:border-white/5 min-h-[300px] flex flex-col justify-center bg-white/20 dark:bg-black/20">
                    <div className="flex items-center space-x-2 mb-6 text-xs font-mono text-foreground font-bold tracking-widest uppercase">
                        <Terminal size={14} strokeWidth={2.5} />
                        <span>how does प्रशन actually works</span>
                    </div>
                    <div className="font-mono text-[11px] lg:text-xs text-foreground/60 space-y-3 leading-relaxed">
                        <p className="line-clamp-1"><span className="text-foreground/30 mr-2">[ ingest ]</span> Parsing raw curriculum PDF... <span className="text-foreground font-semibold">DONE</span></p>
                        <p className="line-clamp-1"><span className="text-foreground/30 mr-2">[ extract]</span> Identifying question patterns... <span className="text-foreground font-semibold">DONE</span></p>
                        <p className="line-clamp-1"><span className="text-foreground/30 mr-2">[ map    ]</span> Aligning with State Board stds...</p>
                        <p className="line-clamp-1"><span className="text-foreground/30 mr-2">[ format ]</span> Applying professional typography...</p>
                        <p className="text-foreground font-semibold flex items-center"><span className="text-foreground/40 mr-2 font-normal">[ export ]</span> Generating print-ready PDF <span className="inline-block w-1.5 h-3.5 bg-foreground ml-2 animate-pulse align-middle"></span></p>
                    </div>
                </div>

                {/* Cell 3: Visual 3 */}
                <div className="p-8 lg:p-10 border-b border-black/5 dark:border-white/5 min-h-[300px] flex flex-col justify-center bg-white/20 dark:bg-black/20">
                    <div className="w-full flex justify-between items-center relative mb-10 mt-4 px-2">
                        {[
                            { label: "UPLOAD", done: true },
                            { label: "PARSE", done: true },
                            { label: "MAP", done: true },
                            { label: "FORMAT", done: true },
                            { label: "REVIEW", done: true },
                            { label: "EXPORT", done: false, active: true, icon: <Printer size={18} /> },
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-4 bg-transparent">
                                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all relative ${step.active ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/20 dark:shadow-white/20 border-none scale-110' :
                                    step.done ? 'bg-white dark:bg-black text-foreground/80 border border-black/10 dark:border-white/10 shadow-sm' :
                                        'bg-white dark:bg-black border border-black/5 dark:border-white/5 text-foreground/30'
                                    }`}>
                                    {/* Small mask to cover the background line */}
                                    <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full -z-10" />

                                    {step.active ? step.icon : (step.done ? <Check size={16} strokeWidth={2.5} /> : <div className="w-2 h-2 rounded-full bg-foreground/20" />)}
                                </div>
                                <span className={`text-[8px] lg:text-[9px] font-mono tracking-wider font-bold uppercase ${step.active ? 'text-foreground' :
                                    step.done ? 'text-foreground/50' :
                                        'text-foreground/30'
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold uppercase tracking-widest mt-auto">
                        <span className="text-foreground/40">Stage 6/6</span>
                        <span className="text-foreground">Export in progress...</span>
                    </div>
                </div>

                {/* ROW 2 */}
                {/* Cell 4: Text 1 */}
                <div className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 flex flex-col justify-between group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer bg-white/30 dark:bg-[#1a1a1a]/30">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-foreground/60 uppercase">Input</span>
                            <ArrowRight size={14} className="text-foreground/20 group-hover:text-foreground/60 transition-all group-hover:translate-x-1" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground tracking-tight leading-[1.15]">
                            Raw text in. <br className="hidden lg:block" /> Perfect paper out.
                        </h3>
                        <p className="text-foreground/60 text-[15px] leading-relaxed font-medium">
                            Upload your messy question banks or raw curriculum. Prashan turns it into a professionally formatted exam paper instantly.
                        </p>
                    </div>
                </div>

                {/* Cell 5: Text 2 */}
                <div className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 flex flex-col justify-between group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer bg-white/30 dark:bg-[#1a1a1a]/30">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-foreground/60 uppercase">Formatting</span>
                            <ArrowRight size={14} className="text-foreground/20 group-hover:text-foreground/60 transition-all group-hover:translate-x-1" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground tracking-tight leading-[1.15]">
                            No more <br className="hidden lg:block" /> formatting headaches.
                        </h3>
                        <p className="text-foreground/60 text-[15px] leading-relaxed font-medium">
                            Stop fighting with margins, fonts, and alignment. Prashan perfectly spaces every question, option, and section automatically.
                        </p>
                    </div>
                </div>

                {/* Cell 6: Text 3 */}
                <div className="p-8 lg:p-12 flex flex-col justify-between group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer bg-black/5 dark:bg-white/5">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-foreground uppercase">Output</span>
                            <ArrowRight size={14} className="text-foreground/40 group-hover:text-foreground transition-all group-hover:translate-x-1" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground tracking-tight leading-[1.15]">
                            Print-ready <br className="hidden lg:block" /> in seconds.
                        </h3>
                        <p className="text-foreground/60 text-[15px] leading-relaxed font-medium">
                            Export directly to a perfectly paginated PDF that is ready for the printer. Save hours of manual formatting work every week.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
