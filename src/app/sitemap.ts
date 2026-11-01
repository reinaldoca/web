import { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";
import { solutions } from "@/lib/content/solutions";
import { cases } from "@/lib/content/cases";
import { blogPosts } from "@/lib/content/blog";
import type { Language } from "@/lib/i18n/dictionary";
import { absoluteUrl } from "@/lib/seo";

const LANGUAGES: Language[] = ["es", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
    // Cada página aparece en los dos idiomas y declara a la otra como alternativa (hreflang).
    // Solo los artículos tienen fecha real; al resto no se le inventa lastModified en cada build.
    const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly", lastModified?: Date) =>
        LANGUAGES.map((lang) => ({
            url: absoluteUrl(path, lang),
            ...(lastModified && { lastModified }),
            changeFrequency,
            priority,
            alternates: {
                languages: {
                    es: absoluteUrl(path, "es"),
                    en: absoluteUrl(path, "en"),
                    "x-default": absoluteUrl(path, "en"),
                },
            },
        }));

    const latestPost = blogPosts.reduce((latest, post) => (post.date > latest ? post.date : latest), "");

    return [
        page("/", 1),
        page("/contacto", 0.9),
        page("/casos-de-exito", 0.8),
        page("/blog", 0.8, "weekly", latestPost ? new Date(latestPost) : undefined),
        page("/faq", 0.6),
        page("/ia-responsable", 0.3),
        ...solutions.map((solution) => page(`/soluciones/${solution.slug}`, 0.9)),
        ...servicesData.map((service) => page(`/servicios/${service.id}`, 0.8)),
        ...cases.map((item) => page(`/casos-de-exito/${item.slug}`, 0.7)),
        ...blogPosts.map((post) => page(`/blog/${post.slug}`, 0.6, "monthly", new Date(post.date))),
    ].flat();
}
