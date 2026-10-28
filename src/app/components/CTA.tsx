"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useLanguage } from "@/components/language-provider";
import { FadeIn } from "@/components/ui/fade-in";
import { ContactFormInline } from "./ContactFormInline";

/**
 * Bloque de contacto: panel con haz azul, texto a la izquierda y formulario a la derecha
 * (mismo esquema que el formulario embebido de la referencia).
 */
export function CTA() {
    const { t, u } = useLanguage();
    const promises = u.cta.promises;

    return (
        <section id="contacto" className="py-20 md:py-32 scroll-mt-28">
            <div className="container">
                <FadeIn className="relative overflow-hidden rounded-[2rem] border border-nb-line">
                    <div aria-hidden="true" className="nb-hero-bg absolute inset-0" />
                    <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                        <div className="flex flex-col">
                            <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                                {t.cta.title}
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-nb-text">
                                {t.cta.description}
                            </p>
                            <ul className="mb-10 space-y-3">
                                {promises.map((promise) => (
                                    <li key={promise} className="flex items-center gap-3 text-white/90">
                                        <CheckCircle2 className="h-5 w-5 shrink-0 text-nb-sky" aria-hidden="true" />
                                        {promise}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto">
                                <p className="mb-3 text-sm text-nb-text">{t.cta.whatsappAlt}</p>
                                <Link
                                    href="https://wa.me/5491169044913"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-semibold text-[#25D366] transition-colors hover:text-[#5be38c]"
                                >
                                    <WhatsAppIcon className="h-5 w-5" />
                                    {u.whatsapp.open}
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-nb-line bg-nb-dark/70 p-6 backdrop-blur-md md:p-8">
                            <ContactFormInline />
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
