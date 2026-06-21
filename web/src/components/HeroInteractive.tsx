"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function HeroInteractive() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -44]);
  const opacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 pt-24 md:px-8 lg:px-10"
    >
      <motion.div
        style={{ y, opacity }}
        className="home-container relative mx-auto flex min-h-[72svh] w-full items-center justify-center"
      >
        <div className="mx-auto max-w-[860px] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-montserrat text-[clamp(2rem,3.75vw,4.15rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[#F5F0E8] drop-shadow-[0_18px_48px_rgba(0,0,0,0.52)]"
          >
            Building Value.
            <span className="block text-[#C2A139]">Creating Places.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.18,
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-7 max-w-2xl text-balance text-[0.98rem] leading-8 text-[#F5F0E8]/88 md:mt-8 md:text-[1.08rem] md:leading-9"
          >
            TMS Estates is a Cyprus-based real estate developer creating
            contemporary residential and mixed-use developments in carefully
            selected locations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.34,
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/#projects"
              className="group relative inline-flex min-h-[56px] items-center justify-center overflow-hidden border border-[#C2A139]/70 bg-[#242124]/72 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.26em] text-[#F5F0E8] shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-[10px] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_30px_90px_rgba(194,161,57,0.26)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A139]/70 md:px-9"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5F0E8] to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
              <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#C2A139] transition-all duration-500 group-hover:w-full group-hover:bg-[#C2A139]" />
              <span className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/28 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

              <span className="relative z-10 flex items-center gap-4">
                Explore Our Projects
                <span className="flex h-8 w-8 items-center justify-center border border-[#C2A139]/55 bg-[#05070B]/28 text-[#C2A139] transition-all duration-500 group-hover:border-[#242124]/40 group-hover:bg-[#242124] group-hover:text-[#F5F0E8]">
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
