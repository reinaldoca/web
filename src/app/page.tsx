import HomeClient from "./[lang]/home-client";
import { getDictionary } from "@/dictionaries/dictionaries";
import { i18n } from "@/dictionaries/i18n-config";

export default async function Home() {
  const lang = i18n.defaultLocale;
  const dictionary = await getDictionary(lang);
  return <HomeClient lang={lang} t={dictionary.home} />;
}
