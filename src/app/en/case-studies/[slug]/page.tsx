import { caseParams, caseMetadata, CaseRoute } from "@/routes/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => caseParams("en");
export const generateMetadata = ({ params }: Props) => caseMetadata(params, "en");

export default function Page({ params }: Props) {
    return <CaseRoute params={params} lang="en" />;
}
