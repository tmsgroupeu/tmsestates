/* UPDATED: src/app/page.tsx */

import FixedVideoBackground from "@/components/ui/FixedVideoBackground";
import HeroInteractive from "@/components/HeroInteractive";
import GlassSection from "@/components/ui/GlassSection";

// Import your ORIGINAL sections
import WhyChooseUs from "@/components/sections/OurExpertise";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import MarketInsights from "@/components/sections/MarketInsights";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import TestimonialsGlass from "@/components/Testimonials";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";
import CTAContact from "@/components/CTAContact";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      
      {/* 1. FIXED BACKGROUND (Smooth Video) */}
      <FixedVideoBackground />

      {/* 2. SCROLLABLE CONTENT */}
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* --- SCENE 1: HERO --- */}
        <HeroInteractive />

        {/* --- SCENE 2: FLOATING GLASS SECTIONS --- */}
        {/* These float over the video background */}
        
        <GlassSection>
           <WhyChooseUs />
        </GlassSection>

        <GlassSection>
           <ExclusiveMandates />
        </GlassSection>

        {/* --- SCENE 3: SOLID GROUND --- */}
        {/* We transition to a solid background for dense content (Listings, Stats) */}
        <div className="w-full bg-paper rounded-t-[50px] shadow-[0_-50px_100px_rgba(0,0,0,0.5)] mt-12 pt-24 pb-20">
           
           <div className="max-w-7xl mx-auto px-6 space-y-24">
              
              {/* Listings Loop */}
              <MarketInsights />
              
              {/* Stats & Insights */}
              <div className="bg-white rounded-3xl p-8 border border-muted shadow-sm">
                <LimassolAdvantage />
              </div>
              
              <InsightsAndWhy />
              
              {/* Testimonials (already has glass styling internally, so we just place it) */}
              <div className="bg-navy rounded-3xl p-8 overflow-hidden relative">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  <TestimonialsGlass />
              </div>

              <CTAContact />
              
           </div>
        </div>

      </div>
    </main>
  );
}