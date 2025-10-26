"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroInteractive() {
  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView();
  };

  return (
    <section className="relative h-screen w-full">
      {/* The background image is fixed to the viewport */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w-1920"
          alt="Luxury villa overlooking the Limassol coastline"
          fill
          priority
          className="object-cover"
        />
        {/* The overlay is part of the fixed background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* The content sits on a higher layer and is centered */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="section">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-bold sm:text-5xl lg:text-6xl font-display text-white drop-shadow-lg max-w-4xl mx-auto"
            >
              The Definitive Guide to Luxury Real Estate in Limassol
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4 justify-center"
            >
              <Link href="/properties" className="btn btn-primary gap-2">
                Explore Properties <ArrowRight size={18} />
              </Link>
              <button onClick={() => scrollTo('#contact')} className="btn btn-outline-dark">
                Private Consultation
              </button>
            </motion.div>
        </div>
      </div>
    </section>
  );
}