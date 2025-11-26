/* UPDATED: src/app/page.tsx */
import ScrollyVideo from "@/components/ui/ScrollyVideo"; // ✅ CHANGED
import HeroInteractive from "@/components/HeroInteractive";
import GlassSection from "@/components/ui/GlassSection";

import WhyChooseUs from "@/components/sections/OurExpertise";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import MarketInsights from "@/components/sections/MarketInsights";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import TestimonialsGlass from "@/components/Testimonials";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";
import CTAContact from "@/components/CTAContact";

export default function Home() {
  return (
    <main className="relative min-h-[300vh]"> 
      {/* Increased height so we have room to 'scrub' the video */}
      
      {/* 1. THE VIDEO ENGINE */}
      <ScrollyVideo />

      {/* 2. SCROLL CONTENT */}
      <div className="relative z-10 w-full flex flex-col items-center pb-32">

        {/* HERO */}
        <HeroInteractive />

        {/* FLOATING GLASS SECTIONS */}
        <GlassSection>
           <WhyChooseUs />
        </GlassSection>

        <GlassSection>
           <ExclusiveMandates />
        </GlassSection>

        {/* SOLID GROUND */}
        <div className="w-full bg-[#F9F9F9] rounded-t-[50px] shadow-2xl mt-12 pt-24 pb-20">
           <div className="max-w-7xl mx-auto px-6 space-y-24">
              <MarketInsights />
              
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <LimassolAdvantage />
              </div>
              
              <InsightsAndWhy />
              
              <div className="bg-navy rounded-3xl p-8 overflow-hidden relative">
                  <TestimonialsGlass />
              </div>

              <CTAContact />
           </div>
        </div>

      </div>
    </main>
  );
}