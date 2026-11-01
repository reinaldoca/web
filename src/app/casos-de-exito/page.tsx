import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SiteShell } from "@/components/site/site-shell";
import { CasesIndex } from "./cases-index";

export const metadata: Metadata = pageMetadata({
    title: "Casos de éxito | CloudBit",
    description: "Cómo ayudamos a empresas de distintas industrias a migrar, automatizar y operar su infraestructura cloud.",
    path: "/casos-de-exito",
});

export default function CasesPage() {
    return (
        <SiteShell>
            <CasesIndex />
        </SiteShell>
    );
}
