"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

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
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#F5F0E8] text-[#242124]">
      <section className="relative flex min-h-[46svh] items-end bg-[#242124] px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(194,161,57,0.12),transparent_28%)]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-2xl"
          >
            <h1 className="font-montserrat text-[clamp(2.15rem,4vw,5rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8]">
              Building <span className="text-[#C2A139]">Value.</span>
              <br />
              Creating <span className="text-[#C2A139]">Places.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#F5F0E8]/78 md:text-base md:leading-8">
              TMS Estates is a real estate development company focused on creating residential and mixed-use properties in strategically selected locations across Cyprus.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#F5F0E8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="font-montserrat text-2xl font-semibold italic tracking-[-0.04em] text-[#C2A139] md:text-3xl">
              The Company
            </p>

            <Link
              href="/projects"
              className="group mt-6 inline-flex items-center gap-3 border-b border-[#C2A139]/40 pb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#242124] transition-colors hover:text-[#C2A139]"
            >
              Explore Projects
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="grid gap-6 text-sm leading-7 text-[#242124]/72 md:grid-cols-2 md:text-[0.95rem] md:leading-8"
          >
            <p>
              Our developments vary in scale, concept and location, encompassing boutique apartment buildings, standalone residences and land-driven opportunities. Every project is carefully evaluated based on its long-term potential, market demand and strategic value.
            </p>

            <p>
              Backed by the strength and heritage of TMS Group, we combine local market insight, international business expertise and a disciplined development approach to create properties that deliver lasting value. From site selection and planning through construction and delivery, every decision is guided by quality, functionality and long-term vision.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#C2A139] px-6 py-9 text-center md:px-10 md:py-11">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,33,36,0.08),transparent_24%,transparent_76%,rgba(36,33,36,0.08))]" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="relative mx-auto max-w-5xl"
        >
          <h2 className="font-montserrat text-2xl font-semibold tracking-[-0.04em] text-[#242124] md:text-3xl">
            Our Mission
          </h2>

          <p className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-[#242124]/78 md:text-[0.95rem] md:leading-8">
            To create thoughtfully designed developments that deliver lasting value for homeowners, investors and communities alike, balancing quality, functionality and sustainable growth in every project we undertake.
          </p>
        </motion.div>
      </section>

      <section className="relative bg-[#F5F0E8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="font-montserrat text-2xl font-semibold italic tracking-[-0.04em] text-[#C2A139] md:text-3xl">
              Our Approach
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="max-w-3xl space-y-5 text-sm leading-7 text-[#242124]/72 md:text-[0.95rem] md:leading-8"
          >
            <p>
              Every development begins with careful evaluation. We assess location, market demand, accessibility, infrastructure and future growth potential before committing to a project.
            </p>

            <p>
              This disciplined approach allows us to identify opportunities with genuine long-term potential and create properties that are designed to remain relevant, desirable and valuable well into the future.
            </p>

            <p>
              By combining strategic thinking with attention to detail, we develop projects that meet today's needs while anticipating tomorrow's expectations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#242124] px-6 py-16 text-[#F5F0E8] md:px-10 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(194,161,57,0.12),transparent_34%)]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="font-montserrat text-3xl font-semibold tracking-[-0.045em] text-[#C2A139] md:text-4xl">
              Our Values
            </h2>

            <p className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-[#F5F0E8]/76 md:text-[0.95rem] md:leading-8">
              Four principles that guide every decision from the opportunities we pursue to the developments we deliver.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="relative mt-12 grid md:grid-cols-2"
          >
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#F5F0E8]/24 md:block" />
            <div className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-[#F5F0E8]/24 md:block" />

            {values.map((value, index) => (
              <article
                key={value.title}
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
              </article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
