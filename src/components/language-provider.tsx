"use client";

import React, { createContext, useContext, useMemo } from "react";
import { dictionary, Language } from "@/lib/i18n/dictionary";
import { ui } from "@/lib/i18n/ui";
import { localizeHref } from "@/lib/i18n/routes";

interface LanguageContextType {
    language: Language;
    t: typeof dictionary.es;
    /** Textos de interfaz de componentes (ver src/lib/i18n/ui.ts). */
    u: (typeof ui)["es"];
    /** Convierte una ruta en español ("/contacto") a la del idioma actual ("/en/contact"). */
    to: (href: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * El idioma lo define la URL: el layout raíz de cada idioma lo pasa fijo,
 * así el HTML del servidor ya sale en el idioma correcto y los buscadores indexan ambos.
 */
export function LanguageProvider({ language, children }: { language: Language; children: React.ReactNode }) {
    const value = useMemo(
        () => ({
            language,
            t: dictionary[language],
            u: ui[language],
            to: (href: string) => localizeHref(href, language),
        }),
        [language],
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
