
import { i18n, Locale } from '@/dictionaries/i18n-config';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = params;

  // Validate that lang is a supported locale, otherwise use the default.
  const resolvedLang = i18n.locales.includes(lang as Locale) ? (lang as Locale) : i18n.defaultLocale;

  return (
    <>
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </>
  );
}
