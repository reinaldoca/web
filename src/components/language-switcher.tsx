"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { Globe } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <span className="text-lg leading-none">
                        {language === "es" ? "🇪🇸" : "🇺🇸"}
                    </span>
                    <span className="sr-only">Cambiar idioma</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("es")} className={language === "es" ? "bg-accent" : ""}>
                    <span className="mr-2">🇪🇸</span> Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                    <span className="mr-2">🇺🇸</span> English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
