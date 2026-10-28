"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn, premiumSpring } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

interface StepsTimelineProps {
    label?: string;
    title: string;
    description?: string;
    steps: { title: string; description: string }[];
}

/**
 * Timeline navegable (equivalente a timeline__nav + timeline__content):
 * una barra de pasos clickeable, contenido animado y flechas anterior/siguiente.
 */
export function StepsTimeline({ label, title, description, steps }: StepsTimelineProps) {
    const { u } = useLanguage();
    const copy = u.timeline;
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(1);
    const reduceMotion = useReducedMotion();

    const goTo = (index: number) => {
        setDirection(index > active ? 1 : -1);
        setActive(index);
    };

    const step = steps[active];

    return (
        <section className="relative py-20 md:py-28">
            <div aria-hidden="true" className="nb-glow absolute inset-0" />
            <div className="container relative z-10">
                <FadeIn>
                    <SectionHeader label={label ?? copy.label} title={title} description={description} />
                </FadeIn>

                <FadeIn className="mx-auto max-w-5xl">
                    {/* Navegación de pasos */}
                    <div className="relative mb-10" role="tablist" aria-label={copy.stepsAria}>
                        <div aria-hidden="true" className="absolute left-5 right-5 top-5 h-px bg-gradient-to-r from-nb-sky/20 via-nb-blue/20 to-nb-line sm:left-14 sm:right-14" />
                        {/* Progreso con haz de energía en la punta (se mueve solo al cambiar de paso) */}
                        <div aria-hidden="true" className="absolute left-5 right-5 top-5 sm:left-14 sm:right-14">
                            <motion.div
                                className="relative h-px bg-gradient-to-r from-nb-sky via-nb-blue to-nb-sky"
                                initial={false}
                                animate={{ width: steps.length > 1 ? `${(active / (steps.length - 1)) * 100}%` : "0%" }}
                                transition={premiumSpring}
                            >
                                {active > 0 && (
                                    <span
                                        className="absolute right-0 top-1/2 h-[3px] w-16 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-nb-sky to-white"
                                        style={{ boxShadow: "0 0 12px rgba(66,162,254,0.7), 0 0 25px rgba(9,93,189,0.35)" }}
                                    />
                                )}
                            </motion.div>
                        </div>
                        <div className="relative flex justify-between">
                            {steps.map((item, index) => {
                                const isActive = index === active;
                                const isDone = index < active;
                                return (
                                    <button
                                        key={item.title}
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-controls="timeline-panel"
                                        onClick={() => goTo(index)}
                                        className="group flex w-10 flex-col items-center gap-3 focus-visible:outline-none sm:w-28"
                                    >
                                        <span className="relative">
                                            {/* Anillo que se expande una vez al activar el paso */}
                                            <AnimatePresence>
                                                {isActive && !reduceMotion && (
                                                    <motion.span
                                                        key={`burst-${index}`}
                                                        aria-hidden="true"
                                                        className="absolute inset-0 rounded-full border-2 border-nb-sky"
                                                        initial={{ scale: 1, opacity: 0.8 }}
                                                        animate={{ scale: 1.9, opacity: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.9, ease: "easeOut" }}
                                                    />
                                                )}
                                            </AnimatePresence>
                                            <span
                                                aria-hidden="true"
                                                className={cn(
                                                    "absolute -inset-[6px] rounded-full border border-nb-sky/35 transition-all duration-500",
                                                    isActive ? "scale-100 opacity-100" : "scale-75 opacity-0"
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    "relative inline-flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm font-semibold transition-all duration-500 group-focus-visible:ring-2 group-focus-visible:ring-nb-sky",
                                                    isActive && "scale-110 border-sky-300 bg-nb-sky/20 text-white shadow-[0_0_35px_rgba(66,162,254,0.65)]",
                                                    isDone && "border-nb-sky/60 bg-nb-dark text-nb-sky",
                                                    !isActive && !isDone && "border-nb-line bg-nb-dark text-nb-text group-hover:border-nb-sky/40 group-hover:text-white"
                                                )}
                                            >
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </span>
                                        <span
                                            className={cn(
                                                "hidden text-center text-xs font-medium leading-tight transition-colors sm:block",
                                                isActive ? "text-white" : "text-nb-text group-hover:text-white/80"
                                            )}
                                        >
                                            {item.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contenido */}
                    <div
                        id="timeline-panel"
                        role="tabpanel"
                        className="relative overflow-hidden rounded-2xl border border-nb-sky/30 bg-[#0a1628]/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_35px_rgba(66,162,254,0.1)] backdrop-blur-xl md:p-12"
                    >
                        {/* Filo de luz superior del panel activo */}
                        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nb-sky to-transparent" />
                        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                            <motion.div
                                key={active}
                                custom={direction}
                                initial={reduceMotion ? false : { opacity: 0, x: direction * 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -40 }}
                                transition={premiumSpring}
                                className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10"
                            >
                                <span className="text-6xl font-extrabold leading-none text-white/10 md:text-8xl">
                                    {String(active + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 className="mb-4 text-2xl font-bold md:text-3xl">{step.title}</h3>
                                    <p className="max-w-2xl text-lg leading-relaxed text-nb-text">{step.description}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-10 flex items-center justify-between border-t border-nb-line pt-6">
                            <button
                                onClick={() => goTo(active - 1)}
                                disabled={active === 0}
                                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                            >
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                {copy.previous}
                            </button>
                            <span className="text-sm text-nb-text">{copy.position(active + 1, steps.length)}</span>
                            <button
                                onClick={() => goTo(active + 1)}
                                disabled={active === steps.length - 1}
                                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                            >
                                {copy.next}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
