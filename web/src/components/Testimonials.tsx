// web/src/components/Testimonials.tsx (or TestimonialsGlass.tsx)
"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "A. Michael",
    role: "Buyer, Limassol",
    quote:
      "A seamless experience from first viewing to handover. Their advice was precise and saved us weeks of searching.",
  },
  {
    name: "D. Petrou",
    role: "Investor, Larnaca",
    quote:
      "Access to exclusive listings and thorough due diligence made us confident expanding our portfolio.",
  },
  {
    name: "S. Kosta",
    role: "Seller, Paphos",
    quote:
      "Premium presentation and truly serious buyers. We closed above expectations with minimal friction.",
  },
];

export default function TestimonialsGlass() {
  return (
    <section className="section text-white pt-16 pb-24 md:pt-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-montserrat drop-shadow-md">
          Client Success Stories
        </h2>
        <p className="mt-4 text-lg text-white/90 drop-shadow-sm max-w-3xl mx-auto">
          Real feedback from buyers, sellers and investors across Cyprus.
        </p>
      </motion.div>

      <div className="stack-cards-carousel md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="glass-dark p-6 rounded-2xl flex flex-col"
          >
            <Quote className="w-8 h-8 text-[color:var(--gold)]/60 mb-4" />
            <p className="text-white/90 flex-grow">“{t.quote}”</p>
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="font-semibold text-white">{t.name}</div>
              <div className="text-sm text-white/60">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
