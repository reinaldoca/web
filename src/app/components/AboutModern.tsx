"use client";

import Image from "next/image";
import { GradientButton } from "@/components/ui/gradient-button";
import { useLanguage } from "@/components/language-provider";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AboutModern() {
    const { t } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    // System metrics with NexusAI colors
    const metrics = [
        {
            prefix: "UPTIME:",
            value: t.about.stats.experience.value,
            label: t.about.stats.experience.label,
            color: "text-[#8b5cf6]", // purple
        },
        {
            prefix: "DEPLOYED:",
            value: t.about.stats.projects.value,
            label: t.about.stats.projects.label,
            color: "text-[#3b82f6]", // blue
        },
        {
            prefix: "TEAM:",
            value: t.about.stats.experts.value,
            label: t.about.stats.experts.label,
            color: "text-[#8b5cf6]", // purple
        },
        {
            prefix: "SLA:",
            value: t.about.stats.support.value,
            label: t.about.stats.support.label,
            color: "text-[#34d399]", // green
        },
    ];

    return (
        <section id="nosotros" className="py-16 md:py-32 bg-white relative overflow-hidden scroll-mt-28">
            {/* Technical grid background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />

            {/* Gradient accent - NexusAI purple/blue */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-[#3b82f6]/5" />

            <div className="container relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
                        whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="relative z-10"
                    >
                        <motion.span
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className="hbadge mb-6"
                        >
                            <span>✨</span>
                            <span>Acerca de CloudBit</span>
                        </motion.span>

                        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight mb-6 text-[#24292F]">
                            {t.about.title}
                        </h2>

                        <p className="text-lg text-[#57606A] mb-4 leading-relaxed">
                            {t.about.description1}
                        </p>
                        <p className="text-lg text-[#57606A] mb-10 leading-relaxed">
                            {t.about.description2}
                        </p>

                        {/* System Metrics - NexusAI style */}
                        <div className="grid grid-cols-2 gap-4 mb-10 p-6 bg-[var(--sf)] rounded-lg border border-[var(--bd2)]">
                            {metrics.map((metric, index) => (
                                <motion.div
                                    key={index}
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                                    className="relative group"
                                >
                                    {/* Terminal-style metric display */}
                                    <div className="flex flex-col gap-1">
                                        {/* Prefix label */}
                                        <span className="font-mono text-xs text-[#8B949E] uppercase tracking-wider">
                                            {metric.prefix}
                                        </span>

                                        {/* Value - monospace, large */}
                                        <div className={`font-[family-name:var(--font-display)] text-4xl font-bold ${metric.color}`}>
                                            <AnimatedCounter value={metric.value} duration={2500} />
                                        </div>

                                        {/* Description */}
                                        <span className="text-xs text-[#C9D1D9] leading-tight mt-1">
                                            {metric.label}
                                        </span>
                                    </div>

                                    {/* Subtle separator line */}
                                    {index < metrics.length - 1 && index % 2 === 1 && (
                                        <div className="absolute -bottom-2 left-0 right-0 h-px bg-[#30363D]" />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0 }}
                            whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
                        >
                            <GradientButton
                                variant="gradient"
                                href="/#contacto"
                            >
                                {t.about.teamBtn}
                            </GradientButton>
                        </motion.div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
                        whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="relative z-0"
                    >
                        <div className="relative aspect-square lg:h-[600px] rounded-lg overflow-hidden shadow-2xl border-4 border-[var(--bd2)]">
                            {/* NexusAI glow - purple/blue */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#8b5cf6]/20 to-[#3b82f6]/20 opacity-40 blur-3xl" />

                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/corporate-team-new.png"
                                    alt={t.about.imageLabel}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent flex items-end p-8">
                                    <motion.p
                                        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                                        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
                                        className="text-white text-sm border-l-2 border-[#8b5cf6] pl-4"
                                    >
                                        {t.about.imageLabel}
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
