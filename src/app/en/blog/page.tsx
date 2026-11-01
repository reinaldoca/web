import { blogMetadata, BlogRoute } from "@/routes/content";

export const metadata = blogMetadata("en");

export default function Page() {
    return <BlogRoute />;
}
