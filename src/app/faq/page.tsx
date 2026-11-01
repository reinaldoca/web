import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SiteShell } from "@/components/site/site-shell";
import { allFaqs } from "@/lib/content/faq";
import { FaqView } from "./faq-view";

export const metadata: Metadata = pageMetadata({
    title: "Preguntas frecuentes | CloudBit",
    description: "Respuestas sobre migración, operación, DevOps, datos e IA y cómo trabajamos.",
    path: "/faq",
});

export default function FaqPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };

    return (
        <SiteShell>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <FaqView />
        </SiteShell>
    );
}
