/* Fully Updated & Restructured: ./app/page.tsx */

import HeroInteractive from "@/components/HeroInteractive";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import OurExpertise from "@/components/sections/OurExpertise";
import MarketInsights from "@/components/sections/MarketInsights";
import Testimonials from "@/components/Testimonials";
import CTAContact from "@/components/CTAContact";
import PropertyCollections from "@/components/sections/PropertyCollections";

export default function Home() {
  return (
    <>
      {/* 1. The Hero remains fixed in the background, acting as a canvas. */}
      <HeroInteractive />
      
      {/* 2. This new outer div is the main scrolling container. */}
      <div className="relative z-10">

        {/* 
          3. This is the section with the glass cards. It sits here with no background,
             so as you scroll, it will appear directly over the hero image.
        */}
        <OurExpertise />

        {/* 
          4. THE FIX: This inner div provides a solid background for the rest of the page.
             Once this div scrolls into view, it completely covers the hero image, creating
             a solid "floor" that leads cleanly into the footer.
        */}
        <div className="bg-background">
          <ExclusiveMandates />
          <PropertyCollections />
          <LimassolAdvantage />
          <MarketInsights />
          <Testimonials />
          <CTAContact />
        </div>
        
      </div>
    </>
  );
}