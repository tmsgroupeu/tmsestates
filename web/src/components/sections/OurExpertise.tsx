"use client";

import { ShieldCheck, Handshake, Sparkles, MapPinned } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Trusted Advisory",
    desc: "Guidance from viewing to final signatures.",
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
    desc: "Expertise in Limassol, Larnaca & Paphos.",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="w-full">
      {/* 
         ✅ COMPACT LAYOUT: 
         - Removed the big header text (it was redundant with the "The TMS Advantage" section title).
         - Used grid-cols-2 (tablet) and grid-cols-4 (desktop) for a single horizontal row.
      */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {points.map((p, i) => (
          <div
            key={p.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 backdrop-blur-md"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="rounded-full bg-white/10 p-3 text-[var(--gold)] group-hover:scale-110 transition-transform">
                <p.icon className="size-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{p.title}</h3>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}