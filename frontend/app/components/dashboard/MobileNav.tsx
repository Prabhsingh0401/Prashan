import Link from "next/link";
import { LayoutDashboard, FileText, Settings, HelpCircle } from "lucide-react";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[360px] z-50">
            
      <nav className="relative flex items-center justify-around px-2 py-2 bg-white/20 dark:bg-black/30 backdrop-blur-3xl rounded-full border border-white/40 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
      <Link 
        href="/dashboard" 
        className="flex items-center justify-center p-3 rounded-full text-foreground/50 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
        aria-label="Dashboard"
      >
        <LayoutDashboard className="w-6 h-6 group-active:scale-90 transition-transform" />
      </Link>
      
      <Link 
        href="/dashboard" 
        className="flex items-center justify-center p-3 rounded-full text-foreground/50 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
        aria-label="Papers"
      >
        <FileText className="w-6 h-6 group-active:scale-90 transition-transform" />
      </Link>

      {/* Floating divider line */}
      <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1 rounded-full" />

      <Link 
        href="/dashboard" 
        className="flex items-center justify-center p-3 rounded-full text-foreground/50 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
        aria-label="Settings"
      >
        <Settings className="w-6 h-6 group-active:scale-90 transition-transform" />
      </Link>

      <Link 
        href="/dashboard" 
        className="flex items-center justify-center p-3 rounded-full text-foreground/50 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
        aria-label="Help"
      >
        <HelpCircle className="w-6 h-6 group-active:scale-90 transition-transform" />
      </Link>
    </nav>
    </div>
  );
}
