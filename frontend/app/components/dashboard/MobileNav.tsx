import Link from "next/link";
import { LayoutDashboard, FileText, Settings, HelpCircle } from "lucide-react";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[360px] z-50 h-[3.75rem]">
      <nav className="
        w-full h-full rounded-[40px] flex items-center justify-around px-1
        bg-white/30 dark:bg-white/15
        backdrop-blur-xl
        border border-white/50 dark:border-white/20
        shadow-[0_4px_24px_rgba(0,0,0,0.08)]
      ">
        <Link
          href="/dashboard"
          className="flex items-center justify-center p-3 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
          aria-label="Dashboard"
        >
          <LayoutDashboard className="w-[1.35rem] h-[1.35rem] group-active:scale-90 transition-transform" />
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center justify-center p-3 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
          aria-label="Papers"
        >
          <FileText className="w-[1.35rem] h-[1.35rem] group-active:scale-90 transition-transform" />
        </Link>

        <div className="w-[1.5px] h-6 bg-black/15 dark:bg-white/20 mx-1 rounded-full" />

        <Link
          href="/dashboard"
          className="flex items-center justify-center p-3 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
          aria-label="Settings"
        >
          <Settings className="w-[1.35rem] h-[1.35rem] group-active:scale-90 transition-transform" />
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center justify-center p-3 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
          aria-label="Help"
        >
          <HelpCircle className="w-[1.35rem] h-[1.35rem] group-active:scale-90 transition-transform" />
        </Link>
      </nav>
    </div>
  );
}