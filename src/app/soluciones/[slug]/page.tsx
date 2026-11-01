import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { solutions, getSolution } from "@/lib/content/solutions";
import { SiteShell } from "@/components/site/site-shell";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { SolutionView } from "./solution-view";

interface SolutionPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
    const { slug } = await params;
    const solution = getSolution(slug);
    if (!solution) return {};
    return pageMetadata({
        title: `${solution.title} | CloudBit`,
        description: solution.intro,
        path: `/soluciones/${slug}`,
    });
}

export default async function SolutionPage({ params }: SolutionPageProps) {
    const { slug } = await params;
    const solution = getSolution(slug);
    if (!solution) notFound();

    return (
        <SiteShell>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={jsonLd(
                    breadcrumbSchema([{ name: solution.title, path: `/soluciones/${slug}` }]),
                )}
            />
            <SolutionView slug={slug} />
        </SiteShell>
    );
}
