import VideoScroller from "@/components/ui/VideoScroller";
import HeroInteractive from "@/components/HeroInteractive";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurProjects from "@/components/OurProjects";
import CTAContact from "@/components/CTAContact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--brand-black)]">
      <VideoScroller />

      <div className="relative z-10 w-full">
        <section className="min-h-screen w-full flex items-center justify-center">
          <HeroInteractive />
        </section>

        <div className="lux-container pb-24 md:pb-32 space-y-10 md:space-y-14">
          <div className="lux-box rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8">
            <WhyChooseUs />
          </div>

          <div id="projects" className="scroll-mt-28 lux-box rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8">
            <OurProjects />
          </div>

          <div id="contact" className="scroll-mt-28 lux-box rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8">
            <CTAContact />
          </div>
        </div>
      </div>
    </main>
  );
}
