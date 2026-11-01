import { serviceParams, serviceMetadata, ServiceRoute } from "@/routes/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => serviceParams("es");
export const generateMetadata = ({ params }: Props) => serviceMetadata(params, "es");

export default function Page({ params }: Props) {
    return <ServiceRoute params={params} lang="es" />;
}
