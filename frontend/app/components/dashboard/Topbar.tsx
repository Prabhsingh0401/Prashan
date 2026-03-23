"use client";

import { useState, useEffect } from "react";
import { Bell, User, Settings, FileText, LogOut } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.photoURL) {
        setPhotoUrl(user.photoURL);
      } else {
        setPhotoUrl(null);
      }
    });

    return () => unsubscribe();
  }, []);

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

        {/* Improved User Profile Icon with Dropdown logic */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center justify-center w-10 h-10 ml-1 rounded-full overflow-hidden bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 text-foreground shadow-sm ring-2 ring-transparent transition-all hover:ring-foreground/20 hover:scale-105 active:scale-95 shrink-0"
          >
            {photoUrl ? (
              <img 
                src={photoUrl} 
                alt="User" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <User className="w-4 h-4 text-foreground/70" />
            )}
          </button>

          {/* Floating Glass Dropdown Menu */}
          {isProfileOpen && (
            <>
              {/* Invisible full-screen overlay to catch outside clicks */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsProfileOpen(false)}
              ></div>
              
              <div className="absolute right-0 top-14 z-50 w-48 p-1.5 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-3xl border border-black/10 dark:border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-500 dark:text-red-400 dark:hover:bg-red-500/20 font-medium transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
