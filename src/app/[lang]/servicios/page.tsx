import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Server, CloudUpload, GitBranch, Blocks, ShieldCheck, Headphones, Router, Network } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/animations/animated-section';
import { getDictionary } from '@/dictionaries/dictionaries';
import { Locale } from '@/dictionaries/i18n-config';

const servicesHero = PlaceHolderImages.find(p => p.id === 'services-hero');

const serviceIcons: { [key: string]: JSX.Element } = {
  'Soporte Técnico on-premise y remoto': <Server className="h-6 w-6 text-primary" />,
  'On-premise and remote Technical Support': <Server className="h-6 w-6 text-primary" />,
  'Migración y Arquitectura en AWS': <CloudUpload className="h-6 w-6 text-primary" />,
  'Migration and Architecture in AWS': <CloudUpload className="h-6 w-6 text-primary" />,
  'Consultoría DevOps': <GitBranch className="h-6 w-6 text-primary" />,
  'DevOps Consulting': <GitBranch className="h-6 w-6 text-primary" />,
  'Ingeniería Cloud': <Blocks className="h-6 w-6 text-primary" />,
  'Cloud Engineering': <Blocks className="h-6 w-6 text-primary" />,
  'Administración de Redes (Cisco)': <Router className="h-6 w-6 text-primary" />,
  'Network Administration (Cisco)': <Router className="h-6 w-6 text-primary" />,
  'Networking y Seguridad (Fortinet)': <Network className="h-6 w-6 text-primary" />,
  'Networking and Security (Fortinet)': <Network className="h-6 w-6 text-primary" />,
  'Seguridad y Monitoreo Avanzado': <ShieldCheck className="h-6 w-6 text-primary" />,
  'Advanced Security and Monitoring': <ShieldCheck className="h-6 w-6 text-primary" />,
  'Atención Personalizada': <Headphones className="h-6 w-6 text-primary" />,
  'Personalized Attention': <Headphones className="h-6 w-6 text-primary" />,
};

interface ServiciosPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ServiciosPage({ params }: ServiciosPageProps) {
  const { lang } = await params;
  const t = (await getDictionary(lang)).servicesPage;

  return (
    <main>
      <section className="relative w-full h-80">
        {servicesHero && (
          <Image
            src={servicesHero.imageUrl}
            alt={servicesHero.description}
            data-ai-hint={servicesHero.imageHint}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center font-headline">{t.heroTitle}</h1>
        </div>
      </section>

      <AnimatedSection className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <p className="text-center text-lg md:text-xl text-muted-foreground mb-12">
            {t.intro}
          </p>
          <div className="bg-card p-4 md:p-8 rounded-lg">
            <Accordion type="single" collapsible className="w-full">
              {t.services.map((service, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-4">
                      {serviceIcons[service.title]}
                      <span>{service.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pl-14">
                    {service.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
