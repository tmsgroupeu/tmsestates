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
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#05070B]/35 via-[#05070B]/66 to-[#05070B]/62 py-14 backdrop-blur-[1px] md:py-20 lg:flex lg:min-h-[72svh] lg:items-center lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent to-[#05070B]/10" />
      <div className="home-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 border-y border-white/10 py-8 md:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
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
          transition={{ delay: 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 grid gap-3 md:mt-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((item) => (
            <article
              key={item.title}
              className="group relative min-h-[178px] overflow-hidden border border-white/10 bg-[#0D1B2E]/34 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:border-[#C2A139]/35 hover:bg-[#0D1B2E]/52 hover:shadow-[0_26px_90px_rgba(0,0,0,0.34)] md:p-7"
            >
              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#C2A139] via-[#C2A139]/35 to-transparent opacity-55 transition-opacity group-hover:opacity-100" />
              <div className="absolute right-0 top-0 h-20 w-20 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C2A139]/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C2A139]/85">
                {item.label}
              </span>
              <h3 className="mt-8 font-montserrat text-xl font-semibold tracking-[-0.03em] text-[#F5F0E8]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/66">
                {item.text}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
