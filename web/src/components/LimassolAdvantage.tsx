/* FULL REPLACEMENT: src/components/LimassolAdvantage.tsx */
"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const points = [
  "Attractive Tax & Financial Benefits",
  "Fast-Track Permanent Residency",
  "#1 EU Destination for Lifestyle & Investment"
];

export default function LimassolAdvantage() {
  return (
    <section className="relative w-full">
      <div className="apple-glass rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
        
        {/* Background Decor */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-[80px] pointer-events-none" />

        {/* Left Content */}
        <div className="flex-1 space-y-6">
           <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white">
              Why Invest in Cyprus?
           </h2>
           <p className="text-white/80 leading-relaxed max-w-xl">
              A strategic gateway connecting continents, Cyprus offers a stable legal framework, exceptional quality of life, and one of the most attractive tax regimes in Europe.
           </p>
           
           {/* CTA Button */}
           <div className="pt-4">
              <Link 
                href="/invest"
                className="inline-flex items-center gap-3 bg-white text-[#0A2342] px-8 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                Full Investment Guide
                <ArrowRight size={16} />
              </Link>
           </div>
        </div>

        {/* Right Content - The Blue Frame */}
        <div className="w-full md:w-auto min-w-[320px]">
           <div className="bg-[#0A2342]/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl">
              <ul className="space-y-6">
                 {points.map((point, i) => (
                    <li key={i} className="flex items-start gap-4">
                       <CheckCircle2 className="shrink-0 text-[#D4AF37] mt-1" size={20} />
                       <span className="text-white font-medium text-lg leading-tight">
                          {point}
                       </span>
                    </li>
                 ))}
              </ul>
           </div>
        </div>

      </div>
    </section>
  );
}