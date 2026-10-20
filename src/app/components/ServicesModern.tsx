"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { getFeaturedServices } from "@/lib/services-data";
import { SectionHeader } from "@/components/ui/section-header";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ServicesModern() {
    const { t, language } = useLanguage();
    const services = getFeaturedServices(language);
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="servicios" className="py-20 md:py-32 relative overflow-hidden bg-white">
            {/* Technical grid background - subtle */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />

            {/* Gradient accent - matrix-style greens/blues instead of generic violet */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-[#3b82f6]/5" />

            <div className="container relative z-10">
                {/* Terminal-style header */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                    <SectionHeader
                        label="Servicios"
                        title={t.services.title}
                        description={t.services.subtitle}
                    />
                </motion.div>

                {/* Pipeline nodes grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <PipelineServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface PipelineServiceCardProps {
    service: any;
    index: number;
}

/**
 * Service card styled as CI/CD pipeline node
 * Replaces generic rounded cards with technical DevOps aesthetic
 */
function PipelineServiceCard({ service, index }: PipelineServiceCardProps) {
    const shouldReduceMotion = useReducedMotion();

    // Assign status based on index for visual variety
    const statuses = ["success", "running", "success"] as const;
    const status = statuses[index % statuses.length];

    const statusColors = {
        success: "border-[#8b5cf6] hover:shadow-[#8b5cf6]/20",
        running: "border-[#3b82f6] hover:shadow-[#3b82f6]/20",
    };

    const statusBg = {
        success: "from-[#8b5cf6]/20 to-[#8b5cf6]/10",
        running: "from-[#3b82f6]/20 to-[#3b82f6]/10",
    };

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: shouldReduceMotion ? 0 : index * 0.1 }}
            className="h-full"
        >
            <Link
                href={`/servicios/${service.id}`}
                className="block h-full group"
            >
                <div
                    className={`
                        relative h-full min-h-[380px] p-8
                        bg-white border-l-4 ${statusColors[status]}
                        hover:shadow-2xl transition-all duration-300
                    `}
                >
                    {/* Status indicator - technical label */}
                    <div className="absolute top-4 right-4">
                        <span className="font-mono text-xs text-[#8B949E] uppercase tracking-wider">
                            {status}
                        </span>
                    </div>

                    {/* Icon - technical style */}
                    <div className="mb-6">
                        <div
                            className={`
                                inline-flex h-14 w-14 items-center justify-center
                                rounded-lg bg-gradient-to-br ${statusBg[status]}
                                transition-transform duration-300 group-hover:scale-105
                            `}
                        >
                            <service.icon className="h-7 w-7 text-[#24292F]" />
                        </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-3 text-[#24292F] group-hover:text-[#8b5cf6] transition-colors">
                        {service.title}
                    </h3>

                    <p className="text-[#57606A] leading-relaxed mb-6 text-sm md:text-base line-clamp-4">
                        {service.shortDescription}
                    </p>

                    {/* Technical tags - monospace style */}
                    <div className="flex flex-wrap gap-2">
                        {service.tags.slice(0, 3).map((tag: string) => (
                            <span
                                key={tag}
                                className="font-mono text-xs px-2 py-1 rounded bg-[#161B22] text-[#8B949E] group-hover:bg-[#8b5cf6]/10 group-hover:text-[#8b5cf6] transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA - simple terminal style */}
                    <div className="mt-6 font-mono text-sm font-semibold text-[#8b5cf6] flex items-center gap-2">
                        <span>view --details</span>
                        <span aria-hidden="true">→</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
