"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siDocker, siGitlab, siGrafana, siKubernetes, siLinux, siPrometheus, siTerraform, type SimpleIcon } from "simple-icons";
import { FadeIn, Stagger, StaggerItem, premiumSpring } from "@/components/ui/fade-in";
import { useLanguage } from "@/components/language-provider";

/**
 * Logos oficiales:
 * - simple-icons (CC0) con el color de cada marca.
 * - AWS y Azure desde Devicon (MIT), en public/images/tech: simple-icons los retiró a pedido de las marcas.
 * Las marcas pertenecen a sus dueños; se muestran solo para indicar las tecnologías que usamos.
 */
type Technology = { name: string } & ({ icon: SimpleIcon } | { src: string });

const technologies: Technology[] = [
    { name: "AWS", src: "/images/tech/aws.svg" },
    { name: "Azure", src: "/images/tech/azure.svg" },
    { name: "Linux", icon: siLinux },
    { name: "Kubernetes", icon: siKubernetes },
    { name: "Docker", icon: siDocker },
    { name: "Terraform", icon: siTerraform },
    { name: "GitLab CI", icon: siGitlab },
    { name: "Prometheus", icon: siPrometheus },
    { name: "Grafana", icon: siGrafana },
];

function TechLogo({ tech }: { tech: Technology }) {
    if ("src" in tech) {
        return <Image src={tech.src} alt="" width={40} height={40} className="h-10 w-10 object-contain" aria-hidden="true" />;
    }
    return (
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill={`#${tech.icon.hex}`} aria-hidden="true">
            <path d={tech.icon.path} />
        </svg>
    );
}

/**
 * Franja de tecnologías core de CloudBit.
 * Estática a propósito (sin carrusel infinito); el énfasis queda en el hover.
 */
export function TrustBar() {
    const { u } = useLanguage();

    return (
        <section className="relative border-y border-nb-line py-12 md:py-16">
            <div className="container">
                <FadeIn>
                    <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-nb-text">
                        {u.trustBar.title}
                    </p>
                </FadeIn>

                {/* Filas centradas: con cualquier cantidad de logos no quedan huérfanos alineados a la izquierda */}
                <Stagger className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 sm:gap-3">
                    {technologies.map((tech) => (
                        <StaggerItem key={tech.name} className="w-24 sm:w-[6.25rem]">
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={premiumSpring}
                                className="group flex flex-col items-center gap-3 rounded-2xl border border-transparent px-1 py-5 sm:px-3 opacity-75 transition-[opacity,background-color,border-color] duration-300 hover:border-nb-line hover:bg-nb-surface hover:opacity-100"
                            >
                                <TechLogo tech={tech} />
                                <span className="whitespace-nowrap text-sm font-semibold text-white/80 group-hover:text-white">
                                    {tech.name}
                                </span>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
