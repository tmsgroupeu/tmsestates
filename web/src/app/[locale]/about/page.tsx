"use client";

import { motion } from "framer-motion";
import { Compass, Gem, Handshake, Layers3, Target, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Compass,
    roman: "I.",
    title: "SELECTIVITY",
    text: "We pursue opportunities with purpose, focusing on developments that demonstrate genuine potential, strategic value and long-term relevance.",
  },
  {
    icon: Handshake,
    roman: "II.",
    title: "INTEGRITY",
    text: "Transparency, accountability and trust guide every relationship with buyers, investors, partners and the communities in which we build.",
  },
  {
    icon: Gem,
    roman: "III.",
    title: "EXCELLENCE",
    text: "From planning and design through to construction and delivery, we maintain uncompromising standards at every stage of the development process.",
  },
  {
    icon: TrendingUp,
    roman: "IV.",
    title: "LONGEVITY",
    text: "We create developments designed to retain their appeal, functionality and value for generations to come. We build for decades, not market cycles.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070B] text-[#F5F0E8]">
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#05070B]">
        <video
          src="/assets/hero-scroller.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/72 via-[#05070B]/58 to-[#05070B]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(194,161,57,0.12),transparent_30%),radial-gradient(circle_at_82%_40%,rgba(13,27,46,0.38),transparent_36%)]" />
      </div>

      <div className="relative z-10 pt-32 md:pt-40">
        <section className="home-container min-h-[calc(100svh-8rem)] pb-16 md:pb-20 lg:flex lg:items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="grid w-full gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end"
          >
            <div>
              <p className="section-eyebrow mb-6">WHO WE ARE</p>
              <h1 className="font-montserrat text-[clamp(3rem,7vw,8rem)] font-bold leading-[0.93] tracking-[-0.07em] text-[#F5F0E8]">
                Building Value.
                <span className="block text-[#C2A139]">Creating Places.</span>
              </h1>
            </div>

            <div className="relative overflow-hidden border border-white/10 bg-[#0D1B2E]/38 p-6 shadow-[0_28px_95px_rgba(0,0,0,0.32)] backdrop-blur-md md:p-9 lg:p-10">
              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#C2A139] via-[#C2A139]/24 to-transparent" />
              <div className="space-y-5 text-base leading-8 text-[#F5F0E8]/78 md:text-lg md:leading-9">
                <p>
                  TMS Estates is a real estate development company focused on creating residential and mixed-use properties in strategically selected locations across Cyprus.
                </p>
                <p>
                  Our developments vary in scale, concept and location, encompassing boutique apartment buildings, standalone residences and land-driven opportunities. Every project is carefully evaluated based on its long-term potential, market demand and strategic value.
                </p>
                <p>
                  Backed by the strength and heritage of TMS Group, we combine local market insight, international business expertise and a disciplined development approach to create properties that deliver lasting value. From site selection and planning through construction and delivery, every decision is guided by quality, functionality and long-term vision.
                </p>
                <p>
                  We believe successful developments are not measured solely by completion, but by the value they continue to provide for homeowners, investors and communities for years to come.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="home-container grid gap-4 pb-16 md:grid-cols-2 md:pb-20 lg:min-h-[78svh] lg:items-center">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            className="relative min-h-[360px] overflow-hidden border border-white/10 bg-[#05070B]/54 p-7 shadow-[0_26px_90px_rgba(0,0,0,0.28)] backdrop-blur-md md:p-9 lg:p-11"
          >
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C2A139]/14 blur-3xl" />
            <Target className="mb-10 h-9 w-9 text-[#C2A139]" strokeWidth={1.5} />
            <p className="section-eyebrow mb-5">OUR MISSION</p>
            <p className="max-w-2xl text-lg leading-9 text-[#F5F0E8]/78 md:text-xl md:leading-10">
              To create thoughtfully designed developments that deliver lasting value for homeowners, investors and communities alike, balancing quality, functionality and sustainable growth in every project we undertake.
            </p>
          </motion.article>

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            className="relative min-h-[360px] overflow-hidden border border-white/10 bg-[#0D1B2E]/42 p-7 shadow-[0_26px_90px_rgba(0,0,0,0.28)] backdrop-blur-md md:p-9 lg:p-11"
          >
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5F0E8]/8 blur-3xl" />
            <Layers3 className="mb-10 h-9 w-9 text-[#C2A139]" strokeWidth={1.5} />
            <p className="section-eyebrow mb-5">OUR APPROACH</p>
            <div className="space-y-5 text-base leading-8 text-[#F5F0E8]/76 md:text-lg md:leading-9">
              <p>
                Every development begins with careful evaluation. We assess location, market demand, accessibility, infrastructure and future growth potential before committing to a project.
              </p>
              <p>
                This disciplined approach allows us to identify opportunities with genuine long-term potential and create properties that are designed to remain relevant, desirable and valuable well into the future.
              </p>
              <p>
                By combining strategic thinking with attention to detail, we develop projects that meet today's needs while anticipating tomorrow's expectations.
              </p>
            </div>
          </motion.article>
        </section>

        <section className="home-container pb-20 md:pb-28 lg:min-h-[88svh] lg:flex lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            className="w-full"
          >
            <div className="mb-9 max-w-5xl">
              <p className="section-eyebrow mb-5">OUR VALUES</p>
              <h2 className="section-heading max-w-5xl">Four principles that guide every decision from the opportunities we pursue to the developments we deliver.</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="group relative min-h-[300px] overflow-hidden border border-white/10 bg-[#0D1B2E]/34 p-7 shadow-[0_24px_85px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C2A139]/40 hover:bg-[#0D1B2E]/52"
                >
                  <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#C2A139] via-[#C2A139]/28 to-transparent opacity-70" />
                  <value.icon className="mb-9 h-7 w-7 text-[#C2A139]" strokeWidth={1.5} />
                  <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C2A139]/82">{value.roman}</p>
                  <h3 className="mb-5 font-montserrat text-2xl font-semibold tracking-[-0.035em] text-[#F5F0E8]">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#F5F0E8]/70">{value.text}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
