/* ✅ Final Version: ./app/page.tsx */

import HeroInteractive from "@/components/HeroInteractive";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import WhyChooseUs from "@/components/sections/OurExpertise";
import MarketInsights from "@/components/sections/MarketInsights";
import TestimonialsGlass from "@/components/Testimonials";
import CTAContact from "@/components/CTAContact";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";
// Footer is no longer imported here as it's now in the global layout

export default function Home() {
  return (
    <>
      <HeroInteractive />

      {/* This remains the main scrolling container */}
      <div className="relative z-10">
      {/* --- LANE 1: TRANSPARENT --- */}
        <WhyChooseUs />

        {/* --- LANE 2: SOLID --- */}
        <div className="bg-background">
          <ExclusiveMandates />
        </div>


        {/* --- LANE 3: TRANSPARENT (Property Carousel) --- */}
        <MarketInsights />

        {/* --- LANE 4: SOLID --- */}
        <div className="bg-background">
          <InsightsAndWhy />
          <LimassolAdvantage />
          {/* ✅ The <CTAContact /> component is now your final section before the global footer */}
          <CTAContact />
        </div>

        {/* --- LANE 5: TRANSPARENT (Testimonials) --- */}
        <TestimonialsGlass />

        {/* --- LANE 6: SOLID (Final Sections) --- */}
        {/* ❌ REMOVED: The <Footer /> component was here. It will now be added automatically by layout.tsx */}
        
      </div>
    </>
  );
}
