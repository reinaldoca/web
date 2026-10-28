import type { Metadata } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { ResponsibleAiView } from "./ai-view";

export const metadata: Metadata = {
    title: "Uso responsable de IA | CloudBit",
    description: "Principios que guían cómo CloudBit diseña e implementa soluciones con inteligencia artificial.",
};

export default function ResponsibleAiPage() {
    return (
        <SiteShell>
            <ResponsibleAiView />
        </SiteShell>
    );
}
