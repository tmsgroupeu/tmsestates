/* UPDATED: src/components/HeroInteractive.tsx */
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- PARALLAX LOGIC ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 0.5], ["0%", "-50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // --- INITIAL LOAD ANIMATIONS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, rotateX: -10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center z-20"
    >
      {/* --- CONTENT WRAPPER --- */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* REMOVED: Location Pill */}

          {/* 1. Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-montserrat text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl"
          >
            Living Elevated.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBF5E8] to-[var(--gold)]">
              Defining Luxury.
            </span>
          </motion.h1>

          {/* 2. Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl mx-auto text-lg font-light text-white/90 md:text-xl leading-relaxed drop-shadow-md"
          >
            Discover a curated portfolio of prestigious residences and high-yield investments 
            in the Mediterranean&apos;s most dynamic metropolis.
          </motion.p>

          {/* 3. Buttons / CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            {/* Primary Button */}
            <Link
              href="/properties"
              className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-[var(--navy)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Secondary "Glass" Button */}
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Private Consultation
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* --- 4. SCROLL INDICATOR --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">
            Start the Journey
          </span>
          <div className="h-12 w-7 rounded-full border-2 border-white/20 bg-white/5 p-1 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="h-2.5 w-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            />
          </div>
        </div>
      </motion.div>

    </section>
  );
}
