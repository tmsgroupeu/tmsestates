/* FULL REPLACEMENT: src/components/sections/WhyChooseUs.tsx */
"use client";

import { ShieldCheck, Handshake, Sparkles, MapPinned, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing"; // Use i18n Link

const points = [
  {
    icon: ShieldCheck,
    title: "Trusted Advisory",
    desc: "Diligent guidance from viewing to final signatures.",
  },
  {
    icon: Handshake,
    title: "Exclusive Network",
    desc: "Access to private & off-market listings.",
  },
  {
    icon: Sparkles,
    title: "Curated Quality",
    desc: "Design-forward homes with enduring value.",
  },
  {
    icon: MapPinned,
    title: "Island-Wide",
    desc: "Local expertise in Limassol, Larnaca & Paphos.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6">
      
      {/* 1. The Grid of Glass Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl apple-glass p-6 text-center transition-transform duration-300 hover:-translate-y-1 hover:bg-white/5"
          >
            <div className="mb-3 inline-flex items-center justify-center rounded-full bg-white/10 p-3 text-[color:var(--gold)]">
              <p.icon className="size-6" />
            </div>
            <h3 className="text-sm font-bold text-white font-montserrat">{p.title}</h3>
            <p className="mt-2 text-xs text-white/70 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 2. The CTA Footer (Teaser for About Page) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex flex-col md:flex-row items-center justify-between gap-6 apple-glass rounded-2xl p-8"
      >
         <div className="text-center md:text-left">
            <h3 className="text-lg font-montserrat font-bold text-white">Who We Are</h3>
            <p className="text-sm text-white/70 mt-1 max-w-xl">
               TMS Estates Ltd delivers high-level expertise supported by in-depth market knowledge. 
               We build long-term partnerships founded on integrity and results.
            </p>
         </div>

         {/* THE BUTTON */}
         <Link 
            href="/about"
            className="group whitespace-nowrap inline-flex items-center gap-3 bg-white text-[#0A2342] px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all shadow-lg hover:shadow-2xl"
         >
            More About Us
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
         </Link>
      </motion.div>

    </section>
  );
}