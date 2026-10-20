"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getServices } from "@/lib/services-data";
import { cn } from "@/lib/utils";

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isServicesOpen, setIsServicesOpen] = React.useState(false);
    const [scrollProgress, setScrollProgress] = React.useState(0);
    const { t, language } = useLanguage();
    const services = getServices(language);

    const navigation = [
        { name: t.header.about, href: "/#nosotros" },
        { name: t.header.whyUs, href: "/#elegirnos" },
    ];

    // Scroll progress tracking
    React.useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md relative">
            {/* Skip to main content link - accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#8b5cf6] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            >
                Saltar al contenido principal
            </a>
            <div className="container flex h-20 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/images/logo.png"
                            alt="CloudBit Logo"
                            width={300}
                            height={100}
                            className="h-20 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-slate-500 hover:text-[#8b5cf6] transition-colors duration-300 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">{t.header.services}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {services.map((service) => (
                                            <li key={service.title}>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={`/servicios/${service.id}`}
                                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                    >
                                                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                                                            <service.icon className="h-4 w-4 text-primary" />
                                                            {service.title}
                                                        </div>
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
                                            className="group relative inline-flex h-9 w-max items-center justify-center bg-transparent px-3 py-2 text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-[#8b5cf6] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            {item.name}
                                            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8b5cf6] origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                        <Button asChild>
                            <Link href="/#contacto">{t.header.contact}</Link>
                        </Button>
                    </motion.div>
                    <LanguageSwitcher />
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="overflow-y-auto">
                            <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                            <SheetDescription className="sr-only">
                                Navegue por las secciones de nuestro sitio web
                            </SheetDescription>
                            <div className="flex flex-col space-y-4 mt-4">
                                <div className="flex justify-end">
                                    <LanguageSwitcher />
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                                        className="flex items-center justify-between w-full font-medium text-lg hover:text-primary transition-colors"
                                    >
                                        {t.header.services}
                                        <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", isServicesOpen ? "rotate-180" : "")} />
                                    </button>

                                    {isServicesOpen && (
                                        <div className="pl-4 space-y-3 border-l-2 border-muted ml-1 animate-in slide-in-from-top-2 duration-200">
                                            {services.map((service) => (
                                                <Link
                                                    key={service.title}
                                                    href={`/servicios/${service.id}`}
                                                    className="block text-base text-muted-foreground hover:text-primary transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {service.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-lg font-medium transition-colors hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Button asChild className="w-full mt-4">
                                    <Link href="/#contacto" onClick={() => setIsOpen(false)}>
                                        {t.header.contact}
                                    </Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]"
                style={{ width: `${scrollProgress}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
        </header>
    );
}
