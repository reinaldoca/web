import type { Language } from "@/lib/i18n/dictionary";
import { getSolutions } from "./solutions";

/** Links del sitio por idioma; Header y Footer leen de acá. */
export function getSolutionLinks(lang: Language) {
  return getSolutions(lang).map((solution) => ({
    label: solution.title,
    description: solution.tagline,
    href: `/soluciones/${solution.slug}`,
    icon: solution.icon,
  }));
}

/** `navLabel` es una versión corta para la barra del header, donde el espacio es justo. */
const contentLinksByLanguage: Record<Language, { label: string; href: string; navLabel?: string }[]> = {
  es: [
    { label: "Casos de éxito", href: "/casos-de-exito" },
    { label: "Blog", href: "/blog" },
    { label: "Preguntas frecuentes", href: "/faq", navLabel: "FAQ" },
  ],
  en: [
    { label: "Success stories", href: "/casos-de-exito" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
};

const companyLinksByLanguage: Record<Language, { label: string; href: string }[]> = {
  es: [
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Contacto", href: "/contacto" },
    { label: "Uso responsable de IA", href: "/ia-responsable" },
  ],
  en: [
    { label: "About us", href: "/#nosotros" },
    { label: "Contact", href: "/contacto" },
    { label: "Responsible AI", href: "/ia-responsable" },
  ],
};

export function getContentLinks(lang: Language) {
  return contentLinksByLanguage[lang];
}

export function getCompanyLinks(lang: Language) {
  return companyLinksByLanguage[lang];
}
