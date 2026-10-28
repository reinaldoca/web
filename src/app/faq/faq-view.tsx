"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getFaqCategories } from "@/lib/content/faq";
import { useLanguage } from "@/components/language-provider";
import { PageHero } from "@/components/site/page-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GradientButton } from "@/components/ui/gradient-button";
import { premiumSpring } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

/** FAQ por categorías: pestañas laterales + acordeón. */
export function FaqView() {
    const { u, language } = useLanguage();
    const copy = u.faqPage;
    const faqCategories = getFaqCategories(language);
    // Los ids de categoría son iguales en ambos idiomas, así que la pestaña activa se conserva
    const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
    const reduceMotion = useReducedMotion();
    const category = faqCategories.find((item) => item.id === activeCategory) ?? faqCategories[0];

    return (
        <>
            <PageHero
                breadcrumbs={[{ label: u.common.home, href: "/" }, { label: copy.breadcrumb }]}
                label={copy.label}
                title={copy.title}
                description={copy.description}
            />

            <section className="pb-20 md:pb-28">
                <div className="container grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
                    <div role="tablist" aria-label={copy.categoriesAria} aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:flex-col lg:self-start lg:overflow-visible">
                        {faqCategories.map((item) => (
                            <button
                                key={item.id}
                                role="tab"
                                aria-selected={item.id === activeCategory}
                                onClick={() => setActiveCategory(item.id)}
                                className={cn(
                                    "flex shrink-0 items-center justify-between gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                                    item.id === activeCategory
                                        ? "bg-nb-blue/25 text-white ring-1 ring-nb-sky/40"
                                        : "text-nb-text hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {item.name}
                                <span className="text-xs text-nb-text">{item.items.length}</span>
                            </button>
                        ))}
                    </div>

                    <div role="tabpanel">
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                                key={category.id}
                                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={premiumSpring}
                            >
                                <h2 className="mb-6 text-2xl font-bold">{category.name}</h2>
                                <Accordion type="single" collapsible className="space-y-3">
                                    {category.items.map((faq, index) => (
                                        <AccordionItem
                                            key={faq.id}
                                            value={faq.id}
                                            className="rounded-2xl border border-nb-line bg-nb-surface px-6 transition-colors hover:border-nb-sky/40 data-[state=open]:border-nb-sky/40 data-[state=open]:bg-nb-blue/10"
                                        >
                                            <AccordionTrigger className="py-5 text-left text-base font-semibold text-white hover:no-underline md:text-lg">
                                                <span className="mr-4 font-mono text-sm text-nb-sky">{String(index + 1).padStart(2, "0")}</span>
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-5 pl-10 text-base leading-relaxed text-nb-text">{faq.answer}</AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </motion.div>
                        </AnimatePresence>

                        <div className="nb-panel mt-12 flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-lg font-semibold text-white">{copy.ctaTitle}</p>
                                <p className="text-sm text-nb-text">{copy.ctaText}</p>
                            </div>
                            <GradientButton href="/contacto">{copy.ctaButton}</GradientButton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
