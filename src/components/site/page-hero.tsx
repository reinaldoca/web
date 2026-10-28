"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/fade-in";
import { GradientButton } from "@/components/ui/gradient-button";
import { useLanguage } from "@/components/language-provider";

interface PageHeroProps {
    breadcrumbs: { label: string; href?: string }[];
    label?: string;
    title: string;
    description?: string;
    cta?: { label: string; href: string };
    children?: React.ReactNode;
}

/** Hero de páginas internas: migas, etiqueta, título y bajada con entrada escalonada. */
export function PageHero({ breadcrumbs, label, title, description, cta, children }: PageHeroProps) {
    const { u } = useLanguage();
    return (
        <section className="nb-hero-bg relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-nb-dark" />
            <Stagger onMount className="container relative z-10">
                <StaggerItem>
                    <nav aria-label={u.common.breadcrumbs} className="mb-8">
                        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-nb-text">
                            {breadcrumbs.map((crumb, index) => (
                                <li key={crumb.label} className="flex items-center gap-1.5">
                                    {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
                                    {crumb.href ? (
                                        <Link href={crumb.href} className="transition-colors hover:text-white">
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span aria-current="page" className="text-white/90">{crumb.label}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                </StaggerItem>

                {label && (
                    <StaggerItem>
                        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-nb-line bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-nb-sky">
                            {label}
                        </span>
                    </StaggerItem>
                )}

                <StaggerItem>
                    <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
                        <span className="nb-gradient-text">{title}</span>
                    </h1>
                </StaggerItem>

                {description && (
                    <StaggerItem>
                        <p className="max-w-2xl text-lg leading-relaxed text-nb-text md:text-xl">{description}</p>
                    </StaggerItem>
                )}

                {cta && (
                    <StaggerItem className="mt-10">
                        <GradientButton href={cta.href} className="h-13 px-7">
                            {cta.label}
                        </GradientButton>
                    </StaggerItem>
                )}

                {children && <StaggerItem className="mt-12">{children}</StaggerItem>}
            </Stagger>
        </section>
    );
}
