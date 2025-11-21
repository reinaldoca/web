"use client";

import React, { useEffect, useState, useRef } from "react";

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    type?: "word" | "letter";
}

export function RevealText({
    text,
    className = "",
    delay = 0,
    duration = 50,
    type = "word",
}: RevealTextProps) {
    const [visibleItems, setVisibleItems] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const items = type === "word" ? text.split(" ") : text.split("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
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
        if (!isInView) return;

        const timer = setTimeout(() => {
            if (visibleItems < items.length) {
                setVisibleItems((prev) => prev + 1);
            }
        }, delay + visibleItems * duration);

        return () => clearTimeout(timer);
    }, [isInView, visibleItems, items.length, delay, duration]);

    return (
        <div ref={ref} className={className}>
            {items.map((item, index) => (
                <span
                    key={index}
                    className="inline-block"
                    style={{
                        opacity: index < visibleItems ? 1 : 0,
                        transform: index < visibleItems ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.5s ease, transform 0.5s ease",
                    }}
                >
                    {item}
                    {type === "word" && index < items.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </div>
    );
}
