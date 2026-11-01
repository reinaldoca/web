import { contactMetadata, ContactRoute } from "@/routes/content";

export const metadata = contactMetadata("en");

export default function Page() {
    return <ContactRoute />;
}
