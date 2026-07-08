"use client";

import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { TiltCard } from "@/components/ui/tilt-card";
import { useLanguage } from "@/components/language-provider";
import { getFeaturedServices } from "@/lib/services-data";
import { ArrowRight } from "lucide-react";

export function Services() {
    const { t, language } = useLanguage();
    const services = getFeaturedServices(language);

    return (
        <section id="servicios" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background with gradient mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />

            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="container relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <ScrollAnimation animation="fade-in">
                        <div className="inline-block mb-4">
                            <span className="text-sm font-semibold text-[#0052CC] uppercase tracking-wider px-4 py-2 rounded-full bg-[#0052CC]/10 backdrop-blur-sm">
                                Nuestros Servicios
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {t.services.title}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                            {t.services.subtitle}
                        </p>
                    </ScrollAnimation>
                </div>

                {/* Grid de 3 columnas */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <ScrollAnimation
                            key={index}
                            animation="slide-up"
                            delay={index * 100}
                            duration={600}
                        >
                            <Link href={`/servicios/${service.id}`} className="block h-full group">
                                <TiltCard className="h-full" tiltMaxAngle={5} scale={1.03}>
                                    <Card className="flex flex-col h-full cursor-pointer relative overflow-hidden border-slate-200/60 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-[#0052CC]/10 hover:-translate-y-1">
                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC]/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Top accent line */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0052CC] via-blue-500 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                        <CardHeader className="relative z-10 pb-4">
                                            <div className="mb-5 relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] to-indigo-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                                                <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0052CC] to-indigo-600 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-2xl group-hover:shadow-[#0052CC]/30">
                                                    <service.icon className="h-8 w-8" />
                                                </div>
                                            </div>
                                            <CardTitle className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors duration-300">
                                                {service.title}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="flex-1 relative z-10 pb-4">
                                            <CardDescription className="text-base text-slate-600 leading-relaxed">
                                                {service.shortDescription}
                                            </CardDescription>
                                        </CardContent>

                                        <CardFooter className="flex flex-col gap-4 pt-4 relative z-10 border-t border-slate-100">
                                            <div className="flex flex-wrap gap-2 w-full">
                                                {service.tags.slice(0, 3).map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="font-normal text-xs bg-slate-100 text-slate-700 hover:bg-[#0052CC]/10 hover:text-[#0052CC] transition-colors"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {service.tags.length > 3 && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="font-normal text-xs bg-slate-100 text-slate-700"
                                                    >
                                                        +{service.tags.length - 3}
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="flex items-center text-sm font-semibold text-[#0052CC] w-full group-hover:gap-2 transition-all duration-300">
                                                <span>Ver más</span>
                                                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </TiltCard>
                            </Link>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
}
