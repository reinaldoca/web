"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { premiumSpring } from "@/components/ui/fade-in";
import { getFeaturedServices } from "@/lib/services-data";
import { getSolutionLinks, getContentLinks, getCompanyLinks } from "@/lib/content/navigation";

export function Footer() {
    const { t, u, language } = useLanguage();

    const columns = [
        { title: u.common.solutions, links: getSolutionLinks(language).map((s) => ({ label: s.label, href: s.href })) },
        {
            title: t.footer.services,
            links: getFeaturedServices(language)
                .map((s) => ({ label: s.title, href: `/servicios/${s.id}` }))
                .concat([{ label: u.common.seeAll, href: "/#servicios" }]),
        },
        { title: u.common.content, links: getContentLinks(language) },
        { title: t.footer.company, links: getCompanyLinks(language) },
    ];

    return (
        <footer className="relative mt-auto border-t border-nb-line">
            {/* Línea de luz superior */}
            <div aria-hidden="true" className="absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-nb-sky/60 to-transparent" />

            <div className="container py-14 md:py-20">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
                    <div className="space-y-5">
                        <Link href="/" className="inline-flex items-center">
                            <Image
                                src="/images/logo.png"
                                alt="CloudBit Logo"
                                width={300}
                                height={100}
                                className="h-14 w-auto object-contain"
                            />
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed text-nb-text">
                            {t.footer.description}
                        </p>
                        <a
                            href="mailto:contacto@cloudbit.com.ar"
                            className="inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-nb-sky"
                        >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            contacto@cloudbit.com.ar
                        </a>
                        <div>
                        <h3 className="sr-only">
                            {t.footer.followUs}
                        </h3>
                        <motion.div whileHover={{ y: -3 }} transition={premiumSpring} className="inline-block">
                            <Link
                                href="https://linkedin.com/company/cloudbit-consultoria-it/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-nb-line text-white/85 transition-colors hover:border-nb-sky/50 hover:bg-nb-sky/10 hover:text-white"
                            >
                                <Linkedin className="h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </motion.div>
                    </div>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title}>
                            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                                {column.title}
                            </h3>
                            <ul className="space-y-3 text-sm">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-nb-text transition-colors hover:text-white">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                <div className="mt-14 border-t border-nb-line pt-8 text-center text-sm text-nb-text">
                    <p>&copy; {new Date().getFullYear()} CloudBit. {t.footer.rights}</p>
                </div>
            </div>
        </footer>
    );
}
