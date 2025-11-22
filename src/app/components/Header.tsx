"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getServices } from "@/lib/services-data";
import { cn } from "@/lib/utils";

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isServicesOpen, setIsServicesOpen] = React.useState(false);
    const { t, language } = useLanguage();
    const services = getServices(language);

    const navigation = [
        { name: t.header.about, href: "/#nosotros" },
        { name: t.header.whyUs, href: "/#elegirnos" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-20 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/images/logo.png"
                            alt="CloudBit Logo"
                            width={300}
                            height={100}
                            className="h-20 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>{t.header.services}</NavigationMenuTrigger>
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
                                    <Link href={item.href} legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {item.name}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <Button asChild className="transition-transform duration-200 ease-in-out hover:scale-105">
                        <Link href="/#contacto">{t.header.contact}</Link>
                    </Button>
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
        </header>
    );
}
