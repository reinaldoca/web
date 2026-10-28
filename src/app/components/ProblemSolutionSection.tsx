"use client";

import { Check, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";

/**
 * Contraste problemas vs. soluciones, en dos paneles de vidrio.
 */
export function ProblemSolutionSection() {
    const { u } = useLanguage();
    const copy = u.problemSolution;

    return (
        <section className="py-20 md:py-32">
            <div className="container">
                <FadeIn>
                    <SectionHeader label={copy.label} title={copy.title} description={copy.description} />
                </FadeIn>

                <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
                    <FadeIn delay={0.05} className="nb-panel p-8 md:p-10">
                        <h3 className="mb-8 text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
                            {copy.today}
                        </h3>
                        <ul className="space-y-5">
                            {copy.problems.map((problem) => (
                                <li key={problem} className="flex items-start gap-4">
                                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-400/30 bg-red-400/10 text-red-300">
                                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                                    </span>
                                    <p className="leading-relaxed text-nb-text">{problem}</p>
                                </li>
                            ))}
                        </ul>
                    </FadeIn>

                    <FadeIn
                        delay={0.15}
                        className="relative overflow-hidden rounded-2xl border border-nb-sky/30 bg-gradient-to-b from-nb-blue/25 to-nb-blue/5 p-8 md:p-10"
                    >
                        <h3 className="mb-8 text-sm font-semibold uppercase tracking-[0.14em] text-nb-sky">
                            {copy.withUs}
                        </h3>
                        <ul className="space-y-5">
                            {copy.solutions.map((solution) => (
                                <li key={solution} className="flex items-start gap-4">
                                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nb-sky text-nb-dark">
                                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                    </span>
                                    <p className="font-medium leading-relaxed text-white">{solution}</p>
                                </li>
                            ))}
                        </ul>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
