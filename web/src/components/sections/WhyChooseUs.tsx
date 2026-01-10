/* FULL REPLACEMENT: src/components/sections/WhyChooseUs.tsx */
"use client";

import { ShieldCheck, Handshake, Sparkles, MapPinned, ArrowRight, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

const points = [
  {
    icon: ShieldCheck,
    title: "Trusted Advisory",
    desc: "Rigorous due diligence and transparent guidance from viewing to final signatures.",
  },
  {
    icon: Handshake,
    title: "Exclusive Access",
    desc: "A private network offering off-market listings unavailable to the general public.",
  },
  {
    icon: Sparkles,
    title: "Curated Portfolio",
    desc: "We select only design-forward, high-yield properties with enduring value.",
  },
  {
    icon: MapPinned,
    title: "Prime Locations",
    desc: "Deep expertise in Limassol’s most prestigious postcodes and seafronts.",
  },
  {
    icon: UserCheck,
    title: "Client-Centric",
    desc: "Boutique service model ensuring dedicated attention to your specific goals.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative z-10 w-full max-w-[1400px] mx-auto">
      
      {/* Grid Layout: 3 Top, 2 Bottom (Centered) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Render first 3 items */}
        {points.slice(0, 3).map((p, i) => (
           <Card key={i} p={p} i={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
        {/* Render remaining 2 items */}
        {points.slice(3).map((p, i) => (
           <Card key={i} p={p} i={i + 3} />
        ))}
      </div>

      {/* The "About Us" Footer Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="apple-glass rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8"
      >
         <div className="text-center md:text-left">
            <h3 className="text-xl font-montserrat font-bold text-white">The TMS Standard</h3>
            <p className="text-white/60 text-sm mt-1 max-w-xl font-light">
               We build long-term partnerships founded on integrity, financial insight, and exceptional results.
            </p>
         </div>
         <Link 
            href="/about"
            className="group whitespace-nowrap inline-flex items-center gap-3 bg-[#D4AF37] text-[#0A2342] px-8 py-4 rounded-full font-bold uppercase text-[11px] tracking-[0.15em] hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-white/20"
         >
            Who We Are
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
         </Link>
      </motion.div>

    </section>
  );
}

function Card({ p, i }: { p: any, i: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 hover:bg-white/10 transition-colors duration-500"
        >
            <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-[#0A2342]/40 p-4 text-[#D4AF37] shadow-inner ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-500">
              <p.icon className="size-6" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-white font-montserrat mb-3">{p.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed font-light">{p.desc}</p>
        </motion.div>
    );
}
