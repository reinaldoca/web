"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { useEffect, useState } from "react";

import { AnimatedCounter } from "@/components/ui/animated-counter";

export function About() {
    const { t } = useLanguage();

    return (
        <section id="nosotros" className="py-16 md:py-24 bg-muted/50 relative overflow-hidden scroll-mt-28">
            <div className="container">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    {/* Text Content - Higher Z-Index to prevent overlap */}
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                            {t.about.title}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            {t.about.description1}
                        </p>
                        <p className="text-lg text-muted-foreground mb-8">
                            {t.about.description2}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                                <div className="relative p-4 rounded-lg">
                                    <h3 className="text-4xl font-bold text-primary mb-2 animate-glow-pulse">
                                        <AnimatedCounter value={t.about.stats.experience.value} />
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{t.about.stats.experience.label}</p>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                                <div className="relative p-4 rounded-lg">
                                    <h3 className="text-4xl font-bold text-primary mb-2 animate-glow-pulse">
                                        <AnimatedCounter value={t.about.stats.projects.value} />
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{t.about.stats.projects.label}</p>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                                <div className="relative p-4 rounded-lg">
                                    <h3 className="text-4xl font-bold text-primary mb-2 animate-glow-pulse">
                                        <AnimatedCounter value={t.about.stats.experts.value} />
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{t.about.stats.experts.label}</p>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                                <div className="relative p-4 rounded-lg">
                                    <h3 className="text-4xl font-bold text-primary mb-2 animate-glow-pulse">
                                        <AnimatedCounter value={t.about.stats.support.value} />
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{t.about.stats.support.label}</p>
                                </div>
                            </div>
                        </div>
                        <Button size="lg" asChild>
                            <Link href="/#contacto">{t.about.teamBtn}</Link>
                        </Button>
                    </div>

                    {/* Image Content - Lower Z-Index */}
                    <div className="relative z-0 aspect-video lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl mt-8 lg:mt-0">
                        <Image
                            src="/images/corporate-team-new.png"
                            alt={t.about.imageLabel}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <p className="text-white font-medium text-lg">{t.about.imageLabel}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
