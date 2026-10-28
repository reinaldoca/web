import type { Metadata } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { ThanksView } from "./thanks-view";

export const metadata: Metadata = {
    title: "¡Gracias! | CloudBit",
    robots: { index: false, follow: true },
};

export default function ThankYouPage() {
    return (
        <SiteShell>
            <ThanksView />
        </SiteShell>
    );
}
