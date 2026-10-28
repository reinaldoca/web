"use client";

import { notFound } from "next/navigation";
import { Check, Quote } from "lucide-react";
import { getCases, getCase } from "@/lib/content/cases";
import { useLanguage } from "@/components/language-provider";
import { PageHero } from "@/components/site/page-hero";
import { CaseCard } from "@/components/site/content-blocks";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";
import { CTA } from "@/app/components/CTA";

/** Detalle de caso: cliente → necesidades → qué hicimos → resultados → testimonio → más casos. */
export function CaseView({ slug }: { slug: string }) {
    const { u, language } = useLanguage();
    const copy = u.casePage;
    const item = getCase(slug, language);
    if (!item) notFound();
    const others = getCases(language).filter((other) => other.slug !== item.slug);

    return (
        <>
            <PageHero
                breadcrumbs={[
                    { label: u.common.home, href: "/" },
                    { label: u.casesPage.breadcrumb, href: "/casos-de-exito" },
                    { label: item.industry },
                ]}
                label={item.industry}
                title={item.title}
                description={item.summary}
            >
                <dl className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
                    <div>
                        <dt className="text-nb-text">{copy.size}</dt>
                        <dd className="font-semibold text-white">{item.size}</dd>
                    </div>
                    <div>
                        <dt className="text-nb-text">{copy.duration}</dt>
                        <dd className="font-semibold text-white">{item.duration}</dd>
                    </div>
                    <div>
                        <dt className="text-nb-text">{copy.technologies}</dt>
                        <dd className="font-semibold text-white">{item.tags.join(" · ")}</dd>
                    </div>
                </dl>
            </PageHero>

            {/* Sobre el cliente + necesidades */}
            <section className="py-16 md:py-24">
                <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <FadeIn>
                        <SectionHeader align="left" label={copy.clientLabel} title={copy.clientTitle} className="mb-6" />
                        <p className="text-lg leading-relaxed text-nb-text">{item.about}</p>
                    </FadeIn>
                    <FadeIn delay={0.1} className="nb-panel p-8">
                        <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-nb-sky">{copy.needs}</h3>
                        <ul className="space-y-4">
                            {item.needs.map((need) => (
                                <li key={need} className="flex items-start gap-3 text-white/90">
                                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-nb-sky" aria-hidden="true" />
                                    {need}
                                </li>
                            ))}
                        </ul>
                    </FadeIn>
                </div>
            </section>

            {/* Qué hicimos */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <FadeIn>
                        <SectionHeader label={copy.workLabel} title={copy.workTitle} />
                    </FadeIn>
                    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {item.work.map((work, index) => (
                            <StaggerItem key={work.title} className="h-full">
                                <SpotlightCard className="p-7" radius={350}>
                                    <span className="mb-6 block font-mono text-sm text-nb-sky">{String(index + 1).padStart(2, "0")}</span>
                                    <h3 className="mb-3 text-lg font-semibold">{work.title}</h3>
                                    <p className="text-sm leading-relaxed text-nb-text">{work.description}</p>
                                </SpotlightCard>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* Resultados */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <FadeIn>
                        <SectionHeader label={copy.resultsLabel} title={copy.resultsTitle} />
                    </FadeIn>
                    <Stagger className="grid grid-cols-2 overflow-hidden rounded-3xl border border-nb-line lg:grid-cols-4">
                        {item.results.map((result, index) => (
                            <StaggerItem
                                key={result.label}
                                className={`border-nb-line bg-nb-surface p-8 md:p-10 ${index % 2 === 1 ? "border-l" : ""} ${index > 1 ? "border-t lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}
                            >
                                <div className="mb-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">{result.value}</div>
                                <p className="text-sm text-nb-text">{result.label}</p>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* Testimonio */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <FadeIn className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-nb-sky/30 bg-gradient-to-br from-nb-blue/30 to-nb-blue/5 p-10 text-center md:p-16">
                        <Quote className="mx-auto mb-6 h-10 w-10 text-nb-sky" aria-hidden="true" />
                        <blockquote className="mb-6 text-xl font-semibold leading-relaxed text-white md:text-2xl">
                            {item.testimonial.quote}
                        </blockquote>
                        <p className="text-sm text-nb-text">{item.testimonial.role}</p>
                    </FadeIn>
                </div>
            </section>

            {/* Más casos */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <FadeIn>
                        <SectionHeader label={copy.moreLabel} title={copy.moreTitle} />
                    </FadeIn>
                    <Stagger className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
                        {others.map((other) => (
                            <StaggerItem key={other.slug} className="h-full">
                                <CaseCard item={other} />
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            <CTA />
        </>
    );
}
