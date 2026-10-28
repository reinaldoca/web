"use client";

import Image from "next/image";
import { siKubernetes } from "simple-icons";
import { useLanguage } from "@/components/language-provider";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";

/** Logos de las plataformas (mismas fuentes que TrustBar). */
const platformLogos = [
    <Image key="aws" src="/images/tech/aws.svg" alt="" width={44} height={44} className="h-11 w-11 object-contain" />,
    <Image key="azure" src="/images/tech/azure.svg" alt="" width={44} height={44} className="h-11 w-11 object-contain" />,
    <svg key="k8s" viewBox="0 0 24 24" className="h-10 w-10" fill={`#${siKubernetes.hex}`}>
        <path d={siKubernetes.path} />
    </svg>,
];

/**
 * Certificaciones del equipo en AWS, Azure y Kubernetes.
 * Solo afirma certificaciones de personas: CloudBit no declara estatus de partner oficial.
 */
export function CertificationsSection() {
    const { u } = useLanguage();
    const copy = u.certifications;

    return (
        <section className="relative py-20 md:py-28">
            <div className="container">
                <FadeIn>
                    <SectionHeader
                        label={copy.label}
                        title={copy.title}
                        description={copy.description}
                    />
                </FadeIn>

                <Stagger className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
                    {copy.cards.map((name, index) => (
                        <StaggerItem key={name} className="h-full">
                            <SpotlightCard className="flex flex-col items-center p-8 text-center" radius={300}>
                                <div
                                    aria-hidden="true"
                                    className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-nb-line bg-white/[0.06] shadow-[0_10px_30px_rgba(9,93,189,0.2)] transition-colors duration-300 group-hover:border-nb-sky/40 group-hover:bg-white/[0.1]"
                                >
                                    {platformLogos[index]}
                                </div>
                                <h3 className="text-sm font-semibold">{name}</h3>
                            </SpotlightCard>
                        </StaggerItem>
                    ))}
                </Stagger>

                <FadeIn className="text-center">
                    <div className="inline-flex flex-col items-center gap-2 rounded-full border border-nb-line bg-nb-surface px-6 py-4 sm:flex-row sm:gap-4">
                        <span className="text-3xl font-extrabold text-nb-sky">15+</span>
                        <p className="text-sm text-white/85 md:text-base">
                            {copy.stat}
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
