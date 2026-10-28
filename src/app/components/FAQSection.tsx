"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { GradientButton } from "@/components/ui/gradient-button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/components/language-provider";
import { getFaqCategories } from "@/lib/content/faq";

/**
 * FAQ Section with Schema.org markup and deep linking support
 * Supports URL params like ?faq=migration-time to auto-open specific FAQ
 */
export function FAQSection() {
    const [openItem, setOpenItem] = useState<string | undefined>(undefined);
    const { u, language } = useLanguage();
    const copy = u.faqSection;

    // Misma fuente que /faq: las primeras preguntas de cada categoría
    const faqs = getFaqCategories(language).flatMap((category) => category.items).slice(0, 6);

    // Deep linking: Auto-open FAQ from URL parameter (client-side only)
    useEffect(() => {
        const faqParam = new URLSearchParams(window.location.search).get("faq");
        if (!faqParam) return;
        // Se abre después del primer paint para no forzar un render en cascada dentro del efecto
        const timer = setTimeout(() => {
            setOpenItem(faqParam);
            document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Schema.org FAQPage markup for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };

    return (
        <>
            {/* Schema markup script */}
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section id="faq" className="py-20 md:py-32 scroll-mt-28">
                <div className="container">
                    <FadeIn>
                        <SectionHeader
                            label={copy.label}
                            title={copy.title}
                            description={copy.description}
                        />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="max-w-4xl mx-auto">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full space-y-3"
                                value={openItem}
                                onValueChange={setOpenItem}
                            >
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={faq.id}
                                        value={faq.id}
                                        className="rounded-2xl border border-nb-line bg-nb-surface px-6 transition-colors duration-300 hover:border-nb-sky/40 data-[state=open]:border-nb-sky/40 data-[state=open]:bg-nb-blue/10"
                                    >
                                        <AccordionTrigger className="py-5 text-left text-base font-semibold text-white hover:no-underline md:text-lg">
                                            <span className="mr-4 font-mono text-sm text-nb-sky">{String(index + 1).padStart(2, "0")}</span>
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-5 pl-10 text-base leading-relaxed text-nb-text">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </FadeIn>

                    {/* CTA */}
                    <FadeIn className="mt-16 text-center">
                        <GradientButton href="/contacto">{copy.cta}</GradientButton>
                    </FadeIn>
                </div>
            </section>
        </>
    );
}
