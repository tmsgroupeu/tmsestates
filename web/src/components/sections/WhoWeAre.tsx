"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WhoWeAre() {
  return (
    <section className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-b border-white/10">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          {/* Top Row: Title & Intro */}
          <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
            <div className="w-full md:w-1/2 py-16 px-8 lg:px-16 flex items-center justify-center md:justify-start">
              <h2 className="font-montserrat text-4xl lg:text-5xl xl:text-6xl tracking-wide text-white leading-[1.2]">
                Developing Properties <br />
                with <span className="text-[#D4AF37]">Purpose</span>
              </h2>
            </div>
            <div className="w-full md:w-1/2 py-16 px-8 lg:px-16 flex items-center justify-center md:justify-start">
              <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                Every project begins with careful evaluation, ensuring the right location, demand and long-term potential before development begins.
              </p>
            </div>
          </div>

          {/* Bottom Row: 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x lg:divide-x divide-white/10">
             
             {/* Box 1 */}
             <div className="p-8 lg:p-12 flex flex-col gap-4 hover:bg-white/5 transition-colors border-b sm:border-b-0">
                <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs">Prime Locations</h3>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                   Carefully selected locations with strong long-term growth potential.
                </p>
             </div>

             {/* Box 2 */}
             <div className="p-8 lg:p-12 flex flex-col gap-4 hover:bg-white/5 transition-colors border-b lg:border-b-0">
                <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs">Quality Construction</h3>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                   Built to high standards with attention to detail at every stage.
                </p>
             </div>

             {/* Box 3 */}
             <div className="p-8 lg:p-12 flex flex-col gap-4 hover:bg-white/5 transition-colors border-b sm:border-b-0">
                <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs">Thoughtful Design</h3>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                   Contemporary spaces designed around functionality, comfort and modern lifestyles.
                </p>
             </div>

             {/* Box 4 */}
             <div className="p-8 lg:p-12 flex flex-col gap-4 hover:bg-white/5 transition-colors">
                <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs">Long-Term Value</h3>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                   Developments created to retain their appeal and relevance for years to come.
                </p>
             </div>

          </div>
          
          {/* CTA Footer inside the boxed area */}
          <div className="border-t border-white/10 p-8 flex justify-center bg-black/20">
             <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs hover:text-[#D4AF37] transition-colors"
             >
                Read Our Story
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
             </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
