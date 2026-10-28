import type { Metadata } from "next";
import { servicesData, getServiceById } from "@/lib/services-data";
import { ServiceDetail } from "@/app/components/ServiceDetail";
import { SiteShell } from "@/components/site/site-shell";

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
  return {
    title: `${service.title} | CloudBit`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  return (
    <SiteShell>
      <ServiceDetail slug={slug} />
    </SiteShell>
  );
}
