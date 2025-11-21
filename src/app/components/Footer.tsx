"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t bg-background">
            <div className="container py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/images/logo.png"
                                alt="CloudBit Logo"
                                width={300}
                                height={100}
                                className="h-20 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            {t.footer.description}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <a href="mailto:contacto@cloudbit.com.ar" className="hover:text-primary transition-colors">
                                contacto@cloudbit.com.ar
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">{t.footer.services}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/servicios/observabilidad" className="hover:text-primary">Observabilidad</Link></li>
                            <li><Link href="/servicios/devops" className="hover:text-primary">DevOps</Link></li>
                            <li><Link href="/servicios/cloud" className="hover:text-primary">Cloud Computing</Link></li>
                            <li><Link href="/servicios/consultoria" className="hover:text-primary">Consultoría IT</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">{t.footer.company}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/#nosotros" className="hover:text-primary">{t.footer.links.about}</Link></li>
                            <li><Link href="#" className="hover:text-primary">{t.footer.links.careers}</Link></li>
                            <li><Link href="#" className="hover:text-primary">{t.footer.links.blog}</Link></li>
                            <li><Link href="/#contacto" className="hover:text-primary">{t.footer.links.contact}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">{t.footer.followUs}</h3>
                        <div className="flex space-x-4">
                            <Link href="https://linkedin.com/company/cloudbit-consultoria-it/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} CloudBit. {t.footer.rights}</p>
                </div>
            </div>
        </footer>
    );
}
