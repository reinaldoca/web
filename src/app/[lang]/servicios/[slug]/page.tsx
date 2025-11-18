

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getDictionary } from '@/dictionaries/dictionaries';
import { Locale } from '@/dictionaries/i18n-config';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Server, CloudUpload, GitBranch, Blocks, ShieldCheck, Headphones, Router, Network, Search, Lightbulb, Users, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { FeatureIcon } from '@/components/feature-icon';
import { slugify } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const servicesHero = PlaceHolderImages.find(p => p.id === 'services-hero');

const serviceIcons: { [key:string]: JSX.Element } = {
  'soporte-tecnico': <Headphones className="h-10 w-10 text-primary" />,
  'migracion-aws': <CloudUpload className="h-10 w-10 text-primary" />,
  'consultoria-devops': <GitBranch className="h-10 w-10 text-primary" />,
  'ingenieria-cloud': <Blocks className="h-10 w-10 text-primary" />,
  'redes-cisco': <Router className="h-10 w-10 text-primary" />,
  'seguridad-fortinet': <Network className="h-10 w-10 text-primary" />,
  'seguridad-monitoreo': <ShieldCheck className="h-10 w-10 text-primary" />,
  'atencion-personalizada': <Headphones className="h-10 w-10 text-primary" />,
  'cloud-foundations': <Server className="h-10 w-10 text-primary" />,
  'servicios-de-migracion': <CloudUpload className="h-10 w-10 text-primary" />,
  'implementacion-de-herramientas-devops': <GitBranch className="h-10 w-10 text-primary" />,
  'well-architected-review': <CheckCircle className="h-10 w-10 text-primary" />,
};

const processIcons: { [key: string]: JSX.Element } = {
  assessment: <Search className="h-6 w-6 text-primary" />,
  planning: <Lightbulb className="h-6 w-6 text-primary" />,
  migration: <CloudUpload className="h-6 w-6 text-primary" />,
  optimization: <Zap className="h-6 w-6 text-primary" />,
  alignment: <Users className="h-6 w-6 text-primary" />,
  implementation: <Server className="h-6 w-6 text-primary" />,
  definition: <ShieldCheck className="h-6 w-6 text-primary" />,
  monitoring: <CheckCircle className="h-6 w-6 text-primary" />,
  discovery: <Search className="h-6 w-6 text-primary" />,
  poc: <Lightbulb className="h-6 w-6 text-primary" />,
  support: <Headphones className="h-6 w-6 text-primary" />,
  identification: <Search className="h-6 w-6 text-primary" />,
  survey: <Lightbulb className="h-6 w-6 text-primary" />,
  prioritization: <CloudUpload className="h-6 w-6 text-primary" />,
  validation: <CheckCircle className="h-6 w-6 text-primary" />,
  search: <Search className="h-6 w-6 text-primary" />,
};

interface ServiceDetailPageProps {
  params: Promise<{
    lang: Locale;
    slug: string;
  }>;
}

