import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Header } from "@/app/components/Header";
import { HeroModernOptimized } from "@/app/components/HeroModern.optimized";
import { TrustBar } from "@/app/components/TrustBar";
import { ProblemSolutionSection } from "@/app/components/ProblemSolutionSection";
import { ServicesModern } from "@/app/components/ServicesModern";
import { CertificationsSection } from "@/app/components/CertificationsSection";
import { AboutModern } from "@/app/components/AboutModern";
import { ProcessSection } from "@/app/components/ProcessSection";
import { WhyChooseUs } from "@/app/components/WhyChooseUs";
import { FAQSection } from "@/app/components/FAQSection";
import { CTA } from "@/app/components/CTA";
import { Footer } from "@/app/components/Footer";
import { StructuredData } from "@/app/components/StructuredData";
import type { Language } from "@/lib/i18n/dictionary";
import { pageMetadata } from "@/lib/seo";

// Dynamic imports para componentes below-fold pesados
const CaseStudiesSection = dynamic(
  () => import("@/app/components/CaseStudiesSection").then(m => ({ default: m.CaseStudiesSection })),
  {
    loading: () => (
      <div className="py-20 md:py-32">
        <div className="container">
          <div className="h-64 rounded-3xl border border-nb-line bg-nb-surface" aria-hidden="true" />
        </div>
      </div>
    ),
  }
);

// Asistente inteligente (GenkitDemoModern) oculto por el momento: el componente sigue en
// src/app/components/GenkitDemoModern.tsx; para volver a mostrarlo, importarlo con dynamic() y ubicarlo antes de <CTA />.

const homeCopy: Record<Language, { title: string; description: string; keywords: string[] }> = {
  es: {
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
  },
  en: {
    title: "CloudBit | DevOps, AWS/Azure Cloud and Kubernetes for companies worldwide",
    description: "Cloud migration, CI/CD and DevSecOps for startups and SaaS companies in any country, in English or Spanish. We implement Kubernetes, Terraform and observability. 8+ years of experience, 120+ projects. Free technical consultation.",
    keywords: [
      "DevOps consulting",
      "remote DevOps team",
      "AWS consulting",
      "AWS migration",
      "Azure migration",
      "managed Kubernetes",
      "CI/CD",
      "DevSecOps",
      "cloud architecture",
      "Terraform",
      "infrastructure as code",
      "observability",
      "DevOps staffing",
      "nearshore DevOps",
    ],
  },
};

export function homeMetadata(lang: Language): Metadata {
  const copy = homeCopy[lang];
  return {
    ...pageMetadata({ title: copy.title, description: copy.description, path: "/", lang }),
    keywords: copy.keywords,
    authors: [{ name: "CloudBit" }],
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
}

export function HomeRoute() {
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
        <CTA />
        <Footer />
      </main>
    </>
  );
}
