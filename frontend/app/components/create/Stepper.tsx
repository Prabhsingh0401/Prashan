import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="flex items-center mb-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all shrink-0",
              i + 1 < currentStep
                ? "bg-black dark:bg-white text-white dark:text-black"
                : i + 1 === currentStep
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "bg-neutral-200 dark:bg-white/10 text-neutral-500"
            )}
          >
            {i + 1 < currentStep ? <Check className="h-3 w-3" /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={cn(
                "h-0.5 w-12 mx-2",
                i + 1 < currentStep ? "bg-black dark:bg-white" : "bg-neutral-200 dark:bg-white/10"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
