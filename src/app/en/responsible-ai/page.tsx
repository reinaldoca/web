import { responsibleAiMetadata, ResponsibleAiRoute } from "@/routes/content";

export const metadata = responsibleAiMetadata("en");

export default function Page() {
    return <ResponsibleAiRoute />;
}
