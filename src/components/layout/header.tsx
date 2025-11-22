"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown, X } from 'lucide-react';
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
import { MegaMenu, type MegaMenuCategory } from '@/components/layout/mega-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { slugify } from '@/lib/utils';

const languageOptions: Record<Locale, { name: string; flag: React.ComponentType<{ className?: string }> }> = {
  en: { name: 'EN', flag: UsaFlagIcon },
  es: { name: 'ES', flag: SpainFlagIcon },
};

const navTexts: Record<Locale, any> = {
  en: {
    home: "Home",
    solutions: "Solutions",
    whyUs: "Why Us",
    successStories: "Success Stories",
    contact: "Contact"
  },
  es: {
    home: "Home",
    solutions: "Soluciones",
    whyUs: "Por qué elegirnos",
    successStories: "Casos de Éxito",
    contact: "Contacto"
  }
};

const megaMenuItems: Record<Locale, { solutions: MegaMenuCategory[] }> = {
  es: {
    solutions: [
      {
        title: "Adopción de Nube",
        links: [
          { title: "Cloud Foundations", href: `/servicios/${slugify("Cloud Foundations")}` },
          { title: "Servicios de Migración", href: `/servicios/${slugify("Servicios de Migración")}` },
        ]
      },
      {
        title: "Optimización y FinOps",
        links: [
          { title: "Well-Architected Review", href: `/servicios/${slugify("Well-Architected Review")}` },
        ]
      },
      {
        title: "Operaciones en la Nube",
        links: [
          { title: "Implementación de Herramientas DevOps", href: `/servicios/${slugify("Implementación de Herramientas DevOps")}` },
        ]
      }
    ]
  },
  en: {
    solutions: [
      {
        title: "Cloud Adoption",
        links: [
          { title: "Cloud Foundations", href: `/servicios/${slugify("Cloud Foundations")}` },
          { title: "Migration Services", href: `/servicios/${slugify("Migration Services")}` },
        ]
      },
      {
        title: "Optimization & FinOps",
        links: [
          { title: "Well-Architected Review", href: `/servicios/${slugify("Well-Architected Review")}` },
        ]
      },
       {
        title: "Cloud Operations",
        links: [
          { title: "DevOps Tools Implementation", href: `/servicios/${slugify("DevOps Tools Implementation")}` },
        ]
      }
    ]
  }
}


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
  const currentMegaMenuItems = megaMenuItems[currentLocale];


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
    const newPath = `/${currentLocale}${href}`.replace(/\/+/g, '/');
    return newPath;
  };

  const navLinks = [
    { href: '/', label: currentNavTexts.home },
    { href: '/por-que-elegirnos', label: currentNavTexts.whyUs },
    { href: '/casos-de-exito', label: currentNavTexts.successStories },
    { href: '/contacto', label: currentNavTexts.contact },
  ];

  const CurrentFlag = languageOptions[currentLocale].flag;

  const renderMobileMegaMenu = (title: string, categories: MegaMenuCategory[]) => (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-medium hover:text-primary">
        {title}
        <ChevronDown className="h-5 w-5" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-4 py-4 pl-4">
          {categories.map((category) => (
            <div key={category.title}>
              <h3 className="mb-2 font-semibold text-base text-muted-foreground">{category.title}</h3>
              <div className="flex flex-col gap-2">
                {category.links.map(link => (
                   <Link 
                      key={link.title} 
                      href={getLocalizedHref(link.href)} 
                      className="text-base font-medium hover:text-primary" 
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <header className="bg-cover bg-center bg-no-repeat sticky top-0 z-50 w-full border-b" style={{ backgroundImage: "url('/images/cloudbit-banner.png')" }}>
      <div className="bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto flex h-[80px] md:h-[110px] items-center justify-between px-4 md:px-6">
          <Link href={getLocalizedHref('/')} className="flex items-center gap-2 font-bold text-xl text-white">
             <div className="w-[80px] md:w-[100px]">
              <Image
                src="/images/cloudbit.png"
                alt="CloudBit Logo"
                width={100}
                height={100}
                className="h-auto w-full"
                priority
              />
            </div>
          </Link>
          
          <nav className="hidden md:flex gap-1 items-center">
            {navLinks.slice(0, 1).map((link) => (
              <Button key={link.href} variant="ghost" asChild className="text-sm font-medium text-white hover:bg-white/10 hover:text-white">
                <Link href={getLocalizedHref(link.href)}>
                  {link.label}
                </Link>
              </Button>
            ))}

            <MegaMenu triggerText={currentNavTexts.solutions} categories={currentMegaMenuItems.solutions} locale={currentLocale} />

            {navLinks.slice(1).map((link) => (
              <Button key={link.href} variant="ghost" asChild className="text-sm font-medium text-white hover:bg-white/10 hover:text-white">
                <Link href={getLocalizedHref(link.href)}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            {isMounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white/20 text-white border-white/50 hover:bg-white/30 hover:text-white">
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
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Abrir menú</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="flex flex-col gap-6 p-6">
                      <div className="flex justify-between items-center">
                        <Link 
                          href={getLocalizedHref('/')} 
                          className="flex items-center gap-2 font-bold text-lg" 
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="w-[100px]">
                            <Image
                              src="/images/cloudbit.png"
                              alt="CloudBit Logo"
                              width={100}
                              height={100}
                              className="h-auto w-full"
                            />
                          </div>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                          <X className="h-6 w-6" />
                        </Button>
                      </div>
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

                        {renderMobileMegaMenu(currentNavTexts.solutions, currentMegaMenuItems.solutions)}
                        
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
