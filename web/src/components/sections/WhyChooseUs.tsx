"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

const points = [
  {
    label: "01",
    title: "Prime Locations",
    desc: "Carefully selected locations with strong long-term growth potential.",
  },
  {
    label: "02",
    title: "Quality Construction",
    desc: "Built to high standards with attention to detail at every stage.",
  },
  {
    label: "03",
    title: "Thoughtful Design",
    desc: "Contemporary spaces designed for functionality, comfort and modern living.",
  },
  {
    label: "04",
    title: "Long-Term Value",
    desc: "Developments created to retain their appeal and relevance for years to come.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="tms-section tms-section-compact relative z-10 w-full" id="who-we-are">
      <div className="tms-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-y border-white/12"
        >
          <div className="grid gap-8 py-12 md:py-16 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold">
                Developing Properties with Purpose
              </span>
              <h2 className="mt-4 max-w-xl font-display text-[clamp(2.15rem,4.2vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ivory text-balance">
                Thoughtfully selected. Carefully developed. Built for lasting value.
              </h2>
            </div>

            <div className="lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-10">
              <p className="max-w-3xl text-base leading-relaxed text-ivory/76 md:text-lg">
                Every project is guided by careful evaluation, ensuring the right location, market demand and long-term potential.
              </p>
              <Link
                href="/about"
                className="group mt-7 inline-flex items-center gap-3 border-b border-gold/60 pb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ivory transition duration-300 hover:border-gold hover:text-gold"
              >
                About TMS Estates
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {points.map((point, index) => (
              <div
                key={point.title}
                className="group min-h-[190px] border-white/12 px-0 py-8 sm:px-7 lg:border-r lg:last:border-r-0"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold/85">
                  {point.label}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold uppercase tracking-[0.045em] text-ivory transition-colors duration-300 group-hover:text-gold md:text-xl">
                  {point.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/66">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
