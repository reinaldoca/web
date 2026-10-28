"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn, premiumSpring } from "@/components/ui/fade-in";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";

interface SignalsChecklistProps {
    title?: string;
    description?: string;
    signals: string[];
}

/** Interpola de celeste (0 señales) a rojo (todas), con más peso al principio. */
function levelColor(level: number, total: number) {
    const t = Math.pow(total > 0 ? level / total : 0, 0.6);
    const mix = (from: number, to: number) => Math.round(from + (to - from) * t);
    return `rgb(${mix(66, 239)}, ${mix(162, 68)}, ${mix(254, 68)})`;
}

/**
 * Autodiagnóstico: el visitante marca señales y un panel muestra progreso,
 * nivel y un CTA. Cada cambio dispara un pulso único (no un loop).
 */
export function SignalsChecklist({ title, description, signals }: SignalsChecklistProps) {
    const { u } = useLanguage();
    const copy = u.signals;
    // El estado se indexa por posición: al cambiar de idioma las señales marcadas se conservan
    const [checked, setChecked] = useState<boolean[]>(() => signals.map(() => false));
    const reduceMotion = useReducedMotion();
    const total = signals.length;
    const count = checked.filter(Boolean).length;
    const levelIndex = Math.min(Math.round((count / total) * (copy.levels.length - 1)), copy.levels.length - 1);
    const level = copy.levels[levelIndex];
    const color = levelColor(count, total);

    const toggle = (index: number) =>
        setChecked((prev) => prev.map((value, i) => (i === index ? !value : value)));

    return (
        <section className="py-20 md:py-28">
            <div className="container">
                <FadeIn>
                    <SectionHeader label={copy.label} title={title ?? copy.title} description={description ?? copy.description} />
                </FadeIn>

                <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                    <FadeIn className="grid gap-3 sm:grid-cols-2">
                        {signals.map((signal, index) => {
                            const isChecked = checked[index];
                            return (
                                <label
                                    key={index}
                                    className={cn(
                                        "group relative flex cursor-pointer items-start gap-4 overflow-hidden rounded-2xl border p-5 transition-colors duration-300",
                                        isChecked
                                            ? "border-nb-sky/50 bg-nb-blue/20"
                                            : "border-nb-line bg-nb-surface hover:border-nb-sky/30"
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={isChecked}
                                        onChange={() => toggle(index)}
                                    />
                                    <motion.span
                                        animate={{ scale: isChecked ? [1, 1.25, 1] : 1 }}
                                        transition={premiumSpring}
                                        className={cn(
                                            "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-nb-sky",
                                            isChecked ? "border-nb-sky bg-nb-sky text-nb-dark" : "border-nb-line text-transparent"
                                        )}
                                    >
                                        <Check className="h-4 w-4" aria-hidden="true" />
                                    </motion.span>
                                    <span className={cn("text-sm leading-relaxed transition-colors", isChecked ? "text-white" : "text-nb-text")}>
                                        {signal}
                                    </span>
                                </label>
                            );
                        })}
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <motion.div
                            key={count}
                            initial={reduceMotion ? false : { scale: 0.985 }}
                            animate={{ scale: 1 }}
                            transition={premiumSpring}
                            className="nb-panel sticky top-28 flex flex-col gap-6 p-8"
                            aria-live="polite"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-nb-text">{copy.count(count, total)}</span>
                                <motion.span
                                    animate={{ backgroundColor: color }}
                                    transition={premiumSpring}
                                    className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                                >
                                    {level.badge}
                                </motion.span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={count}>
                                <motion.div
                                    className="h-full rounded-full"
                                    animate={{ width: `${(count / total) * 100}%`, backgroundColor: color }}
                                    transition={premiumSpring}
                                />
                            </div>

                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.p
                                    key={levelIndex}
                                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={premiumSpring}
                                    className="min-h-[3.5rem] text-lg font-semibold leading-snug text-white"
                                >
                                    {level.message}
                                </motion.p>
                            </AnimatePresence>

                            <GradientButton href="/contacto" className={cn("w-full", count === 0 && "opacity-60")}>
                                {copy.cta}
                            </GradientButton>
                        </motion.div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
