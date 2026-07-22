"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import MobileNav from "../dashboard/MobileNav";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-foreground/20" />
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar />
      
      {/* Main Feature Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Topbar />
        
        {/* Dashboard Content Container */}
        <main className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8 pb-28 md:pb-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
