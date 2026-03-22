/* FULL REPLACEMENT: src/app/[locale]/page.tsx */

import VideoScroller from "@/components/ui/VideoScroller";
import HeroInteractive from "@/components/HeroInteractive";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurProjects from "@/components/OurProjects"; 
import MarketInsights from "@/components/sections/MarketInsights";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import TestimonialsGlass from "@/components/Testimonials";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";
import CTAContact from "@/components/CTAContact";

export default function Home() {
  return (
    <main className="relative bg-navy">
      <VideoScroller />

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* HERO */}
        <div className="h-screen w-full flex items-center justify-center mb-20">
          <HeroInteractive />
        </div>

        {/* WHY US & PROJECTS */}
        <div className="w-full max-w-7xl px-6 flex flex-col gap-32 mb-40">
           <div>
              <WhyChooseUs />
           </div>
           {/* ✅ FIX: Added id="projects" for the Header link */}
           <div id="projects" className="scroll-mt-32">
              <OurProjects />
           </div>
        </div>

        {/* DOOR OPENING GAP */}
        <div className="w-full py-40 md:py-60 flex flex-col items-center justify-center text-center">
           <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-montserrat font-bold text-white drop-shadow-2xl">
                 The Portfolio.
              </h2>
              <p className="text-white/90 mt-4 text-xl font-light tracking-wide drop-shadow-lg max-w-2xl mx-auto">
                 Explore our curated selection of properties.
              </p>
           </div>
        </div>

        {/* LISTINGS CAROUSEL */}
        {/* ✅ FIX: Changed id to "portfolio" for the Header link */}
        <div id="portfolio" className="w-full mb-60 scroll-mt-32">
           <MarketInsights />
        </div>

        {/* INSIGHTS */}
        <div id="insights" className="w-full px-6 mb-60 flex justify-center items-center min-h-[50vh] scroll-mt-32">
           <div className="w-full max-w-6xl apple-glass rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
              <InsightsAndWhy />
           </div>
        </div>
        
        {/* INVEST */}
        {/* ✅ FIX: Changed id to "invest" for the Header link */}
        <div id="invest" className="w-full max-w-7xl px-6 space-y-40 mb-40 scroll-mt-32">
           <LimassolAdvantage />
           <TestimonialsGlass />
        </div>


      </div>
    </main>
  );
}