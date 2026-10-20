"use client";

import { XCircle, CheckCircle2 } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

/**
 * Sección que contrasta problemas comunes vs soluciones de CloudBit
 * Layout: 2 columnas en desktop, stacked en mobile
 */
export function ProblemSolutionSection() {
    const problems = [
        "Deploys manuales que toman horas y generan errores",
        "Aplicaciones legacy lentas y difíciles de escalar",
        "Costos cloud que crecen sin control",
        "Falta de visibilidad cuando algo falla",
        "Equipo interno sobrecargado sin expertise cloud",
    ];

    const solutions = [
        "Automatizar CI/CD y reducir deploys a minutos",
        "Migrar a arquitecturas cloud-native escalables",
        "Optimizar infraestructura y reducir costos hasta 40%",
        "Implementar observabilidad y alertas inteligentes",
        "Aumentar capacidad sin contratar headcount",
    ];

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container">
                <ScrollAnimation animation="fade-up" duration={600}>
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900">
                        ¿Te suena familiar?
                    </h2>
                    <p className="text-center text-lg text-slate-600 max-w-2xl mx-auto mb-16">
                        Muchas empresas enfrentan estos desafíos. CloudBit te ayuda a resolverlos.
                    </p>
                </ScrollAnimation>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Problemas - Izquierda */}
                    <ScrollAnimation animation="slide-in-left" duration={600} delay={200}>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-red-600 mb-8">
                                Los problemas
                            </h3>
                            <ul className="space-y-5">
                                {problems.map((problem, index) => (
                                    <li key={index} className="flex gap-4 items-start">
                                        <div className="flex-shrink-0">
                                            <XCircle className="w-6 h-6 text-red-500" />
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            {problem}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollAnimation>

                    {/* Soluciones - Derecha */}
                    <ScrollAnimation animation="slide-in-right" duration={600} delay={400}>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-green-600 mb-8">
                                CloudBit te ayuda a:
                            </h3>
                            <ul className="space-y-5">
                                {solutions.map((solution, index) => (
                                    <li key={index} className="flex gap-4 items-start">
                                        <div className="flex-shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                                        </div>
                                        <p className="text-slate-700 leading-relaxed font-medium">
                                            {solution}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    );
}
