/* FULL REPLACEMENT: src/app/page.tsx */

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
      
      {/* 1. FIXED VIDEO BACKGROUND (The House) */}
      <VideoScroller />

      {/* 2. THE CONTENT LAYER */}
      <div className="relative z-10 w-full">
        
        {/* --- 0vh - 100vh: THE EXTERIOR (Hero) --- */}
        <div className="h-screen w-full flex items-center justify-center">
          <HeroInteractive />
        </div>

        {/* --- 100vh - 200vh: THE APPROACH (Why Us & Mandates) --- */}
        <div className="relative py-24 space-y-32">
           <div className="px-6">
              <WhyChooseUs />
           </div>
           
           <div className="px-6">
              <ExclusiveMandates />
           </div>
        </div>

        {/* --- THE DOOR OPENING MOMENT --- */}
        {/* We leave a huge gap here visually so the user scrolls "into" the house.
            The Listings float at the bottom like a dashboard. */}
        <div className="relative h-[80vh] flex flex-col justify-end pb-20">
           {/* Section Title Floating in the air, allowing video visibility */}
           <div className="absolute top-10 w-full text-center px-6">
              <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                 Welcome Home.
              </h2>
              <p className="text-white/80 mt-2 text-lg drop-shadow-md">
                 Step inside our curated selection.
              </p>
           </div>

           {/* The Filmstrip Carousel (Glass HUD style) */}
           <div className="w-full">
              <MarketInsights />
           </div>
        </div>

        {/* --- THE LIVING ROOM (Insights) --- */}
        {/* We shift content to the Right Sidebar to let the room 'breathe' on the left */}
        <div className="relative min-h-screen flex items-center px-6 py-24">
           <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="hidden lg:block">
                 {/* LEFT SIDE IS EMPTY: To show the Living Room video details */}
              </div>
              <div className="apple-glass rounded-3xl p-8 lg:p-12 shadow-2xl backdrop-blur-xl">
                 <InsightsAndWhy />
              </div>
           </div>
        </div>
        
        {/* --- THE TERRACE/POOL (Stats & Finale) --- */}
        <div className="relative py-24 px-6 space-y-24">
           <LimassolAdvantage />
           <TestimonialsGlass />
        </div>

        {/* --- FOOTER --- */}
        <div className="bg-navy pt-24 pb-12 rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.4)]">
           <CTAContact />
        </div>

      </div>
    </main>
  );
}
