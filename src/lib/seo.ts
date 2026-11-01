import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/dictionary";
import { localizeHref } from "@/lib/i18n/routes";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cloudbit.com.ar").replace(/\/$/, "");

const OG_LOCALE: Record<Language, string> = { es: "es_AR", en: "en_US" };

/** Metadata base de cada layout raíz; cada página la completa con pageMetadata. */
export function rootMetadata(lang: Language): Metadata {
    return {
        // Base para resolver URLs absolutas de Open Graph, Twitter y canonical
        metadataBase: new URL(SITE_URL),
        title: lang === "en" ? "CloudBit - Cloud Solutions" : "CloudBit - Soluciones en la Nube",
        description:
            lang === "en"
                ? "Cloud, DevOps and DevSecOps services for companies worldwide."
                : "Transformación digital y servicios cloud para tu empresa.",
    };
}

/**
 * URLs de la página en cada idioma para hreflang. x-default apunta al inglés:
 * el sitio busca clientes de todo el mundo y es el idioma más amplio para quien no habla español.
 */
export function languageAlternates(path: string) {
    const en = localizeHref(path, "en");
    return { es: localizeHref(path, "es"), en, "x-default": en };
}

interface PageMetadataInput {
    title: string;
    description: string;
    /** Ruta en español de la página, por ejemplo "/servicios/iac"; se traduce según lang. */
    path: string;
    lang: Language;
    type?: "website" | "article";
    publishedTime?: string;
}

/** Imagen social generada por src/app/opengraph-image.tsx. Se declara explícita porque definir openGraph en una página reemplaza la heredada. */
const SOCIAL_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "CloudBit: DevOps, Cloud AWS/Azure y Kubernetes" };

/** Metadata por página: canonical, hreflang, Open Graph y Twitter con el mismo título, descripción e imagen. */
export function pageMetadata({ title, description, path, lang, type = "website", publishedTime }: PageMetadataInput): Metadata {
    const url = localizeHref(path, lang);
    return {
        title,
        description,
        alternates: { canonical: url, languages: languageAlternates(path) },
        openGraph: {
            type,
            url,
            siteName: "CloudBit",
            locale: OG_LOCALE[lang],
            alternateLocale: OG_LOCALE[lang === "es" ? "en" : "es"],
            title,
            description,
            images: [SOCIAL_IMAGE],
            ...(publishedTime && { publishedTime }),
        },
        twitter: { card: "summary_large_image", title, description, images: [SOCIAL_IMAGE.url] },
    };
}

/** BreadcrumbList de Schema.org a partir de pares nombre/ruta en español, empezando por Inicio. */
export function breadcrumbSchema(items: { name: string; path: string }[], lang: Language) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: lang === "en" ? "Home" : "Inicio", path: "/" }, ...items].map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path, lang),
        })),
    };
}

/** URL absoluta de una ruta en español, en el idioma pedido. */
export function absoluteUrl(path: string, lang: Language) {
    const localized = localizeHref(path, lang);
    return `${SITE_URL}${localized === "/" ? "" : localized}`;
}

/** Serializa uno o varios objetos JSON-LD para un <script type="application/ld+json">. */
export function jsonLd(data: object | object[]) {
    return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
