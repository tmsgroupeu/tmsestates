"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

const pillars = [
  {
    label: "01",
    title: "Prime Locations",
    text: "Carefully selected locations with strong long-term growth potential.",
  },
  {
    label: "02",
    title: "Quality Construction",
    text: "Built to high standards with attention to detail at every stage.",
  },
  {
    label: "03",
    title: "Thoughtful Design",
    text: "Contemporary spaces designed for functionality, comfort and modern living.",
  },
  {
    label: "04",
    title: "Long-Term Value",
    text: "Developments created to retain their appeal and relevance for years to come.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative -mt-12 w-full overflow-hidden pb-12 pt-20 md:-mt-16 md:pb-16 md:pt-24 lg:-mt-18 lg:flex lg:min-h-[88svh] lg:items-center lg:pb-20 lg:pt-28">
      <div className="absolute inset-0 -z-10 bg-[#05070B]/14 backdrop-blur-[1px]" />

      <div className="home-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 pb-9 md:pb-11 lg:grid-cols-[0.96fr_1.04fr] lg:items-end"
        >
          <div>
            <h2 className="section-heading max-w-2xl">
              Developing Properties <span className="text-[#C2A139]">with Purpose</span>
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-balance text-base leading-8 text-[#F5F0E8]/82 md:text-lg md:leading-9">
              Every project is guided by careful evaluation, ensuring the right location, market demand and long-term potential.
            </p>
            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-3 rounded-full border border-[#C2A139]/35 bg-[#0D1B2E]/44 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#05070B] hover:shadow-[0_22px_70px_rgba(194,161,57,0.18)]"
            >
              About TMS Estates
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((item) => (
            <article
              key={item.title}
              className="group relative min-h-[176px] overflow-hidden border border-white/10 bg-[#0D1B2E]/32 p-6 shadow-[0_22px_75px_rgba(0,0,0,0.26)] backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:border-[#C2A139]/40 hover:bg-[#0D1B2E]/52 hover:shadow-[0_32px_100px_rgba(0,0,0,0.38)] md:p-7"
            >
              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#C2A139] via-[#C2A139]/32 to-transparent opacity-55 transition-opacity group-hover:opacity-100" />
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C2A139]/14 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C2A139]/85">
                {item.label}
              </span>
              <h3 className="mt-8 font-montserrat text-xl font-semibold tracking-[-0.03em] text-[#F5F0E8]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/70">
                {item.text}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
