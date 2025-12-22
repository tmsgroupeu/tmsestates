"use client";

import { ShieldCheck, Handshake, Sparkles, MapPinned } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
    </section>
  );
}
