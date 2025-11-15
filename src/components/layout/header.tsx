"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { type Locale, i18n } from '@/dictionaries/i18n-config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UsaFlagIcon, SpainFlagIcon } from '@/components/icons';

const languageOptions: Record<Locale, { name: string; flag: React.ComponentType<{ className?: string }> }> = {
  en: { name: 'EN', flag: UsaFlagIcon },
  es: { name: 'ES', flag: SpainFlagIcon },
};

// Define los textos directamente aquí o impórtalos de tus diccionarios
const navTexts: Record<Locale, { home: string; services: string; whyUs: string; successStories: string; contact: string }> = {
  en: {
    home: "Home",
    services: "Services", 
    whyUs: "Why Us",
    successStories: "Success Stories",
    contact: "Contact"
  },
  es: {
    home: "Home",
    services: "Servicios",
    whyUs: "Por qué elegirnos", 
    successStories: "Casos de Éxito",
    contact: "Contacto"
  }
};


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getCurrentLocale = (): Locale => {
    if (!pathname) return i18n.defaultLocale;
    const segments = pathname.split('/');
    const locale = segments[1] as Locale;
    return i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
  };
  
  const currentLocale = getCurrentLocale();
  const currentNavTexts = navTexts[currentLocale];

  const getRedirectedPathname = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const getLocalizedHref = (href: string) => {
    if (href === '/') {
      return `/${currentLocale}`;
    }
    // Asegurarse de que no haya doble barra
    const newPath = `/${currentLocale}${href}`.replace(/\/+/g, '/');
    return newPath;
  };

  const navLinks = [
    { href: '/', label: currentNavTexts.home },
    { href: '/servicios', label: currentNavTexts.services },
    { href: '/por-que-elegirnos', label: currentNavTexts.whyUs },
    { href: '/casos-de-exito', label: currentNavTexts.successStories },
    { href: '/contacto', label: currentNavTexts.contact },
  ];

  const CurrentFlag = languageOptions[currentLocale].flag;

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={getLocalizedHref('/')} className="flex items-center gap-2 font-bold text-xl">
          CloudBit
        </Link>
        
        <nav className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={getLocalizedHref(link.href)} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          {isMounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <CurrentFlag className="h-4 w-4 rounded-full object-cover" />
                  {languageOptions[currentLocale].name}
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(['es', 'en'] as Locale[]).map((locale) => {
                  const { name, flag: Flag } = languageOptions[locale];
                  return (
                    <DropdownMenuItem key={locale} asChild>
                      <a href={getRedirectedPathname(locale)} className="flex items-center gap-2">
                        <Flag className="h-4 w-4 rounded-full object-cover" />
                        <span>{name}</span>
                      </a>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="md:hidden">
            {isMounted && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-6 p-6">
                    <Link 
                      href={getLocalizedHref('/')} 
                      className="flex items-center gap-2 font-bold text-lg" 
                      onClick={() => setIsOpen(false)}
                    >
                      CloudBit
                    </Link>
                    <nav className="flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <Link 
                          key={link.href} 
                          href={getLocalizedHref(link.href)} 
                          className="text-lg font-medium hover:text-primary" 
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}