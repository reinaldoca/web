"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { premiumSpring } from "@/components/ui/fade-in";
import type { Language } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Language; short: string; label: string }[] = [
    { value: "es", short: "ES", label: "Español" },
    { value: "en", short: "EN", label: "English" },
];

/**
 * Selector de idioma segmentado "ES | EN".
 * Reemplaza las banderas emoji, que Windows muestra como letras sueltas.
 * El indicador se desliza bajo el idioma activo; cada instancia usa su propio layoutId.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
    const { language, setLanguage, u } = useLanguage();
    const indicatorId = useId();

    return (
        <div
            role="radiogroup"
            aria-label={u.header.changeLanguage}
            className={cn("relative inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5", className)}
        >
            {OPTIONS.map((option) => {
                const isActive = option.value === language;
                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        aria-label={option.label}
                        lang={option.value}
                        onClick={() => setLanguage(option.value)}
                        className={cn(
                            "relative z-10 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nb-sky",
                            isActive ? "text-nb-dark" : "text-white/70 hover:text-white"
                        )}
                    >
                        {isActive && (
                            <motion.span
                                layoutId={`language-indicator-${indicatorId}`}
                                aria-hidden="true"
                                className="absolute inset-0 -z-10 rounded-full bg-white"
                                transition={premiumSpring}
                            />
                        )}
                        {option.short}
                    </button>
                );
            })}
        </div>
    );
}
