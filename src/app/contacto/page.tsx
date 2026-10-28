import type { Metadata } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { ContactView } from "./contact-view";

export const metadata: Metadata = {
    title: "Contacto | CloudBit",
    description: "Agendá una consulta técnica gratuita con un arquitecto cloud de CloudBit.",
};

export default function ContactPage() {
    return (
        <SiteShell>
            <ContactView />
        </SiteShell>
    );
}
