import type { Metadata } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { BlogIndex } from "./blog-index";

export const metadata: Metadata = {
    title: "Blog | CloudBit",
    description: "Guías prácticas sobre cloud, DevOps, operación y datos para equipos técnicos.",
};

export default function BlogPage() {
    return (
        <SiteShell>
            <BlogIndex />
        </SiteShell>
    );
}
