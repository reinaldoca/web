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

export function Services() {
    const { t, language } = useLanguage();
    const services = getFeaturedServices(language);

    return (
        <section id="servicios" className="py-16 md:py-24 bg-muted/50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <ScrollAnimation animation="fade-in">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                            {t.services.title}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            {t.services.subtitle}
                        </p>
                    </ScrollAnimation>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {services.map((service, index) => (
                        <ScrollAnimation key={index} animation="slide-up" delay={index * 150} duration={500}>
                            <Link href={`/servicios/${service.id}`} className="block h-full group">
                                <TiltCard className="h-full" tiltMaxAngle={8} scale={1.02}>
                                    <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-transparent group-hover:border-primary/30 relative overflow-hidden">
                                        {/* Animated gradient border effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />

                                        <CardHeader className="relative z-10">
                                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-xl group-hover:shadow-primary/50 animate-bounce-slow">
                                                <service.icon className="h-6 w-6" />
                                            </div>
                                            <CardTitle className="text-xl">{service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1 relative z-10">
                                            <CardDescription className="text-base">
                                                {service.shortDescription}
                                            </CardDescription>
                                        </CardContent>
                                        <CardFooter className="flex flex-wrap gap-2 pt-4 relative z-10">
                                            {service.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="font-normal">
                                                    {tag}
                                                </Badge>
                                            ))}
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
