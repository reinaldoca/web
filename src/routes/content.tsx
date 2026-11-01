import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { ServiceDetail } from "@/app/components/ServiceDetail";
import { servicesData, getServiceById } from "@/lib/services-data";
import { solutions, getSolution } from "@/lib/content/solutions";
import { cases, getCase } from "@/lib/content/cases";
import { blogPosts, getPost, categoryLabel } from "@/lib/content/blog";
import { getFaqCategories } from "@/lib/content/faq";
import type { Language } from "@/lib/i18n/dictionary";
import { contentSlug, routeSlug } from "@/lib/i18n/routes";
import { SITE_URL, absoluteUrl, breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";
import { PostView } from "@/views/post-view";
import { BlogIndex } from "@/views/blog-index";
import { CaseView } from "@/views/case-view";
import { CasesIndex } from "@/views/cases-index";
import { SolutionView } from "@/views/solution-view";
import { ContactView } from "@/views/contact-view";
import { ThanksView } from "@/views/thanks-view";
import { FaqView } from "@/views/faq-view";
import { ResponsibleAiView } from "@/views/ai-view";

/**
 * Páginas compartidas por los dos idiomas. Cada archivo de app/(es) y app/en solo indica el idioma;
 * los slugs de la URL se traducen al slug en español, que es el que identifica el contenido.
 */

type Params = Promise<{ slug: string }>;

function JsonLd({ data }: { data: object | object[] }) {
    return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}

// ---------- Servicios ----------

export function serviceParams(lang: Language) {
    return servicesData.map((service) => ({ slug: routeSlug("/servicios", service.id, lang) }));
}

function resolveService(slug: string, lang: Language) {
    const id = contentSlug("/servicios", slug, lang);
    return id ? getServiceById(id, lang) : undefined;
}

export async function serviceMetadata(params: Params, lang: Language): Promise<Metadata> {
    const service = resolveService((await params).slug, lang);
    if (!service) return {};
    return pageMetadata({
        title: `${service.title} | CloudBit`,
        description: service.shortDescription,
        path: `/servicios/${service.id}`,
        lang,
    });
}

export async function ServiceRoute({ params, lang }: { params: Params; lang: Language }) {
    const service = resolveService((await params).slug, lang);
    if (!service) notFound();
    const path = `/servicios/${service.id}`;

    return (
        <SiteShell>
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: service.title,
                        description: service.shortDescription,
                        url: absoluteUrl(path, lang),
                        serviceType: service.title,
                        provider: { "@id": `${SITE_URL}/#organization` },
                        areaServed: "Worldwide",
                        availableLanguage: ["es", "en"],
                    },
                    breadcrumbSchema([{ name: service.title, path }], lang),
                ]}
            />
            <ServiceDetail slug={service.id} />
        </SiteShell>
    );
}

// ---------- Soluciones ----------

export function solutionParams(lang: Language) {
    return solutions.map((solution) => ({ slug: routeSlug("/soluciones", solution.slug, lang) }));
}

function resolveSolution(slug: string, lang: Language) {
    const id = contentSlug("/soluciones", slug, lang);
    return id ? getSolution(id, lang) : undefined;
}

export async function solutionMetadata(params: Params, lang: Language): Promise<Metadata> {
    const solution = resolveSolution((await params).slug, lang);
    if (!solution) return {};
    return pageMetadata({
        title: `${solution.title} | CloudBit`,
        description: solution.intro,
        path: `/soluciones/${solution.slug}`,
        lang,
    });
}

export async function SolutionRoute({ params, lang }: { params: Params; lang: Language }) {
    const solution = resolveSolution((await params).slug, lang);
    if (!solution) notFound();

    return (
        <SiteShell>
            <JsonLd data={breadcrumbSchema([{ name: solution.title, path: `/soluciones/${solution.slug}` }], lang)} />
            <SolutionView slug={solution.slug} />
        </SiteShell>
    );
}

// ---------- Casos de éxito ----------

const casesCopy: Record<Language, { title: string; description: string; breadcrumb: string; suffix: string }> = {
    es: {
        title: "Casos de éxito | CloudBit",
        description: "Cómo ayudamos a empresas de distintas industrias a migrar, automatizar y operar su infraestructura cloud.",
        breadcrumb: "Casos de éxito",
        suffix: "caso de éxito",
    },
    en: {
        title: "Case studies | CloudBit",
        description: "How we help companies across industries migrate, automate and operate their cloud infrastructure.",
        breadcrumb: "Case studies",
        suffix: "case study",
    },
};

export function casesMetadata(lang: Language): Metadata {
    const copy = casesCopy[lang];
    return pageMetadata({ title: copy.title, description: copy.description, path: "/casos-de-exito", lang });
}

export function CasesRoute() {
    return (
        <SiteShell>
            <CasesIndex />
        </SiteShell>
    );
}

export function caseParams(lang: Language) {
    return cases.map((item) => ({ slug: routeSlug("/casos-de-exito", item.slug, lang) }));
}

function resolveCase(slug: string, lang: Language) {
    const id = contentSlug("/casos-de-exito", slug, lang);
    return id ? getCase(id, lang) : undefined;
}

export async function caseMetadata(params: Params, lang: Language): Promise<Metadata> {
    const item = resolveCase((await params).slug, lang);
    if (!item) return {};
    return pageMetadata({
        title: `${item.industry}: ${casesCopy[lang].suffix} | CloudBit`,
        description: item.summary,
        path: `/casos-de-exito/${item.slug}`,
        lang,
    });
}

