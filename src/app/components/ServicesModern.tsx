"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { getFeaturedServices, type ServiceData } from "@/lib/services-data";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { IconTile } from "@/components/ui/icon-tile";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";

export function ServicesModern() {
    const { t, u, language } = useLanguage();
    const services = getFeaturedServices(language);

    return (
        <section id="servicios" className="relative overflow-hidden py-20 md:py-32 scroll-mt-28">
            <div aria-hidden="true" className="nb-glow absolute inset-0" />

            <div className="container relative z-10">
                <FadeIn>
                    <SectionHeader
                        label={u.servicesSection.label}
                        title={t.services.title}
                        description={t.services.subtitle}
                    />
                </FadeIn>

                <Stagger className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <StaggerItem key={service.id} className="h-full">
                            <ServiceCard service={service} index={index} />
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
    const { u } = useLanguage();
    return (
        <Link
            href={`/servicios/${service.id}`}
            className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nb-sky"
        >
            <SpotlightCard className="flex min-h-[340px] flex-col p-8">
                <div className="mb-8 flex items-start justify-between">
                    <IconTile icon={service.icon} size="lg" />
                    <span className="font-mono text-sm text-white/25">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>

                <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>

                <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-nb-text md:text-base">
                    {service.shortDescription}
                </p>

                <div className="mt-auto flex items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {service.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-nb-line px-2.5 py-1 text-xs text-nb-text transition-colors group-hover:border-nb-sky/30 group-hover:text-white/90"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-nb-line text-white transition-all duration-300 group-hover:border-transparent group-hover:bg-nb-sky group-hover:text-nb-dark">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">{u.servicesSection.view(service.title)}</span>
                    </span>
                </div>
            </SpotlightCard>
        </Link>
    );
}
