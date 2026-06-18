"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function HeroInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const opacityIndicator = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center pt-24 z-20 overflow-hidden px-4"
    >
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 lux-container"
      >
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="mx-auto max-w-[1180px] border border-[rgba(245,240,232,0.13)] bg-[rgba(5,7,11,0.42)] backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.42)] rounded-[2rem] md:rounded-[2.75rem] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative p-8 sm:p-10 md:p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-[rgba(245,240,232,0.10)]">
              <div className="lux-eyebrow mb-7">Cyprus Real Estate Development</div>
              <h1 className="lux-heading max-w-4xl">
                Building Value.<br />
                <span className="text-[var(--gold)]">Creating Places.</span>
              </h1>
              <p className="lux-copy mt-7 max-w-2xl">
                TMS Estates is a Cyprus-based real estate developer creating contemporary residential and mixed-use developments in carefully selected locations.
              </p>
              <Link href="/#projects" className="lux-btn group mt-10">
                Explore Our Projects
                <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative min-h-[260px] lg:min-h-full p-8 md:p-12 flex flex-col justify-end bg-gradient-to-br from-[rgba(194,161,57,0.16)] to-transparent">
              <div className="absolute inset-0 opacity-60 pointer-events-none" style={{
                backgroundImage: "linear-gradient(to right, rgba(245,240,232,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,240,232,.08) 1px, transparent 1px)",
                backgroundSize: "33.333% 50%"
              }} />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--stone)] font-bold mb-4">Strategic Development</p>
                <p className="font-montserrat text-2xl md:text-3xl leading-tight text-[var(--ivory)]">
                  Contemporary spaces shaped for long-term value across Cyprus.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity: opacityIndicator }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--ivory)]/70">
            Scroll to explore
          </span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
