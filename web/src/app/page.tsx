/* FULL REPLACEMENT: src/app/page.tsx */

import VideoScroller from "@/components/ui/VideoScroller";
import HeroInteractive from "@/components/HeroInteractive";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import MarketInsights from "@/components/sections/MarketInsights";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import TestimonialsGlass from "@/components/Testimonials";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";

export default function Home() {
  return (
    <main className="relative bg-navy">
      
      {/* 1. FIXED VIDEO BACKGROUND (The House) */}
      <VideoScroller />

      {/* 2. THE CONTENT LAYER */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* --- SCENE 1: THE ARRIVAL (Hero) --- */}
        <div className="h-screen w-full flex items-center justify-center mb-20">
          <HeroInteractive />
        </div>

        {/* --- SCENE 2: THE REPUTATION (Why Us & Mandates) --- */}
        {/* Added specific max-width and margins to frame the video */}
        <div className="w-full max-w-7xl px-6 flex flex-col gap-32 mb-40">
           <div>
              <WhyChooseUs />
           </div>
           <div>
              <ExclusiveMandates />
           </div>
        </div>

        {/* --- SCENE 3: THE GRAND ENTRANCE (Door Opening) --- */}
        {/* 
           CRITICAL UPDATE:
           We created a massive transparent gap (py-60) here.
           This forces the user to scroll through the video (door opening)
           before seeing the listings. 
        */}
        <div className="w-full py-40 md:py-60 flex flex-col items-center justify-center text-center">
           {/* The "Welcome Home" Text - Now distinct and readable */}
           <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-montserrat font-bold text-white drop-shadow-2xl">
                 Welcome Home.
              </h2>
              <p className="text-white/90 mt-4 text-xl font-light tracking-wide drop-shadow-lg max-w-2xl mx-auto">
                 Step inside our curated selection of properties.
              </p>
           </div>
        </div>

        {/* --- SCENE 4: THE GALLERY (Filmstrip) --- */}
        {/* This sits AFTER the gap, giving the listings their own stage */}
        <div className="w-full mb-60">
           <MarketInsights />
        </div>

        {/* --- SCENE 5: THE LIVING ROOM (Insights) --- */}
        {/* Split layout: Empty left side lets video show, Glass Panel on right */}
        <div className="w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-60">
           <div className="hidden lg:block">
              {/* Empty visual space for the 'Living Room' video view */}
           </div>
           <div className="apple-glass rounded-3xl p-8 lg:p-12 shadow-2xl backdrop-blur-xl">
              <InsightsAndWhy />
           </div>
        </div>
        
        {/* --- SCENE 6: THE TERRACE (Stats & Testimonials) --- */}
        <div className="w-full max-w-7xl px-6 space-y-40 mb-40">
           <LimassolAdvantage />
           <TestimonialsGlass />
        </div>

        {/* Note: The Footer comes automatically from layout.tsx after this main div closes */}

      </div>
    </main>
  );
}
