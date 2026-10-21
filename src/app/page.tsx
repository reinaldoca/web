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
      <div className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse text-[#3FB950] font-mono">Loading case studies...</div>
          </div>
        </div>
      </div>
    ),
  }
);

const GenkitDemoModern = dynamic(
  () => import("./components/GenkitDemoModern").then(m => ({ default: m.GenkitDemoModern })),
  {
    loading: () => (
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
        <div className="container">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-[#58A6FF] font-mono">Initializing AI assistant...</div>
          </div>
        </div>
      </section>
    ),
  }
);

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
