/* FINAL LAYOUT: src/app/page.tsx */

import ScrollyVideo from "@/components/ui/ScrollyVideo"; 
import HeroInteractive from "@/components/HeroInteractive";
import GlassSection from "@/components/ui/GlassSection";

import WhyChooseUs from "@/components/sections/OurExpertise";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import MarketInsights from "@/components/sections/MarketInsights";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import TestimonialsGlass from "@/components/Testimonials";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";
// Removed CTAContact as requested

export default function Home() {
  return (
    <main className="relative min-h-[300vh]"> 
      
      {/* 1. GLOBAL BACKGROUND (Video) */}
      <ScrollyVideo />

      <div className="relative z-10 w-full flex flex-col items-center pb-0">

        {/* SCENE 1: HERO */}
        <HeroInteractive />

        {/* SCENE 2: COMPACT ADVANTAGE (Floating Glass) */}
        <div className="w-full max-w-7xl px-4 mb-24">
           <WhyChooseUs />
        </div>

        {/* SCENE 3: EXCLUSIVE MANDATES (Floating Glass) */}
        <GlassSection className="mb-32">
           <ExclusiveMandates />
        </GlassSection>

        {/* SCENE 4: SELECTED LISTINGS (White Strip) */}
        {/* Full width white background */}
        <div className="w-full bg-white shadow-2xl py-20">
           <div className="max-w-[1400px] mx-auto"> {/* Wider container for carousel */}
              <MarketInsights />
           </div>
        </div>

        {/* SCENE 5: LIMASSOL STATS (Transparent / Video Background) */}
        {/* Text inside this component must be White */}
        <div className="w-full max-w-7xl px-6 py-32">
            <LimassolAdvantage /> 
        </div>

        {/* SCENE 6: INSIGHTS & WHY (White Strip) */}
        <div className="w-full bg-white shadow-2xl py-24">
           <div className="max-w-7xl mx-auto px-6">
              <InsightsAndWhy />
           </div>
        </div>

        {/* SCENE 7: TESTIMONIALS (Transparent / Video Background) */}
        <div className="w-full max-w-7xl px-6 py-32 mb-20">
            <TestimonialsGlass />
        </div>

      </div>
    </main>
  );
}