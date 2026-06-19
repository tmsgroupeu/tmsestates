"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  hidden: { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [introFinished, setIntroFinished] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const CLOUD_NAME = "dkbpthpxg";
  const INTRO_ID = "The_view_of_202601101217_dr2mr_-_Trim_cbwcvm";
  const LOOP_ID = "Reshoot_stationary_202601101139_egs3f_sfxo0c";

  const introUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${INTRO_ID}.mp4`;
  const loopUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${LOOP_ID}.mp4`;

  const bgBlur = useTransform(scrollYProgress, [0, 0.42, 1], ["0px", "6px", "10px"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.38, 1], [0.48, 0.64, 0.78]);

  return (
    <main ref={containerRef} className="relative overflow-hidden bg-[#05070B] text-[#F5F0E8]">
      <motion.div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ filter: bgBlur }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          src={loopUrl}
          className="absolute inset-0 h-full w-full object-cover scale-110"
        />

        <div
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${introFinished ? "opacity-0" : "opacity-100"}`}
        >
          <video
            autoPlay
            muted
            playsInline
            src={introUrl}
            onEnded={() => setIntroFinished(true)}
            className="h-full w-full object-cover scale-110"
          />
        </div>

        <motion.div className="absolute inset-0 bg-[#05070B]" style={{ opacity: bgOpacity }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(194,161,57,0.12),transparent_30%),linear-gradient(90deg,rgba(5,7,11,0.72),rgba(5,7,11,0.24)_48%,rgba(5,7,11,0.78))]" />
      </motion.div>

      <div className="relative z-10 pt-32 md:pt-40">
        <section className="home-container flex min-h-[calc(100svh-8rem)] items-center pb-16 md:pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="grid w-full gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          >
            <div>
              <p className="section-eyebrow mb-6">WHO WE ARE</p>
              <h1 className="font-montserrat text-[clamp(3.2rem,7.2vw,8.2rem)] font-bold leading-[0.92] tracking-[-0.075em] text-[#F5F0E8]">
                Building Value.
                <span className="block text-[#C2A139]">Creating Places.</span>
              </h1>
            </div>

            <article className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#0D1B2E]/48 p-6 shadow-[0_28px_110px_rgba(0,0,0,0.36)] backdrop-blur-xl md:p-9 lg:p-10">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#C2A139] via-[#C2A139]/24 to-transparent" />
              <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C2A139]/12 blur-3xl" />
              <div className="relative space-y-5 text-base leading-8 text-[#F5F0E8]/80 md:text-[1.05rem] md:leading-9">
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
            </article>
          </motion.div>
        </section>

        <section className="home-container grid gap-4 pb-16 md:grid-cols-2 md:pb-20 lg:min-h-[78svh] lg:items-center">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={reveal}
            className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#05070B]/54 p-7 shadow-[0_26px_95px_rgba(0,0,0,0.34)] backdrop-blur-xl md:p-9 lg:p-11"
          >
            <div className="absolute right-0 top-0 h-44 w-44 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C2A139]/14 blur-3xl" />
            <Target className="mb-10 h-9 w-9 text-[#C2A139]" strokeWidth={1.5} />
            <p className="section-eyebrow mb-5">OUR MISSION</p>
            <p className="max-w-2xl text-lg leading-9 text-[#F5F0E8]/80 md:text-xl md:leading-10">
              To create thoughtfully designed developments that deliver lasting value for homeowners, investors and communities alike, balancing quality, functionality and sustainable growth in every project we undertake.
            </p>
          </motion.article>

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={reveal}
            className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0D1B2E]/46 p-7 shadow-[0_26px_95px_rgba(0,0,0,0.34)] backdrop-blur-xl md:p-9 lg:p-11"
          >
            <div className="absolute right-0 top-0 h-44 w-44 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5F0E8]/8 blur-3xl" />
            <Layers3 className="mb-10 h-9 w-9 text-[#C2A139]" strokeWidth={1.5} />
            <p className="section-eyebrow mb-5">OUR APPROACH</p>
            <div className="space-y-5 text-base leading-8 text-[#F5F0E8]/78 md:text-lg md:leading-9">
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
            viewport={{ once: true, margin: "-120px" }}
            variants={reveal}
            className="w-full rounded-[2rem] border border-white/10 bg-[#05070B]/42 p-5 shadow-[0_32px_120px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-8 lg:p-10"
          >
            <div className="mb-9 max-w-5xl">
              <p className="section-eyebrow mb-5">OUR VALUES</p>
              <h2 className="section-heading max-w-5xl">Four principles that guide every decision from the opportunities we pursue to the developments we deliver.</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="group relative min-h-[300px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0D1B2E]/38 p-7 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C2A139]/40 hover:bg-[#0D1B2E]/56"
                >
                  <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#C2A139] via-[#C2A139]/28 to-transparent opacity-70" />
                  <value.icon className="mb-9 h-7 w-7 text-[#C2A139]" strokeWidth={1.5} />
                  <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C2A139]/84">{value.roman}</p>
                  <h3 className="mb-5 font-montserrat text-2xl font-semibold tracking-[-0.035em] text-[#F5F0E8]">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#F5F0E8]/72">{value.text}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
