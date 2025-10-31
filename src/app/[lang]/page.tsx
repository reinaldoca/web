import { getDictionary } from '@/dictionaries/dictionaries';
import { Locale } from '@/dictionaries/i18n-config';
import HomeClient from './home-client';

interface LangHomePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function LangHome({ params }: LangHomePageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return <HomeClient lang={lang} t={dictionary.home} />;
}
