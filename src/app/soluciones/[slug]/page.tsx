import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { solutions, getSolution } from "@/lib/content/solutions";
import { SiteShell } from "@/components/site/site-shell";
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
    return {
        title: `${solution.title} | CloudBit`,
        description: solution.intro,
    };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
    const { slug } = await params;
    if (!getSolution(slug)) notFound();

    return (
        <SiteShell>
            <SolutionView slug={slug} />
        </SiteShell>
    );
}
