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
    <section className="relative -mt-8 w-full overflow-hidden pb-12 pt-[4.25rem] md:-mt-12 md:pb-16 md:pt-[5.25rem] lg:flex lg:min-h-[86svh] lg:items-center lg:pb-20 lg:pt-24">
      <div className="absolute inset-0 -z-10 bg-[#05070B]/24 backdrop-blur-[1px]" />

      <div className="home-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 pb-9 md:pb-11 lg:grid-cols-[0.96fr_1.04fr] lg:items-end"
        >
          <div>
            <p className="section-eyebrow mb-4">TMS Estates</p>
            <h2 className="section-heading max-w-2xl">
              Developing Properties{" "}
              <span className="text-[#C2A139]">with Purpose</span>
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-balance text-base leading-8 text-[#F5F0E8]/84 md:text-[1.04rem] md:leading-9">
              Every project is guided by careful evaluation, ensuring the right
              location, market demand and long-term potential.
            </p>
            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-3 rounded-full border border-[#C2A139]/50 bg-[#05070B]/44 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#05070B] hover:shadow-[0_24px_75px_rgba(194,161,57,0.2)]"
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
              className="group relative min-h-[172px] overflow-hidden border border-white/16 bg-[#0B1728] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-[8px] transition-all duration-300 hover:-translate-y-1 hover:border-[#C2A139]/50 hover:bg-[#10213A] hover:shadow-[0_30px_95px_rgba(0,0,0,0.42)] md:p-7"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8]/[0.06] via-[#0D1B2E]/28 to-[#05070B]/52" />
              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#C2A139] via-[#C2A139]/30 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C2A139]/90">
                  {item.label}
                </span>
                <h3 className="mt-8 font-montserrat text-xl font-semibold tracking-[-0.03em] text-[#F5F0E8]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/76">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
