"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { useLanguage } from "@/components/language-provider";
import { ContactFormInline } from "./ContactFormInline";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function CTA() {
    const { t } = useLanguage();

    return (
        <section id="contacto" className="py-20 md:py-32 bg-slate-50">
            <div className="container">
                <ScrollAnimation animation="fade-up" duration={600}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 text-slate-900">
                            {t.cta.title}
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-2">
                            {t.cta.description}
                        </p>
                    </div>
                </ScrollAnimation>

                {/* Formulario de contacto */}
                <ScrollAnimation animation="fade-up" duration={600} delay={200}>
                    <ContactFormInline />
                </ScrollAnimation>

                {/* Alternativa WhatsApp */}
                <div className="text-center mt-8">
                    <p className="text-slate-600 mb-4">
                        {t.cta.whatsappAlt}
                    </p>
                    <Link
                        href="https://wa.me/5491169044913"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Abrir WhatsApp
                    </Link>
                </div>
            </div>
        </section>
    );
}
