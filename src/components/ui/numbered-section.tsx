"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface NumberedSectionProps {
    number: string;
    title: string;
    description: string;
    children?: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * Sección numerada con efecto inspirado en web de recursos
 * Números grandes destacados con animación smooth
 */
export function NumberedSection({
    number,
    title,
    description,
    children,
    className,
    delay = 0,
}: NumberedSectionProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay
            }}
            className={cn(
                "relative pl-20 md:pl-28 border-l-2 border-[var(--bd2)] pb-16",
                className
            )}
        >
            {/* Número destacado */}
            <motion.div
                initial={shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }}
                whileInView={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: delay + 0.2
                }}
                className="absolute -left-12 md:-left-16 top-0 w-20 h-20 md:w-28 md:h-28
                           rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6]
                           flex items-center justify-center
                           shadow-2xl shadow-purple-500/30"
            >
                <span className="text-3xl md:text-5xl font-bold text-white">
                    {number}
                </span>
            </motion.div>

            {/* Contenido */}
            <div className="space-y-4">
                <motion.h3
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: delay + 0.3
                    }}
                    className="text-2xl md:text-3xl font-bold text-[var(--tx)]"
                >
                    {title}
                </motion.h3>

                <motion.p
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: delay + 0.4
                    }}
                    className="text-lg text-[var(--tx2)] leading-relaxed"
                >
                    {description}
                </motion.p>

                {children && (
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                            delay: delay + 0.5
                        }}
                        className="mt-6"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
