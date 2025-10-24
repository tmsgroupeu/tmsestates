import HeroInteractive from "@/components/HeroInteractive";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import PropertyCollections from "@/components/sections/PropertyCollections";
import MarketInsights from "@/components/sections/MarketInsights";
import Testimonials from "@/components/Testimonials";
import CTAContact from "@/components/CTAContact";

export default function Home() {
  return (
    <>
      <HeroInteractive />
      {/* 
        CHANGE: Added classes here.
        - `relative`: Creates a new stacking context for the z-index to work.
        - `z-10`: Lifts this whole section above any elements with a lower z-index (like the hero).
        - `bg-background`: Ensures the main content has a solid background to cover the hero image.
      */}
      <main className="relative z-10 bg-background">
        <ExclusiveMandates />
        <LimassolAdvantage />
        <PropertyCollections />
        <MarketInsights />
        <Testimonials />
        <CTAContact />
      </main>
    </>
  );
}