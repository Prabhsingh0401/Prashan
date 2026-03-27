"use client";

import { Bell, Settings, FileText } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import { ProfileMenu } from "../shared/ProfileMenu";

export default function Topbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-end p-4 md:p-6 pointer-events-none">
      
      {/* Floating right-side unified action pill */}
      <div className="flex items-center gap-2 pointer-events-auto bg-white/30 dark:bg-white/5 backdrop-blur-3xl p-1.5 rounded-[1.25rem] border border-white/40 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/40">
        
        {/* Merged Mobile Logo */}
        <div className="md:hidden flex items-center gap-1.5 pl-2 pr-2 border-r border-black/10 dark:border-white/10 shrink-0">
          <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
            <img src="/prashan_logo.svg" alt="Prashan Logo" className="hidden dark:block object-contain w-full h-full" />
            <img src="/prashan_logo_black.svg" alt="Prashan Logo" className="block dark:hidden object-contain w-full h-full" />
          </div>
          <span className="text-sm font-bold tracking-tight select-none">Prashan</span>
        </div>
        {/* Quick links styled as modern glass pills */}
        <div className="hidden sm:flex items-center gap-2 mr-1 sm:pr-3 sm:border-r border-black/10 dark:border-white/10">
          <button className="btn-glass flex items-center gap-2 !px-4 !py-2 !rounded-xl !text-sm hover:-translate-y-0.5 transition-all !bg-transparent hover:!bg-white/40 dark:hover:!bg-white/10 border-transparent hover:border-black/5 dark:hover:border-white/10">
            <FileText className="w-4 h-4 text-foreground/60" />
            <span className="font-medium">Papers</span>
          </button>
          
          <button className="btn-glass flex items-center gap-2 !px-4 !py-2 !rounded-xl !text-sm hover:-translate-y-0.5 transition-all">
            <Settings className="w-4 h-4 text-foreground/60" />
            <span className="font-medium">Settings</span>
          </button>
        </div>

        {/* Icon array with unified glassy background */}
        <button className="btn-glass btn-glass-icon relative !p-2 !rounded-xl hover:-translate-y-0.5 transition-all" aria-label="Notifications">
          <Bell className="w-4 h-4 text-foreground/70" />
          {/* Notification ping */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-sm border border-white dark:border-black"></span>
        </button>

        <ThemeToggle />
        <ProfileMenu />
      </div>
    </header>
  );
}
