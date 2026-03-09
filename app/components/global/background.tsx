"use client"

import type React from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    showRadialGradient?: boolean
    /** Animation duration in seconds. Default is 60s for subtle movement. Use lower values (10-20s) for more visible animation. */
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
                "transition-bg relative flex min-h-screen w-full flex-col bg-background text-foreground",
                className,
            )}
            {...(props as any)}
        >
            <div
                className="absolute inset-0 overflow-hidden"
                style={
                    {
                        "--aurora":
                            "repeating-linear-gradient(100deg,#10b981_10%,#34d399_15%,#6ee7b7_20%,#2dd4bf_25%,#14b8a6_30%)",
                        "--dark-gradient":
                            "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
                        "--white-gradient":
                            "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

                        "--color-1": "#0d173b",
                        "--color-2": "#1d3280ff",
                        "--color-3": "#2948b6ff",
                        "--color-4": "#2440a1ff",
                        "--color-5": "#3256daff",
                        "--black": "#000",
                        "--white": "#fff",
                        "--transparent": "transparent",
                        "--animation-speed": `${animationSpeed}s`,
                    } as React.CSSProperties
                }
            >
                <div
                    className={cn(
                        `pointer-events-none absolute -inset-[10px] opacity-50 blur-[6px] sm:blur-[10px] invert filter [contain:strict] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] will-change-[background-position] [--aurora:repeating-linear-gradient(100deg,var(--color-1)_10%,var(--color-2)_15%,var(--color-3)_20%,var(--color-4)_25%,var(--color-5)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
                        "after:[animation:aurora_var(--animation-speed)_linear_infinite]",
                        showRadialGradient &&
                        "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]",
                    )}
                />
            </div>
            {children}
        </div>
    )
}

export default function AuroraBackgroundDemo() {
    return (
        <AuroraBackground showRadialGradient={true} animationSpeed={15}>
            <div className="pointer-events-none" />
        </AuroraBackground>
    )
}