export async function CaseRoute({ params, lang }: { params: Params; lang: Language }) {
    const item = resolveCase((await params).slug, lang);
    if (!item) notFound();

    return (
        <SiteShell>
            <JsonLd
                data={breadcrumbSchema(
                    [
                        { name: casesCopy[lang].breadcrumb, path: "/casos-de-exito" },
                        { name: item.industry, path: `/casos-de-exito/${item.slug}` },
                    ],
                    lang,
                )}
            />
            <CaseView slug={item.slug} />
        </SiteShell>
    );
}

// ---------- Blog ----------

const blogCopy: Record<Language, { description: string }> = {
    es: { description: "Guías prácticas sobre Terraform, Docker, Kubernetes, GitOps, DevSecOps y AWS para equipos técnicos." },
    en: { description: "Practical guides on Terraform, Docker, Kubernetes, GitOps, DevSecOps and AWS for engineering teams." },
};

export function blogMetadata(lang: Language): Metadata {
    return pageMetadata({ title: "Blog | CloudBit", description: blogCopy[lang].description, path: "/blog", lang });
}

export function BlogRoute() {
    return (
        <SiteShell>
            <BlogIndex />
        </SiteShell>
    );
}

export function postParams(lang: Language) {
    return blogPosts.map((post) => ({ slug: routeSlug("/blog", post.slug, lang) }));
}

function resolvePost(slug: string, lang: Language) {
    const id = contentSlug("/blog", slug, lang);
    return id ? getPost(id, lang) : undefined;
}

export async function postMetadata(params: Params, lang: Language): Promise<Metadata> {
    const post = resolvePost((await params).slug, lang);
    if (!post) return {};
    return pageMetadata({
        title: `${post.title} | CloudBit`,
        description: post.excerpt,
        path: `/blog/${post.slug}`,
        lang,
        type: "article",
        publishedTime: post.date,
    });
}

export async function PostRoute({ params, lang }: { params: Params; lang: Language }) {
    const post = resolvePost((await params).slug, lang);
    if (!post) notFound();

    const path = `/blog/${post.slug}`;
    const url = absoluteUrl(path, lang);

    return (
        <SiteShell>
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        description: post.excerpt,
                        datePublished: post.date,
                        dateModified: post.date,
                        url,
                        mainEntityOfPage: { "@type": "WebPage", "@id": url },
                        image: `${SITE_URL}/opengraph-image`,
                        inLanguage: lang,
                        articleSection: categoryLabel(post.category, lang),
                        wordCount: post.sections.reduce(
                            (total, section) => total + section.paragraphs.join(" ").split(/\s+/).length,
                            0,
                        ),
                        author: { "@type": "Organization", name: "CloudBit", url: SITE_URL },
                        publisher: { "@id": `${SITE_URL}/#organization` },
                    },
                    breadcrumbSchema(
                        [
                            { name: "Blog", path: "/blog" },
                            { name: post.title, path },
                        ],
                        lang,
                    ),
                ]}
            />
            <PostView slug={post.slug} />
        </SiteShell>
    );
}

// ---------- Páginas fijas ----------

const staticCopy = {
    contact: {
        es: { title: "Contacto | CloudBit", description: "Agendá una consulta técnica gratuita con un arquitecto cloud de CloudBit." },
        en: { title: "Contact | CloudBit", description: "Book a free technical consultation with a CloudBit cloud architect." },
    },
    thanks: {
        es: { title: "¡Gracias! | CloudBit" },
        en: { title: "Thank you! | CloudBit" },
    },
    faq: {
        es: { title: "Preguntas frecuentes | CloudBit", description: "Respuestas sobre migración, operación, DevOps, datos e IA y cómo trabajamos." },
        en: { title: "FAQ | CloudBit", description: "Answers about migration, operations, DevOps, data and AI, and how we work." },
    },
    responsibleAi: {
        es: { title: "Uso responsable de IA | CloudBit", description: "Principios que guían cómo CloudBit diseña e implementa soluciones con inteligencia artificial." },
        en: { title: "Responsible AI | CloudBit", description: "Principles that guide how CloudBit designs and implements artificial intelligence solutions." },
    },
} as const;

export function contactMetadata(lang: Language): Metadata {
    return pageMetadata({ ...staticCopy.contact[lang], path: "/contacto", lang });
}

export function ContactRoute() {
    return (
        <SiteShell>
            <ContactView />
        </SiteShell>
    );
}

export function thanksMetadata(lang: Language): Metadata {
    return { title: staticCopy.thanks[lang].title, robots: { index: false, follow: true } };
}

export function ThanksRoute() {
    return (
        <SiteShell>
            <ThanksView />
        </SiteShell>
    );
}

export function faqMetadata(lang: Language): Metadata {
    return pageMetadata({ ...staticCopy.faq[lang], path: "/faq", lang });
}

export function FaqRoute({ lang }: { lang: Language }) {
    const faqs = getFaqCategories(lang).flatMap((category) => category.items);

    return (
        <SiteShell>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqs.map((faq) => ({
                        "@type": "Question",
                        name: faq.question,
                        acceptedAnswer: { "@type": "Answer", text: faq.answer },
                    })),
                }}
            />
            <FaqView />
        </SiteShell>
    );
}

export function responsibleAiMetadata(lang: Language): Metadata {
    return pageMetadata({ ...staticCopy.responsibleAi[lang], path: "/ia-responsable", lang });
}

export function ResponsibleAiRoute() {
    return (
        <SiteShell>
            <ResponsibleAiView />
        </SiteShell>
    );
}
