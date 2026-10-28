"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";
import type { CaseStudy } from "@/lib/content/cases";
import { categoryLabel, type BlogPost } from "@/lib/content/blog";
import { useLanguage } from "@/components/language-provider";

/** Grilla de beneficios / "qué incluye" con cards spotlight numeradas. */
export function FeatureGrid({
    label,
    title,
    description,
    items,
}: {
    label: string;
    title: string;
    description?: string;
    items: { title: string; description: string }[];
}) {
    return (
        <section className="py-20 md:py-28">
            <div className="container">
                <FadeIn>
                    <SectionHeader label={label} title={title} description={description} />
                </FadeIn>
                <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, index) => (
                        <StaggerItem key={item.title} className="h-full">
                            <SpotlightCard className="flex flex-col p-7" radius={350}>
                                <span className="mb-6 font-mono text-sm text-nb-sky">{String(index + 1).padStart(2, "0")}</span>
                                <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-nb-text">{item.description}</p>
                            </SpotlightCard>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/** Franja de frase destacada (equivalente a section__frase). */
export function QuoteBand({ quote }: { quote: string }) {
    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <FadeIn className="relative mx-auto max-w-4xl text-center">
                    <Quote className="mx-auto mb-8 h-10 w-10 text-nb-sky/60" aria-hidden="true" />
                    <p className="text-2xl font-semibold leading-snug tracking-tight text-white md:text-4xl">{quote}</p>
                    <div aria-hidden="true" className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-nb-sky to-transparent" />
                </FadeIn>
            </div>
        </section>
    );
}

/** Etapas con entregables (equivalente a section__etapas). */
export function StagesGrid({ stages }: { stages: { name: string; deliverables: string[] }[] }) {
    const { u } = useLanguage();
    return (
        <section className="py-20 md:py-28">
            <div className="container">
                <FadeIn>
                    <SectionHeader label={u.stages.label} title={u.stages.title} />
                </FadeIn>
                <Stagger className="grid gap-5 md:grid-cols-3">
                    {stages.map((stage, index) => (
                        <StaggerItem key={stage.name} className="h-full">
                            <div className="nb-panel h-full p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-nb-sky to-nb-blue text-sm font-bold text-white">
                                        {index + 1}
                                    </span>
                                    <h3 className="text-xl font-bold">{stage.name}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {stage.deliverables.map((deliverable) => (
                                        <li key={deliverable} className="flex items-start gap-3 text-sm text-white/85">
                                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-nb-sky" aria-hidden="true" />
                                            {deliverable}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/** Card de listado de casos de éxito. */
export function CaseCard({ item }: { item: CaseStudy }) {
    return (
        <Link href={`/casos-de-exito/${item.slug}`} className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nb-sky">
            <SpotlightCard className="flex flex-col p-7">
                <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full border border-nb-line px-3 py-1 text-xs font-semibold text-nb-sky">{item.industry}</span>
                    <ArrowUpRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-nb-sky" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-lg font-semibold leading-snug">{item.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-nb-text">{item.summary}</p>
                <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-nb-line pt-5">
                    {item.results.slice(0, 2).map((result) => (
                        <div key={result.label}>
                            <dd className="text-xl font-bold text-white">{result.value}</dd>
                            <dt className="text-xs text-nb-text">{result.label}</dt>
                        </div>
                    ))}
                </dl>
            </SpotlightCard>
        </Link>
    );
}

export function formatDate(iso: string, locale: string) {
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00`));
}

/** Card de listado del blog. */
export function BlogCard({ post }: { post: BlogPost }) {
    const { u, language } = useLanguage();
    return (
        <Link href={`/blog/${post.slug}`} className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nb-sky">
            <SpotlightCard className="flex flex-col p-7" radius={400}>
                <div className="mb-5 flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-nb-blue/25 px-3 py-1 font-semibold text-nb-sky">{categoryLabel(post.category, language)}</span>
                    <span className="text-nb-text">{u.common.readingTime(post.readingMinutes)}</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold leading-snug transition-colors group-hover:text-nb-sky">{post.title}</h3>
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-nb-text">{post.excerpt}</p>
                <time dateTime={post.date} className="mt-auto text-xs text-nb-text">
                    {formatDate(post.date, u.common.dateLocale)}
                </time>
            </SpotlightCard>
        </Link>
    );
}
