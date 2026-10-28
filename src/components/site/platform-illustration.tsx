"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Cloud, GitBranch, Gauge, ShieldCheck, Boxes } from "lucide-react";
import { siKubernetes } from "simple-icons";
import { useLanguage } from "@/components/language-provider";
import { IconTile } from "@/components/ui/icon-tile";
import { premiumSpring } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

/**
 * Ilustración de "plataforma gestionada": núcleo CloudBit conectado a cuatro paneles
 * (pipeline, clúster, observabilidad, seguridad). Muestra estados de una consola ficticia,
 * no métricas reales de la empresa. Las líneas se dibujan una sola vez al entrar en pantalla.
 */

// Centro de cada tarjeta en la grilla 2 × 3 (filas 1 y 3), en % del contenedor; el núcleo está en (50, 50)
const CONNECTORS = [
    { x: 25, y: 18 },
    { x: 75, y: 18 },
    { x: 25, y: 82 },
    { x: 75, y: 82 },
];

const POD_STATES = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const SPARKLINE = "M0 22 L10 18 L20 20 L30 12 L40 15 L50 9 L60 11 L70 6 L80 8 L90 4 L100 6";

export function PlatformIllustration() {
    const { u } = useLanguage();
    const copy = u.about.illustration;
    const reduceMotion = useReducedMotion();

    const reveal = (delay: number) => ({
        initial: reduceMotion ? false : { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "0px 0px -10% 0px" },
        transition: { ...premiumSpring, delay },
    });

    return (
        <div
            role="img"
            aria-label={copy.aria}
            className="relative w-full overflow-hidden rounded-3xl border border-nb-line bg-[#0a1324] p-4 sm:p-6"
        >
            {/* Fondo: grilla técnica + resplandor central */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(202,213,226,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(202,213,226,0.6) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_50%,rgba(9,93,189,0.35),transparent_70%)]" />

            {/* Conexiones núcleo → paneles */}
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="platform-line" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#7dd3fc" />
                        <stop offset="100%" stopColor="#095dbd" />
                    </linearGradient>
                </defs>
                {CONNECTORS.map((point, index) => (
                    <motion.line
                        key={index}
                        x1="50"
                        y1="50"
                        x2={point.x}
                        y2={point.y}
                        stroke="url(#platform-line)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        vectorEffect="non-scaling-stroke"
                        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.7 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 + index * 0.1 }}
                    />
                ))}
            </svg>

            <div className="relative grid h-full grid-cols-2 grid-rows-[1fr_auto_1fr] gap-3 sm:gap-4">
                {/* Pipeline CI/CD */}
                <motion.div {...reveal(0.1)} className="self-start">
                    <Panel icon={GitBranch} title={copy.pipeline}>
                        <ol className="space-y-1.5">
                            {copy.stages.map((stage) => (
                                <li key={stage} className="flex items-center gap-2 text-xs text-white/85">
                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                                        <Check className="h-3 w-3" strokeWidth={3} />
                                    </span>
                                    {stage}
                                </li>
                            ))}
                        </ol>
                    </Panel>
                </motion.div>

                {/* Clúster Kubernetes */}
                <motion.div {...reveal(0.18)} className="self-start">
                    <Panel icon={Boxes} title={copy.cluster}>
                        <div className="mb-2 grid grid-cols-6 gap-1">
                            {POD_STATES.map((_, index) => (
                                <span key={index} className="h-3 rounded-[3px] bg-gradient-to-br from-nb-sky to-nb-blue opacity-90" />
                            ))}
                        </div>
                        <p className="text-xs text-nb-text">
                            <span className="font-semibold text-white">12/12</span> {copy.pods}
                        </p>
                    </Panel>
                </motion.div>

                {/* Núcleo */}
                <motion.div {...reveal(0)} className="col-span-2 flex justify-center py-2">
                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-nb-sky/30 bg-[#0d1a30]/90 px-5 py-4 shadow-[0_0_40px_rgba(66,162,254,0.25)] backdrop-blur-md">
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-nb-sky to-nb-blue text-white shadow-[0_10px_30px_rgba(9,93,189,0.45)]">
                            <Cloud className="h-7 w-7" strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-semibold text-white">{copy.hub}</span>
                        <div className="flex items-center gap-3" aria-hidden="true">
                            <Image src="/images/tech/aws.svg" alt="" width={28} height={28} className="h-6 w-7 object-contain" />
                            <Image src="/images/tech/azure.svg" alt="" width={24} height={24} className="h-5 w-5 object-contain" />
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill={`#${siKubernetes.hex}`}>
                                <path d={siKubernetes.path} />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                {/* Observabilidad */}
                <motion.div {...reveal(0.26)} className="self-end">
                    <Panel icon={Gauge} title={copy.observability}>
                        <svg viewBox="0 0 100 26" className="mb-2 h-8 w-full" preserveAspectRatio="none" aria-hidden="true">
                            <defs>
                                <linearGradient id="platform-spark" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#42a2fe" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#42a2fe" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d={`${SPARKLINE} L100 26 L0 26 Z`} fill="url(#platform-spark)" />
                            <path d={SPARKLINE} fill="none" stroke="#7dd3fc" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <p className="flex items-center gap-1.5 text-xs text-nb-text">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            {copy.latency}
                        </p>
                    </Panel>
                </motion.div>

                {/* Seguridad */}
                <motion.div {...reveal(0.34)} className="self-end">
                    <Panel icon={ShieldCheck} title={copy.security}>
                        <div className="mb-2 flex gap-1">
                            {[0, 1, 2, 3, 4].map((index) => (
                                <span key={index} className="h-1.5 flex-1 rounded-full bg-emerald-400/70" />
                            ))}
                        </div>
                        <p className="flex items-center gap-1.5 text-xs text-nb-text">
                            <Check className="h-3.5 w-3.5 text-emerald-300" strokeWidth={3} />
                            {copy.securityStatus}
                        </p>
                    </Panel>
                </motion.div>
            </div>
        </div>
    );
}

function Panel({
    icon,
    title,
    children,
    className,
}: {
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "group rounded-2xl border border-nb-line bg-[#0d1a30]/90 p-3 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-nb-sky/40 hover:shadow-[0_0_30px_rgba(66,162,254,0.15)] sm:p-4",
                className
            )}
        >
            <div className="mb-3 flex items-center gap-2">
                <IconTile icon={icon} size="sm" />
                <span className="text-xs font-semibold leading-tight text-white sm:text-sm">{title}</span>
            </div>
            {children}
        </div>
    );
}
