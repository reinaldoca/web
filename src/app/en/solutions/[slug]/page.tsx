import { solutionParams, solutionMetadata, SolutionRoute } from "@/routes/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => solutionParams("en");
export const generateMetadata = ({ params }: Props) => solutionMetadata(params, "en");

export default function Page({ params }: Props) {
    return <SolutionRoute params={params} lang="en" />;
}
