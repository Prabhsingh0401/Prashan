"use client";

import { useState } from "react";
import { NewPaperModal } from "./NewPaperModal";

export default function QuickActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-sm">
        <h3 className="font-semibold text-foreground/80 mb-3">Quick Actions</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full btn-glass text-white btn-glass-primary !shadow-sm !py-2.5 !text-sm"
          >
            <span>+ Create New Paper</span>
          </button>
          <button className="w-full btn-glass btn-glass-icon !py-2.5 !text-sm">
            Browse Templates
          </button>
        </div>
      </div>

      <NewPaperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
