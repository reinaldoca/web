import { homeMetadata, HomeRoute } from "@/routes/home";

export const metadata = homeMetadata("en");

export default function Page() {
    return <HomeRoute />;
}
