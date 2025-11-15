
'use client';

import { useState, useEffect } from 'react';
import ContactForm from './contact-form';
import { type Dictionary } from '@/dictionaries/dictionaries';

type ContactPageTranslations = Dictionary['contactPage'];

export default function ContactPageClient({ t }: { t: ContactPageTranslations }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold font-headline">{t.form.title}</h2>
        <p className="text-muted-foreground mt-2">{t.form.subtitle}</p>
      </div>
      {isClient ? <ContactForm t={t.form} /> : <div>Loading form...</div>}
    </div>
  );
}
