/* FULL FINAL VERSION: src/app/page.tsx */

import VideoScroller from "@/components/ui/VideoScroller";
import HeroInteractive from "@/components/HeroInteractive";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import MarketInsights from "@/components/sections/MarketInsights";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import TestimonialsGlass from "@/components/Testimonials";
import CTAContact from "@/components/CTAContact";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";

export default function Home() {
  return (
    <main className="relative bg-navy">
      
      {/* 1. FIXED VIDEO BACKGROUND */}
      <VideoScroller />

      {/* 2. SCROLLABLE CONTENT LAYER (z-10) */}
      <div className="relative z-10 w-full">
        
        {/* --- SECTION 1: HERO (Transparent) --- */}
        {/* 100vh height to showcase the video start */}
        <div className="h-screen w-full">
          <HeroInteractive />
        </div>

        {/* --- SECTION 2: WHY CHOOSE US (Floating) --- */}
        {/* Adds padding to push it below the hero but keep it over the video */}
        <div className="pb-24 pt-12">
           <WhyChooseUs />
        </div>

        {/* --- SECTION 3: EXCLUSIVE MANDATES (Floating) --- */}
        <div className="pb-32">
           <ExclusiveMandates />
        </div>

        {/* --- SECTION 4: THE WHITE LANE (Solid Paper Background) --- */}
        {/* This creates a visual break. It slides OVER the video. */}
        <div className="relative z-20 w-full bg-[#FBFBFB] rounded-t-[3rem] shadow-[0_-40px_80px_rgba(0,0,0,0.5)] overflow-hidden">
           
           {/* Top Border Accent */}
           <div className="absolute top-0 left-0 w-full h-1 bg-[var(--gold)]/20" />

           {/* Content inside the White Lane */}
           <div className="mx-auto max-w-7xl px-6 py-24 space-y-32">
              
              {/* Selected Listings Carousel */}
              <MarketInsights />
              
              {/* Informed Decisions Data */}
              <InsightsAndWhy />
              
           </div>

           {/* --- WINDOW TO THE VIDEO (Transparent Gap) --- */}
           {/* We "cut" the white paper here to let the video show through for Stats */}
           <div className="relative py-40 bg-transparent"> 
             {/* 
                Trick: We are physically inside the 'white lane' div, 
                so we apply a negative margin or mask to show the video behind? 
                Actually, simpler: Close the white div above, open a new one below.
             */}
           </div>
        </div>
        
        {/* --- SECTION 5: STATS & TESTIMONIALS (Video Background) --- */}
        {/* Now we are 'between' white lanes. The video scroller is visible again. */}
        <div className="-mt-[20rem] relative z-10 pb-40">
           <div className="w-full max-w-7xl mx-auto px-6 space-y-32">
              <LimassolAdvantage />
              <TestimonialsGlass />
           </div>
        </div>

        {/* --- SECTION 6: FINALE (Dark Solid) --- */}
        <div className="relative z-20 bg-[var(--navy)] pt-24 pb-12 rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.4)]">
           <CTAContact />
        </div>

      </div>
    </main>
  );
}
