"use client";

import React, { useState } from "react";

interface FlipCardProps {
    front: React.ReactNode;
    back: React.ReactNode;
    className?: string;
    triggerOnClick?: boolean;
}

export function FlipCard({
    front,
    back,
    className = "",
    triggerOnClick = false,
}: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleInteraction = () => {
        if (triggerOnClick) {
            setIsFlipped(!isFlipped);
        }
    };

    const handleMouseEnter = () => {
        if (!triggerOnClick) {
            setIsFlipped(true);
        }
    };

    const handleMouseLeave = () => {
        if (!triggerOnClick) {
            setIsFlipped(false);
        }
    };

    return (
        <div
            className={`relative ${className}`}
            style={{ perspective: "1000px" }}
            onClick={handleInteraction}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="relative w-full h-full transition-transform duration-600 ease-in-out"
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    {front}
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {back}
                </div>
            </div>
        </div>
    );
}
