"use client";

import React, { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import { dictionary, Language } from "@/lib/i18n/dictionary";
import { ui } from "@/lib/i18n/ui";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof dictionary.es;
    /** Textos de interfaz de componentes (ver src/lib/i18n/ui.ts). */
    u: (typeof ui)["es"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "language";
const CHANGE_EVENT = "cloudbit:language";

// La preferencia vive en localStorage; useSyncExternalStore la lee sin setState en efectos
// y mantiene sincronizadas otras pestañas (evento "storage").
function subscribe(onChange: () => void) {
    window.addEventListener("storage", onChange);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(CHANGE_EVENT, onChange);
    };
}

function readLanguage(): Language {
    try {
        return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "es";
    } catch {
        return "es";
    }
}

// El HTML del servidor siempre se genera en español
const getServerLanguage = (): Language => "es";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const language = useSyncExternalStore(subscribe, readLanguage, getServerLanguage);

    // Mantener <html lang> sincronizado para lectores de pantalla y traductores
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = useCallback((lang: Language) => {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            // Sin almacenamiento disponible (modo privado): el cambio no persiste
        }
        window.dispatchEvent(new Event(CHANGE_EVENT));
    }, []);

    const value = {
        language,
        setLanguage,
        t: dictionary[language],
        u: ui[language],
    };

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
