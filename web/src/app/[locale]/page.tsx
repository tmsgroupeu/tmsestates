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
        <div className="h-screen w-full flex items-center justify-center">
          <HeroInteractive />
        </div>

        {/* WHO WE ARE */}
        <div className="w-full">
           <WhoWeAre />
        </div>

        {/* PROJECTS */}
        <div id="projects" className="w-full scroll-mt-32">
           <OurProjects />
        </div>

        {/* DOOR OPENING GAP */}
        <div className="w-full py-32 md:py-40 flex flex-col items-center justify-center text-center border-b border-white/10 bg-black/20">
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
        <div id="portfolio" className="w-full bg-black/40 backdrop-blur-md border-b border-white/10 py-20 scroll-mt-32">
           <MarketInsights />
        </div>
        
        {/* CONTACT FORM */}
        <div id="contact" className="w-full scroll-mt-32">
           <ContactSection />
        </div>

      </div>
    </main>
  );
}