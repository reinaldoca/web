"use client";

import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { GradientButton } from "@/components/ui/gradient-button";

export function ThanksView() {
    const { u } = useLanguage();
    const copy = u.thanksPage;

    return (
        <section className="nb-hero-bg flex min-h-[80vh] items-center pt-32 pb-20">
            <div className="container text-center">
                <span className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-nb-sky/15 text-nb-sky ring-1 ring-nb-sky/30">
                    <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                </span>
                <h1 className="mb-5 text-4xl font-extrabold tracking-tight md:text-6xl">
                    <span className="nb-gradient-text">{copy.title}</span>
                </h1>
                <p className="mx-auto mb-10 max-w-xl text-lg text-nb-text">{copy.text}</p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <GradientButton href="/casos-de-exito">{copy.cases}</GradientButton>
                    <GradientButton href="/" variant="outline">
                        {copy.home}
                    </GradientButton>
                </div>
            </div>
        </section>
    );
}
