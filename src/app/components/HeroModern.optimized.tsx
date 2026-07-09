"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion, useMediaQuery } from "@/hooks/useReducedMotion";

/**
 * VERSIÓN OPTIMIZADA DEL HERO
 * - Usa useReducedMotion para accesibilidad
 * - Ajusta partículas según el tamaño de pantalla
 * - Deshabilita cursor glow en mobile
 */
export function HeroModernOptimized() {
    const { t } = useLanguage();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const shouldReduceMotion = useReducedMotion();
    const { isMobile, isDesktop } = useMediaQuery();

    // Ajustar cantidad de partículas según dispositivo
    const particleCount = isMobile ? 5 : isDesktop ? 20 : 12;

    useEffect(() => {
        // Solo trackear mouse en desktop
        if (!isDesktop) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isDesktop]);

    // Configuración de animación basada en preferencias
    const animationConfig = shouldReduceMotion
        ? { duration: 0, repeat: 0 }
        : { duration: 8, repeat: Infinity, ease: "easeInOut" };

    return (
        <section className="relative w-full overflow-hidden pt-20 pb-32 md:h-screen flex items-center">
            {/* Animated Abstract Background with Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
                {/* Animated Grid */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                />

                {/* Glow Orbs - Solo si no hay preferencia de movimiento reducido */}
                {!shouldReduceMotion && (
                    <>
                        {/* Glow Orb 1 - Blue */}
                        <motion.div
                            className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
                            style={{
                                background: "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0) 70%)",
                            }}
                            animate={{
                                x: [0, 100, 0],
                                y: [0, -50, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={animationConfig}
                            initial={{ top: "20%", left: "10%" }}
                        />

                        {/* Glow Orb 2 - Violet */}
                        <motion.div
                            className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
                            style={{
                                background: "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(124, 58, 237, 0) 70%)",
                            }}
                            animate={{
                                x: [0, -80, 0],
                                y: [0, 80, 0],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{ ...animationConfig, duration: 10 }}
                            initial={{ top: "50%", right: "15%" }}
                        />

                        {/* Glow Orb 3 - Cyan */}
                        <motion.div
                            className="absolute w-80 h-80 rounded-full blur-3xl opacity-20"
                            style={{
                                background: "radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, rgba(6, 182, 212, 0) 70%)",
                            }}
                            animate={{
                                x: [0, 50, 0],
                                y: [0, -70, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ ...animationConfig, duration: 7 }}
                            initial={{ bottom: "10%", left: "30%" }}
                        />
                    </>
                )}

                {/* Interactive Cursor Glow - Solo desktop */}
                {isDesktop && !shouldReduceMotion && (
                    <motion.div
                        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
                            left: mousePosition.x - 192,
                            top: mousePosition.y - 192,
                        }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    />
                )}

                {/* Floating Particles - Cantidad adaptativa */}
                {!shouldReduceMotion && [...Array(particleCount)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="container relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                    className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm px-6 py-2 text-sm font-semibold text-blue-300 mb-8"
                >
                    {t.hero.badge}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
                    className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl mb-6"
                >
                    <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                        {t.hero.title}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.4 }}
                    className="text-xl text-slate-300 max-w-3xl mb-10 leading-relaxed"
                >
                    {t.hero.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Button
                        size="lg"
                        className="text-lg px-8 h-14 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                        asChild
                    >
                        <Link href="/#servicios">{t.hero.servicesBtn}</Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 h-14 border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition-all hover:scale-105"
                        asChild
                    >
                        <Link href="/#contacto">{t.hero.contactBtn}</Link>
                    </Button>
                </motion.div>

                {/* Scroll Indicator - Solo si no hay movimiento reducido */}
                {!shouldReduceMotion && !isMobile && (
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center pt-2">
                            <motion.div
                                className="w-1.5 h-3 bg-blue-400 rounded-full"
                                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
