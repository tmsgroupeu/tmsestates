"use client";

import { Building2, Hammer, LayoutTemplate, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

const points = [
  {
    icon: Building2,
    title: "Prime Locations",
    desc: "Carefully selected locations with strong long-term growth potential.",
  },
  {
    icon: Hammer,
    title: "Quality Construction",
    desc: "Built to high standards with attention to detail at every stage.",
  },
  {
    icon: LayoutTemplate,
    title: "Thoughtful Design",
    desc: "Contemporary spaces designed for functionality, comfort and modern living.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Value",
    desc: "Developments created to retain their appeal and relevance for years to come.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative z-10 w-full">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.95fr_1.35fr] gap-10 lg:gap-16 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75 }}
          className="flex flex-col justify-between p-3 md:p-5"
        >
          <div>
            <p className="lux-eyebrow mb-6">Developing Properties with Purpose</p>
            <h2 className="font-montserrat text-4xl md:text-6xl font-bold leading-[1.02] tracking-[-0.04em] text-[var(--ivory)]">
              Developing Properties <span className="text-[var(--gold)]">with Purpose</span>
            </h2>
            <p className="lux-copy mt-7 max-w-xl">
              Every project is guided by careful evaluation, ensuring the right location, market demand and long-term potential.
            </p>
          </div>

          <Link href="/about" className="lux-btn group mt-10 w-fit">
            About TMS Estates
            <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 border border-[rgba(245,240,232,0.10)] bg-[rgba(5,7,11,0.24)] rounded-[1.5rem] overflow-hidden">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.65, delay: i * 0.08 }}
              className="group relative p-7 md:p-9 min-h-[240px] border-b sm:border-r border-[rgba(245,240,232,0.10)] last:border-b-0 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(n+3)]:border-b-0 hover:bg-[rgba(194,161,57,0.08)] transition-colors duration-500"
            >
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(245,240,232,0.08)] text-[var(--gold)] ring-1 ring-[rgba(245,240,232,0.10)] group-hover:scale-110 transition-transform duration-500">
                <p.icon className="size-5" strokeWidth={1.5} />
              </div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--stone)]">0{i + 1}</p>
              <h3 className="font-montserrat text-xl font-bold text-[var(--ivory)] mb-4 uppercase tracking-[-0.02em]">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-[rgba(245,240,232,0.68)]">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
