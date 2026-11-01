import { casesMetadata, CasesRoute } from "@/routes/content";

export const metadata = casesMetadata("en");

export default function Page() {
    return <CasesRoute />;
}
