import type { Metadata } from "next";
import { RootDocument } from "@/components/site/root-document";
import { rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("es");

export default function SpanishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument lang="es">{children}</RootDocument>;
}
