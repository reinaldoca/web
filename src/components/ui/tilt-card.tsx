"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    tiltMaxAngle?: number;
    scale?: number;
    transitionSpeed?: number;
}

export function TiltCard({
    children,
    className = "",
    tiltMaxAngle = 10,
    scale = 1.05,
    transitionSpeed = 400,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -tiltMaxAngle;
        const rotateY = ((x - centerX) / centerX) * tiltMaxAngle;

        setTransform(
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
        );
    };

    const handleMouseLeave = () => {
        setTransform("");
    };

    return (
        <div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform,
                transition: `transform ${transitionSpeed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
                transformStyle: "preserve-3d",
            }}
        >
            {children}
        </div>
    );
}
