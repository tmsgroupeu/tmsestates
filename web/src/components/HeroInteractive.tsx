"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroInteractive() {
  const targetRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    // CHANGE: Added h-[150vh] to give more scroll room for the effect to complete
    <section ref={targetRef} className="relative h-[150vh] min-h-[700px] w-full">
       <div className="absolute top-6 right-6 z-20">
         <button className="flex items-center gap-2 text-white text-sm font-medium glass-dark px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
            EN
           <ChevronDown size={16} />
         </button>
       </div>

      {/* 
        CHANGE: Added `z-0` here. This keeps the background on the base layer, 
        ensuring the z-10 on <main> will correctly overlap it.
      */}
      <motion.div style={{ scale }} className="fixed inset-0 h-screen z-0">
        <Image
          src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Luxury villa overlooking the Limassol coastline"
          fill
          priority
          className="object-cover brightness-[.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </motion.div>

      {/* 
        The content of the hero needs to be 'sticky' so it stays in view while the
        container scrolls, and it needs a higher z-index than the background.
      */}
      <div className="sticky top-0 h-screen z-10 flex items-end pb-20">
        <motion.div style={{ opacity }} className="section w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-bold sm:text-5xl lg:text-6xl font-display text-white drop-shadow-lg max-w-4xl"
            >
              The Definitive Guide to Luxury Real Estate in Limassol
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/90 mt-4 max-w-2xl text-lg"
            >
              Unparalleled market expertise, exclusive access to premier properties, and a commitment to flawless execution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/properties" className="btn btn-primary gap-2">
                Explore Properties <ArrowRight size={18} />
              </Link>
              <button onClick={() => scrollTo('#contact')} className="btn btn-outline-dark">
                Private Consultation
              </button>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}