import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { WhatsAppButton } from "@/app/components/WhatsAppButton";
import type { Language } from "@/lib/i18n/dictionary";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Documento HTML compartido por los layouts raíz de cada idioma (app/(es) y app/en). */
export function RootDocument({ lang, children }: { lang: Language; children: React.ReactNode }) {
  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body className={`${plusJakarta.variable} ${geistMono.variable} font-sans antialiased`}>
        <LanguageProvider language={lang}>
          {children}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
