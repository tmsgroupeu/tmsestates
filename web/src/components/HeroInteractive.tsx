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

  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-5 pt-24 md:px-8 lg:px-10"
    >
      <motion.div
        style={{ y, opacity }}
        className="home-container relative mx-auto grid min-h-[72svh] w-full items-center"
      >
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-montserrat text-[clamp(3.15rem,8vw,8.6rem)] font-bold leading-[0.92] tracking-[-0.07em] text-[#F5F0E8] drop-shadow-[0_18px_50px_rgba(0,0,0,0.48)]"
          >
            Building Value.
            <span className="block text-[#C2A139]">Creating Places.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-2xl text-base leading-8 text-[#F5F0E8]/88 md:mt-9 md:text-xl md:leading-9"
          >
            TMS Estates is a Cyprus-based real estate developer creating contemporary residential and mixed-use developments in carefully selected locations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-3 rounded-full border border-[#F5F0E8]/25 bg-[#F5F0E8] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#0D1B2E] shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#05070B] hover:shadow-[0_24px_70px_rgba(194,161,57,0.25)] md:px-9"
            >
              Explore Our Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
