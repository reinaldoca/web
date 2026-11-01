import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SiteShell } from "@/components/site/site-shell";
import { ContactView } from "./contact-view";

export const metadata: Metadata = pageMetadata({
    title: "Contacto | CloudBit",
    description: "Agendá una consulta técnica gratuita con un arquitecto cloud de CloudBit.",
    path: "/contacto",
});

export default function ContactPage() {
    return (
        <SiteShell>
            <ContactView />
        </SiteShell>
    );
}
