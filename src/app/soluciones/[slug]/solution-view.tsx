"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { getSolution } from "@/lib/content/solutions";
import { getServices } from "@/lib/services-data";
import { getCases } from "@/lib/content/cases";
import { PageHero } from "@/components/site/page-hero";
import { SignalsChecklist } from "@/components/site/signals-checklist";
import { StepsTimeline } from "@/components/site/steps-timeline";
import { FeatureGrid, QuoteBand, StagesGrid, CaseCard } from "@/components/site/content-blocks";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { IconTile } from "@/components/ui/icon-tile";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";
import { CTA } from "@/app/components/CTA";

export function SolutionView({ slug }: { slug: string }) {
    const { u, language } = useLanguage();
    const copy = u.solutionPage;
    const solution = getSolution(slug, language);
    if (!solution) notFound();

    const related = getServices(language).filter((service) => solution.relatedServiceIds.includes(service.id));
    const relatedCases = getCases(language).filter((item) => item.solutionSlug === solution.slug);

    return (
        <>
            <PageHero
                breadcrumbs={[{ label: u.common.home, href: "/" }, { label: u.common.solutions }, { label: solution.title }]}
                label={solution.tagline}
                title={solution.title}
                description={solution.intro}
                cta={{ label: u.common.talkToSpecialist, href: "/contacto" }}
            />

            <SignalsChecklist signals={solution.signals} />

            <FeatureGrid label={copy.benefitsLabel} title={copy.benefitsTitle(solution.title)} items={solution.benefits} />

            <StepsTimeline title={copy.timelineTitle} description={copy.timelineDescription} steps={solution.steps} />

            <section className="py-20 md:py-28">
                <div className="container">
                    <FadeIn>
                        <SectionHeader label={copy.servicesLabel} title={copy.servicesTitle} />
                    </FadeIn>
                    <Stagger className="grid gap-5 md:grid-cols-3">
                        {related.map((service) => (
                            <StaggerItem key={service.id} className="h-full">
                                <Link href={`/servicios/${service.id}`} className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nb-sky">
                                    <SpotlightCard className="flex flex-col p-7">
                                        <div className="mb-6 flex items-start justify-between">
                                            <IconTile icon={service.icon} />
                                            <ArrowUpRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-nb-sky" aria-hidden="true" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                                        <p className="line-clamp-3 text-sm leading-relaxed text-nb-text">{service.shortDescription}</p>
                                    </SpotlightCard>
                                </Link>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            <QuoteBand quote={solution.quote} />

            <StagesGrid stages={solution.stages} />

            {relatedCases.length > 0 && (
                <section className="py-20 md:py-28">
                    <div className="container">
                        <FadeIn>
                            <SectionHeader label={copy.casesLabel} title={copy.casesTitle} />
                        </FadeIn>
                        <Stagger className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
                            {relatedCases.map((item) => (
                                <StaggerItem key={item.slug} className="h-full">
                                    <CaseCard item={item} />
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                </section>
            )}

            <CTA />
        </>
    );
}
