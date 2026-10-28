import type { Metadata } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { CasesIndex } from "./cases-index";

export const metadata: Metadata = {
    title: "Casos de éxito | CloudBit",
    description: "Cómo ayudamos a empresas de distintas industrias a migrar, automatizar y operar su infraestructura cloud.",
};

export default function CasesPage() {
    return (
        <SiteShell>
            <CasesIndex />
        </SiteShell>
    );
}
