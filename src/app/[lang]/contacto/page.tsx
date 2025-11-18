
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Phone, Linkedin, Mail } from 'lucide-react';
import { getDictionary } from '@/dictionaries/dictionaries';
import { Locale } from '@/dictionaries/i18n-config';
import ContactPageClient from './contact-page-client';

const contactHero = PlaceHolderImages.find(p => p.id === 'contact-hero');

interface ContactoPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ContactoPage({ params: paramsPromise }: ContactoPageProps) {
    const { lang } = await paramsPromise;
    const t = (await getDictionary(lang)).contactPage;

    return (
    <main>
      <section className="relative w-full h-80">
        {contactHero && (
          <Image
            src={contactHero.imageUrl}
            alt={contactHero.description}
            data-ai-hint={contactHero.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-headline">{t.heroTitle}</h1>
            <p className="text-white/80 mt-2 text-lg">{t.heroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <ContactPageClient t={t} />
            <div className="bg-secondary rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">{t.channels.title}</h3>
                <div className="space-y-6">
                    <a href="https://wa.me/+5491169044913" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                        <div className="bg-primary text-primary-foreground p-3 rounded-full group-hover:bg-primary/90 transition-colors">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-semibold text-lg">{t.channels.whatsapp}</p>
                            <p className="text-muted-foreground">{t.channels.whatsappDescription}</p>
                        </div>
                    </a>
                    <a href="mailto:contacto@cloudbit.com.ar" className="flex items-center gap-4 group">
                         <div className="bg-primary text-primary-foreground p-3 rounded-full group-hover:bg-primary/90 transition-colors">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-semibold text-lg">{t.channels.email}</p>
                            <p className="text-muted-foreground">{t.channels.emailAddress}</p>
                        </div>
                    </a>
                    <a href="https://linkedin.com/company/cloudbit-consultoria-it/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                         <div className="bg-primary text-primary-foreground p-3 rounded-full group-hover:bg-primary/90 transition-colors">
                            <Linkedin className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-semibold text-lg">{t.channels.linkedin}</p>
                            <p className="text-muted-foreground">{t.channels.linkedinDescription}</p>
                        </div>
                    </a>
                </div>
                 <p className="text-muted-foreground mt-8 text-sm">{t.channels.hours}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    )
}
