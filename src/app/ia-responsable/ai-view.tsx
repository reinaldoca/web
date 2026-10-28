"use client";

import { useLanguage } from "@/components/language-provider";
import { PageHero } from "@/components/site/page-hero";

/** Borrador propio de CloudBit: revisar con asesoría legal antes de publicar. */
export function ResponsibleAiView() {
    const { u } = useLanguage();
    const copy = u.aiPage;

    return (
        <>
            <PageHero
                breadcrumbs={[{ label: u.common.home, href: "/" }, { label: copy.breadcrumb }]}
                label={copy.label}
                title={copy.title}
                description={copy.description}
            />
            <section className="pb-20 md:pb-28">
                <div className="container max-w-3xl">
                    <ol className="space-y-6">
                        {copy.principles.map((principle, index) => (
                            <li key={index} className="nb-panel flex gap-6 p-8">
                                <span className="font-mono text-sm text-nb-sky">{String(index + 1).padStart(2, "0")}</span>
                                <div>
                                    <h2 className="mb-2 text-xl font-semibold">{principle.title}</h2>
                                    <p className="leading-relaxed text-nb-text">{principle.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <p className="mt-10 text-sm text-nb-text">{copy.updated}</p>
                </div>
            </section>
        </>
    );
}
