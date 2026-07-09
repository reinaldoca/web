"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { motion } from "framer-motion";

export function AboutModern() {
    const { t } = useLanguage();

    const stats = [
        {
            value: t.about.stats.experience.value,
            label: t.about.stats.experience.label,
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            value: t.about.stats.projects.value,
            label: t.about.stats.projects.label,
            gradient: "from-violet-500 to-purple-500",
        },
        {
            value: t.about.stats.experts.value,
            label: t.about.stats.experts.label,
            gradient: "from-indigo-500 to-blue-500",
        },
        {
            value: t.about.stats.support.value,
            label: t.about.stats.support.label,
            gradient: "from-cyan-500 to-teal-500",
        },
    ];

    return (
        <section id="nosotros" className="py-16 md:py-32 bg-white relative overflow-hidden scroll-mt-28">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />

            <div className="container relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-sm font-semibold text-[#0052CC] uppercase tracking-wider px-4 py-2 rounded-full bg-[#0052CC]/10 backdrop-blur-sm inline-block mb-6"
                        >
                            Sobre CloudBit
                        </motion.span>

                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {t.about.title}
                        </h2>

                        <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                            {t.about.description1}
                        </p>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            {t.about.description2}
                        </p>

                        {/* Stats Grid with Animated Counters */}
                        <div className="grid grid-cols-2 gap-6 mb-10">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="relative group border border-slate-200/80 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl hover:border-[#0052CC]/30"
                                >
                                    {/* Gradient Background on Hover */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                                    />

                                    {/* Animated Border Glow */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                                    />

                                    <div className="relative z-10">
                                        <h3 className={`text-5xl font-extrabold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                            <AnimatedCounter value={stat.value} duration={2500} />
                                        </h3>
                                        <p className="text-sm text-slate-600 font-medium leading-tight">
                                            {stat.label}
                                        </p>
                                    </div>

                                    {/* Corner Accent */}
                                    <motion.div
                                        className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300`}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-[#0052CC] to-blue-600 hover:from-[#0052CC]/90 hover:to-blue-700 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
                                asChild
                            >
                                <Link href="/#contacto">{t.about.teamBtn}</Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative z-0"
                    >
                        <div className="relative aspect-square lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                            {/* Glow Effect Behind Image */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-violet-500 opacity-20 blur-3xl" />

                            <motion.div
                                className="relative w-full h-full"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Image
                                    src="/images/corporate-team-new.png"
                                    alt={t.about.imageLabel}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="text-white font-semibold text-lg"
                                    >
                                        {t.about.imageLabel}
                                    </motion.p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
