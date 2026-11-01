import { casesMetadata, CasesRoute } from "@/routes/content";

export const metadata = casesMetadata("es");

export default function Page() {
    return <CasesRoute />;
}
