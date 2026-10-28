"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { getSolutions } from "@/lib/content/solutions";
import { GradientButton } from "@/components/ui/gradient-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { IconTile } from "@/components/ui/icon-tile";
import { Stagger, StaggerItem } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

/**
 * Hero estilo nublit:
 * - fondo oscuro con haz azul radial desde abajo (sin loops infinitos)
 * - entrada escalonada badge → título → bajada → CTAs → cards
 * - fila de cards con las 4 soluciones como "pilares"
 */
export function HeroModernOptimized() {
    const { t, language } = useLanguage();
    const pillars = getSolutions(language);

    return (
        <section className="nb-hero-bg relative w-full overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
            {/* Grilla técnica muy sutil, se desvanece hacia abajo */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.07] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(202,213,226,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(202,213,226,0.5) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />
            {/* Fundido hacia la sección siguiente */}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-nb-dark" />

            <Stagger onMount className="container relative z-10 flex flex-col items-center text-center">
                <StaggerItem>
                    <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-nb-line bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
                        <Sparkles className="h-4 w-4 text-nb-sky" aria-hidden="true" />
                        {t.hero.badge}
                    </span>
                </StaggerItem>

                <StaggerItem>
                    <h1 className="mb-6 max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                        <span className="nb-gradient-text">{t.hero.title}</span>
                    </h1>
                </StaggerItem>

                <StaggerItem>
                    <p className="mb-10 max-w-2xl text-lg leading-relaxed text-nb-text md:text-xl">
                        {t.hero.description}
                    </p>
                </StaggerItem>

                <StaggerItem className="flex w-full flex-col items-center gap-4">
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <GradientButton href="/#contacto" className="h-14 px-8 text-base">
                            {t.hero.contactBtn}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </GradientButton>
                        <GradientButton href="/#servicios" variant="outline" className="h-14 px-8 text-base">
                            {t.hero.servicesBtn}
                        </GradientButton>
                    </div>
                    {t.hero.microcopy && (
                        <p className="text-sm text-nb-text">{t.hero.microcopy}</p>
                    )}
                </StaggerItem>

                {/* Pilares */}
                <div
                    className={cn(
                        "mt-16 grid w-full grid-cols-1 gap-4 text-left md:mt-24",
                        pillars.length === 4 ? "max-w-6xl sm:grid-cols-2 lg:grid-cols-4" : "max-w-5xl sm:grid-cols-3"
                    )}
                >
                    {pillars.map((pillar) => (
                        <StaggerItem key={pillar.slug}>
                            <Link href={`/soluciones/${pillar.slug}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nb-sky rounded-2xl">
                                <SpotlightCard className="p-6" radius={300}>
                                    <IconTile icon={pillar.icon} className="mb-4" />
                                    <h2 className="mb-2 text-base font-semibold">{pillar.title}</h2>
                                    <p className="line-clamp-2 text-sm leading-relaxed text-nb-text">
                                        {pillar.tagline}
                                    </p>
                                </SpotlightCard>
                            </Link>
                        </StaggerItem>
                    ))}
                </div>
            </Stagger>
        </section>
    );
}
