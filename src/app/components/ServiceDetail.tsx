"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { getServiceById } from "@/lib/services-data";
import { useLanguage } from "@/components/language-provider";
import { notFound } from "next/navigation";

interface ServiceDetailProps {
    slug: string;
}

export function ServiceDetail({ slug }: ServiceDetailProps) {
    const { t, language } = useLanguage();
    const service = getServiceById(slug, language);

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-muted/30 overflow-hidden">
                <div className="container relative z-10">
                    <ScrollAnimation animation="fade-in" duration={700}>
                        <div className="flex flex-col items-start max-w-3xl">
                            <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all" asChild>
                                <Link href="/#servicios">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> {t.servicePage.back}
                                </Link>
                            </Button>
                            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary mb-6">
                                <Icon className="h-8 w-8" />
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
                                {service.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {service.fullDescription}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-8">
                                {service.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] opacity-5 pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-primary blur-[100px]" />
                </div>
            </section>

            {/* Features & Benefits */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Features */}
                        <ScrollAnimation animation="slide-in-left" duration={700} delay={200}>
                            <div>
                                <h2 className="text-2xl font-bold mb-8">{t.servicePage.features}</h2>
                                <div className="grid gap-4">
                                    {service.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <span className="font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollAnimation>

                        {/* Benefits */}
                        <ScrollAnimation animation="slide-in-right" duration={700} delay={400}>
                            <div className="bg-muted/50 rounded-2xl p-8 lg:p-10">
                                <h2 className="text-2xl font-bold mb-8">{t.servicePage.benefits}</h2>
                                <ul className="space-y-6">
                                    {service.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                                            <span className="text-lg">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-12 pt-8 border-t border-border/50">
                                    <h3 className="font-semibold mb-4">{t.servicePage.ready}</h3>
                                    <Button size="lg" className="w-full sm:w-auto" asChild>
                                        <Link href="/#contacto">{t.servicePage.consultation}</Link>
                                    </Button>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
