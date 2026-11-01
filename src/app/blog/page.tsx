import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SiteShell } from "@/components/site/site-shell";
import { BlogIndex } from "./blog-index";

export const metadata: Metadata = pageMetadata({
    title: "Blog | CloudBit",
    description: "Guías prácticas sobre Terraform, Docker, Kubernetes, GitOps, DevSecOps y AWS para equipos técnicos.",
    path: "/blog",
});

export default function BlogPage() {
    return (
        <SiteShell>
            <BlogIndex />
        </SiteShell>
    );
}
