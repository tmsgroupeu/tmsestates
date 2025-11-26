import VideoScroller from "@/components/ui/VideoScroller";
import HeroInteractive from "@/components/HeroInteractive";
import WhyChooseUs from "@/components/sections/OurExpertise";
import ExclusiveMandates from "@/components/ExclusiveMandates";
import MarketInsights from "@/components/sections/MarketInsights";
import CTAContact from "@/components/CTAContact";
import GlassCard from "@/components/ui/GlassCard";

export default function Home() {
  return (
    <div className="relative">
      
      {/* 1. BACKGROUND ENGINE (Fixed) */}
      <VideoScroller />

      {/* 2. SCROLL CONTENT WRAPPER */}
      {/* We make this container specific height based on how much 'scrubbing' we want */}
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* --- SCENE 1: THE HERO (0px - 100vh) --- */}
        {/* The user scrolls past this, initiating the video movement */}
        <div className="h-screen w-full sticky top-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full"> 
             <HeroInteractive />
          </div>
        </div>

        {/* Spacer to separate Hero from first card */}
        <div className="h-[20vh]" />

        {/* --- SCENE 2: WHY CHOOSE US --- */}
        {/* Floating Glass Card Right */}
        <div className="w-full max-w-7xl px-4 md:px-8 flex justify-center md:justify-end mb-[30vh]">
          <GlassCard className="w-full md:w-[600px] text-white">
            <WhyChooseUs /> 
            {/* NOTE: You must ensure WhyChooseUs text color is white/light in its file! */}
          </GlassCard>
        </div>

        {/* --- SCENE 3: EXCLUSIVE MANDATES --- */}
        {/* Floating Glass Card Center */}
        <div className="w-full max-w-7xl px-4 md:px-8 mb-[30vh]">
          <GlassCard className="w-full">
            {/* We force specific styling to override the component's internal styles if needed */}
            <div className="text-white">
               <ExclusiveMandates />
            </div>
          </GlassCard>
        </div>

        {/* --- SCENE 4: MARKET INSIGHTS --- */}
        {/* Floating Glass Card Left */}
        <div className="w-full max-w-7xl px-4 md:px-8 flex justify-start mb-[30vh]">
          <GlassCard className="w-full md:w-[80%]">
             <MarketInsights />
          </GlassCard>
        </div>

        {/* --- SCENE 5: FINAL CONTACT (Solid Ground) --- */}
        <div className="w-full bg-paper rounded-t-[50px] shadow-[0_-50px_100px_rgba(0,0,0,0.5)] pt-20 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <CTAContact />
            {/* Footer is handled by layout */}
          </div>
        </div>

      </div>
    </div>
  );
}