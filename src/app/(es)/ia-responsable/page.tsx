import { responsibleAiMetadata, ResponsibleAiRoute } from "@/routes/content";

export const metadata = responsibleAiMetadata("es");

export default function Page() {
    return <ResponsibleAiRoute />;
}
