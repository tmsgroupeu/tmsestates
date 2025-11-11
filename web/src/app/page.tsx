// src/app/page.tsx
import HeroInteractive from "@/components/HeroInteractive";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import MarketInsights from "@/components/sections/MarketInsights";
import TestimonialsGlass from "@/components/Testimonials";
import CTAContact from "@/components/CTAContact";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Hero: first impression + primary CTA */}
      <section id="hero">
        <HeroInteractive />
      </section>

      {/* Exclusive Mandates: main product */}
      <section id="featured" aria-label="Exclusive property mandates">
        <ExclusiveMandates />
      </section>

      {/* Why + Insights: trust & authority */}
      <section id="insights" aria-label="Insights and expertise">
        <InsightsAndWhy />
      </section>

      {/* Limassol Advantage: location story */}
      <section id="advantage" aria-label="Why Limassol">
        <LimassolAdvantage />
      </section>

      {/* Market insights (charts / stats) */}
      <section aria-label="Market insights">
        <MarketInsights />
      </section>

      {/* Social proof */}
      <section aria-label="Client testimonials">
        <TestimonialsGlass />
      </section>

      {/* Contact / Lead capture */}
      <section id="contact" aria-label="Contact TMS Estates">
        <CTAContact />
      </section>

      <Footer />
    </>
  );
}
