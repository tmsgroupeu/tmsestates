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
    <section className="relative w-full border-y border-white/10 bg-[#05070B]/58 py-16 backdrop-blur-[2px] md:py-20">
      <div className="home-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <p className="section-eyebrow">TMS Estates</p>
            <h2 className="section-heading mt-4 max-w-2xl">
              Developing Properties <span className="text-[#C2A139]">with Purpose</span>
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-balance text-base leading-8 text-[#F5F0E8]/78 md:text-lg md:leading-9">
              Every project is guided by careful evaluation, ensuring the right location, market demand and long-term potential.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] transition-colors hover:text-[#C2A139]"
            >
              About TMS Estates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid border border-white/10 bg-[#0D1B2E]/28 md:mt-14 md:grid-cols-4"
        >
          {pillars.map((item) => (
            <article
              key={item.title}
              className="group relative min-h-[190px] border-b border-white/10 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-8"
            >
              <div className="absolute left-0 top-0 h-[2px] w-0 bg-[#C2A139] transition-all duration-500 group-hover:w-full" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C2A139]/80">
                {item.label}
              </span>
              <h3 className="mt-8 font-montserrat text-xl font-semibold tracking-[-0.03em] text-[#F5F0E8]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/64">
                {item.text}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
