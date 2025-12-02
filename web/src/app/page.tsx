/* FINAL LAYOUT: src/app/page.tsx */

import VideoScroller from "@/components/ui/VideoScroller"; // Used the new name
import HeroInteractive from "@/components/HeroInteractive";
import GlassSection from "@/components/ui/GlassSection";

import WhyChooseUs from "@/components/sections/OurExpertise";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import MarketInsights from "@/components/sections/MarketInsights";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import TestimonialsGlass from "@/components/Testimonials";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";

export default function Home() {
  return (
    <main className="relative min-h-[300vh] bg-transparent"> 
      
      {/* 1. GLOBAL BACKGROUND (Video) */}
      {/* This sits fixed at z-index 0 */}
      <VideoScroller />

      {/* 2. SCROLLABLE CONTENT */}
      {/* z-10 ensures it sits ON TOP of the fixed video */}
      <div className="relative z-10 w-full flex flex-col items-center pb-0">

        {/* SCENE 1: HERO */}
        <HeroInteractive />

        {/* SCENE 2: COMPACT ADVANTAGE (Floating Glass) */}
        <div className="w-full max-w-7xl px-4 mb-24">
           {/* Wrapping this in glass-like styling if needed, or keeping transparent */}
           <div className="backdrop-blur-sm rounded-3xl p-6">
              <WhyChooseUs />
           </div>
        </div>

        {/* SCENE 3: EXCLUSIVE MANDATES (Floating Glass) */}
        <GlassSection className="mb-32">
           {/* Header for the section */}
           <div className="mb-8 text-center md:text-left text-white">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">The Collection</span>
              <h2 className="text-3xl font-montserrat font-bold mt-2">Exclusive Opportunities</h2>
           </div>
           <ExclusiveMandates />
        </GlassSection>

        {/* SCENE 4: SELECTED LISTINGS (White Strip) */}
        {/* Full width white background covers the video */}
        <div className="w-full bg-white shadow-2xl py-20 relative z-20">
           <div className="max-w-[1400px] mx-auto px-6"> 
              <MarketInsights />
           </div>
        </div>

        {/* SCENE 5: LIMASSOL STATS (Transparent / Video Background) */}
        {/* Video reveals again here. Text must be white. */}
        <div className="w-full max-w-7xl px-6 py-40">
            <LimassolAdvantage /> 
        </div>

        {/* SCENE 6: INSIGHTS & WHY (White Strip) */}
        {/* Full width white background covers the video */}
        <div className="w-full bg-white shadow-2xl py-24 relative z-20">
           <div className="max-w-7xl mx-auto px-6">
              <InsightsAndWhy />
           </div>
        </div>

        {/* SCENE 7: TESTIMONIALS (Transparent / Video Background) */}
        {/* Video reveals again here */}
        <div className="w-full max-w-7xl px-6 py-32 mb-20">
            <TestimonialsGlass />
        </div>

      </div>
    </main>
  );
}
