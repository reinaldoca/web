"use client";

import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type Variants,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { GradientButton } from "@/components/ui/gradient-button";
import { FadeIn, premiumSpring } from "@/components/ui/fade-in";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

/**
 * Altura de la pantalla (desde arriba) donde queda la punta de la línea mientras se scrollea.
 * Con offset "start X / end X" la punta sigue fija en X, así el paso se activa justo cuando la línea lo alcanza.
 */
const TIP = 0.6;

const DESKTOP_QUERY = "(min-width: 768px)";
function subscribeDesktop(onChange: () => void) {
    const media = window.matchMedia(DESKTOP_QUERY);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
}
function useIsDesktop() {
    return useSyncExternalStore(subscribeDesktop, () => window.matchMedia(DESKTOP_QUERY).matches, () => false);
}

type StepState = "upcoming" | "done" | "active";

/**
 * Proceso como timeline vertical con "energía":
 * - la línea se rellena con el scroll y un haz luminoso viaja en su punta (atado al scroll, no en loop);
 * - un solo paso activo: nodo con resplandor, punto interno y anillo que se expande una vez; card destacada;
 * - pasos anteriores quedan "completados"; cards de vidrio con elevación y filo de luz al hover.
 */
export function ProcessSection() {
    const timelineRef = useRef<HTMLOListElement>(null);
    const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const isDesktop = useIsDesktop();
    const { u } = useLanguage();
    const copy = u.process;
    const steps = copy.steps;

    const { scrollY, scrollYProgress } = useScroll({
        target: timelineRef,
        offset: [`start ${TIP * 100}%`, `end ${TIP * 100}%`],
    });
    const springProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
    // Con movimiento reducido la línea sigue al scroll sin inercia (sin rebote ni demora)
    const lineProgress = reduceMotion ? scrollYProgress : springProgress;
    const tipTop = useTransform(lineProgress, (value) => `${value * 100}%`);
    const beamTop = useTransform(lineProgress, (value) => `calc(${value * 100}% - 90px)`);
    const tipOpacity = useTransform(lineProgress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

    // Índice del último nodo que cruzó la punta; -1 = ninguno todavía
    const [activeIndex, setActiveIndex] = useState(-1);
    const updateActive = useCallback(() => {
        const tipY = window.innerHeight * TIP;
        let latest = -1;
        nodeRefs.current.forEach((node, index) => {
            if (node && node.getBoundingClientRect().top + node.offsetHeight / 2 <= tipY) latest = index;
        });
        setActiveIndex((previous) => (previous === latest ? previous : latest));
    }, []);
    useMotionValueEvent(scrollY, "change", updateActive);
    useEffect(() => {
        const frame = requestAnimationFrame(updateActive);
        window.addEventListener("resize", updateActive);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", updateActive);
        };
    }, [updateActive]);

    // Los estados (color y brillo) se muestran también con movimiento reducido: no implican desplazamiento
    const stateOf = (index: number): StepState => {
        if (index === activeIndex) return "active";
        return index < activeIndex ? "done" : "upcoming";
    };

    return (
        <section className="relative py-20 md:py-32">
            <div className="container">
                <FadeIn>
                    <SectionHeader label={copy.label} title={copy.title} description={copy.description} />
                </FadeIn>

                <ol ref={timelineRef} className="relative mx-auto max-w-4xl">
                    {/* Riel + progreso + haz de energía (mismos márgenes que el centro de los nodos) */}
                    <div aria-hidden="true" className="absolute bottom-5 left-5 top-5 w-[2px] -translate-x-1/2 md:left-1/2">
                        {/* Riel apagado: tenue pero visible */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-nb-sky/25 via-nb-blue/20 to-nb-line" />
                        {/* Tramo recorrido: degradado con brillo */}
                        <motion.div
                            className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-sky-300 via-nb-sky to-nb-blue"
                            style={{
                                scaleY: lineProgress,
                                boxShadow: "0 0 10px rgba(66,162,254,0.55), 0 0 22px rgba(9,93,189,0.3)",
                            }}
                        />
                        {/* Haz de energía en la punta: solo con animaciones activadas */}
                        {!reduceMotion && (
                            <motion.div
                                className="absolute left-1/2 h-[90px] w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-nb-sky to-white"
                                style={{
                                    top: beamTop,
                                    opacity: tipOpacity,
                                    boxShadow: "0 0 12px rgba(66,162,254,0.7), 0 0 25px rgba(9,93,189,0.35)",
                                }}
                            />
                        )}
                        {/* Punto que marca la punta de la línea */}
                        <motion.div
                            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                            style={{
                                top: tipTop,
                                opacity: tipOpacity,
                                boxShadow: "0 0 0 3px rgba(66,162,254,0.35), 0 0 16px 4px rgba(66,162,254,0.8)",
                            }}
                        />
                    </div>

                    {steps.map((step, index) => (
                        <TimelineStep
                            key={step.title}
                            step={step}
                            index={index}
                            state={stateOf(index)}
                            isRight={index % 2 === 1}
                            isDesktop={isDesktop}
                            reduceMotion={!!reduceMotion}
                            nodeRef={(element) => {
                                nodeRefs.current[index] = element;
                            }}
                        />
                    ))}
                </ol>

                <FadeIn className="mt-20 text-center">
                    <div className="nb-panel mx-auto inline-flex max-w-xl flex-col items-center gap-5 p-8 md:p-10">
                        <h3 className="text-2xl font-bold">{copy.readyTitle}</h3>
                        <p className="text-nb-text">{copy.readyText}</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <GradientButton href="/contacto">{copy.schedule}</GradientButton>
                            <GradientButton variant="outline" href="/#servicios">
                                {copy.viewServices}
                            </GradientButton>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: premiumSpring },
};

const detailVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { ...premiumSpring, delay: 0.2 } },
};

