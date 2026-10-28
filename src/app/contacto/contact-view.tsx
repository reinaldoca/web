"use client";

import { Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { IconTile } from "@/components/ui/icon-tile";
import { useLanguage } from "@/components/language-provider";
import { PageHero } from "@/components/site/page-hero";
import { ContactFormInline } from "@/app/components/ContactFormInline";

export function ContactView() {
    const { u } = useLanguage();
    const copy = u.contactPage;

    const channels = [
        { icon: Mail, label: copy.email, value: "contacto@cloudbit.com.ar", href: "mailto:contacto@cloudbit.com.ar" },
        { icon: WhatsAppIcon, label: copy.whatsapp, value: "+54 9 11 6904-4913", href: "https://wa.me/5491169044913" },
        { icon: MapPin, label: copy.coverage, value: copy.coverageValue, href: undefined },
    ];

    return (
        <>
            <PageHero
                breadcrumbs={[{ label: u.common.home, href: "/" }, { label: copy.breadcrumb }]}
                label={copy.label}
                title={copy.title}
                description={copy.description}
            />

            <section className="pb-20 md:pb-28">
                <div className="container grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                    <ul className="space-y-4">
                        {channels.map((channel) => {
                            const content = (
                                <>
                                    <IconTile icon={channel.icon} />
                                    <span>
                                        <span className="block text-xs uppercase tracking-[0.14em] text-nb-text">{channel.label}</span>
                                        <span className="block font-semibold text-white">{channel.value}</span>
                                    </span>
                                </>
                            );
                            return (
                                <li key={channel.value}>
                                    {channel.href ? (
                                        <a
                                            href={channel.href}
                                            target={channel.href.startsWith("http") ? "_blank" : undefined}
                                            rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="nb-panel flex items-center gap-4 p-5 transition-colors hover:border-nb-sky/40"
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <div className="nb-panel flex items-center gap-4 p-5">{content}</div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    <div className="rounded-3xl border border-nb-line bg-nb-surface p-6 backdrop-blur-md md:p-10">
                        <ContactFormInline redirectOnSuccess="/contacto/gracias" />
                    </div>
                </div>
            </section>
        </>
    );
}
