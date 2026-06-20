import VideoScroller from "@/components/ui/VideoScroller";
import HeroInteractive from "@/components/HeroInteractive";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurProjects from "@/components/OurProjects";
import MarketInsights from "@/components/sections/MarketInsights";
import LimassolAdvantage from "@/components/LimassolAdvantage";
import PrivateCollection from "@/components/PrivateCollection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070B] text-[#F5F0E8]">
      <VideoScroller />

      <div className="relative z-10 w-full">
        <HeroInteractive />

        <WhyChooseUs />

        <div id="projects" className="scroll-mt-28">
          <OurProjects />
        </div>

        <div id="portfolio" className="scroll-mt-28">
          <MarketInsights />
        </div>

        <div id="invest" className="scroll-mt-28">
          <LimassolAdvantage />
        </div>

        <PrivateCollection />
      </div>
    </main>
  );
}
