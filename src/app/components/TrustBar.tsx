"use client";

import { useLanguage } from "@/components/language-provider";

/**
 * Barra de confianza mostrando tecnologías core de CloudBit
 * Layout: scroll infinito horizontal con mask gradient
 */
export function TrustBar() {
    const { t } = useLanguage();

    const technologies = [
        { name: "AWS", icon: "☁️" },
        { name: "Azure", icon: "🔷" },
        { name: "Kubernetes", icon: "☸️" },
        { name: "Docker", icon: "🐋" },
        { name: "Terraform", icon: "🏗️" },
        { name: "GitLab CI", icon: "🦊" },
        { name: "Prometheus", icon: "📊" },
        { name: "Grafana", icon: "📈" },
    ];

    return (
        <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-100 overflow-hidden">
            <div className="container">
                <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
                    Tecnologías que dominamos
                </p>

                {/* Infinite scroll container */}
                <div className="relative">
                    {/* Gradient masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                    {/* Scrolling logos */}
                    <div className="flex overflow-hidden">
                        <div className="flex animate-scroll">
                            {[...technologies, ...technologies].map((tech, index) => (
                                <div
                                    key={`${tech.name}-${index}`}
                                    className="flex items-center gap-3 px-8 py-4 mx-4 rounded-xl bg-white border border-slate-200 shadow-sm min-w-[180px]"
                                >
                                    <span className="text-3xl" role="img" aria-label={tech.name}>
                                        {tech.icon}
                                    </span>
                                    <span className="font-semibold text-slate-700 whitespace-nowrap">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
