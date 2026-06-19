"use client";

import { motion } from "framer-motion";
import { ArrowDown, Compass, Gem, Layers, ShieldCheck } from "lucide-react";

const CLOUD_NAME = "dkbpthpxg";
const LOOP_ID = "Reshoot_stationary_202601101139_egs3f_sfxo0c";

const loopVideo = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${LOOP_ID}.mp4`;

const whoWeAre = [
  "TMS Estates is a real estate development company focused on creating residential and mixed-use properties in strategically selected locations across Cyprus.",
  "Our developments vary in scale, concept and location, encompassing boutique apartment buildings, standalone residences and land-driven opportunities. Every project is carefully evaluated based on its long-term potential, market demand and strategic value.",
  "Backed by the strength and heritage of TMS Group, we combine local market insight, international business expertise and a disciplined development approach to create properties that deliver lasting value. From site selection and planning through construction and delivery, every decision is guided by quality, functionality and long-term vision.",
  "We believe successful developments are not measured solely by completion, but by the value they continue to provide for homeowners, investors and communities for years to come.",
];

const values = [
  {
    number: "I.",
    title: "Selectivity",
    text: "We pursue opportunities with purpose, focusing on developments that demonstrate genuine potential, strategic value and long-term relevance.",
  },
  {
    number: "II.",
    title: "Integrity",
    text: "Transparency, accountability and trust guide every relationship with buyers, investors, partners and the communities in which we build.",
  },
  {
    number: "III.",
    title: "Excellence",
    text: "From planning and design through to construction and delivery, we maintain uncompromising standards at every stage of the development process.",
  },
  {
    number: "IV.",
    title: "Longevity",
    text: "We create developments designed to retain their appeal, functionality and value for generations to come. We build for decades, not market cycles.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070B] text-[#F5F0E8]">
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#05070B]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-100"
          src={loopVideo}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(194,161,57,0.16),transparent_28%),linear-gradient(90deg,rgba(5,7,11,0.92),rgba(5,7,11,0.68)_42%,rgba(5,7,11,0.86))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,11,0.42),rgba(5,7,11,0.18)_35%,rgba(5,7,11,0.92))]" />
      </div>

      <section className="relative z-10 flex min-h-[100svh] items-end pt-36">
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-10 px-6 pb-16 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:pb-24 xl:px-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.42em] text-[#C2A139]">Who We Are</p>
            <h1 className="font-montserrat text-[clamp(3.6rem,9vw,9.8rem)] font-bold leading-[0.88] tracking-[-0.075em] text-[#F5F0E8]">
              Building Value.<br />
              <span className="text-[#C2A139]">Creating Places.</span>
            </h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 34 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[#0D1B2E]/42 p-6 shadow-[0_30px_110px_rgba(0,0,0,0.42)] backdrop-blur-xl md:p-9 lg:p-10"
          >
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#C2A139] via-white/18 to-transparent" />
            <div className="space-y-5 text-base leading-8 text-[#F5F0E8]/82 md:text-lg md:leading-9">
              {whoWeAre.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[#F5F0E8]/52 lg:flex">
          <span className="text-[9px] font-bold uppercase tracking-[0.32em]">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-[#05070B]/64 py-16 backdrop-blur-sm md:py-24">
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-5 px-6 md:px-10 lg:grid-cols-2 xl:px-16">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#0D1B2E]/44 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-10"
          >
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#C2A139]/35 bg-[#C2A139]/12 text-[#C2A139]">
              <Compass className="h-5 w-5" />
            </div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.38em] text-[#C2A139]">Our Mission</p>
            <p className="max-w-3xl text-xl leading-9 text-[#F5F0E8]/86 md:text-2xl md:leading-[1.65]">
              To create thoughtfully designed developments that deliver lasting value for homeowners, investors and communities alike, balancing quality, functionality and sustainable growth in every project we undertake.
            </p>
          </motion.article>

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={{
              hidden: { opacity: 0, y: 34 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.08, duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#0D1B2E]/34 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-10"
          >
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#C2A139]/35 bg-[#C2A139]/12 text-[#C2A139]">
              <Layers className="h-5 w-5" />
            </div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.38em] text-[#C2A139]">Our Approach</p>
            <div className="space-y-5 text-base leading-8 text-[#F5F0E8]/82 md:text-lg md:leading-9">
              <p>Every development begins with careful evaluation. We assess location, market demand, accessibility, infrastructure and future growth potential before committing to a project.</p>
              <p>This disciplined approach allows us to identify opportunities with genuine long-term potential and create properties that are designed to remain relevant, desirable and valuable well into the future.</p>
              <p>By combining strategic thinking with attention to detail, we develop projects that meet today&apos;s needs while anticipating tomorrow&apos;s expectations.</p>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="relative z-10 bg-[#05070B]/80 py-16 backdrop-blur-md md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 xl:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
          >
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.42em] text-[#C2A139]">Our Values</p>
              <h2 className="font-montserrat text-[clamp(2.8rem,6vw,7rem)] font-bold leading-[0.94] tracking-[-0.07em] text-[#F5F0E8]">
                Four principles that guide every decision
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#F5F0E8]/72 md:text-lg md:leading-9 lg:justify-self-end">
              Four principles that guide every decision from the opportunities we pursue to the developments we deliver.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-90px" }}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { delay: index * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="group relative min-h-[320px] overflow-hidden border border-white/12 bg-[#0D1B2E]/38 p-7 shadow-[0_18px_70px_rgba(0,0,0,0.26)] backdrop-blur-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#C2A139]/45 hover:bg-[#0D1B2E]/52 md:p-8"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C2A139]">{value.number}</span>
                  <ShieldCheck className="h-5 w-5 text-[#C2A139]/70" />
                </div>
                <h3 className="mb-5 font-montserrat text-2xl font-semibold tracking-[-0.04em] text-[#F5F0E8]">
                  {value.title}
                </h3>
                <p className="text-sm leading-7 text-[#F5F0E8]/72 md:text-base md:leading-8">{value.text}</p>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#C2A139]/70 via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
