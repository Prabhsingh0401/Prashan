import React from "react";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import MobileNav from "../dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Feature Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Topbar />
        
        {/* Dashboard Content Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-28 md:pb-8">
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
