"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { SectionHeader } from "@/components/ui/section-header";
import { TerminalButton } from "@/components/ui/terminal-button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * FAQ Section with Schema.org markup and deep linking support
 * Supports URL params like ?faq=migration-time to auto-open specific FAQ
 */
export function FAQSection() {
    const shouldReduceMotion = useReducedMotion();
    const [openItem, setOpenItem] = useState<string | undefined>(undefined);

    const faqs = [
        {
            id: "migration-time",
            question: "¿Cuánto toma una migración a cloud?",
            answer: "Depende del tamaño y complejidad de tu infraestructura actual, pero migraciones estándar toman entre 4-8 semanas, incluyendo una fase de estabilización de 2 semanas. Durante el proceso trabajamos con sprints semanales para asegurar entregables medibles y minimizar riesgos. Para aplicaciones más complejas o legacy, el tiempo puede extenderse, pero siempre con un roadmap claro desde el día 1.",
        },
        {
            id: "latam-coverage",
            question: "¿Trabajan con empresas fuera de Argentina?",
            answer: "Sí, trabajamos con clientes en toda Latinoamérica. Operamos en zona horaria LATAM (GMT-3 a GMT-5), lo que facilita la comunicación y colaboración con equipos en Argentina, Chile, México, Colombia, Perú y otros países de la región. Nuestras videoconferencias, sprints y reportes están adaptados a horarios comerciales de LATAM.",
        },
        {
            id: "internal-team",
            question: "¿Qué pasa si ya tengo equipo DevOps interno?",
            answer: "Podemos trabajar en tres modalidades: (1) Colaboración directa con tu equipo, aportando expertise especializado en áreas específicas, (2) Capacitación y transferencia de conocimiento para autonomía de tu equipo, o (3) Staffing temporal para proyectos específicos que requieren escalar rápidamente. La elección depende de tus necesidades y objetivos.",
        },
        {
            id: "support-24-7",
            question: "¿Proveen soporte 24/7?",
            answer: "Sí, ofrecemos planes de soporte 24/7 con SLA definido para clientes enterprise con ambientes productivos críticos. El soporte incluye monitoreo proactivo, alertas inteligentes, respuesta ante incidentes y escalamiento según severidad. Para proyectos estándar, ofrecemos soporte en horario laboral LATAM con tiempos de respuesta < 2 horas.",
        },
        {
            id: "consultation-cost",
            question: "¿Cuál es el costo de una consulta inicial?",
            answer: "La primera consulta técnica es completamente gratuita y sin compromiso. Dura entre 30-45 minutos e incluye una llamada con un arquitecto cloud senior para entender tu stack actual, objetivos y pain points. Al finalizar, te enviaremos un email con recomendaciones iniciales (diagnóstico breve de 3 páginas). Si decidís avanzar, preparamos una propuesta técnica detallada en 3-5 días hábiles.",
        },
        {
            id: "certifications",
            question: "¿Qué certificaciones tiene el equipo?",
            answer: "Nuestro equipo cuenta con 15+ ingenieros certificados en las principales plataformas cloud. Incluye: 5× AWS Solutions Architect Associate, 3× AWS DevOps Engineer Professional, 4× Azure Administrator Associate, 2× Azure Solutions Architect Expert, 3× CKA (Certified Kubernetes Administrator), 2× CKAD, 4× GitLab Certified DevOps Professional, y 2× Terraform Associate. Además, somos AWS Select Tier Partner y Microsoft Silver Partner.",
        },
    ];

    // Deep linking: Auto-open FAQ from URL parameter (client-side only)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const faqParam = urlParams.get("faq");
            if (faqParam) {
                setOpenItem(faqParam);
                // Scroll to FAQ section after opening
                setTimeout(() => {
                    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        }
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

            <section id="faq" className="py-20 md:py-32 bg-white scroll-mt-20">
                <div className="container">
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                        <SectionHeader
                            label="FAQ"
                            title="Preguntas frecuentes"
                            description="Respuestas a las dudas más comunes sobre nuestros servicios, procesos y certificaciones."
                        />
                    </motion.div>

                    <ScrollAnimation animation="fade-up" duration={600} delay={200}>
                        <div className="max-w-4xl mx-auto">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full space-y-4"
                                value={openItem}
                                onValueChange={setOpenItem}
                            >
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={faq.id}
                                        value={faq.id}
                                        className="border-2 border-[#30363D] rounded-lg px-6 bg-white hover:border-[#3FB950]/50 transition-colors"
                                    >
                                        <AccordionTrigger className="text-lg text-[#24292F] hover:no-underline hover:text-[#3FB950] font-[family-name:var(--font-display)]">
                                            <span className="text-[#8B949E] mr-3 font-mono text-sm">Q{index + 1}:</span>
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-base text-[#57606A] leading-relaxed pl-12">
                                            <span className="text-[#3FB950] font-mono text-sm">A:</span> {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </ScrollAnimation>

                    {/* CTA */}
                    <ScrollAnimation animation="scale-up" duration={600} delay={400}>
                        <div className="mt-16 text-center">
                            <p className="text-lg text-[#57606A] mb-6 font-mono">
                                $ cloudbit --support --level=enterprise
                            </p>
                            <TerminalButton
                                variant="primary"
                                icon="terminal"
                                href="/#contacto"
                            >
                                Agendar consulta gratuita
                            </TerminalButton>
                        </div>
                    </ScrollAnimation>
                </div>
            </section>
        </>
    );
}
