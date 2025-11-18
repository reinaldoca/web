
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { TrendingUp, Zap, CircleDollarSign } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getDictionary } from '@/dictionaries/dictionaries';
import { Locale } from '@/dictionaries/i18n-config';

interface SuccessStory {
  title: string;
  description: string;
  metric: string;
  metricDescription: string;
}

const successHero = PlaceHolderImages.find(p => p.id === 'success-hero');

const storyIcons: { [key: string]: JSX.Element } = {
  "Reducción de costos para Fintech": <CircleDollarSign className="h-8 w-8 text-primary" />,
  "Cost reduction for Fintech": <CircleDollarSign className="h-8 w-8 text-primary" />,
  "Alta disponibilidad para E-commerce": <Zap className="h-8 w-8 text-primary" />,
  "High availability for E-commerce": <Zap className="h-8 w-8 text-primary" />,
  "Crecimiento escalable para EdTech": <TrendingUp className="h-8 w-8 text-primary" />,
  "Scalable growth for EdTech": <TrendingUp className="h-8 w-8 text-primary" />,
};

export default async function CasosDeExitoPage({
  params,
}: {
  params: { lang: Locale };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { lang } = params;
  const t = (await getDictionary(lang)).successStoriesPage as {
    heroTitle: string;
    intro: string;
    stories: SuccessStory[];
  };

  const successStories = t.stories.map((story: SuccessStory) => ({
    ...story,
    image: story.title.includes('Fintech') ? "https://picsum.photos/seed/fintech-case/500/300" :
           story.title.includes('E-commerce') ? "https://picsum.photos/seed/ecommerce-case/500/300" :
           "https://picsum.photos/seed/edtech-case/500/300",
    imageHint: story.title.includes('Fintech') ? "financial graph" :
               story.title.includes('E-commerce') ? "online store" :
               "online learning"
  }));

  return (
    <main>
      <section className="relative w-full h-80">
        {successHero && (
          <Image
            src={successHero.imageUrl}
            alt={successHero.description}
            data-ai-hint={successHero.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center font-headline">{t.heroTitle}</h1>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t.intro}
          </p>
          <div className="grid gap-12">
            {successStories.map((story, index: number) => (
              <Card key={story.title} className="overflow-hidden grid md:grid-cols-2 shadow-sm hover:shadow-lg transition-shadow">
                <div className={`flex flex-col justify-center p-6 md:p-8 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    {storyIcons[story.title]}
                    <h2 className="text-2xl font-bold font-headline">{story.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">{story.description}</p>
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-3xl font-bold text-primary">{story.metric}</p>
                    <p className="text-sm text-muted-foreground">{story.metricDescription}</p>
                  </div>
                </div>
                <div className="relative min-h-[250px] md:min-h-0">
                  <Image
                    src={story.image}
                    alt={story.title}
                    data-ai-hint={story.imageHint}
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
