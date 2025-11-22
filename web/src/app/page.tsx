/* UPDATED: src/app/page.tsx */

import VideoScroller from "@/components/ui/VideoScroller";
import HeroInteractive from "@/components/HeroInteractive";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import WhyChooseUs from "@/components/sections/OurExpertise";
import MarketInsights from "@/components/sections/MarketInsights";
import CTAContact from "@/components/CTAContact";

export default function Home() {
  return (
    <main className="bg-navy">
      
      {/* 
         THE VIDEO SCROLLER CONTAINER 
         It is 300vh (3 screens) tall.
         The video pins to the background.
         We place content at absolute positions on top of it.
      */}
      <div className="relative">
        
        {/* The Video Background Logic */}
        <VideoScroller />

        {/* --- FLOATING CONTENT LAYERS --- */}
        {/* This content sits ON TOP of the 300vh scroller */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          
          {/* SECTION 1: HERO (At the very top - 0vh) */}
          <div className="h-screen flex items-center justify-center">
             {/* We use the Hero interactive but maybe stripped down? */}
             <HeroInteractive /> 
          </div>

          {/* SECTION 2: WHY US (Floating Glass Card - at 110vh) */}
          <div className="absolute top-[110vh] w-full px-6 flex justify-center md:justify-end md:pr-20">
            <div className="max-w-2xl w-full glass-panel p-10 rounded-3xl transform hover:-translate-y-2 transition-transform duration-500">
               {/* Injecting the WhyChooseUs content directly here for better control, or use the component */}
               <WhyChooseUs />
            </div>
          </div>

          {/* SECTION 3: EXCLUSIVE (Floating Glass Card - at 210vh) */}
          <div className="absolute top-[210vh] w-full px-6">
             <div className="max-w-7xl mx-auto glass-panel rounded-3xl overflow-hidden p-8">
               <h2 className="text-white text-3xl font-montserrat font-bold mb-8">Continuing the Journey...</h2>
               <ExclusiveMandates />
             </div>
          </div>

        </div>
      </div>

      {/* --- SOLID FOOTER SECTIONS --- */}
      {/* After the video ends (300vh down), we transition to solid background for readability */}
      <div className="relative z-20 bg-paper rounded-t-[3rem] shadow-[0_-50px_100px_rgba(0,0,0,0.5)] -mt-32 pt-32 pb-20">
         <div className="max-w-7xl mx-auto px-6">
            <MarketInsights />
            <div className="mt-20">
              <CTAContact />
            </div>
         </div>
      </div>

    </main>
  );
}
