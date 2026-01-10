/* FULL REPLACEMENT: src/components/sections/WhyChooseUs.tsx */
"use client";

import { ShieldCheck, Handshake, Sparkles, MapPinned, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

const points = [
  {
    icon: ShieldCheck,
    title: "Trusted Advisory",
    desc: "Rigorous due diligence and transparent guidance.",
  },
  {
    icon: Handshake,
    title: "Exclusive Network",
    desc: "Access to private & off-market listings.",
  },
  {
    icon: Sparkles,
    title: "Curated Portfolio",
    desc: "Design-forward properties with enduring value.",
  },
  {
    icon: MapPinned,
    title: "Island-Wide",
    desc: "Expertise in Limassol, Larnaca & Paphos.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* 1. COMPACT GLASS DASHBOARD */}
        {/* A single unified glass container for all 4 points. Space efficient. */}
        <div className="apple-glass rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl backdrop-blur-xl">
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              
              {points.map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0">
                    
                    {/* Icon Circle */}
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/5 p-3 text-[#D4AF37] ring-1 ring-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                       <p.icon className="size-6" strokeWidth={1.5} />
                    </div>

                    {/* Text */}
                    <h3 className="text-sm font-bold font-montserrat text-white mb-2">
                       {p.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed max-w-[200px]">
                       {p.desc}
                    </p>

                </div>
              ))}

           </div>

        </div>

        {/* 2. CENTERED FLOATING CTA */}
        <div className="mt-10 flex justify-center">
            <Link 
                href="/about"
                className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0A2342] shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
                <span className="relative z-10 flex items-center gap-3">
                   Who We Are
                   <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
            </Link>
        </div>

      </motion.div>

    </section>
  );
}
