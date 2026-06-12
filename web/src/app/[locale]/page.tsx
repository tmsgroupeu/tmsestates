/* FULL REPLACEMENT: src/app/[locale]/page.tsx */

import VideoScroller from "@/components/ui/VideoScroller";
import HeroInteractive from "@/components/HeroInteractive";
import WhoWeAre from "@/components/sections/WhoWeAre";
import OurProjects from "@/components/OurProjects";
import MarketInsights from "@/components/sections/MarketInsights";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative bg-navy">
      <VideoScroller />

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* HERO */}
        <div className="h-screen w-full flex items-center justify-center mb-10">
          <HeroInteractive />
        </div>

        {/* WHO WE ARE */}
        <div className="w-full mb-20">
           <WhoWeAre />
        </div>

        {/* PROJECTS */}
        <div id="projects" className="w-full max-w-7xl px-6 mt-20 mb-40 scroll-mt-32">
           <OurProjects />
        </div>

        {/* DOOR OPENING GAP */}
        <div className="w-full py-40 md:py-60 flex flex-col items-center justify-center text-center">
           <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-montserrat font-bold text-white drop-shadow-2xl">
                 Welcome Home.
              </h2>
              <p className="text-white/90 mt-4 text-xl font-light tracking-wide drop-shadow-lg max-w-2xl mx-auto">
                 Step inside our curated selection of properties.
              </p>
           </div>
        </div>

        {/* LISTINGS CAROUSEL */}
        <div id="portfolio" className="w-full mb-40 scroll-mt-32">
           <MarketInsights />
        </div>
        
        {/* CONTACT FORM */}
        <div id="contact" className="w-full max-w-7xl px-6 mb-40 scroll-mt-32">
           <ContactSection />
        </div>

      </div>
    </main>
  );
}