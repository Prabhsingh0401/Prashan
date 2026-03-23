import Link from "next/link";
import { LayoutDashboard, FileText, Settings, HelpCircle } from "lucide-react";
import GlassSurface from "../ui/GlassSurface";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[360px] z-50 h-[3.75rem]">
      <GlassSurface 
        width="100%" 
        height="100%"
        borderRadius={40}
        className="shadow-2xl"
      >
        <nav className="w-full flex items-center justify-around px-1 py-0">
          <Link 
            href="/dashboard" 
            className="relative z-10 flex items-center justify-center p-3 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
            aria-label="Dashboard"
          >
            <LayoutDashboard className="w-[1.35rem] h-[1.35rem] group-active:scale-90 transition-transform" />
          </Link>
          
          <Link 
            href="/dashboard" 
            className="relative z-10 flex items-center justify-center p-3 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
            aria-label="Papers"
          >
            <FileText className="w-[1.35rem] h-[1.35rem] group-active:scale-90 transition-transform" />
          </Link>

          {/* Floating divider line */}
          <div className="relative z-10 w-[1.5px] h-6 bg-black/15 dark:bg-white/15 mx-1 rounded-full drop-shadow-sm" />

          <Link 
            href="/dashboard" 
            className="relative z-10 flex items-center justify-center p-3 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
            aria-label="Settings"
          >
            <Settings className="w-[1.35rem] h-[1.35rem] group-active:scale-90 transition-transform" />
          </Link>

          <Link 
            href="/dashboard" 
            className="relative z-10 flex items-center justify-center p-3 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
            aria-label="Help"
          >
            <HelpCircle className="w-[1.35rem] h-[1.35rem] group-active:scale-90 transition-transform" />
          </Link>
        </nav>
      </GlassSurface>
    </div>
  );
}
