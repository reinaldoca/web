import { faqMetadata, FaqRoute } from "@/routes/content";

export const metadata = faqMetadata("en");

export default function Page() {
    return <FaqRoute lang="en" />;
}
