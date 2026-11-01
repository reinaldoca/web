import { homeMetadata, HomeRoute } from "@/routes/home";

export const metadata = homeMetadata("es");

export default function Page() {
    return <HomeRoute />;
}
