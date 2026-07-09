// ARCHIVO DE EJEMPLO - page.tsx con componentes modernos
// Copia este contenido a src/app/page.tsx para activar los componentes modernos

import { Header } from "./components/Header";
import { HeroModern } from "./components/HeroModern";
import { ClientLogos } from "./components/ClientLogos";
import { ServicesModern } from "./components/ServicesModern";
import { AboutModern } from "./components/AboutModern";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { GenkitDemoModern } from "./components/GenkitDemoModern";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroModern />           {/* ✨ NUEVO: Hero con glow effects y partículas */}
      {/* <ClientLogos /> */}
      <ServicesModern />       {/* ✨ NUEVO: Bento Grid con microinteracciones */}
      <AboutModern />          {/* ✨ NUEVO: Contadores animados mejorados */}
      <WhyChooseUs />
      <GenkitDemoModern />     {/* ✨ NUEVO: ChatBot con pills interactivos */}
      <CTA />
      <Footer />
    </main>
  );
}
