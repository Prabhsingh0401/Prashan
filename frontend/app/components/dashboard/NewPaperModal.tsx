"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "../ui/modal";
import { FileText, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaperType = "label" | "board";

export function NewPaperModal({ isOpen, onClose }: NewPaperModalProps) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<PaperType | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      router.push(`/dashboard/create?type=${selectedType}`);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create New Paper
            </h2>
            <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">
              Choose how you want to create your question paper
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2  cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <OptionCard
            icon={<FileText className="h-6 w-6" />}
            title="Class Assignment"
            description="Create a custom assignment with your own questions and structure"
            isSelected={selectedType === "label"}
            onClick={() => setSelectedType("label")}
          />

          <OptionCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Board Aligned Paper"
            description="Generate questions automatically aligned with your board curriculum"
            isSelected={selectedType === "board"}
            onClick={() => setSelectedType("board")}
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={cn(
              "btn-glass btn-glass-primary !px-5 !py-2.5",
              "flex items-center gap-2 font-bold",
              !selectedType && "opacity-50 cursor-not-allowed"
            )}
          >
            <span>Continue</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

function OptionCard({ icon, title, description, isSelected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl text-left transition-all duration-200 cursor-pointer hover:scale-[1.02]",
        "flex items-center gap-4",
        "bg-white/40 dark:bg-white/5 backdrop-blur-md",
        "border border-black/10 dark:border-white/10",
        isSelected
          ? "bg-white/60 dark:bg-white/10 border-black/20 dark:border-white/20"
          : "hover:bg-white/60 dark:hover:bg-white/10"
      )}
    >
      <div
        className={cn(
          "p-3 rounded-xl transition-colors",
          isSelected
            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
        )}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h3 className={cn(
          "font-semibold",
          isSelected ? "text-neutral-900 dark:text-white" : "text-neutral-400 dark:text-neutral-500"
        )}>
          {title}
        </h3>
        <p className={cn(
          "text-sm mt-0.5",
          isSelected ? "text-neutral-500 dark:text-neutral-400" : "text-neutral-300 dark:text-neutral-600"
        )}>{description}</p>
      </div>
    </button>
  );
}
