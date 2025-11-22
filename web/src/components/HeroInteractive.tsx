/* UPDATED: src/components/HeroInteractive.tsx */
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Hook into the scroll position relative to this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 2. Parallax Effects:
  // The text moves down faster than the scroll (parallax) and fades out
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // The background scales up slightly and gets darker for depth
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [0.4, 0.8]); // Dark overlay gets stronger

  // Animation variants for the initial load (Text Reveal)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delays each child (line of text)
        delayChildren: 0.3,
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
      className="relative h-[100vh] w-full overflow-hidden bg-navy"
    >
      {/* --- 1. CINEMATIC VIDEO BACKGROUND --- */}
      <motion.div 
        style={{ scale: scaleBg }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        {/* Placeholder Video: High-end modern villa/coastal vibe */}
        {/* Replace 'src' below with your own MP4 when ready */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg" // Fallback image
        >
          <source
            src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dynamic Overlay: Gets darker as you scroll to make text readable */}
        <motion.div
          style={{ opacity: opacityBg }}
          className="absolute inset-0 bg-navy/40" // Base dark tint
        />
        
        {/* Bottom Gradient: Blends hero seamlessly into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-10" />
      </motion.div>

      {/* --- 2. HERO CONTENT (Parallaxed) --- */}
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
          {/* Label / Superheadline */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
              Limassol, Cyprus
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-montserrat text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Living Elevated.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBF5E8] to-[var(--gold)]">
              Defining Luxury.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl mx-auto text-lg font-light text-white/80 md:text-xl leading-relaxed"
          >
            Discover a curated portfolio of prestigious residences and high-yield investments 
            in the Mediterranean's most dynamic metropolis.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/properties"
              className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-navy transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white"
            >
              Private Consultation
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* --- 3. SCROLL INDICATOR --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-sm"
          >
            <div className="h-1.5 w-1 rounded-full bg-white" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
