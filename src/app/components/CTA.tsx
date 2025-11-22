"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { useLanguage } from "@/components/language-provider";

export function CTA() {
    const { t } = useLanguage();

    return (
        <section id="contacto" className="py-20 md:py-32 bg-primary text-primary-foreground">
            <div className="container text-center">
                <ScrollAnimation animation="scale-up" duration={600}>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                        {t.cta.title}
                    </h2>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                        {t.cta.description}
                    </p>
                    <Button size="lg" variant="secondary" className="text-primary font-bold text-lg px-8 h-14 transition-transform hover:scale-105" asChild>
                        <Link href="mailto:contacto@cloudbit.com.ar">
                            {t.cta.btn}
                        </Link>
                    </Button>
                </ScrollAnimation>
            </div>
        </section>
    );
}
