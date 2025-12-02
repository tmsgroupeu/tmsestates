/* UPDATED: src/app/page.tsx */

import VideoScroller from "@/components/ui/VideoScroller";
import HeroInteractive from "@/components/HeroInteractive";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import WhyChooseUs from "@/components/sections/OurExpertise";
import MarketInsights from "@/components/sections/MarketInsights";
import TestimonialsGlass from "@/components/Testimonials";
import CTAContact from "@/components/CTAContact";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";
import LimassolAdvantage from "@/components/LimassolAdvantage";

export default function Home() {
  return (
    <main className="bg-navy">
      
      {/* 
         THE VIDEO SCROLLER CONTAINER 
         The video plays as you scroll through this container.
      */}
      <div className="relative">
        
        {/* The Moving Background */}
        <VideoScroller />

        {/* --- FLOATING CONTENT LAYERS --- */}
        {/* We place content at absolute positions so it appears over the video */}
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
          
          {/* 1. HERO TEXT (Video Start - Exterior) */}
          {/* pointer-events-auto allows buttons to work */}
          <div className="h-screen flex items-center justify-center pointer-events-auto">
             <HeroInteractive /> 
          </div>

          {/* 2. WHY US / EXPERTISE (Video Middle - Entering House) */}
          {/* Positioned at 110vh (just after the first scroll) */}
          <div className="absolute top-[110vh] w-full px-6 flex justify-center md:justify-end md:pr-20 pointer-events-auto">
            <div className="max-w-2xl w-full glass-panel p-10 rounded-3xl transform hover:-translate-y-2 transition-transform duration-500">
               <WhyChooseUs />
            </div>
          </div>

          {/* 3. EXCLUSIVE MANDATES (Video End - View/Interior) */}
          {/* Positioned at 210vh */}
          <div className="absolute top-[210vh] w-full px-6 pointer-events-auto">
             <div className="max-w-7xl mx-auto glass-panel rounded-3xl overflow-hidden p-8">
               <div className="mb-8">
                 <span className="text-[10px] uppercase tracking-widest text-gold font-bold">The Collection</span>
                 <h2 className="text-white text-3xl font-montserrat font-bold mt-2">Exclusive Opportunities</h2>
               </div>
               <ExclusiveMandates />
             </div>
          </div>

        </div>
      </div>

      {/* --- SOLID FOOTER SECTIONS --- */}
      {/* After the video sequence ends, we return to solid paper/white background */}
      <div className="relative z-20 bg-paper rounded-t-[3rem] shadow-[0_-50px_100px_rgba(0,0,0,0.5)] -mt-32 pt-32 pb-20">
         <div className="max-w-7xl mx-auto px-6">
            <MarketInsights />
            <InsightsAndWhy />
            <LimassolAdvantage />
            <TestimonialsGlass />
            <div className="mt-20">
              <CTAContact />
            </div>
         </div>
      </div>

    </main>
  );
}
