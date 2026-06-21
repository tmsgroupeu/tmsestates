"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

const CLOUD_NAME = "dkbpthpxg";
const ABOUT_VIDEO_ID = "Reshoot_stationary_202601101139_egs3f_sfxo0c";
const ABOUT_VIDEO_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${ABOUT_VIDEO_ID}.mp4`;

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

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.05,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const softFade = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#F5F0E8] text-[#242124]">
      <section className="relative flex min-h-[64svh] items-end overflow-hidden bg-[#242124] px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44 lg:min-h-[72svh]"
        <video
  autoPlay
  loop
  muted
  playsInline
  src={ABOUT_VIDEO_URL}
  className="absolute inset-0 h-full w-full scale-105 object-cover opacity-75"
/>

<div className="absolute inset-0 bg-[#242124]/18" />
<div className="absolute inset-0 bg-gradient-to-r from-[#242124]/86 via-[#242124]/48 to-[#242124]/16" />
<div className="absolute inset-0 bg-gradient-to-t from-[#242124]/92 via-[#242124]/34 to-[#242124]/12" />
<div className="absolute bottom-0 left-0 h-[46%] w-full bg-gradient-to-t from-[#242124] via-[#242124]/66 to-transparent" />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(194,161,57,0.14),transparent_30%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.h1
              variants={fadeUp}
              className="font-montserrat text-[clamp(2.15rem,4vw,5rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8]"
            >
              Building <span className="text-[#C2A139]">Value.</span>
              <br />
              Creating <span className="text-[#C2A139]">Places.</span>
            </motion.h1>

            <motion.p
              variants={softFade}
              className="mt-6 max-w-xl text-sm leading-7 text-[#F5F0E8]/80 md:text-base md:leading-8"
            >
              TMS Estates is a real estate development company focused on creating residential and mixed-use properties in strategically selected locations across Cyprus.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#F5F0E8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-90px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-montserrat text-2xl font-semibold italic tracking-[-0.04em] text-[#C2A139] md:text-3xl"
            >
              The Company
            </motion.p>

            <motion.div variants={softFade}>
              <Link
                href="/projects"
                className="group mt-6 inline-flex items-center gap-3 border-b border-[#C2A139]/40 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#242124] transition-colors hover:text-[#C2A139]"
              >
                Explore Projects
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-90px" }}
            variants={stagger}
            className="grid gap-6 text-sm leading-7 text-[#242124]/72 md:grid-cols-2 md:text-[0.95rem] md:leading-8"
          >
            <motion.p variants={fadeUp}>
              Our developments vary in scale, concept and location, encompassing boutique apartment buildings, standalone residences and land-driven opportunities. Every project is carefully evaluated based on its long-term potential, market demand and strategic value.
            </motion.p>

            <motion.p variants={fadeUp}>
              Backed by the strength and heritage of TMS Group, we combine local market insight, international business expertise and a disciplined development approach to create properties that deliver lasting value. From site selection and planning through construction and delivery, every decision is guided by quality, functionality and long-term vision.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#C2A139] px-6 py-9 text-center md:px-10 md:py-11">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,33,36,0.08),transparent_24%,transparent_76%,rgba(36,33,36,0.08))]" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-90px" }}
          variants={stagger}
          className="relative mx-auto max-w-5xl"
        >
          <motion.h2
            variants={fadeUp}
            className="font-montserrat text-2xl font-semibold tracking-[-0.04em] text-[#242124] md:text-3xl"
          >
            Our Mission
          </motion.h2>

          <motion.p
            variants={softFade}
            className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-[#242124]/78 md:text-[0.95rem] md:leading-8"
          >
            To create thoughtfully designed developments that deliver lasting value for homeowners, investors and communities alike, balancing quality, functionality and sustainable growth in every project we undertake.
          </motion.p>
        </motion.div>
      </section>

      <section className="relative bg-[#F5F0E8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-90px" }}
            variants={fadeUp}
          >
            <p className="font-montserrat text-2xl font-semibold italic tracking-[-0.04em] text-[#C2A139] md:text-3xl">
              Our Approach
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-90px" }}
            variants={stagger}
            className="max-w-3xl space-y-5 text-sm leading-7 text-[#242124]/72 md:text-[0.95rem] md:leading-8"
          >
            <motion.p variants={fadeUp}>
              Every development begins with careful evaluation. We assess location, market demand, accessibility, infrastructure and future growth potential before committing to a project.
            </motion.p>

            <motion.p variants={fadeUp}>
              This disciplined approach allows us to identify opportunities with genuine long-term potential and create properties that are designed to remain relevant, desirable and valuable well into the future.
            </motion.p>

            <motion.p variants={fadeUp}>
              By combining strategic thinking with attention to detail, we develop projects that meet today's needs while anticipating tomorrow's expectations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#242124] px-6 py-16 text-[#F5F0E8] md:px-10 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(194,161,57,0.12),transparent_34%)]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-90px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-montserrat text-3xl font-semibold tracking-[-0.045em] text-[#C2A139] md:text-4xl"
            >
              Our Values
            </motion.h2>

            <motion.p
              variants={softFade}
              className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-[#F5F0E8]/76 md:text-[0.95rem] md:leading-8"
            >
              Four principles that guide every decision from the opportunities we pursue to the developments we deliver.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-90px" }}
            variants={stagger}
            className="relative mt-12 grid md:grid-cols-2"
          >
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#F5F0E8]/24 md:block" />
            <div className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-[#F5F0E8]/24 md:block" />

            {values.map((value, index) => (
              <motion.article
                key={value.title}
                variants={fadeUp}
                className="group relative min-h-[220px] border-b border-[#F5F0E8]/14 p-7 transition-colors duration-300 last:border-b-0 md:border-b-0 md:p-10"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C2A139]/10 via-[#F5F0E8]/[0.025] to-transparent" />
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/70 to-transparent" />
                </div>

                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-7 font-montserrat text-xl font-semibold tracking-[-0.035em] text-[#C2A139]">
                    {value.title}
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-[#F5F0E8]/72">
                    {value.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
