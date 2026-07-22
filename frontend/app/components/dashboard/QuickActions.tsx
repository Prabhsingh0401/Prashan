"use client";

import { useState } from "react";
import Link from "next/link";
import { Toast } from "../ui/toast";

export default function QuickActions() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-sm">
      <h3 className="font-semibold text-foreground/80 mb-3">Quick Actions</h3>
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard/create?type=board"
          className="w-full font-bold btn-glass text-white btn-glass-primary !shadow-sm !py-2.5 !text-sm text-center block"
        >
          <span>+ Create New Paper</span>
        </Link>
        <button 
          onClick={() => setShowToast(true)}
          className="w-full btn-glass btn-glass-icon !py-2.5 !text-sm cursor-pointer"
        >
          Browse Templates
        </button>
      </div>

      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        title="Coming Soon"
        message="Templates feature will be available in the next update!"
        type="success"
      />
    </div>
  );
}
