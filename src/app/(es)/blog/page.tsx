import { blogMetadata, BlogRoute } from "@/routes/content";

export const metadata = blogMetadata("es");

export default function Page() {
    return <BlogRoute />;
}
