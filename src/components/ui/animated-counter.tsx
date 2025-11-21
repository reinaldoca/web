"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
    value: string;
    duration?: number;
}

export function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState("0");
    const ref = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Parse the numeric part and the non-numeric parts
    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    const prefix = match ? match[1] : "";
    const number = match ? parseInt(match[2], 10) : 0;
    const suffix = match ? match[3] : value.replace(/\d/g, ""); // Fallback if no match (shouldn't happen if there's a number)
    const hasNumber = !!match;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || !hasNumber) {
            if (!hasNumber) setDisplayValue(value);
            return;
        }

        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function: easeOutExpo
            const easeOut = (x: number): number => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            };

            const currentCount = Math.floor(easeOut(progress) * number);
            setDisplayValue(`${prefix}${currentCount}${suffix}`);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setDisplayValue(value); // Ensure final value matches exactly
            }
        };

        window.requestAnimationFrame(step);
    }, [isVisible, number, duration, prefix, suffix, value, hasNumber]);

    return <span ref={ref}>{hasNumber ? displayValue : value}</span>;
}
