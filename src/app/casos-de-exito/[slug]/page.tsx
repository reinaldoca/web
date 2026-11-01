import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cases, getCase } from "@/lib/content/cases";
import { SiteShell } from "@/components/site/site-shell";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { CaseView } from "./case-view";

interface CasePageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
    const { slug } = await params;
    const item = getCase(slug);
    if (!item) return {};
    return pageMetadata({
        title: `${item.industry}: caso de éxito | CloudBit`,
        description: item.summary,
        path: `/casos-de-exito/${slug}`,
    });
}

export default async function CasePage({ params }: CasePageProps) {
    const { slug } = await params;
    const item = getCase(slug);
    if (!item) notFound();

    return (
        <SiteShell>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={jsonLd(
                    breadcrumbSchema([
                        { name: "Casos de éxito", path: "/casos-de-exito" },
                        { name: item.industry, path: `/casos-de-exito/${slug}` },
                    ]),
                )}
            />
            <CaseView slug={slug} />
        </SiteShell>
    );
}
