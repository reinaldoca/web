import { servicesData } from "@/lib/services-data";
import { ServiceDetail } from "@/app/components/ServiceDetail";

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

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  return <ServiceDetail slug={slug} />;
}
