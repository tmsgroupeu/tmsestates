import VideoScroller from "@/components/ui/VideoScroller";
import HeroInteractive from "@/components/HeroInteractive";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurProjects from "@/components/OurProjects";
import MarketInsights from "@/components/sections/MarketInsights";
import LimassolAdvantage from "@/components/LimassolAdvantage";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black-premium text-ivory">
      <VideoScroller />

      <div className="relative z-10 w-full">
        <HeroInteractive />
        <WhyChooseUs />
        <OurProjects />
        <MarketInsights />
        <LimassolAdvantage />
      </div>
    </main>
  );
}
