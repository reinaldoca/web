"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Shield, Zap, Users, Target, CheckCircle2 } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { FlipCard } from "@/components/ui/flip-card";
import { useLanguage } from "@/components/language-provider";

const icons = [Shield, Zap, Users, Target];

export function WhyChooseUs() {
    const { t } = useLanguage();

    return (
        <section id="elegirnos" className="py-16 md:py-24 bg-[#F8F9FA]">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <ScrollAnimation animation="fade-in">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-slate-900">
                            {t.whyUs.title}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            {t.whyUs.subtitle}
                        </p>
                    </ScrollAnimation>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {t.whyUs.reasons.map((reason: { title: string; description: string }, index: number) => {
                        const Icon = icons[index];
                        return (
                            <ScrollAnimation key={index} animation="scale-up" delay={index * 100} duration={500}>
                                <FlipCard
                                    className="h-full min-h-[280px]"
                                    front={
                                        <Card className="h-full text-center group border border-slate-100">
                                            <CardHeader className="h-full flex flex-col justify-center">
                                                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0052CC]/10 text-[#0052CC] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#0052CC] group-hover:text-white group-hover:shadow-xl group-hover:shadow-[#0052CC]/30 animate-bounce-slow">
                                                    <Icon className="h-8 w-8" />
                                                </div>
                                                <CardTitle className="text-xl mb-2">{reason.title}</CardTitle>
                                                <CardDescription className="text-base">
                                                    {reason.description}
                                                </CardDescription>
                                                <p className="text-xs text-muted-foreground mt-4 opacity-70">
                                                    Hover para más detalles
                                                </p>
                                            </CardHeader>
                                        </Card>
                                    }
                                    back={
                                        <Card className="h-full bg-[#0052CC] text-white hover:scale-100 hover:translate-y-0 hover:shadow-none hover:border-transparent">
                                            <CardHeader className="h-full flex flex-col justify-center">
                                                <CardTitle className="text-xl mb-4 text-center">{reason.title}</CardTitle>
                                                <div className="space-y-2">
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm">Soluciones personalizadas</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm">Soporte 24/7</p>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm">Tecnología de punta</p>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    }
                                />
                            </ScrollAnimation>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
