"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Shield, Zap, Users, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useState } from "react";

const icons = [Shield, Zap, Users, Target];

// NexusAI color palette for each reason (purple, blue, green, purple)
const nexusColors = [
    {
        bg: "bg-[rgba(139,92,246,0.1)]",
        text: "text-[#a78bfa]",
        border: "border-[rgba(139,92,246,0.3)]",
        glow: "shadow-purple-500/20",
    },
    {
        bg: "bg-[rgba(59,130,246,0.1)]",
        text: "text-[#60a5fa]",
        border: "border-[rgba(59,130,246,0.3)]",
        glow: "shadow-blue-500/20",
    },
    {
        bg: "bg-[rgba(52,211,153,0.1)]",
        text: "text-[#34d399]",
        border: "border-[rgba(52,211,153,0.3)]",
        glow: "shadow-green-400/20",
    },
    {
        bg: "bg-[rgba(139,92,246,0.1)]",
        text: "text-[#a78bfa]",
        border: "border-[rgba(139,92,246,0.3)]",
        glow: "shadow-purple-500/20",
    },
];

export function WhyChooseUs() {
    const { t } = useLanguage();
    const shouldReduceMotion = useReducedMotion();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="elegirnos" className="py-16 md:py-24 bg-white">
            <div className="container">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-[#24292F]">
                        {t.whyUs.title}
                    </h2>
                    <p className="text-lg text-[#57606A]">
                        {t.whyUs.subtitle}
                    </p>
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {t.whyUs.reasons.map((reason: { title: string; description: string }, index: number) => {
                        const Icon = icons[index];
                        const colors = nexusColors[index];
                        const isHovered = hoveredIndex === index;
                        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

                        return (
                            <motion.div
                                key={index}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    delay: shouldReduceMotion ? 0 : index * 0.1,
                                }}
                                animate={{
                                    scale: isOtherHovered ? 0.96 : 1,
                                }}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                className="h-full"
                            >
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <Card
                                        className={`
                                            h-full min-h-[280px] text-center border-2 transition-all duration-300
                                            ${isHovered ? `${colors.border} shadow-xl ${colors.glow}` : 'border-[#30363D]/30'}
                                        `}
                                    >
                                        <CardHeader className="h-full flex flex-col justify-center p-6">
                                            {/* Icon with stagger animation */}
                                            <motion.div
                                                className={`
                                                    mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center
                                                    rounded-lg ${colors.bg} ${colors.text}
                                                `}
                                                initial={shouldReduceMotion ? false : { scale: 0, rotate: -180 }}
                                                whileInView={shouldReduceMotion ? {} : { scale: 1, rotate: 0 }}
                                                viewport={{ once: true, margin: "-100px" }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 200,
                                                    damping: 20,
                                                    delay: shouldReduceMotion ? 0 : index * 0.1 + 0.2,
                                                }}
                                            >
                                                <Icon className="h-8 w-8" />
                                            </motion.div>

                                            <CardTitle className="text-xl mb-3 text-[#24292F]">
                                                {reason.title}
                                            </CardTitle>

                                            <CardDescription className="text-base leading-relaxed text-[#57606A]">
                                                {reason.description}
                                            </CardDescription>

                                            {/* Subtle technical hint - NO "hover para más" */}
                                            <AnimatePresence>
                                                {isHovered && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                        className="mt-4 pt-4 border-t border-[#30363D]/20"
                                                    >
                                                        <p className={`text-sm font-mono ${colors.text}`}>
                                                            → Implementado
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </CardHeader>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
