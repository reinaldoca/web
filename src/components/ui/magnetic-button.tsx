"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // Attraction strength (default 0.3)
    radius?: number;   // Attraction radius in pixels (default 100)
}

/**
 * Magnetic Button - Premium micro-interaction
 * Button que "atrae" el cursor cuando está cerca
 * Solo funciona en desktop, respeta reduced motion
 */
export function MagneticButton({
    children,
    className = "",
    strength = 0.3,
    radius = 100,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) return;

        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            // Si está dentro del radio de atracción
            if (distance < radius) {
                const factor = (1 - distance / radius) * strength;
                setPosition({
                    x: distanceX * factor,
                    y: distanceY * factor,
                });
            } else {
                setPosition({ x: 0, y: 0 });
            }
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        window.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [shouldReduceMotion, strength, radius]);

    return (
        <motion.div
            ref={buttonRef}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
