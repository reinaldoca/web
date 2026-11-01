import { caseParams, caseMetadata, CaseRoute } from "@/routes/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => caseParams("es");
export const generateMetadata = ({ params }: Props) => caseMetadata(params, "es");

export default function Page({ params }: Props) {
    return <CaseRoute params={params} lang="es" />;
}
