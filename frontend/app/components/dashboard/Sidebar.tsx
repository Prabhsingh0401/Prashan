"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  HelpCircle
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside 
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className={`relative z-20 hidden md:flex flex-col border border-black/10 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-3xl m-4 h-[calc(100vh-2rem)] rounded-[2rem] p-3 transition-all duration-300 ease-in-out shadow-2xl ${
        isCollapsed ? "w-[4.5rem]" : "w-64"
      }`}
    >

      {/* Logo Section */}
      <div className="mb-8 flex items-center h-8 overflow-hidden rounded-xl">
        <Link href="/dashboard" className={`flex items-center shrink-0 w-full ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
            {/* Dark mode logo (white) */}
            <Image 
              src="/prashan_logo.svg" 
              alt="Prashan Logo" 
              fill
              className="hidden dark:block object-contain"
            />
            {/* Light mode logo (black) */}
            <Image 
              src="/prashan_logo_black.svg" 
              alt="Prashan Logo" 
              fill
              className="block dark:hidden object-contain"
            />
          </div>
          <span className={`text-xl font-bold tracking-tight text-foreground whitespace-nowrap overflow-hidden transition-all duration-300 inline-block ${isCollapsed ? 'opacity-0 max-w-0 ml-0' : 'opacity-100 max-w-[120px] ml-3'}`}>
            Prashan
          </span>
        </Link>
      </div>

      <nav className="flex flex-col gap-2 flex-1 overflow-hidden">
        <Link 
          href="/dashboard"
          className={`flex items-center transition-all group font-medium bg-white shadow-sm ring-1 ring-black/5 dark:bg-white/10 text-foreground dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] dark:ring-0 ${isCollapsed ? 'w-11 h-11 justify-center rounded-2xl mx-auto' : 'w-full px-3 py-3 rounded-2xl justify-start'}`}
          title="Dashboard"
        >
          <LayoutDashboard className="w-5 h-5 shrink-0 text-foreground" />
          <span className={`whitespace-nowrap overflow-hidden inline-block transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0 ml-0' : 'opacity-100 max-w-[120px] ml-3'}`}>
            Dashboard
          </span>
        </Link>
        
        <Link 
          href="/dashboard"
          className={`flex items-center transition-all group font-medium text-foreground/60 hover:text-foreground hover:bg-white/40 dark:hover:bg-white/5 hover:backdrop-blur-md hover:shadow-sm ${isCollapsed ? 'w-11 h-11 justify-center rounded-2xl mx-auto' : 'w-full px-3 py-3 rounded-2xl justify-start'}`}
          title="My Papers"
        >
          <FileText className="w-5 h-5 shrink-0 text-foreground/50 group-hover:text-foreground" />
          <span className={`whitespace-nowrap overflow-hidden inline-block transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0 ml-0' : 'opacity-100 max-w-[120px] ml-3'}`}>
            My Papers
          </span>
        </Link>

        <Link 
          href="/dashboard"
          className={`flex items-center transition-all group font-medium text-foreground/60 hover:text-foreground hover:bg-white/40 dark:hover:bg-white/5 hover:backdrop-blur-md hover:shadow-sm ${isCollapsed ? 'w-11 h-11 justify-center rounded-2xl mx-auto' : 'w-full px-3 py-3 rounded-2xl justify-start'}`}
          title="Settings"
        >
          <Settings className="w-5 h-5 shrink-0 text-foreground/50 group-hover:text-foreground" />
          <span className={`whitespace-nowrap overflow-hidden inline-block transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0 ml-0' : 'opacity-100 max-w-[120px] ml-3'}`}>
            Settings
          </span>
        </Link>
      </nav>

      <div className="mt-auto pt-4 border-t border-black/10 dark:border-white/10 overflow-hidden">
        <Link 
          href="/dashboard"
          className={`flex items-center transition-all group font-medium text-foreground/60 hover:text-foreground hover:bg-white/40 dark:hover:bg-white/5 hover:backdrop-blur-md hover:shadow-sm ${isCollapsed ? 'w-11 h-11 justify-center rounded-2xl mx-auto' : 'w-full px-3 py-3 rounded-2xl justify-start'}`}
          title="Help & Support"
        >
          <HelpCircle className="w-5 h-5 shrink-0 text-foreground/50 group-hover:text-foreground" />
          <span className={`whitespace-nowrap overflow-hidden inline-block transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0 ml-0' : 'opacity-100 max-w-[120px] ml-3'}`}>
            Help & Support
          </span>
        </Link>
      </div>
    </aside>
  );
}
