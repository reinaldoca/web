"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface EnhancedCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: "purple" | "blue" | "green";
    delay?: number;
}

/**
 * Card con efectos hover mejorados
 * Inspirado en diseño limpio con transiciones suaves
 */
export function EnhancedCard({
    children,
    className,
    glowColor = "purple",
    delay = 0,
}: EnhancedCardProps) {
    const shouldReduceMotion = useReducedMotion();

    const glowColors = {
        purple: "hover:shadow-purple-500/20 hover:border-purple-500/50",
        blue: "hover:shadow-blue-500/20 hover:border-blue-500/50",
        green: "hover:shadow-green-400/20 hover:border-green-400/50",
    };

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay
            }}
            whileHover={shouldReduceMotion ? {} : {
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            className={cn(
                "relative group",
                "bg-white rounded-2xl p-8",
                "border-2 border-slate-200",
                "transition-all duration-300 ease-out",
                "hover:shadow-2xl",
                glowColors[glowColor],
                className
            )}
        >
            {/* Gradient overlay sutil en hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            {/* Contenido */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Corner accent - detalle decorativo */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent
                            rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
}
