import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/lib/content/blog";
import { SiteShell } from "@/components/site/site-shell";
import { SITE_URL, breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";
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
    return pageMetadata({
        title: `${post.title} | CloudBit`,
        description: post.excerpt,
        path: `/blog/${slug}`,
        type: "article",
        publishedTime: post.date,
    });
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const url = `${SITE_URL}/blog/${slug}`;
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: `${SITE_URL}/opengraph-image`,
        inLanguage: "es",
        articleSection: post.category,
        wordCount: post.sections.reduce(
            (total, section) => total + section.paragraphs.join(" ").split(/\s+/).length,
            0,
        ),
        author: { "@type": "Organization", name: "CloudBit", url: SITE_URL },
        publisher: { "@id": `${SITE_URL}/#organization` },
    };

    return (
        <SiteShell>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={jsonLd([
                    schema,
                    breadcrumbSchema([
                        { name: "Blog", path: "/blog" },
                        { name: post.title, path: `/blog/${slug}` },
                    ]),
                ])}
            />
            <PostView slug={slug} />
        </SiteShell>
    );
}
