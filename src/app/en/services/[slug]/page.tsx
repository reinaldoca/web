import { serviceParams, serviceMetadata, ServiceRoute } from "@/routes/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => serviceParams("en");
export const generateMetadata = ({ params }: Props) => serviceMetadata(params, "en");

export default function Page({ params }: Props) {
    return <ServiceRoute params={params} lang="en" />;
}
