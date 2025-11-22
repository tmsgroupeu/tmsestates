/* UPDATED: src/app/page.tsx */
import CinematicBackground from "@/components/ui/CinematicBackground"; // Import the new component
import HeroInteractive from "@/components/HeroInteractive";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import WhyChooseUs from "@/components/sections/OurExpertise";
import MarketInsights from "@/components/sections/MarketInsights";
import TestimonialsGlass from "@/components/Testimonials";
import CTAContact from "@/components/CTAContact";
import InsightsAndWhy from "@/components/sections/InsightsAndWhy";

export default function Home() {
  return (
    <>
      {/* 1. THE GLOBAL CINEMATIC STAGE (Fixed in background) */}
      <CinematicBackground />
      
      <div className="relative z-10">
        
        {/* 2. HERO (Transparent - shows Video) */}
        <HeroInteractive />

        {/* 3. WHY CHOOSE US (Transparent - shows Living Room Transition) */}
        <WhyChooseUs />

        {/* 4. EXCLUSIVE MANDATES (Transparent or Semi-Transparent Glass) */}
        <div className="bg-transparent py-10"> {/* Removed bg-background, shows Terrace Transition */}
           <ExclusiveMandates />
        </div>

        {/* 5. SOLID SECTIONS (Stop the background effect for readability here) */}
        <div className="bg-paper shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[3rem] relative overflow-hidden">
          <div className="pt-12">
             <MarketInsights />
             <InsightsAndWhy />
             <LimassolAdvantage />
             <TestimonialsGlass />
             <CTAContact />
          </div>
        </div>
        
      </div>
    </>
  );
}
