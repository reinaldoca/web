import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ClientLogos } from "./components/ClientLogos";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { GenkitDemo } from "./components/GenkitDemo";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      {/* <ClientLogos /> */}
      <Services />
      <About />
      <WhyChooseUs />
      <GenkitDemo />
      <CTA />
      <Footer />
    </main>
  );
}
