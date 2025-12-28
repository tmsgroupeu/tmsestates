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

  // ✅ FIX 1: Slow down the text movement. 
  // Previously ["0%", "-50%"] moved it up too fast. 
  // Now ["0%", "-30%"] keeps it readable longer as you scroll.
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  
  // Fade text out as you leave the hero
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  
  // Fade indicator out quickly
  const opacityIndicator = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.2 
      } 
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, rotateX: -10 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0, 
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 20 
      } 
    },
  };

  return (
    <section
      ref={containerRef}
      // ✅ FIX 2: Added `pt-20` (or `md:pt-32`).
      // This offsets the Flexbox centering to account for the Navigation Bar height.
      // The content now centers visually in the *available* space, not the *screen* space.
      className="relative h-screen w-full flex flex-col items-center justify-center pt-20 md:pt-32 z-20 overflow-hidden"
    >
      {/* --- CONTENT WRAPPER --- */}
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
          
          {/* 1. Main Headline */}
          <motion.h1
            variants={itemVariants}
            // ✅ FIX 3: Responsive Font Sizing
            // Adjusted sizes to ensure it doesn't touch edges on laptops (md/lg).
            className="font-montserrat font-bold tracking-tight text-white 
                       text-5xl sm:text-6xl md:text-7xl xl:text-8xl 
                       drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] leading-[1.1] pb-2"
          >
            Living Elevated.
            <br />
            {/* Elegant Gradient for "Luxury" */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBF5E8] via-[#D4AF37] to-[#AA8C2C]">
              Defining Luxury.
            </span>
          </motion.h1>

          {/* 2. Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-6 md:mt-8 max-w-2xl mx-auto text-lg md:text-xl font-light text-white/90 leading-relaxed drop-shadow-md"
          >
            Discover a curated portfolio of prestigious residences and high-yield investments 
            in the Mediterranean&apos;s most dynamic metropolis.
          </motion.p>

          {/* 3. Buttons / CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
          >
            <Link
              href="/properties"
              className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-[var(--navy)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group w-full sm:w-auto rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Private Consultation
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* --- 4. SCROLL INDICATOR --- */}
      {/* 
         Remains part of the flex flow, pushed down by margin.
         Fades out on scroll via opacityIndicator.
      */}
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
          {/* Animated Mouse Icon */}
          <div className="h-11 w-6 rounded-full border-[1.5px] border-white/30 bg-white/5 p-1 backdrop-blur-sm shadow-lg">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="h-2 w-full rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
          </div>
        </div>
      </motion.div>

    </section>
  );
}
