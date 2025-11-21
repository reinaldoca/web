"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { useLanguage } from "@/components/language-provider";

export function Products() {
    const { t } = useLanguage();

    return (
        <section id="productos" className="py-16 md:py-24">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <ScrollAnimation animation="fade-in">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                            {t.products.title}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            {t.products.subtitle}
                        </p>
                    </ScrollAnimation>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {t.products.items.map((product, index) => (
                        <ScrollAnimation key={index} animation="slide-up" delay={index * 100} duration={500}>
                            <Card className="flex flex-col h-full border-primary/10 hover:border-primary/30 transition-colors">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge>{product.badge}</Badge>
                                    </div>
                                    <CardTitle className="text-2xl">{product.title}</CardTitle>
                                    <CardDescription>{product.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <ul className="space-y-2 text-sm">
                                        {product.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <Check className="h-4 w-4 text-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full group">
                                        {t.products.demoBtn}
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
}
