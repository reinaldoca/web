import { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";
import { solutions } from "@/lib/content/solutions";
import { cases } from "@/lib/content/cases";
import { blogPosts } from "@/lib/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://cloudbit.com.ar";
    const now = new Date();

    const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly", lastModified: Date = now) => ({
        url: `${baseUrl}${path}`,
        lastModified,
        changeFrequency,
        priority,
    });

    return [
        page("", 1),
        page("/contacto", 0.9),
        page("/casos-de-exito", 0.8),
        page("/blog", 0.8, "weekly"),
        page("/faq", 0.6),
        page("/ia-responsable", 0.3),
        ...solutions.map((solution) => page(`/soluciones/${solution.slug}`, 0.9)),
        ...servicesData.map((service) => page(`/servicios/${service.id}`, 0.8, "weekly")),
        ...cases.map((item) => page(`/casos-de-exito/${item.slug}`, 0.7)),
        ...blogPosts.map((post) => page(`/blog/${post.slug}`, 0.6, "monthly", new Date(post.date))),
    ];
}
