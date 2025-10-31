'use client';

import Link from 'next/link';
import { Linkedin, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type Locale, i18n } from '@/dictionaries/i18n-config';

const footerTexts: Record<Locale, any> = {
  en: {
    companyName: "Tech Solutions AR",
    companyDescription: "Boosting your SMB with infrastructure, DevOps, and AWS solutions designed for the Argentine market.",
    quickContact: "Quick Contact",
    whatsapp: "WhatsApp Business",
    linkedin: "LinkedIn",
    hours: "Hours: Mon-Fri 9:00 AM - 6:00 PM (GMT-3)",
    navigation: "Navigation",
    services: "Services",
    contact: "Contact",
    copyright: "Tech Solutions AR. All rights reserved."
  },
  es: {
    companyName: "Tech Solutions AR",
    companyDescription: "Impulsando tu pyme con soluciones de infraestructura, DevOps y AWS diseñadas para el mercado argentino.",
    quickContact: "Contacto Rápido",
    whatsapp: "WhatsApp Business",
    linkedin: "LinkedIn",
    hours: "Horarios: L-V 9:00 - 18:00 (GMT-3)",
    navigation: "Navegación",
    services: "Servicios",
    contact: "Contacto",
    copyright: "Tech Solutions AR. Todos los derechos reservados."
  }
};


export default function Footer() {
  const pathname = usePathname();

  const getCurrentLocale = (): Locale => {
    if (!pathname) return i18n.defaultLocale;
    const segments = pathname.split('/');
    const locale = segments[1] as Locale;
    return i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
  };
  
  const lang = getCurrentLocale();
  const t = footerTexts[lang];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 font-headline">{t.companyName}</h3>
            <p className="text-sm">
              {t.companyDescription}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 font-headline">{t.quickContact}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">{t.whatsapp}</a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-5 w-5" />
                <a href="https://linkedin.com/company/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">{t.linkedin}</a>
              </li>
              <li className="text-sm">{t.hours}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 font-headline">{t.navigation}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${lang}/servicios`} className="hover:text-primary">{t.services}</Link></li>
              <li><Link href={`/${lang}/contacto`} className="hover:text-primary">{t.contact}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
