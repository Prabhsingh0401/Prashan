"use client"

import type React from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    showRadialGradient?: boolean
    /** Animation duration in seconds. Kept for backwards compatibility but unused to improve performance. */
    animationSpeed?: number
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    animationSpeed = 60,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <div
            className={cn(
                "relative flex min-h-screen w-full flex-col bg-background text-foreground transition-bg",
                className,
            )}
            {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={cn(
                        "absolute inset-0 opacity-50",
                        // Light theme gradient (softer, pastel matching versions)
                        "bg-[linear-gradient(100deg,#e6c9b3_0%,#e8aeb7_33%,#99d4d0_66%,#c1b5eb_100%)]",
                        // Dark theme gradient (darker variants of provided colors)
                        "dark:bg-[linear-gradient(100deg,#492b16_0%,#4b1119_33%,#002e2c_66%,#392c73_100%)]",
                    )}
                />
                {showRadialGradient && (
                    <div className="absolute inset-0 bg-background/20 [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]" />
                )}
            </div>
            {children}
        </div>
    )
}

export default function AuroraBackgroundDemo() {
    return (
        <AuroraBackground showRadialGradient={true}>
            <div className="pointer-events-none" />
        </AuroraBackground>
    )
}
