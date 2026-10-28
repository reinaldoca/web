/**
 * Structured Data (Schema.org) para SEO: Organization y Service.
 * El FAQPage lo publica FAQSection a partir de src/lib/content/faq.ts.
 * No agregar aggregateRating ni reviews salvo que provengan de una plataforma verificable:
 * Google penaliza las reseñas autodeclaradas.
 */
export function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://cloudbit.com.ar/#organization",
        "name": "CloudBit",
        "url": "https://cloudbit.com.ar",
        "logo": {
            "@type": "ImageObject",
            "url": "https://cloudbit.com.ar/images/logo.png",
            "width": 300,
            "height": 100
        },
        "description": "Migración cloud, DevOps y DevSecOps para empresas de todo el mundo, en español o inglés. Implementamos AWS, Azure, Kubernetes, CI/CD y observabilidad.",
        "foundingDate": "2017",
        "email": "contacto@cloudbit.com.ar",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "AR",
            "addressRegion": "Buenos Aires"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+54-11-6904-4913",
            "email": "contacto@cloudbit.com.ar",
            "contactType": "sales",
            "areaServed": "Worldwide",
            "availableLanguage": ["Spanish", "English"]
        },
        "sameAs": [
            "https://linkedin.com/company/cloudbit-consultoria-it/"
        ]
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "DevOps y Cloud Infrastructure",
        "provider": {
            "@id": "https://cloudbit.com.ar/#organization"
        },
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Cloud y DevOps",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Migración y Arquitectura Cloud",
                        "description": "Migramos y diseñamos arquitecturas en AWS, Azure y Kubernetes"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "DevOps y DevSecOps",
                        "description": "Automatizamos CI/CD, IaC y observabilidad full-stack"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Staffing y Operación Gestionada",
                        "description": "Proveemos equipos especializados y operación 24/7"
                    }
                }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
        </>
    );
}
