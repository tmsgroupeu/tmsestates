/* UPDATED: src/components/HeroInteractive.tsx */
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

  // Parallax the text slightly faster than scroll
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0, rotateX: -10 },
    visible: { y: 0, opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    // Removed bg-navy and overflow-hidden. This is now just a transparent container.
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center">
      
      {/* Parallax Wrapper */}
      <motion.div style={{ y: yText, opacity: opacityText }} className="z-10 px-4 text-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-5xl mx-auto">
          
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
              Limassol, Cyprus
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-montserrat text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
            Living Elevated.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBF5E8] to-[#D4AF37]">
              Defining Luxury.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-8 max-w-2xl mx-auto text-lg font-light text-white/90 md:text-xl leading-relaxed drop-shadow-md">
            Discover a curated portfolio of prestigious residences and high-yield investments in the Mediterranean&apos;s most dynamic metropolis.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/properties" className="group rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-navy transition-transform duration-300 hover:scale-105 shadow-xl">
              <span className="flex items-center gap-2">
                Explore Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
          
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
         <div className="h-12 w-7 rounded-full border-2 border-white/30 p-1">
           <motion.div 
             animate={{ y: [0, 16, 0] }} 
             transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
             className="h-2.5 w-full rounded-full bg-white" 
           />
         </div>
      </motion.div>

    </section>
  );
}
