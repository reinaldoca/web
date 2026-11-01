import { faqMetadata, FaqRoute } from "@/routes/content";

export const metadata = faqMetadata("es");

export default function Page() {
    return <FaqRoute lang="es" />;
}
