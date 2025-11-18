
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getDictionary } from '@/dictionaries/dictionaries';
import { type Locale } from '@/dictionaries/i18n-config';
import { ServicesAccordion } from './services-accordion';

const servicesHero = PlaceHolderImages.find(p => p.id === 'services-hero');

interface ServiciosPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ServiciosPage({ params: paramsPromise }: ServiciosPageProps) {
  const { lang } = await paramsPromise;
  const dictionary = await getDictionary(lang);
  const t = dictionary.servicesPage;
  const cta = dictionary.home.hero.cta;

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

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <p className="text-center text-lg md:text-xl text-muted-foreground mb-12">
            {t.intro}
          </p>
          <ServicesAccordion 
            lang={lang} 
            accordionServices={t.accordionServices} 
            ctaText={cta}
          />
        </div>
      </section>
    </main>
  );
}
