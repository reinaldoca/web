import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Users, Target } from 'lucide-react';
import { AwsIcon, DevOpsIcon } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getDictionary } from '@/dictionaries/dictionaries';
import { Locale } from '@/dictionaries/i18n-config';

const whyUsHero = PlaceHolderImages.find(p => p.id === 'why-us-hero');

const pointIcons: { [key: string]: JSX.Element } = {
  "Experiencia y Certificaciones": <Award className="h-10 w-10 text-primary" />,
  "Experience and Certifications": <Award className="h-10 w-10 text-primary" />,
  "Metodología Centrada en el Cliente": <Users className="h-10 w-10 text-primary" />,
  "Customer-Centric Methodology": <Users className="h-10 w-10 text-primary" />,
  "Soluciones Adaptadas al Contexto Local": <Target className="h-10 w-10 text-primary" />,
  "Solutions Adapted to the Local Context": <Target className="h-10 w-10 text-primary" />,
};

interface PorqueElegirnosPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function PorqueElegirnosPage({ params }: PorqueElegirnosPageProps) {
  const { lang } = await params;
  const t = (await getDictionary(lang)).whyUsPage;
  
  return (
    <main>
      <section className="relative w-full h-80">
        {whyUsHero && (
          <Image
            src={whyUsHero.imageUrl}
            alt={whyUsHero.description}
            data-ai-hint={whyUsHero.imageHint}
            fill
            className="object-cover"
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
          <div className="grid gap-8 md:grid-cols-3">
            {t.points.map(point => (
              <Card key={point.title} className="text-center">
                <CardHeader className="items-center">
                  {pointIcons[point.title]}
                  <CardTitle className="mt-4">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">{t.certifications.title}</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-center mt-4 mb-12">
            {t.certifications.subtitle}
          </p>
          <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <AwsIcon className="h-16 w-16 text-gray-800" />
              </div>
              <p className="font-semibold text-center" dangerouslySetInnerHTML={{ __html: t.certifications.items[0].title }}/>
            </div>
             <div className="flex flex-col items-center gap-2">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <DevOpsIcon className="h-16 w-16 text-gray-800" strokeWidth={1.5} />
              </div>
              <p className="font-semibold text-center" dangerouslySetInnerHTML={{ __html: t.certifications.items[1].title }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
