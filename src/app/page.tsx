import { Header } from "./components/Header";
import { HeroModernOptimized } from "./components/HeroModern.optimized";
import { TrustBar } from "./components/TrustBar";
import { ProblemSolutionSection } from "./components/ProblemSolutionSection";
import { ServicesModern } from "./components/ServicesModern";
import { CertificationsSection } from "./components/CertificationsSection";
import { AboutModern } from "./components/AboutModern";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { FAQSection } from "./components/FAQSection";
import { GenkitDemoModern } from "./components/GenkitDemoModern";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { StructuredData } from "./components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CloudBit | DevOps, Cloud AWS/Azure y Kubernetes en Argentina",
  description: "Migración cloud, CI/CD y DevSecOps para startups y SaaS. Implementamos Kubernetes, Terraform y observabilidad. 8+ años de experiencia, 120+ proyectos. Consulta técnica gratuita.",
  keywords: [
    "DevOps Argentina",
    "migración AWS",
    "migración Azure",
    "Kubernetes Argentina",
    "CI/CD",
    "DevSecOps",
    "cloud arquitectura",
    "Terraform",
    "GitLab CI",
    "observabilidad",
    "staffing DevOps",
  ],
  authors: [{ name: "CloudBit" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://cloudbit.com.ar",
    siteName: "CloudBit",
    title: "CloudBit - DevOps y Cloud para empresas en crecimiento",
    description: "Automatizamos CI/CD, migramos a cloud y operamos Kubernetes. 8+ años, 120+ proyectos, 15+ ingenieros certificados.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CloudBit - DevOps, Cloud AWS/Azure y Kubernetes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudBit | DevOps, Cloud AWS/Azure y Kubernetes",
    description: "Migración cloud, CI/CD y DevSecOps para startups y SaaS. 8+ años de experiencia.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // TODO: Agregar código real
  },
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <main id="main-content" className="min-h-screen flex flex-col">
        <Header />
        <HeroModernOptimized />
        <TrustBar />
        <ProblemSolutionSection />
        <ServicesModern />
        <CertificationsSection />
        <AboutModern />
        <CaseStudiesSection />
        <WhyChooseUs />
        <FAQSection />
        <GenkitDemoModern />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
