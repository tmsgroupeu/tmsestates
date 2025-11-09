// web/src/components/sections/WhyChooseUs.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Handshake, Sparkles, MapPinned } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Trusted Advisory",
    desc: "Diligent guidance from first viewing to final signatures, with your interests first.",
  },
  {
    icon: Handshake,
    title: "Exclusive Network",
    desc: "Access to private listings & off-market deals across Cyprus.",
  },
  {
    icon: Sparkles,
    title: "Curated Quality",
    desc: "Design-forward homes and investment-grade assets with enduring value.",
  },
  {
    icon: MapPinned,
    title: "Island-Wide Coverage",
    desc: "Local expertise in Limassol, Larnaca, Nicosia, and Paphos.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section text-white pt-32 pb-24 md:pt-48 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-montserrat drop-shadow-md">
          The TMS Advantage
        </h2>
        <p className="mt-4 text-lg text-white/90 drop-shadow-sm max-w-3xl mx-auto">
          Boutique representation, rigorous due diligence, and a truly discreet service model.
        </p>
      </motion.div>

      <div className="stack-cards-carousel md:grid-cols-2 lg:grid-cols-4 gap-4">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-dark group relative overflow-hidden p-5 text-white"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white/10 p-2">
                <p.icon className="size-5 text-[color:var(--gold)]" />
              </div>
              <div>
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-white/80">{p.desc}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-[color:var(--gold)]/10 blur-2xl group-hover:bg-[color:var(--gold)]/18 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
