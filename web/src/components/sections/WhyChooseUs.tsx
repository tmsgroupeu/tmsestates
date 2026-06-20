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
      <div className="absolute inset-0 -z-10 bg-[#05070B]/28 backdrop-blur-[1px]" />

      <div className="home-container relative">
        <div className="overflow-hidden border border-[#F5F0E8]/10 bg-[#242124]/58 shadow-[0_32px_110px_rgba(0,0,0,0.38)] backdrop-blur-[10px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20 lg:px-10 lg:py-12 xl:px-12"
          >
            <div>
              <h2 className="max-w-3xl font-montserrat text-[clamp(2rem,3.2vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8]">
                Developing Properties{" "}
                <span className="text-[#C2A139]">with Purpose</span>
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-start">
              <p className="text-balance text-base leading-8 text-[#F5F0E8]/84 md:text-[1.04rem] md:leading-9">
                Every project is guided by careful evaluation, ensuring the right
                location, market demand and long-term potential.
              </p>

              <Link
                href="/about"
                className="group mt-7 inline-flex items-center gap-3 border border-[#C2A139]/50 bg-[#242124]/84 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_24px_75px_rgba(194,161,57,0.2)]"
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
            className="grid gap-px border-t border-[#F5F0E8]/10 bg-[#F5F0E8]/10 md:grid-cols-2 lg:grid-cols-4"
          >
            {pillars.map((item) => (
              <article
                key={item.title}
                className="group relative min-h-[190px] overflow-hidden bg-[#242124] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-[0_30px_95px_rgba(0,0,0,0.5)] md:p-7"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8]/[0.045] via-[#242124] to-[#05070B]/58" />

                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 border border-[#C2A139]/70" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C2A139]/16 via-[#F5F0E8]/[0.045] to-[#0D1B2E]/34" />
                  <div className="absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#F5F0E8]/10 blur-3xl" />
                </div>

                <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#C2A139] via-[#C2A139]/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex min-h-[138px] flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C2A139]/90">
                    {item.label}
                  </span>

                  <h3 className="mt-8 font-montserrat text-xl font-semibold tracking-[-0.03em] text-[#F5F0E8]">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-[24rem] text-sm leading-7 text-[#F5F0E8]/76">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
