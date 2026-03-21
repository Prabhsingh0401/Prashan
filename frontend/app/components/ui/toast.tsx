"use client";

import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
    title?: string;
    message: string;
    type?: "success" | "error";
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export function Toast({
    title,
    message,
    type = "success",
    isVisible,
    onClose,
    duration = 5000,
}: ToastProps) {
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 300); // Wait for fade out animation
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, duration]);

    if (!shouldRender) return null;

    return (
        <div
            className={cn(
                "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2.5rem)] sm:w-auto transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95 pointer-events-none"
            )}
        >
            <div className="relative rounded-2xl overflow-hidden
                bg-white/85 dark:bg-black/75
                backdrop-blur-2xl
                border border-white/60 dark:border-white/10
                shadow-[0px_1px_0.5px_rgba(0,0,0,0),0px_4.4px_2.2px_rgba(0,0,0,0.01),0px_11.7px_5.9px_rgba(0,0,0,0.02),0px_33px_16.5px_rgba(0,0,0,0.04),0px_60px_30px_rgba(0,0,0,0.07),inset_0px_1px_0px_rgba(255,255,255,0.7),inset_0px_-1px_0px_rgba(0,0,0,0.06)]
                dark:shadow-[0px_4.4px_2.2px_rgba(0,0,0,0.06),0px_11.7px_5.9px_rgba(0,0,0,0.10),0px_33px_16.5px_rgba(0,0,0,0.15),0px_60px_30px_rgba(0,0,0,0.20),inset_0px_1px_0px_rgba(255,255,255,0.10),inset_0px_-1px_0px_rgba(0,0,0,0.30)]
                px-5 py-4 flex items-center gap-4 sm:min-w-[320px] max-w-md mx-auto
            ">
                <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                    "bg-white dark:bg-white/10 border border-black/8 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_4px_rgba(0,0,0,0.06)]",
                    type === "success" 
                        ? "text-emerald-600 dark:text-emerald-400" 
                        : "text-rose-600 dark:text-rose-400"
                )}>
                    {type === "success" ? (
                        <CheckCircle2 size={20} strokeWidth={2.5} />
                    ) : (
                        <AlertCircle size={20} strokeWidth={2.5} />
                    )}
                </div>
                
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-foreground tracking-tight mb-0.5">
                        {title || (type === "success" ? "You're on the list!" : "Wait, something's wrong")}
                    </p>
                    <p className="text-[12px] text-foreground/50 font-medium leading-snug truncate">
                        {message}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground/20 hover:text-foreground/40"
                >
                    <X size={15} />
                </button>
            </div>
        </div>
    );
}
