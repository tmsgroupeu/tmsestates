/* FULL REPLACEMENT: src/app/[locale]/about/page.tsx */
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Gem, Quote } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- CONFIG ---
  const CLOUD_NAME = "dkbpthpxg";
  const INTRO_ID = "The_view_of_202601101217_dr2mr_-_Trim_cbwcvm";
  const LOOP_ID = "Reshoot_stationary_202601101139_egs3f_sfxo0c";

  const INTRO_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${INTRO_ID}.mp4`;
  const LOOP_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${LOOP_ID}.mp4`;

  const [introFinished, setIntroFinished] = useState(false);

  // --- SCROLL DYNAMICS ---
  // The video stays clear for the initial content, then blurs softly as you scroll to Mission/Values
  const bgBlur = useTransform(scrollYProgress, [0, 0.4], ["0px", "8px"]);
  const bgOverlay = useTransform(scrollYProgress, [0, 0.4], ["rgba(5, 7, 11, 0.28)", "rgba(13, 27, 46, 0.76)"]);

  const fadeInUpScroll = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } },
  };

  const values = [
    {
      title: "Selectivity",
      text: "We pursue opportunities with purpose, focusing on developments that demonstrate genuine potential, strategic value and long-term relevance.",
    },
    {
      title: "Integrity",
      text: "Transparency, accountability and trust guide every relationship with buyers, investors, partners and the communities in which we build.",
    },
    {
      title: "Excellence",
      text: "From planning and design through to construction and delivery, we maintain uncompromising standards at every stage of the development process.",
    },
    {
      title: "Longevity",
      text: "We create developments designed to retain their appeal, functionality and value for generations to come. We build for decades, not market cycles.",
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#05070B] overflow-x-hidden">
      {/* --- 1. VIDEO BACKDROP LAYER --- */}
      <motion.div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ backdropFilter: `blur(${bgBlur})`, backgroundColor: bgOverlay }}
          className="absolute inset-0 z-10"
        />

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 scale-110 origin-center"
          src={LOOP_URL}
        />

        <div className={`absolute inset-0 w-full h-full z-1 transition-opacity duration-[1500ms] ease-in-out ${introFinished ? "opacity-0" : "opacity-100"}`}>
          <video
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover scale-110 origin-center"
            src={INTRO_URL}
            onEnded={() => setIntroFinished(true)}
          />
        </div>
      </motion.div>

      {/* --- 2. CONTENT LAYER --- */}
      <div className="relative z-20 w-full flex flex-col items-center pt-32 md:pt-40 pb-32 md:pb-40">
        {/* -- SECTION 1: HERO TITLE & ABOUT CARD -- */}
        <div className="w-full max-w-5xl px-6 flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-center w-full mb-10"
          >
            <span className="inline-block py-1.5 px-4 border border-[#F5F0E8]/20 rounded-full text-[#F5F0E8]/80 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 backdrop-blur-md bg-[#F5F0E8]/5">
              Who We Are
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-montserrat font-extrabold text-[#F5F0E8] leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              Building Value.<br />
              <span className="text-[#C2A139]">Creating Places.</span>
            </h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } },
            }}
            className="relative overflow-hidden w-full rounded-[2rem] border border-[#F5F0E8]/10 bg-[#0D1B2E]/60 backdrop-blur-2xl p-8 md:p-12 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] group"
          >
            <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5F0E8]/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-10 md:gap-12 items-start">
              <div className="lg:w-1/3">
                <div className="w-14 h-14 bg-[#C2A139] rounded-full flex items-center justify-center text-[#0D1B2E] mb-6 shadow-lg shadow-[#C2A139]/25">
                  <Quote size={28} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-[#F5F0E8] leading-snug">
                  Building Value.<br />Creating Places.
                </h2>
              </div>

              <div className="lg:w-2/3 text-[#F5F0E8]/78 leading-relaxed space-y-5 text-base md:text-lg font-light">
                <p className="tracking-wide">
                  TMS Estates is a real estate development company focused on creating residential and mixed-use properties in strategically selected locations across Cyprus.
                </p>
                <p className="tracking-wide">
                  Our developments vary in scale, concept and location, encompassing boutique apartment buildings, standalone residences and land-driven opportunities. Every project is carefully evaluated based on its long-term potential, market demand and strategic value.
                </p>
                <p className="tracking-wide">
                  Backed by the strength and heritage of TMS Group, we combine local market insight, international business expertise and a disciplined development approach to create properties that deliver lasting value. From site selection and planning through construction and delivery, every decision is guided by quality, functionality and long-term vision.
                </p>
                <p className="tracking-wide">
                  We believe successful developments are not measured solely by completion, but by the value they continue to provide for homeowners, investors and communities for years to come.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* -- SCROLL CUE -- */}
        <div className="h-[24vh] w-full flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-2 text-[#F5F0E8]/50"
          >
            <span className="text-[10px] uppercase tracking-widest">Our Principles</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-[#F5F0E8]/30 to-transparent" />
          </motion.div>
        </div>

        {/* -- SECTION 2: MISSION & APPROACH -- */}
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpScroll}
            className="relative rounded-3xl border border-[#F5F0E8]/10 bg-[#0D1B2E]/80 backdrop-blur-xl p-8 md:p-12 shadow-2xl hover:border-[#C2A139]/50 transition-colors duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-5 text-[#F5F0E8]">
              <Target size={180} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#F5F0E8]/10 rounded-full flex items-center justify-center text-[#F5F0E8] mb-6 backdrop-blur-md border border-[#F5F0E8]/10">
                <Target size={24} />
              </div>
              <h3 className="text-3xl font-montserrat font-bold text-[#F5F0E8] mb-4">Our Mission</h3>
              <p className="text-[#F5F0E8]/72 leading-relaxed font-light text-base md:text-lg">
                To create thoughtfully designed developments that deliver lasting value for homeowners, investors and communities alike, balancing quality, functionality and sustainable growth in every project we undertake.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpScroll}
            className="relative rounded-3xl border border-[#F5F0E8]/10 bg-[#F5F0E8]/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl hover:border-[#C2A139]/50 transition-colors duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-6 -mt-6 text-[#C2A139] opacity-5">
              <Gem size={180} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#C2A139] rounded-full flex items-center justify-center text-[#0D1B2E] mb-6 shadow-md shadow-[#C2A139]/25">
                <Gem size={24} />
              </div>
              <h3 className="text-3xl font-montserrat font-bold text-[#F5F0E8] mb-4">Our Approach</h3>
              <div className="text-[#F5F0E8]/78 leading-relaxed space-y-4 font-light text-base md:text-lg">
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
            </div>
          </motion.div>
        </div>

        {/* -- SECTION 3: VALUES -- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpScroll}
          className="w-full max-w-6xl px-6 mt-8 md:mt-10"
        >
          <div className="relative rounded-[2rem] border border-[#F5F0E8]/10 bg-[#05070B]/58 backdrop-blur-2xl p-8 md:p-12 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.45)] overflow-hidden">
            <div className="relative z-10 mb-8 md:mb-10 max-w-3xl">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C2A139] font-bold">Our Values</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-montserrat font-extrabold text-[#F5F0E8] leading-tight">
                Four principles that guide every decision.
              </h2>
              <p className="mt-5 text-[#F5F0E8]/70 leading-relaxed text-base md:text-lg">
                Four principles that guide every decision from the opportunities we pursue to the developments we deliver.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-[#F5F0E8]/10 bg-[#F5F0E8]/5 p-6 min-h-[210px] hover:border-[#C2A139]/45 transition-colors duration-500"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C2A139] font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 text-xl font-montserrat font-bold text-[#F5F0E8]">{value.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/68 font-light">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
