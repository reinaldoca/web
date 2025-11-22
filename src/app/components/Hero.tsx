"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { RevealText } from "@/components/ui/reveal-text";
import { useLanguage } from "@/components/language-provider";


import { InteractiveBackground } from "./InteractiveBackground";

export function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative w-full overflow-hidden pt-20 pb-32 md:p-0 md:h-screen">
            {/* Desktop Video Background */}
            <div className="hidden md:block absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="/images/cloudbit-video.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Mobile Interactive Background */}
            <div className="md:hidden absolute inset-0 w-full h-full z-0">
                <InteractiveBackground />
            </div>

            {/* Mobile Content (Restored from previous version) */}
            <div className="md:hidden container relative z-10 flex flex-col items-center text-center">
                <ScrollAnimation animation="fade-down">
                    <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-8">
                        {t.hero.badge}
                    </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={200}>
                    <RevealText
                        text={t.hero.title}
                        className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mb-6 text-gray-900"
                        delay={300}
                        duration={100}
                        type="word"
                    />
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={400}>
                    <p className="text-xl text-gray-700 max-w-2xl mb-10 leading-relaxed">
                        {t.hero.description}
                    </p>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-up" delay={600}>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button size="lg" className="text-lg px-8 h-12 transition-transform hover:scale-105 animate-float" asChild>
                            <Link href="/#servicios">
                                {t.hero.servicesBtn}
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 h-12 transition-transform hover:scale-105 animate-float" style={{ animationDelay: "0.5s" }} asChild>
                            <Link href="/#contacto">
                                {t.hero.contactBtn}
                            </Link>
                        </Button>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
