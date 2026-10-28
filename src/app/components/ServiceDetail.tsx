"use client";

import { notFound } from "next/navigation";
import { CheckCircle2, Users } from "lucide-react";
import { getServiceById } from "@/lib/services-data";
import { getServiceExtras } from "@/lib/content/service-extras";
import { useLanguage } from "@/components/language-provider";
import { PageHero } from "@/components/site/page-hero";
import { SignalsChecklist } from "@/components/site/signals-checklist";
import { StepsTimeline } from "@/components/site/steps-timeline";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { IconTile } from "@/components/ui/icon-tile";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";
import { CTA } from "@/app/components/CTA";

interface ServiceDetailProps {
    slug: string;
}

/**
 * Plantilla de servicio: hero → señales → qué incluye → proceso → para quién → contacto.
 */
export function ServiceDetail({ slug }: ServiceDetailProps) {
    const { t, u, language } = useLanguage();
    const copy = u.servicePage;
    const service = getServiceById(slug, language);

    if (!service) {
        notFound();
    }

    const extras = getServiceExtras(service.id, language);

    return (
        <>
            <PageHero
                breadcrumbs={[
                    { label: u.common.home, href: "/" },
                    { label: t.header.services, href: "/#servicios" },
                    { label: service.title },
                ]}
                title={service.title}
                description={service.fullDescription}
                cta={{ label: t.servicePage.consultation, href: "/contacto" }}
            >
                <div className="flex flex-wrap items-center gap-3">
                    <IconTile icon={service.icon} size="lg" />
                    {service.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-nb-line px-3 py-1 text-sm text-white/80">
                            {tag}
                        </span>
                    ))}
                </div>
            </PageHero>

            <SignalsChecklist signals={extras.signals} />

            {/* Qué incluye */}
            <section className="py-20 md:py-28">
                <div className="container">
                    <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                        <FadeIn>
                            <SectionHeader align="left" label={copy.includesLabel} title={t.servicePage.features} className="mb-8" />
                            <div className="rounded-2xl border border-nb-sky/30 bg-gradient-to-b from-nb-blue/25 to-nb-blue/5 p-8">
                                <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-nb-sky">{t.servicePage.benefits}</h3>
                                <ul className="space-y-4">
                                    {service.benefits.map((benefit) => (
                                        <li key={benefit} className="flex items-start gap-3 text-white/90">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nb-sky" aria-hidden="true" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                        <Stagger className="grid content-start gap-3 sm:grid-cols-2">
                            {service.features.map((feature) => (
                                <StaggerItem key={feature}>
                                    <div className="flex h-full items-start gap-3 rounded-2xl border border-nb-line bg-nb-surface p-5 transition-colors duration-300 hover:border-nb-sky/40">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-nb-sky" aria-hidden="true" />
                                        <span className="text-sm font-medium leading-relaxed text-white/90">{feature}</span>
                                    </div>
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                </div>
            </section>

            <StepsTimeline title={copy.timelineTitle} steps={extras.steps} />

            {/* Para quién */}
            <section className="py-20 md:py-28">
                <div className="container">
                    <FadeIn>
                        <SectionHeader label={copy.audienceLabel} title={copy.audienceTitle} />
                    </FadeIn>
                    <Stagger className="grid gap-5 md:grid-cols-3">
                        {extras.audience.map((item) => (
                            <StaggerItem key={item.title} className="h-full">
                                <SpotlightCard className="p-7" radius={350}>
                                    <Users className="mb-5 h-6 w-6 text-nb-sky" aria-hidden="true" />
                                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm leading-relaxed text-nb-text">{item.description}</p>
                                </SpotlightCard>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            <CTA />
        </>
    );
}
