"use client";

import { NumberedSection } from "@/components/ui/numbered-section";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { CopyButton } from "@/components/ui/copy-button";
import { GradientButton } from "@/components/ui/gradient-button";
import { CheckCircle2, Code, Rocket, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Sección de proceso con efectos inspirados en web de recursos
 * Muestra pasos numerados con animaciones suaves
 */
export function ProcessSection() {
    const shouldReduceMotion = useReducedMotion();

    const features = [
        {
            icon: Settings,
            title: "Configuración inicial",
            description: "Setup rápido y personalizado"
        },
        {
            icon: Code,
            title: "Implementación técnica",
            description: "Código limpio y documentado"
        },
        {
            icon: Rocket,
            title: "Deploy automatizado",
            description: "CI/CD desde el día uno"
        },
    ];

    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20" />

            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="text-center mb-20"
                >
                    <div className="hbadge mb-6 inline-flex">
                        <span>📋</span>
                        <span>Nuestro Proceso</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Cómo trabajamos contigo
                    </h2>
                    <p className="text-xl text-[var(--tx2)] max-w-3xl mx-auto">
                        Un proceso claro, paso a paso, para transformar tu infraestructura
                    </p>
                </motion.div>

                {/* Pasos numerados */}
                <div className="max-w-4xl mx-auto space-y-0">
                    <NumberedSection
                        number="01"
                        title="Diagnóstico y Planificación"
                        description="Analizamos tu infraestructura actual, identificamos cuellos de botella y diseñamos una estrategia de migración sin riesgos."
                        delay={0}
                    >
                        <EnhancedCard glowColor="purple" delay={0.2}>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Auditoría completa incluida</h4>
                                    <p className="text-[var(--tx2)]">
                                        Revisión de arquitectura, seguridad, costos y performance
                                    </p>
                                </div>
                            </div>
                        </EnhancedCard>
                    </NumberedSection>

                    <NumberedSection
                        number="02"
                        title="Implementación Ágil"
                        description="Trabajamos en sprints cortos con entregas incrementales. Verás resultados desde la primera semana."
                        delay={0.1}
                    >
                        <div className="grid md:grid-cols-3 gap-4">
                            {features.map((feature, index) => (
                                <EnhancedCard
                                    key={index}
                                    glowColor={index === 0 ? "purple" : index === 1 ? "blue" : "green"}
                                    delay={0.2 + index * 0.1}
                                >
                                    <feature.icon className="w-8 h-8 text-purple-600 mb-3" />
                                    <h5 className="font-semibold mb-2">{feature.title}</h5>
                                    <p className="text-sm text-[var(--tx2)]">{feature.description}</p>
                                </EnhancedCard>
                            ))}
                        </div>
                    </NumberedSection>

                    <NumberedSection
                        number="03"
                        title="Deploy y Monitoreo"
                        description="Desplegamos en producción con rollback automático. Configuramos observabilidad completa desde el día cero."
                        delay={0.2}
                    >
                        <div className="bg-slate-900 rounded-xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
                            <code className="text-green-400 font-mono text-sm block mb-4">
                                $ kubectl apply -f deployment.yaml
                                <br />
                                ✓ Deployment successful
                                <br />
                                ✓ Health checks passing
                                <br />
                                ✓ Monitoring configured
                            </code>
                            <CopyButton
                                textToCopy="kubectl apply -f deployment.yaml"
                                label="Copiar comando"
                                className="text-xs"
                            />
                        </div>
                    </NumberedSection>

                    <NumberedSection
                        number="04"
                        title="Capacitación y Documentación"
                        description="Tu equipo aprende a operar el nuevo sistema. Documentación técnica completa y runbooks para incidentes."
                        delay={0.3}
                    >
                        <EnhancedCard glowColor="blue" delay={0.4}>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">
                                        Incluido: 8 horas de training
                                    </h4>
                                    <p className="text-[var(--tx2)]">
                                        Sesiones prácticas con tu equipo técnico
                                    </p>
                                </div>
                                <GradientButton variant="gradient" href="/#contacto">
                                    Comenzar ahora
                                </GradientButton>
                            </div>
                        </EnhancedCard>
                    </NumberedSection>
                </div>

                {/* CTA Final */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl
                                    bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
                        <h3 className="text-2xl font-bold">¿Listo para empezar?</h3>
                        <p className="text-[var(--tx2)] max-w-md">
                            Agenda una consulta gratuita de 30 minutos y te mostraremos
                            cómo podemos ayudarte
                        </p>
                        <div className="flex gap-4">
                            <GradientButton variant="gradient" href="/#contacto">
                                Agendar consulta
                            </GradientButton>
                            <GradientButton variant="outline" href="/#servicios">
                                Ver servicios
                            </GradientButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