interface TimelineStepProps {
    step: { title: string; description: string; detail: string };
    index: number;
    state: StepState;
    isRight: boolean;
    isDesktop: boolean;
    reduceMotion: boolean;
    nodeRef: (element: HTMLSpanElement | null) => void;
}

function TimelineStep({ step, index, state, isRight, isDesktop, reduceMotion, nodeRef }: TimelineStepProps) {
    const isActive = state === "active";
    const isDone = state === "done";
    const number = String(index + 1).padStart(2, "0");
    // Con movimiento reducido el nodo cambia de estado al instante y sin escalar
    const nodeTransition = reduceMotion ? { duration: 0 } : premiumSpring;

    // En mobile todo queda a la derecha del riel: siempre entra desde la derecha
    const fromX = isDesktop && !isRight ? -48 : 48;
    const contentVariants: Variants = {
        hidden: { opacity: 0, x: fromX },
        visible: { opacity: 1, x: 0, transition: { ...premiumSpring, staggerChildren: 0.08 } },
    };

    return (
        <li
            className="relative pb-12 pl-16 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0"
            aria-current={isActive ? "step" : undefined}
        >
            {/* Nodo */}
            <span
                ref={nodeRef}
                className="absolute left-0 top-0 z-10 h-10 w-10 md:left-1/2 md:-translate-x-1/2"
            >
                {/* Anillo que se expande una sola vez al activarse */}
                <AnimatePresence>
                    {isActive && !reduceMotion && (
                        <motion.span
                            key="burst"
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full border-2 border-nb-sky"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                        />
                    )}
                </AnimatePresence>
                {/* Anillo fijo mientras el paso está activo */}
                <motion.span
                    aria-hidden="true"
                    className="absolute -inset-[6px] rounded-full border border-nb-sky/35"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive || reduceMotion ? 1 : 0.8 }}
                    transition={nodeTransition}
                />
                <motion.span
                    initial={false}
                    animate={{
                        scale: isActive && !reduceMotion ? 1.12 : 1,
                        borderColor: isActive ? "rgba(125,211,252,1)" : isDone ? "rgba(66,162,254,0.7)" : "rgba(202,213,226,0.35)",
                        backgroundColor: isActive ? "rgba(66,162,254,0.22)" : isDone ? "rgba(66,162,254,0.1)" : "rgba(8,14,27,1)",
                        boxShadow: isActive
                            ? "0 0 35px rgba(66,162,254,0.65)"
                            : isDone
                              ? "0 0 12px rgba(66,162,254,0.25)"
                              : "0 0 0 rgba(66,162,254,0)",
                    }}
                    transition={nodeTransition}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border"
                >
                    <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full"
                        initial={false}
                        animate={{
                            opacity: isActive ? 1 : 0,
                            scale: isActive || reduceMotion ? 1 : 0.4,
                            backgroundColor: "#7dd3fc",
                            boxShadow: "0 0 15px rgba(125,211,252,1)",
                        }}
                        transition={nodeTransition}
                    />
                    <motion.span
                        className="font-mono text-sm font-semibold"
                        initial={false}
                        animate={{
                            opacity: isActive ? 0 : 1,
                            color: isDone ? "#7dd3fc" : "#9ea3bf",
                        }}
                        transition={nodeTransition}
                    >
                        {number}
                    </motion.span>
                </motion.span>
            </span>

            {/* Card */}
            <motion.div
                variants={contentVariants}
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                className={isRight ? "md:col-start-2" : "md:col-start-1"}
            >
                <motion.article
                    whileHover={reduceMotion ? undefined : { y: -5 }}
                    transition={premiumSpring}
                    className={cn(
                        "group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-500",
                        "hover:border-nb-sky/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_30px_rgba(66,162,254,0.08)]",
                        isActive
                            ? "border-nb-sky/35 bg-[#0a1628]/95 shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_35px_rgba(66,162,254,0.1)]"
                            : "border-nb-line bg-[#0b1322]/90 shadow-lg"
                    )}
                >
                    {/* Filo de luz superior: visible en el paso activo y al hover */}
                    <span
                        aria-hidden="true"
                        className={cn(
                            "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nb-sky to-transparent transition-opacity duration-500 group-hover:opacity-100",
                            isActive ? "opacity-100" : "opacity-0"
                        )}
                    />

                    <motion.div variants={itemVariants} className="mb-4 flex items-start justify-between gap-4">
                        <h3 className="text-xl font-semibold md:text-2xl">{step.title}</h3>
                        <span
                            className={cn(
                                "shrink-0 rounded-full border px-2.5 py-1 font-mono text-xs transition-colors duration-500",
                                isActive ? "border-nb-sky/40 bg-nb-sky/10 text-nb-sky" : "border-nb-line text-nb-text"
                            )}
                        >
                            {number}
                        </span>
                    </motion.div>
                    <motion.p variants={itemVariants} className="mb-5 leading-relaxed text-nb-text">
                        {step.description}
                    </motion.p>
                    <motion.p
                        variants={detailVariants}
                        className="rounded-xl border border-nb-line bg-white/[0.03] px-4 py-3 text-sm text-white/85"
                    >
                        {step.detail}
                    </motion.p>
                </motion.article>
            </motion.div>
        </li>
    );
}