export async function generateStaticParams({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  
  const allSlugs = dictionary.home.services.items.map(item => ({
    slug: slugify(item.title)
  })).concat(
    dictionary.servicesPage.accordionServices.map(item => ({
      slug: slugify(item.title)
    }))
  );

  return allSlugs;
}

export default async function ServiceDetailPage({ params: paramsPromise }: ServiceDetailPageProps) {
  const { lang, slug } = await paramsPromise;
  const dictionary = await getDictionary(lang);
  const allServices = [...dictionary.servicesPage.services, ...dictionary.servicesPage.accordionServices];
  const service = allServices.find((s) => slugify(s.title) === slug);
  const t = dictionary.servicesPage;

  if (!service) {
    notFound();
  }

  const currentSlug = slugify(service.title);
  const ServiceIcon = serviceIcons[currentSlug] || <Blocks className="h-10 w-10 text-primary" />;

  const renderTools = (tools: any) => {
    if (!tools) return null;
    
    if (Array.isArray(tools)) {
      return (
        <div className="flex flex-wrap gap-2">
          {tools.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {Object.entries(tools).map(([category, items]) => (
          <div key={category}>
            <h5 className="font-semibold text-base mb-2">{category}</h5>
            <div className="flex flex-wrap gap-2">
              {(items as string[]).map(item => <Badge key={item} variant="secondary" className="text-sm">{item}</Badge>)}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderProcessSteps = (steps: any[]) => {
    if (!steps || steps.length === 0) return null;

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              {processIcons[step.icon] || <CheckCircle className="h-6 w-6 text-primary" />}
            </div>
            <div>
              <h4 className="font-bold text-base">{step.title}</h4>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-headline">{service.title}</h1>
            <p className="text-white/80 mt-2 text-lg">{service.tagline}</p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            {ServiceIcon}
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl">
              {service.executiveDescription}
            </p>
          </div>
          
          <div className="space-y-16">

            {service.keyFeatures && service.keyFeatures.length > 0 && (
              <div>
                <h3 className="font-bold text-2xl mb-8 text-center">{t.featuresTitle}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {service.keyFeatures.map(feature => (
                    <div key={feature.text} className="flex items-start gap-4">
                      <FeatureIcon emoji={feature.icon} className="text-2xl mt-1" />
                      <span className="flex-1 text-base text-muted-foreground">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.ourProcess && service.ourProcess.length > 0 && (
              <div>
                <h3 className="font-bold text-2xl mb-8 text-center">{t.ourProcessTitle}</h3>
                {renderProcessSteps(service.ourProcess)}
              </div>
            )}
            
            {service.ourPerspective && (
              <div>
                <h3 className="font-bold text-2xl mb-8 text-center">{t.ourPerspectiveTitle}</h3>
                <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground text-lg max-w-3xl mx-auto text-center">
                  "{service.ourPerspective.content}"
                </blockquote>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
               {(service.toolsAndTechnologies || service.awsPatternsAndServices || service.migrationStrategies) && (
                <div className="space-y-8 bg-secondary/50 p-8 rounded-lg">
                  <h3 className="font-bold text-2xl mb-6 text-center">{t.technologiesTitle}</h3>
                  
                  {service.toolsAndTechnologies && (
                    <div>
                      {renderTools(service.toolsAndTechnologies)}
                    </div>
                  )}

                  {service.migrationStrategies && (
                    <div>
                      <h4 className="font-bold text-xl mb-4">{service.migrationStrategies.title}</h4>
                      <Accordion type="single" collapsible className="w-full">
                        {service.migrationStrategies.strategies.map((strategy: any) => (
                           <AccordionItem value={strategy.name} key={strategy.name}>
                              <AccordionTrigger>{strategy.name}</AccordionTrigger>
                              <AccordionContent>
                                {strategy.description}
                              </AccordionContent>
                            </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}

                  {service.awsPatternsAndServices && (
                    <div>
                      <h4 className="font-bold text-xl mb-4">{service.awsPatternsAndServices.title}</h4>
                       <div className="space-y-4">
                        {Object.entries(service.awsPatternsAndServices.categories).map(([category, items]) => (
                          <div key={category}>
                            <h5 className="font-semibold text-base mb-2">{category}</h5>
                            <div className="flex flex-wrap gap-2">
                              {(items as string[]).map(item => <Badge key={item} variant="secondary" className="text-sm">{item}</Badge>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
               )}
              
              <div className="space-y-8">
                {service.quantifiableBenefits && service.quantifiableBenefits.length > 0 && (
                    <div className="bg-secondary/50 p-8 rounded-lg">
                        <h3 className="font-bold text-2xl mb-6 text-center">{t.benefitsTitle}</h3>
                        <ul className="space-y-3">
                            {service.quantifiableBenefits.map(benefit => (
                                <li key={benefit} className="flex items-center gap-3 text-base text-muted-foreground">
                                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 {service.useCases && service.useCases.length > 0 && (
                    <div className="bg-secondary/50 p-8 rounded-lg">
                        <h3 className="font-bold text-2xl mb-6 text-center">{t.useCasesTitle}</h3>
                        <ul className="space-y-3">
                            {service.useCases.map(useCase => (
                                <li key={useCase} className="flex items-center gap-3 text-base text-muted-foreground">
                                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                  <span>{useCase}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
              </div>
            </div>
          </div>
          
           <div className="text-center mt-24">
             <Button asChild size="lg">
                <Link href={`/${lang}/contacto`}>{dictionary.home.hero.cta}</Link>
              </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
