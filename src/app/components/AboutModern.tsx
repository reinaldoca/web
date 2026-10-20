"use client";

import Image from "next/image";
import { TerminalButton } from "@/components/ui/terminal-button";
import { useLanguage } from "@/components/language-provider";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AboutModern() {
    const { t } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    // System metrics with technical prefixes
    const metrics = [
        {
            prefix: "UPTIME:",
            value: t.about.stats.experience.value,
            label: t.about.stats.experience.label,
            color: "text-[#3FB950]", // terminal green
        },
        {
            prefix: "DEPLOYED:",
            value: t.about.stats.projects.value,
            label: t.about.stats.projects.label,
            color: "text-[#58A6FF]", // terminal blue
        },
        {
            prefix: "TEAM:",
            value: t.about.stats.experts.value,
            label: t.about.stats.experts.label,
            color: "text-[#3FB950]",
        },
        {
            prefix: "SLA:",
            value: t.about.stats.support.value,
            label: t.about.stats.support.label,
            color: "text-[#D29922]", // terminal amber
        },
    ];

    return (
        <section id="nosotros" className="py-16 md:py-32 bg-white relative overflow-hidden scroll-mt-28">
            {/* Technical grid background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />

            {/* Gradient accent - matrix greens/blues, NO violet */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3FB950]/5 via-transparent to-[#58A6FF]/5" />

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
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-[#0D1117] text-[#3FB950] font-mono text-sm"
                        >
                            <span aria-hidden="true">$</span>
                            <span>cloudbit --about</span>
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

                        {/* System Metrics - Terminal/htop style */}
                        <div className="grid grid-cols-2 gap-4 mb-10 p-6 bg-[#0D1117] rounded-lg border border-[#30363D]">
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
                            <TerminalButton
                                variant="primary"
                                icon="terminal"
                                href="/#contacto"
                            >
                                {t.about.teamBtn}
                            </TerminalButton>
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
                        <div className="relative aspect-square lg:h-[600px] rounded-lg overflow-hidden shadow-2xl border-4 border-[#30363D]">
                            {/* Technical glow - green/blue, NO violet */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#3FB950]/20 to-[#58A6FF]/20 opacity-40 blur-3xl" />

                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/corporate-team-new.png"
                                    alt={t.about.imageLabel}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 via-transparent to-transparent flex items-end p-8">
                                    <motion.p
                                        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                                        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
                                        className="text-[#F0F6FC] font-mono text-sm border-l-2 border-[#3FB950] pl-4"
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
