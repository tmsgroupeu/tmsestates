"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 400], [0, -150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center">
      
      <motion.div 
        style={{ y: yText, opacity: opacityText }} 
        className="relative z-10 px-4 text-center max-w-5xl mx-auto"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-lg">
              Limassol, Cyprus
            </span>
          </div>

          <h1 className="font-montserrat text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl mb-8">
            Living Elevated.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBF5E8] to-[#D4AF37]">
              Defining Luxury.
            </span>
          </h1>

          {/* ✅ FIXED: Corrected &apos; and closing tags */}
          <p className="max-w-2xl mx-auto text-lg font-light text-white/90 md:text-xl leading-relaxed drop-shadow-md mb-12">
            Discover a curated portfolio of prestigious residences and high-yield investments 
            in the Mediterranean&apos;s most dynamic metropolis.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/properties"
              className="pointer-events-auto group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-[var(--navy)] transition-all duration-300 hover:scale-105"
            >
              Explore Collection
            </Link>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="pointer-events-auto group rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              Private Consultation
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: opacityText }} 
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
         <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Start Journey</span>
            <div className="h-12 w-7 rounded-full border-2 border-white/20 p-1">
              <motion.div 
                animate={{ y: [0, 14, 0] }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="h-2.5 w-full rounded-full bg-white" 
              />
            </div>
         </div>
      </motion.div>
    </section>
  );
}