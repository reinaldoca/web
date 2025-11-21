"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollAnimationProps {
    children: React.ReactNode;
    className?: string;
    animation?: "fade-in" | "slide-up" | "fade-up" | "fade-down" | "slide-in-right" | "slide-in-left" | "scale-up";
    duration?: number;
    delay?: number;
    threshold?: number;
}

export function ScrollAnimation({
    children,
    className,
    animation = "slide-up",
    duration = 500,
    delay = 0,
    threshold = 0.1,
}: ScrollAnimationProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
                rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully in view
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);

    const getAnimationClass = () => {
        switch (animation) {
            case "fade-in":
                return "opacity-0 translate-y-0";
            case "slide-up":
            case "fade-up":
                return "opacity-0 translate-y-8";
            case "fade-down":
                return "opacity-0 -translate-y-8";
            case "slide-in-right":
                return "opacity-0 translate-x-8";
            case "slide-in-left":
                return "opacity-0 -translate-x-8";
            case "scale-up":
                return "opacity-0 scale-95";
            default:
                return "opacity-0 translate-y-8";
        }
    };

    const getVisibleClass = () => {
        switch (animation) {
            case "fade-in":
                return "opacity-100 translate-y-0";
            case "slide-up":
            case "fade-up":
                return "opacity-100 translate-y-0";
            case "fade-down":
                return "opacity-100 translate-y-0";
            case "slide-in-right":
                return "opacity-100 translate-x-0";
            case "slide-in-left":
                return "opacity-100 translate-x-0";
            case "scale-up":
                return "opacity-100 scale-100";
            default:
                return "opacity-100 translate-y-0";
        }
    };

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none",
                isVisible ? getVisibleClass() : getAnimationClass(),
                className
            )}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}
