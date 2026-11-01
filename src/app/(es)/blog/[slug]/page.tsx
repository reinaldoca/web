import { postParams, postMetadata, PostRoute } from "@/routes/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => postParams("es");
export const generateMetadata = ({ params }: Props) => postMetadata(params, "es");

export default function Page({ params }: Props) {
    return <PostRoute params={params} lang="es" />;
}
