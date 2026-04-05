/* FULL REPLACEMENT: src/components/HeroInteractive.tsx */
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1],["0%", "-30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6],[1, 0]);
  const opacityIndicator = useTransform(scrollYProgress,[0, 0.15], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, rotateX: -10 },
    visible: { y: 0, opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 80, damping: 20 } },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center pt-20 md:pt-32 z-20 overflow-hidden"
    >
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 flex flex-col items-center justify-center px-6 text-center w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.h1
            variants={itemVariants}
            className="font-playfair tracking-tight text-white text-5xl sm:text-6xl md:text-7xl xl:text-8xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] leading-[1.1] pb-2"
          >
            Beyond Ordinary
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBF5E8] via-[#D4AF37] to-[#AA8C2C]">
              Estates
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 md:mt-8 max-w-2xl mx-auto text-lg md:text-xl font-light text-white/90 leading-relaxed drop-shadow-md"
          >
            Discover a curated portfolio of prestigious residences and high-yield investments 
            in the Mediterranean&apos;s most dynamic metropolis.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 md:mt-12 flex w-full justify-center"
          >
            <Link
              href="/#projects"
              className="group relative overflow-hidden rounded-full bg-white px-10 py-5 text-sm font-bold uppercase tracking-widest text-[#0A2342] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] text-center shadow-xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Explore Our Projects
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>

        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{ opacity: opacityIndicator }} 
        className="mt-16 md:mt-24 mx-auto z-20 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/70 animate-pulse">
            Start the Journey
          </span>
          <div className="h-11 w-6 rounded-full border-[1.5px] border-white/30 bg-white/5 p-1 backdrop-blur-sm shadow-lg">
            <motion.div
              animate={{ y:[0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="h-2 w-full rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}