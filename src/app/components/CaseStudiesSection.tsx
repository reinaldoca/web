"use client";

import { getCases } from "@/lib/content/cases";
import { useLanguage } from "@/components/language-provider";
import { SectionHeader } from "@/components/ui/section-header";
import { GradientButton } from "@/components/ui/gradient-button";
import { CaseCard } from "@/components/site/content-blocks";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";

/**
 * Casos de éxito en la home: cards que llevan al detalle de cada caso.
 */
export function CaseStudiesSection() {
    const { u, language } = useLanguage();
    const copy = u.casesSection;

    return (
        <section className="relative py-20 md:py-32">
            <div aria-hidden="true" className="nb-glow absolute inset-0" />
            <div className="container relative z-10">
                <FadeIn>
                    <SectionHeader label={copy.label} title={copy.title} description={copy.description} />
                </FadeIn>

                <Stagger className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-3">
                    {getCases(language).map((item) => (
                        <StaggerItem key={item.slug} className="h-full">
                            <CaseCard item={item} />
                        </StaggerItem>
                    ))}
                </Stagger>

                <FadeIn className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <GradientButton href="/casos-de-exito">{copy.viewAll}</GradientButton>
                    <GradientButton href="/contacto" variant="outline">
                        {u.common.freeDiagnosis}
                    </GradientButton>
                </FadeIn>
            </div>
        </section>
    );
}
