"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Compass, Gem, Handshake, Layers3, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { Link } from "@/i18n/routing";

const values = [
  {
    icon: Compass,
    roman: "I.",
    title: "Selectivity",
    text: "We pursue opportunities with purpose, focusing on developments that demonstrate genuine potential, strategic value and long-term relevance.",
  },
  {
    icon: Handshake,
    roman: "II.",
    title: "Integrity",
    text: "Transparency, accountability and trust guide every relationship with buyers, investors, partners and the communities in which we build.",
  },
  {
    icon: Gem,
    roman: "III.",
    title: "Excellence",
    text: "From planning and design through to construction and delivery, we maintain uncompromising standards at every stage of the development process.",
  },
  {
    icon: TrendingUp,
    roman: "IV.",
    title: "Longevity",
    text: "We create developments designed to retain their appeal, functionality and value for generations to come. We build for decades, not market cycles.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const CLOUD_NAME = "dkbpthpxg";
  const INTRO_ID = "The_view_of_202601101217_dr2mr_-_Trim_cbwcvm";
  const LOOP_ID = "Reshoot_stationary_202601101139_egs3f_sfxo0c";

  const INTRO_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${INTRO_ID}.mp4`;
  const LOOP_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${LOOP_ID}.mp4`;

  const [introFinished, setIntroFinished] = useState(false);

  const bgBlur = useTransform(scrollYProgress, [0, 0.45], ["0px", "9px"]);
  const bgOverlay = useTransform(scrollYProgress, [0, 0.45], ["rgba(5,7,11,0.22)", "rgba(5,7,11,0.78)"]);

  const reveal = {
    hidden: { opacity: 0, y: 42 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <div ref={containerRef} className="relative bg-[var(--brand-black)] overflow-x-hidden">
      <motion.div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <motion.div style={{ backdropFilter: `blur(${bgBlur})`, backgroundColor: bgOverlay }} className="absolute inset-0 z-[1]0" />

        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 scale-110 origin-center" src={LOOP_URL} />
        <div className={`absolute inset-0 w-full h-full z-[1] transition-opacity duration-[1500ms] ease-in-out ${introFinished ? "opacity-0" : "opacity-100"}`}>
          <video autoPlay muted playsInline className="w-full h-full object-cover scale-110 origin-center" src={INTRO_URL} onEnded={() => setIntroFinished(true)} />
        </div>
      </motion.div>

      <div className="relative z-20 lux-container pt-32 md:pt-40 pb-24 md:pb-32 space-y-10 md:space-y-14">
        <motion.section initial="hidden" animate="visible" variants={reveal} className="lux-box rounded-[2rem] md:rounded-[2.75rem] overflow-hidden">
          <div className="relative z-[1]0 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 p-8 md:p-12 lg:p-16">
            <div className="lg:border-r lg:border-[rgba(245,240,232,0.10)] lg:pr-12">
              <p className="lux-eyebrow mb-6">Who We Are</p>
              <h1 className="lux-heading">
                Building Value.<br />
                <span className="text-[var(--gold)]">Creating Places.</span>
              </h1>
            </div>

            <div className="space-y-6 lux-copy">
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
        </motion.section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={reveal} className="lux-box rounded-[2rem] p-8 md:p-10">
            <div className="relative z-[1]0">
              <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(194,161,57,0.12)] text-[var(--gold)] ring-1 ring-[rgba(194,161,57,0.24)]">
                <Target size={23} />
              </div>
              <p className="lux-eyebrow mb-4">Our Mission</p>
              <h2 className="font-montserrat text-3xl md:text-5xl font-bold tracking-[-0.04em] text-[var(--ivory)] mb-6">Purposeful development with lasting value.</h2>
              <p className="lux-copy">
                To create thoughtfully designed developments that deliver lasting value for homeowners, investors and communities alike, balancing quality, functionality and sustainable growth in every project we undertake.
              </p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={reveal} className="lux-box rounded-[2rem] p-8 md:p-10">
            <div className="relative z-[1]0">
              <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(245,240,232,0.08)] text-[var(--ivory)] ring-1 ring-[rgba(245,240,232,0.12)]">
                <Layers3 size={23} />
              </div>
              <p className="lux-eyebrow mb-4">Our Approach</p>
              <h2 className="font-montserrat text-3xl md:text-5xl font-bold tracking-[-0.04em] text-[var(--ivory)] mb-6">Disciplined evaluation before development begins.</h2>
              <div className="space-y-5 lux-copy">
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
        </section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={reveal} className="lux-box rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
          <div className="relative z-[1]0 p-8 md:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16 items-end mb-10">
              <div>
                <p className="lux-eyebrow mb-5">Our Values</p>
                <h2 className="font-montserrat text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.02] text-[var(--ivory)]">Principles that guide every decision.</h2>
              </div>
              <p className="lux-copy lg:border-l lg:border-[rgba(245,240,232,0.10)] lg:pl-10">
                Four principles that guide every decision from the opportunities we pursue to the developments we deliver.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border border-[rgba(245,240,232,0.10)] rounded-[1.5rem] overflow-hidden bg-[rgba(5,7,11,0.22)]">
              {values.map((value, index) => (
                <div key={value.title} className="group relative p-7 md:p-8 min-h-[300px] border-b md:border-r border-[rgba(245,240,232,0.10)] last:border-b-0 md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(4)]:border-r-0 xl:[&:nth-child(n)]:border-b-0 hover:bg-[rgba(194,161,57,0.08)] transition-colors duration-500">
                  <value.icon className="h-6 w-6 text-[var(--gold)] mb-8 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                  <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-[var(--stone)] mb-4">{value.roman}</p>
                  <h3 className="font-montserrat text-2xl font-bold uppercase tracking-[-0.03em] text-[var(--ivory)] mb-5">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-[rgba(245,240,232,0.68)]">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="flex justify-center pt-2">
          <Link href="/#projects" className="lux-btn group">
            Explore Our Projects
            <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>
      </div>
    </div>
  );
}
