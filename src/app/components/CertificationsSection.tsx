"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Shield, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Sección de certificaciones y partners oficiales
 * Muestra badges de AWS, Azure, Kubernetes y stack tecnológico
 */
export function CertificationsSection() {
    const certifications = [
        {
            name: "AWS Select Tier Partner",
            icon: Shield,
            color: "from-orange-500 to-yellow-500",
        },
        {
            name: "Microsoft Silver Partner",
            icon: Award,
            color: "from-blue-500 to-cyan-500",
        },
        {
            name: "Kubernetes Certified",
            icon: CheckCircle2,
            color: "from-indigo-500 to-purple-500",
        },
    ];

    const technologies = [
        { name: "AWS", icon: "☁️" },
        { name: "Azure", icon: "🔷" },
        { name: "Kubernetes", icon: "☸️" },
        { name: "Terraform", icon: "🏗️" },
        { name: "GitLab CI", icon: "🦊" },
        { name: "Docker", icon: "🐋" },
    ];

    return (
        <section className="py-16 md:py-24 bg-white border-y border-slate-100">
            <div className="container">
                <ScrollAnimation animation="fade-up" duration={600}>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D1117] backdrop-blur-sm mb-4">
                            <span className="text-sm font-mono font-semibold text-[#58A6FF]">
                                $ cloudbit --certifications
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                            Equipo certificado y partners oficiales
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Trabajamos con las principales plataformas cloud. Nuestro equipo cuenta con <strong>15+ ingenieros certificados</strong> en AWS, Azure y Kubernetes.
                        </p>
                    </div>
                </ScrollAnimation>

                {/* Badges de certificación */}
                <ScrollAnimation animation="fade-up" duration={600} delay={200}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02, y: -4 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="relative group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 hover:border-[#3FB950]/50 hover:shadow-xl"
                            >
                                {/* Gradient glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

                                <div className="relative z-10 text-center">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${cert.color} text-white mb-4`}>
                                        <cert.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-sm">
                                        {cert.name}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollAnimation>

                {/* Stack tecnológico */}
                <ScrollAnimation animation="fade-up" duration={600} delay={400}>
                    <div className="max-w-5xl mx-auto">
                        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
                            Stack tecnológico principal
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {technologies.map((tech, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#3FB950]/50 hover:bg-white transition-all duration-300 hover:-translate-y-1"
                                >
                                    <span className="text-4xl" role="img" aria-label={tech.name}>
                                        {tech.icon}
                                    </span>
                                    <span className="font-semibold text-sm text-slate-700">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollAnimation>

                {/* Estadística destacada */}
                <ScrollAnimation animation="scale-up" duration={600} delay={600}>
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#3FB950]/10 to-[#58A6FF]/10 border border-[#3FB950]/30">
                            <Award className="w-6 h-6 text-[#3FB950]" />
                            <p className="text-lg font-semibold text-slate-900">
                                <span className="text-2xl font-mono text-[#3FB950]">15+</span> ingenieros con certificaciones AWS, Azure, CKA/CKAD
                            </p>
                        </div>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
