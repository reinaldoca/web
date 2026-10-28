"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { premiumSpring } from "@/components/ui/fade-in";

interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    /** Radio del halo en px. */
    radius?: number;
}

/**
 * Card de vidrio con un halo azul que sigue al cursor.
 * Replica el patrón `.servicio-item` de nublit (--x/--y + radial-gradient)
 * usando motion values para no re-renderizar en cada mousemove.
 */
export function SpotlightCard({ children, className, radius = 500 }: SpotlightCardProps) {
    const x = useMotionValue(-radius);
    const y = useMotionValue(-radius);
    const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(9, 93, 189, 0.32), transparent 40%)`;

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            whileHover={{ y: -4 }}
            transition={premiumSpring}
            className={cn(
                "group relative h-full overflow-hidden rounded-2xl border border-nb-line bg-nb-surface backdrop-blur-sm",
                "transition-[border-color,box-shadow] duration-300 hover:border-nb-sky/40",
                "hover:shadow-[0_20px_60px_rgba(9,93,189,0.15)]",
                className
            )}
        >
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{ background }}
            />
            {/* Filo de luz superior al hover (mismo detalle que las cards de la timeline) */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-nb-sky to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="relative z-10 h-full">{children}</div>
        </motion.div>
    );
}
