"use client";

import { Shield, Zap, Users, Target } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { IconTile } from "@/components/ui/icon-tile";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";

const icons = [Shield, Zap, Users, Target];

export function WhyChooseUs() {
    const { t, u } = useLanguage();

    return (
        <section id="elegirnos" className="py-20 md:py-28 scroll-mt-28">
            <div className="container">
                <FadeIn>
                    <SectionHeader
                        label={u.whyUs.label}
                        title={t.whyUs.title}
                        description={t.whyUs.subtitle}
                    />
                </FadeIn>

                <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {t.whyUs.reasons.map((reason: { title: string; description: string }, index: number) => {
                        const Icon = icons[index % icons.length];
                        return (
                            <StaggerItem key={reason.title} className="h-full">
                                <SpotlightCard className="flex min-h-[260px] flex-col p-7" radius={350}>
                                    <IconTile icon={Icon} className="mb-6" />
                                    <h3 className="mb-3 text-lg font-semibold">{reason.title}</h3>
                                    <p className="text-sm leading-relaxed text-nb-text">{reason.description}</p>
                                </SpotlightCard>
                            </StaggerItem>
                        );
                    })}
                </Stagger>
            </div>
        </section>
    );
}
