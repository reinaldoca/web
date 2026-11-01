import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, getServiceById } from "@/lib/services-data";
import { ServiceDetail } from "@/app/components/ServiceDetail";
import { SiteShell } from "@/components/site/site-shell";
import { SITE_URL, breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all services
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceById(slug, "es");
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} | CloudBit`,
    description: service.shortDescription,
    path: `/servicios/${slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceById(slug, "es");
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    url: `${SITE_URL}/servicios/${slug}`,
    serviceType: service.title,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "Worldwide",
    availableLanguage: ["es", "en"],
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          schema,
          breadcrumbSchema([{ name: service.title, path: `/servicios/${slug}` }]),
        ])}
      />
      <ServiceDetail slug={slug} />
    </SiteShell>
  );
}
