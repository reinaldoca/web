"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { getFeaturedServices } from "@/lib/services-data";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function ServicesModern() {
    const { t, language } = useLanguage();
    const services = getFeaturedServices(language);

    return (
        <section id="servicios" className="py-20 md:py-32 relative overflow-hidden bg-slate-50">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />

            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-sm font-semibold text-[#0052CC] uppercase tracking-wider px-4 py-2 rounded-full bg-[#0052CC]/10 backdrop-blur-sm inline-block mb-4">
                        Nuestros Servicios
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
                        {t.services.title}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        {t.services.subtitle}
                    </p>
                </motion.div>

                {/* Grid Layout Uniforme - 3 columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <BentoCard
                            key={service.id}
                            service={service}
                            index={index}
                            isFeatured={false}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface BentoCardProps {
    service: any;
    index: number;
    isFeatured: boolean;
}

function BentoCard({ service, index, isFeatured }: BentoCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <Link
                href={`/servicios/${service.id}`}
                className="block h-full group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="relative h-full min-h-[420px] flex flex-col p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/60 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                    whileHover={{ y: -8 }}
                >
                    {/* Gradient Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#0052CC]/10 via-transparent to-indigo-500/10 opacity-0"
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Top Accent Line */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0052CC] via-blue-500 to-indigo-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ transformOrigin: "left" }}
                    />

                    {/* Icon with Glow Effect */}
                    <div className="relative mb-6">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#0052CC] to-indigo-600 rounded-2xl blur-lg opacity-0"
                            animate={{ opacity: isHovered ? 0.5 : 0.2 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0052CC] to-indigo-600 text-white shadow-lg"
                            animate={{
                                scale: isHovered ? 1.15 : 1,
                                rotate: isHovered ? 5 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <service.icon className="h-8 w-8" />
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col flex-1">
                        <h3
                            className={`font-bold mb-4 transition-colors duration-300 text-xl ${isHovered ? "text-[#0052CC]" : "text-slate-900"}`}
                        >
                            {service.title}
                        </h3>

                        <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base line-clamp-3 flex-1">
                            {service.shortDescription}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {service.tags.slice(0, 3).map((tag: string) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="font-normal text-xs bg-slate-100 text-slate-700 hover:bg-[#0052CC]/10 hover:text-[#0052CC] transition-colors"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.div
                            className="flex items-center text-sm font-semibold text-[#0052CC]"
                            animate={{ gap: isHovered ? "0.5rem" : "0.25rem" }}
                            transition={{ duration: 0.3 }}
                        >
                            <span>Ver más</span>
                            <motion.div
                                animate={{ x: isHovered ? 4 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ArrowRight className="h-4 w-4" />
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
