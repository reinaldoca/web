"use client";

import { GradientButton } from "@/components/ui/gradient-button";
import { PlatformIllustration } from "@/components/site/platform-illustration";
import { AboutVideo } from "@/components/site/about-video";

/** Visual de la columna derecha: "video" (devops-globe.mp4) o "illustration" (panel de plataforma). */
const ABOUT_VISUAL: "video" | "illustration" = "video";
import { useLanguage } from "@/components/language-provider";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";

/**
 * "Nosotros" + franja de KPIs (equivalente a section__kpi de la referencia).
 */
export function AboutModern() {
    const { t, u } = useLanguage();

    const metrics = [
        t.about.stats.experience,
        t.about.stats.projects,
        t.about.stats.experts,
        t.about.stats.support,
    ];

    return (
        <section id="nosotros" className="relative overflow-hidden py-20 md:py-32 scroll-mt-28">
            <div className="container relative z-10">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <FadeIn>
                        <SectionHeader
                            align="left"
                            label={u.about.label}
                            title={t.about.title}
                            className="mb-6 md:mb-8"
                        />
                        <p className="mb-4 text-lg leading-relaxed text-nb-text">
                            {t.about.description1}
                        </p>
                        <p className="mb-10 text-lg leading-relaxed text-nb-text">
                            {t.about.description2}
                        </p>
                        <GradientButton href="/#contacto">{t.about.teamBtn}</GradientButton>
                    </FadeIn>

                    <FadeIn delay={0.1} className="relative">
                        <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-nb-blue/25 blur-3xl" />
                        {ABOUT_VISUAL === "video" ? (
                            // El video es 16:9: el recuadro toma esa proporción para no recortarlo
                            <div className="relative flex aspect-video w-full">
                                <AboutVideo src="/videos/devops-globe.mp4" />
                            </div>
                        ) : (
                            <div className="relative flex min-h-[420px] sm:min-h-[480px] lg:h-[560px]">
                                <PlatformIllustration />
                            </div>
                        )}
                    </FadeIn>
                </div>

                {/* KPIs */}
                <Stagger className="mt-20 grid grid-cols-2 overflow-hidden rounded-3xl border border-nb-line lg:grid-cols-4 md:mt-28">
                    {metrics.map((metric, index) => (
                        <StaggerItem
                            key={metric.label}
                            className={`bg-nb-surface p-8 md:p-10 ${index > 0 ? "lg:border-l" : ""} ${index % 2 === 1 ? "border-l lg:border-l" : ""} ${index > 1 ? "border-t lg:border-t-0" : ""} border-nb-line`}
                        >
                            <div className="mb-2 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                                <AnimatedCounter value={metric.value} duration={2000} />
                            </div>
                            <p className="text-sm leading-snug text-nb-text">{metric.label}</p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
