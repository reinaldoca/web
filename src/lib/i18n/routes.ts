import type { Language } from "./dictionary";

/**
 * Rutas por idioma. El español vive en la raíz con las URLs de siempre; el inglés bajo /en
 * con secciones y slugs en inglés. El contenido se sigue identificando por el slug en español.
 */
type Section = "/servicios" | "/soluciones" | "/casos-de-exito" | "/blog" | "/contacto/gracias" | "/contacto" | "/faq" | "/ia-responsable";

// "/contacto/gracias" va antes que "/contacto" para que gane el prefijo más largo
const SECTIONS: [Section, string][] = [
    ["/servicios", "/services"],
    ["/soluciones", "/solutions"],
    ["/casos-de-exito", "/case-studies"],
    ["/blog", "/blog"],
    ["/contacto/gracias", "/contact/thanks"],
    ["/contacto", "/contact"],
    ["/faq", "/faq"],
    ["/ia-responsable", "/responsible-ai"],
];

/** Slug en español → slug en inglés. Los que no figuran se usan igual en ambos idiomas. */
const EN_SLUGS: Partial<Record<Section, Record<string, string>>> = {
    "/servicios": {
        observabilidad: "observability",
        automatizacion: "automation",
        consultoria: "consulting",
        migracion: "migration",
        virtualizacion: "virtualization",
        iac: "infrastructure-as-code",
        "contenedores-kubernetes": "containers-kubernetes",
        "well-architected": "aws-well-architected-review",
        "backup-dr": "backup-disaster-recovery",
    },
    "/soluciones": {
        "migracion-cloud": "cloud-migration",
        "automatizacion-devops": "devops-automation",
        "operacion-24-7": "24-7-operations",
        "datos-e-ia": "data-and-ai",
    },
    "/casos-de-exito": {
        "fintech-migracion-aws": "fintech-aws-migration",
        "saas-b2b-entrega-continua": "b2b-saas-continuous-delivery",
    },
    "/blog": {
        "checklist-antes-de-migrar-a-la-nube": "cloud-migration-checklist",
        "metricas-dora-para-equipos-chicos": "dora-metrics-for-small-teams",
        "alertas-que-nadie-mira": "alerts-nobody-looks-at",
        "ia-generativa-del-piloto-a-produccion": "generative-ai-from-pilot-to-production",
        "terraform-primeros-pasos-en-equipo": "terraform-first-steps-as-a-team",
        "reducir-factura-cloud-sin-tocar-codigo": "cut-cloud-bill-without-touching-code",
        "terraform-en-aws-estructura-iac": "terraform-on-aws-iac-structure",
        "terraform-vs-cloudformation-vs-cdk": "terraform-vs-cloudformation-vs-cdk",
        "docker-en-produccion-buenas-practicas": "docker-in-production-best-practices",
        "contenedores-en-aws-ecs-eks-fargate": "containers-on-aws-ecs-eks-fargate",
        "gitops-con-argo-cd": "gitops-with-argo-cd",
        "devsecops-en-aws-seguridad-en-el-pipeline": "devsecops-on-aws-pipeline-security",
        "fugas-de-costo-en-aws": "aws-cost-leaks",
        "backup-y-dr-en-aws-rpo-rto": "aws-backup-disaster-recovery-rpo-rto",
        "aws-well-architected-equipos-chicos": "aws-well-architected-for-small-teams",
    },
};

/** Slug visible en la URL de ese idioma para un contenido identificado por su slug en español. */
export function routeSlug(section: Section, slug: string, lang: Language) {
    return lang === "en" ? EN_SLUGS[section]?.[slug] ?? slug : slug;
}

/** Slug en español a partir del slug de la URL; undefined si no corresponde a ese idioma. */
export function contentSlug(section: Section, slug: string, lang: Language) {
    if (lang === "es") return slug;
    const map = EN_SLUGS[section] ?? {};
    const match = Object.entries(map).find(([, en]) => en === slug);
    if (match) return match[0];
    // Un slug en español que tiene traducción no es válido bajo /en
    return slug in map ? undefined : slug;
}

function splitHref(href: string) {
    const index = href.search(/[?#]/);
    return index === -1 ? [href, ""] : [href.slice(0, index), href.slice(index)];
}

/** Convierte una ruta en español ("/servicios/iac", "/#servicios") a la del idioma pedido. */
export function localizeHref(href: string, lang: Language) {
    if (lang === "es" || !href.startsWith("/")) return href;
    const [path, rest] = splitHref(href);
    if (path === "/" || path === "") return `/en${rest}`;

    for (const [es, en] of SECTIONS) {
        if (path === es) return `/en${en}${rest}`;
        if (path.startsWith(`${es}/`)) {
            return `/en${en}/${routeSlug(es, path.slice(es.length + 1), "en")}${rest}`;
        }
    }
    return `/en${path}${rest}`;
}

/** Inversa de localizeHref: devuelve la ruta en español de cualquier URL del sitio. */
export function toSpanishPath(pathname: string) {
    if (pathname !== "/en" && !pathname.startsWith("/en/")) return pathname;
    const path = pathname.slice(3) || "/";

    for (const [es, en] of SECTIONS) {
        if (path === en) return es;
        if (path.startsWith(`${en}/`)) {
            return `${es}/${contentSlug(es, path.slice(en.length + 1), "en") ?? ""}`;
        }
    }
    return path;
}

/** Ruta equivalente de la página actual en el otro idioma. */
export function switchLanguagePath(pathname: string, lang: Language) {
    return localizeHref(toSpanishPath(pathname), lang);
}
