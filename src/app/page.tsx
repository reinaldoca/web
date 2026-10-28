import dynamic from "next/dynamic";
import { Header } from "./components/Header";
import { HeroModernOptimized } from "./components/HeroModern.optimized";
import { TrustBar } from "./components/TrustBar";
import { ProblemSolutionSection } from "./components/ProblemSolutionSection";
import { ServicesModern } from "./components/ServicesModern";
import { CertificationsSection } from "./components/CertificationsSection";
import { AboutModern } from "./components/AboutModern";
import { ProcessSection } from "./components/ProcessSection";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { FAQSection } from "./components/FAQSection";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { StructuredData } from "./components/StructuredData";
import type { Metadata } from "next";

// Dynamic imports para componentes below-fold pesados
const CaseStudiesSection = dynamic(
  () => import("./components/CaseStudiesSection").then(m => ({ default: m.CaseStudiesSection })),
  {
    loading: () => (
      <div className="py-20 md:py-32">
        <div className="container">
          {/* Esqueleto sin texto: el idioma se conoce recién en el cliente */}
          <div className="h-64 rounded-3xl border border-nb-line bg-nb-surface" aria-hidden="true" />
        </div>
      </div>
    ),
  }
);

const GenkitDemoModern = dynamic(
  () => import("./components/GenkitDemoModern").then(m => ({ default: m.GenkitDemoModern })),
  {
    loading: () => (
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto h-96 max-w-2xl rounded-3xl border border-nb-line bg-nb-surface" aria-hidden="true" />
        </div>
      </section>
    ),
  }
);

export const metadata: Metadata = {
  title: "CloudBit | DevOps, Cloud AWS/Azure y Kubernetes para empresas de todo el mundo",
  description: "Migración cloud, CI/CD y DevSecOps para startups y SaaS de cualquier país, en español o inglés. Implementamos Kubernetes, Terraform y observabilidad. 8+ años de experiencia, 120+ proyectos. Consulta técnica gratuita.",
  keywords: [
    "consultora DevOps",
    "DevOps remoto",
    "cloud consulting",
    "migración AWS",
    "migración Azure",
    "Kubernetes gestionado",
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
    alternateLocale: ["en_US"],
    url: "https://cloudbit.com.ar",
    siteName: "CloudBit",
    title: "CloudBit - DevOps y Cloud para empresas en crecimiento",
    description: "Automatizamos CI/CD, migramos a cloud y operamos Kubernetes. 8+ años, 120+ proyectos, 15+ ingenieros certificados.",
    // La imagen la genera src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudBit | DevOps, Cloud AWS/Azure y Kubernetes",
    description: "Migración cloud, CI/CD y DevSecOps para startups y SaaS. 8+ años de experiencia.",
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
  // Se publica solo si existe el código real de Google Search Console
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <main id="main-content" className="min-h-screen flex flex-col overflow-x-clip">
        <Header />
        <HeroModernOptimized />
        <TrustBar />
        <ProblemSolutionSection />
        <ServicesModern />
        <CertificationsSection />
        <AboutModern />
        <ProcessSection />
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
