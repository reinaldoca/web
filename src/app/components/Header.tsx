"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { GradientButton } from "@/components/ui/gradient-button";
import { premiumSpring } from "@/components/ui/fade-in";
import { IconTile } from "@/components/ui/icon-tile";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getServices } from "@/lib/services-data";
import { getSolutionLinks, getContentLinks } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

/**
 * Header fijo que, al pasar los 50px de scroll, se contrae a una "pill" flotante
 * con fondo azul translúcido (patrón `header.active` de la referencia).
 */
export function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [openMobileGroup, setOpenMobileGroup] = React.useState<string | null>(null);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { t, u, language } = useLanguage();
    const services = getServices(language);
    const solutionLinks = getSolutionLinks(language);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const contentLinks = getContentLinks(language);
    // Barra de escritorio: etiquetas cortas; menú de celular: etiquetas completas
    const navigation = contentLinks.map((link) => ({ name: link.navLabel ?? link.label, href: link.href }));
    const mobileNavigation = contentLinks.map((link) => ({ name: link.label, href: link.href }));

    const mobileGroups = [
        { id: "soluciones", label: u.common.solutions, links: solutionLinks.map((s) => ({ label: s.label, href: s.href })) },
        { id: "servicios", label: t.header.services, links: services.map((s) => ({ label: s.title, href: `/servicios/${s.id}` })) },
    ];

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-nb-blue focus:text-white focus:rounded-full focus:text-sm focus:font-semibold focus:outline-none focus:ring-4 focus:ring-nb-sky/40"
            >
                {u.header.skipToContent}
            </a>

            <motion.div
                initial={false}
                animate={{
                    maxWidth: isScrolled ? 1320 : 1600,
                    backgroundColor: isScrolled ? "rgba(9, 93, 189, 0.88)" : "rgba(8, 14, 27, 0)",
                    borderColor: isScrolled ? "rgba(202, 213, 226, 0.2)" : "rgba(202, 213, 226, 0)",
                    boxShadow: isScrolled
                        ? "0 4px 10px rgba(0,0,0,0.06), 0 10px 25px rgba(0,0,0,0.18)"
                        : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={premiumSpring}
                className={cn(
                    "mx-auto flex h-16 items-center justify-between rounded-full border px-4 md:h-[72px] md:px-6",
                    isScrolled && "backdrop-blur-md"
                )}
            >
                <Link href="/" className="flex shrink-0 items-center" aria-label={u.header.homeAria}>
                    <Image
                        src="/images/logo.png"
                        alt="CloudBit Logo"
                        width={300}
                        height={100}
                        className="h-12 w-auto object-contain md:h-14"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent text-white/80 transition-colors duration-300 hover:bg-transparent hover:text-white focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white">
                                    {u.common.solutions}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[560px] grid-cols-2 gap-1 p-3">
                                        {solutionLinks.map((solution) => (
                                            <li key={solution.href}>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={solution.href}
                                                        className="group flex !flex-row select-none items-start gap-3 rounded-xl p-3 text-left no-underline outline-none transition-colors hover:bg-nb-sky/10 focus:bg-nb-sky/10"
                                                    >
                                                        <IconTile icon={solution.icon} size="sm" />
                                                        <span>
                                                            <span className="block text-sm font-semibold text-white">{solution.label}</span>
                                                            <span className="mt-1 block text-xs leading-snug text-nb-text">{solution.description}</span>
                                                        </span>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent text-white/80 transition-colors duration-300 hover:bg-transparent hover:text-white focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white">
                                    {t.header.services}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-1 p-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {services.map((service) => (
                                            <li key={service.title}>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={`/servicios/${service.id}`}
                                                        className="group flex !flex-row select-none items-center gap-3 rounded-xl p-2.5 text-left text-sm font-medium leading-snug text-white/85 no-underline outline-none transition-colors hover:bg-nb-sky/10 hover:text-white focus:bg-nb-sky/10"
                                                    >
                                                        <IconTile icon={service.icon} size="sm" />
                                                        {service.title}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            {navigation.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.href}
                                            className="group relative inline-flex h-9 w-max items-center justify-center px-3 py-2 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white focus:outline-none"
                                        >
                                            {item.name}
                                            <span className="absolute bottom-0 left-3 right-3 h-px origin-center scale-x-0 bg-nb-sky transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <LanguageSwitcher />
                    <GradientButton
                        href="/contacto"
                        className={cn(
                            "px-5 py-2.5 text-sm",
                            isScrolled && "from-white to-white text-nb-blue hover:shadow-[0_10px_30px_rgba(255,255,255,0.25)]"
                        )}
                    >
                        {t.header.contact}
                    </GradientButton>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-white hover:bg-white/10">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">{u.header.openMenu}</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="overflow-y-auto border-nb-line bg-nb-dark">
                            <SheetTitle className="sr-only">{u.header.menuTitle}</SheetTitle>
                            <SheetDescription className="sr-only">
                                {u.header.menuDescription}
                            </SheetDescription>
                            <div className="mt-4 flex flex-col space-y-4 px-4">
                                <div className="flex justify-end">
                                    <LanguageSwitcher />
                                </div>

                                {mobileGroups.map((group) => (
                                    <div key={group.id} className="space-y-3">
                                        <button
                                            onClick={() => setOpenMobileGroup(openMobileGroup === group.id ? null : group.id)}
                                            className="flex w-full items-center justify-between text-lg font-medium text-white transition-colors hover:text-nb-sky"
                                            aria-expanded={openMobileGroup === group.id}
                                        >
                                            {group.label}
                                            <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", openMobileGroup === group.id ? "rotate-180" : "")} />
                                        </button>

                                        {openMobileGroup === group.id && (
                                            <div className="ml-1 space-y-3 border-l border-nb-line pl-4 animate-in slide-in-from-top-2 duration-200">
                                                {group.links.map((link) => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        className="block text-base text-nb-text transition-colors hover:text-white"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {mobileNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-lg font-medium text-white transition-colors hover:text-nb-sky"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div onClick={() => setIsOpen(false)}>
                                    <GradientButton href="/contacto" className="mt-4 w-full">
                                        {t.header.contact}
                                    </GradientButton>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </motion.div>
        </header>
    );
}
