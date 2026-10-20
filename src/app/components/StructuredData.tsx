/**
 * Structured Data (Schema.org) para SEO
 * Incluye Organization, FAQPage y Reviews
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
            "url": "https://cloudbit.com.ar/logo.png",
            "width": 300,
            "height": 100
        },
        "description": "Migración cloud, DevOps y DevSecOps para empresas en Argentina y Latinoamérica. Implementamos AWS, Azure, Kubernetes, CI/CD y observabilidad.",
        "foundingDate": "2017",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "AR",
            "addressRegion": "Buenos Aires"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+54-11-6904-4913",
            "contactType": "Sales",
            "areaServed": ["AR", "MX", "CL", "CO", "PE"],
            "availableLanguage": ["Spanish", "English"],
            "contactOption": "TollFree"
        },
        "sameAs": [
            "https://linkedin.com/company/cloudbit",
            "https://github.com/cloudbit"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "45"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "¿Cuánto toma una migración a cloud?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Depende del tamaño y complejidad de tu infraestructura actual, pero migraciones estándar toman entre 4-8 semanas, incluyendo una fase de estabilización de 2 semanas. Durante el proceso trabajamos con sprints semanales para asegurar entregables medibles y minimizar riesgos."
                }
            },
            {
                "@type": "Question",
                "name": "¿Trabajan con empresas fuera de Argentina?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, trabajamos con clientes en toda Latinoamérica. Operamos en zona horaria LATAM (GMT-3 a GMT-5), lo que facilita la comunicación y colaboración con equipos en Argentina, Chile, México, Colombia, Perú y otros países de la región."
                }
            },
            {
                "@type": "Question",
                "name": "¿Qué pasa si ya tengo equipo DevOps interno?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Podemos trabajar en tres modalidades: Colaboración directa con tu equipo, aportando expertise especializado en áreas específicas, Capacitación y transferencia de conocimiento para autonomía de tu equipo, o Staffing temporal para proyectos específicos que requieren escalar rápidamente."
                }
            },
            {
                "@type": "Question",
                "name": "¿Proveen soporte 24/7?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, ofrecemos planes de soporte 24/7 con SLA definido para clientes enterprise con ambientes productivos críticos. El soporte incluye monitoreo proactivo, alertas inteligentes, respuesta ante incidentes y escalamiento según severidad."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cuál es el costo de una consulta inicial?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La primera consulta técnica es completamente gratuita y sin compromiso. Dura entre 30-45 minutos e incluye una llamada con un arquitecto cloud senior. Al finalizar, te enviaremos un email con recomendaciones iniciales."
                }
            },
            {
                "@type": "Question",
                "name": "¿Qué certificaciones tiene el equipo?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nuestro equipo cuenta con 15+ ingenieros certificados en las principales plataformas cloud. Incluye: 5× AWS Solutions Architect Associate, 3× AWS DevOps Engineer Professional, 4× Azure Administrator Associate, 3× CKA (Certified Kubernetes Administrator), y más. Somos AWS Select Tier Partner y Microsoft Silver Partner."
                }
            }
        ]
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "DevOps y Cloud Infrastructure",
        "provider": {
            "@id": "https://cloudbit.com.ar/#organization"
        },
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "-34.6037",
                "longitude": "-58.3816"
            },
            "geoRadius": "5000000"
        },
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

    // Reviews de casos de éxito (anonimizados)
    const reviewsSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://cloudbit.com.ar/#organization",
        "review": [
            {
                "@type": "Review",
                "author": {
                    "@type": "Organization",
                    "name": "Fintech Client"
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "reviewBody": "La migración fue impecable. Redujimos costos significativamente y ahora podemos escalar sin límites. El equipo de CloudBit demostró profundo conocimiento técnico.",
                "datePublished": "2024-01-15"
            },
            {
                "@type": "Review",
                "author": {
                    "@type": "Organization",
                    "name": "SaaS B2B Client"
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "reviewBody": "CloudBit transformó nuestra forma de trabajar. Pasamos de deploys estresantes a entregas continuas sin fricción. Ahora el equipo se enfoca en features, no en apagar incendios.",
                "datePublished": "2024-03-20"
            },
            {
                "@type": "Review",
                "author": {
                    "@type": "Organization",
                    "name": "E-commerce Client"
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "reviewBody": "El enfoque de CloudBit en seguridad desde el diseño nos permitió certificar PCI-DSS en tiempo récord. La arquitectura aguantó nuestro peak de ventas sin problemas.",
                "datePublished": "2024-06-10"
            }
        ]
    };

    return (
        <>
            {/* Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            {/* Service Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceSchema),
                }}
            />

            {/* Reviews Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(reviewsSchema),
                }}
            />
        </>
    );
}
