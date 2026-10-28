import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/lib/content/blog";
import { SiteShell } from "@/components/site/site-shell";
import { PostView } from "./post-view";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return {};
    return { title: `${post.title} | CloudBit`, description: post.excerpt };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { "@type": "Organization", name: "CloudBit" },
    };

    return (
        <SiteShell>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <PostView slug={slug} />
        </SiteShell>
    );
}
