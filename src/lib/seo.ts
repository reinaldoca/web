import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cloudbit.com.ar").replace(/\/$/, "");

interface PageMetadataInput {
    title: string;
    description: string;
    /** Ruta absoluta del sitio, por ejemplo "/servicios/iac". */
    path: string;
    type?: "website" | "article";
    publishedTime?: string;
}

/** Imagen social generada por src/app/opengraph-image.tsx. Se declara explícita porque definir openGraph en una página reemplaza la heredada. */
const SOCIAL_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "CloudBit: DevOps, Cloud AWS/Azure y Kubernetes" };

/** Metadata por página: canonical, Open Graph y Twitter con el mismo título, descripción e imagen. */
export function pageMetadata({ title, description, path, type = "website", publishedTime }: PageMetadataInput): Metadata {
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            type,
            url: path,
            siteName: "CloudBit",
            locale: "es_AR",
            title,
            description,
            images: [SOCIAL_IMAGE],
            ...(publishedTime && { publishedTime }),
        },
        twitter: { card: "summary_large_image", title, description, images: [SOCIAL_IMAGE.url] },
    };
}

/** BreadcrumbList de Schema.org a partir de pares nombre/ruta, empezando por Inicio. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Inicio", path: "/" }, ...items].map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
        })),
    };
}

/** Serializa uno o varios objetos JSON-LD para un <script type="application/ld+json">. */
export function jsonLd(data: object | object[]) {
    return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
