"use client";

import { useState } from "react";
import { getCases } from "@/lib/content/cases";
import { useLanguage } from "@/components/language-provider";
import { PageHero } from "@/components/site/page-hero";
import { CaseCard } from "@/components/site/content-blocks";
import { Stagger, StaggerItem } from "@/components/ui/fade-in";
import { CTA } from "@/app/components/CTA";
import { cn } from "@/lib/utils";

const ALL = "__all__";

export function CasesIndex() {
    const { u, language } = useLanguage();
    const copy = u.casesPage;
    const cases = getCases(language);
    const industries = Array.from(new Set(cases.map((item) => item.industry)));
    const [filter, setFilter] = useState(ALL);
    // Si el filtro activo no existe en el idioma actual (p. ej. "SaaS B2B" → "B2B SaaS"), se muestran todos
    const activeFilter = industries.includes(filter) ? filter : ALL;
    const visible = activeFilter === ALL ? cases : cases.filter((item) => item.industry === activeFilter);

    return (
        <>
            <PageHero
                breadcrumbs={[{ label: u.common.home, href: "/" }, { label: copy.breadcrumb }]}
                label={copy.label}
                title={copy.title}
                description={copy.description}
            />

            <section className="pb-20 md:pb-28">
                <div className="container">
                    <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={copy.filterAria}>
                        {[ALL, ...industries].map((industry) => (
                            <button
                                key={industry}
                                onClick={() => setFilter(industry)}
                                aria-pressed={activeFilter === industry}
                                className={cn(
                                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                                    activeFilter === industry
                                        ? "border-transparent bg-nb-sky text-nb-dark"
                                        : "border-nb-line text-white/80 hover:border-nb-sky/40 hover:text-white"
                                )}
                            >
                                {industry === ALL ? copy.all : industry}
                            </button>
                        ))}
                    </div>

                    <Stagger key={`${activeFilter}-${language}`} onMount className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {visible.map((item) => (
                            <StaggerItem key={item.slug} className="h-full">
                                <CaseCard item={item} />
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            <CTA />
        </>
    );
}
