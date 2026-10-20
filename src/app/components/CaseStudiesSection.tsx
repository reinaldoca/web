"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { SectionHeader } from "@/components/ui/section-header";
import { GradientButton } from "@/components/ui/gradient-button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Case studies section styled as deployment logs
 * Shows successful deployments with metrics and outcomes
 */
export function CaseStudiesSection() {
    const shouldReduceMotion = useReducedMotion();

    const deployments = [
        {
            industry: "Fintech",
            size: "50-200 empleados",
            status: "DEPLOYED",
            timestamp: "2024-08-15T14:32:18Z",
            problem: "Infraestructura on-premise costosa, deploys manuales que tomaban 4-6 horas, falta de escalabilidad en picos de Black Friday.",
            solutions: [
                "Migración completa a AWS (EKS, RDS, ElastiCache)",
                "Implementación CI/CD con GitLab + ArgoCD",
                "Infraestructura como código con Terraform",
                "Observabilidad con Prometheus + Grafana",
            ],
            metrics: [
                { label: "COST_REDUCTION", value: "-35%", color: "text-[#8b5cf6]" },
                { label: "DEPLOY_TIME", value: "6h → 15min", color: "text-[#3b82f6]" },
                { label: "SCALE_CAPACITY", value: "3x traffic", color: "text-[#8b5cf6]" },
                { label: "MTTR", value: "<5min", color: "text-[#34d399]" },
            ],
            duration: "8 weeks",
            testimonial: "La migración fue impecable. Redujimos costos significativamente y ahora podemos escalar sin límites.",
            tags: ["AWS", "Kubernetes", "CI/CD", "Terraform"],
        },
        {
            industry: "SaaS B2B",
            size: "20-50 empleados",
            status: "SUCCESS",
            timestamp: "2024-09-22T09:15:43Z",
            problem: "Deploys manuales propensos a errores, falta de visibilidad operativa, equipo DevOps sobrecargado.",
            solutions: [
                "Implementación completa de pipelines CI/CD",
                "GitOps con ArgoCD para deployments declarativos",
                "Observabilidad full-stack (logs, métricas, traces)",
                "Capacitación del equipo interno",
            ],
            metrics: [
                { label: "DEPLOY_FREQ", value: "1/week → 15/day", color: "text-[#8b5cf6]" },
                { label: "FAILURE_RATE", value: "-80%", color: "text-[#8b5cf6]" },
                { label: "MTTR", value: "2h → 10min", color: "text-[#3b82f6]" },
                { label: "PRODUCTIVITY", value: "+40%", color: "text-[#34d399]" },
            ],
            duration: "6 weeks",
            testimonial: "Pasamos de deploys estresantes a entregas continuas sin fricción. Ahora el equipo se enfoca en features.",
            tags: ["DevOps", "GitOps", "Observabilidad"],
        },
        {
            industry: "E-commerce",
            size: "100-500 empleados",
            status: "OPTIMIZED",
            timestamp: "2024-07-10T16:48:52Z",
            problem: "Vulnerabilidades de seguridad detectadas en auditoría, falta de compliance PCI-DSS, arquitectura no escalable.",
            solutions: [
                "Implementación DevSecOps con escaneo automático",
                "Migración a arquitectura cloud-native en AWS",
                "Seguridad perimetral con WAF y Shield",
                "Certificación PCI-DSS Level 1",
            ],
            metrics: [
                { label: "VULNERABILITIES", value: "47 → 0", color: "text-[#8b5cf6]" },
                { label: "PCI_COMPLIANCE", value: "3 months", color: "text-[#3b82f6]" },
                { label: "UPTIME", value: "99.97%", color: "text-[#8b5cf6]" },
                { label: "COST_SAVINGS", value: "-28%", color: "text-[#34d399]" },
            ],
            duration: "12 weeks",
            testimonial: "El enfoque en seguridad desde el diseño nos permitió certificar PCI-DSS en tiempo récord.",
            tags: ["DevSecOps", "Security", "PCI-DSS", "AWS"],
        },
    ];

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                    <SectionHeader
                        label="Casos de éxito"
                        title="Resultados medibles para nuestros clientes"
                        description="Ayudamos a empresas de diferentes industrias a modernizar su infraestructura y acelerar su operación."
                    />
                </motion.div>

                {/* Deployment logs grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {deployments.map((deployment, index) => (
                        <ScrollAnimation
                            key={index}
                            animation="fade-up"
                            duration={600}
                            delay={200 + index * 100}
                        >
                            <div className="h-full flex flex-col bg-[#0D1117] border-2 border-[#30363D] p-6 hover:border-[#3FB950]/50 hover:shadow-2xl hover:shadow-[#3FB950]/10 transition-all duration-300">
                                {/* Log header - terminal style */}
                                <div className="mb-6 pb-4 border-b border-[#30363D]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-xs text-[#8B949E]">
                                            {deployment.timestamp}
                                        </span>
                                        <span className={`font-mono text-xs px-2 py-1 rounded ${
                                            deployment.status === "DEPLOYED" ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" :
                                            deployment.status === "SUCCESS" ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" :
                                            "bg-[#3b82f6]/20 text-[#3b82f6]"
                                        }`}>
                                            {deployment.status}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[#F0F6FC]">
                                            {deployment.industry}
                                        </h3>
                                        <span className="font-mono text-xs text-[#8B949E]">
                                            {deployment.size}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {deployment.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-mono text-xs px-2 py-0.5 bg-[#161B22] text-[#8B949E] rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Problem */}
                                <div className="mb-4">
                                    <h4 className="font-mono text-xs text-[#F85149] mb-2">
                                        ERROR:
                                    </h4>
                                    <p className="text-sm text-[#C9D1D9] leading-relaxed">
                                        {deployment.problem}
                                    </p>
                                </div>

                                {/* Solutions */}
                                <div className="mb-4">
                                    <h4 className="font-mono text-xs text-[#3b82f6] mb-2">
                                        SOLUTION:
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {deployment.solutions.map((solution, idx) => (
                                            <li key={idx} className="flex gap-2 text-xs text-[#C9D1D9]">
                                                <span className="text-[#8B949E]">→</span>
                                                <span>{solution}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Metrics - terminal dashboard style */}
                                <div className="mb-4 p-4 bg-[#161B22] rounded border border-[#30363D]">
                                    <h4 className="font-mono text-xs text-[#8b5cf6] mb-3">
                                        METRICS:
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {deployment.metrics.map((metric, idx) => (
                                            <div key={idx}>
                                                <div className="font-mono text-xs text-[#8B949E]">
                                                    {metric.label}
                                                </div>
                                                <div className={`font-mono text-sm font-bold ${metric.color}`}>
                                                    {metric.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-[#30363D]">
                                        <span className="font-mono text-xs text-[#8B949E]">
                                            DURATION: <span className="text-[#C9D1D9]">{deployment.duration}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Testimonial - code block style */}
                                <div className="mt-auto">
                                    <div className="p-3 bg-[#161B22] rounded border-l-2 border-[#3FB950]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle2 className="w-3 h-3 text-[#8b5cf6]" />
                                            <span className="font-mono text-xs text-[#8B949E]">
                                                CLIENT_FEEDBACK
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#C9D1D9] leading-relaxed">
                                            "{deployment.testimonial}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>

                {/* CTA */}
                <ScrollAnimation animation="scale-up" duration={600} delay={800}>
                    <div className="mt-16 text-center">
                        <GradientButton
                            variant="gradient"
                            href="/#contacto"
                        >
                            Agendar diagnóstico gratuito
                        </GradientButton>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
