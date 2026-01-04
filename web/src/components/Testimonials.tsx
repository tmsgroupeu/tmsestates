"use client";

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
    <section className="py-16"> {/* No background here, transparent */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-montserrat text-white drop-shadow-lg">
          Client Success Stories
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            // ✅ STYLE: Fully transparent glass card
            className="relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors"
          >
            <Quote className="w-8 h-8 text-[var(--gold)] mb-4 opacity-80" />
            <p className="text-white/90 text-lg leading-relaxed italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="font-bold text-white">{t.name}</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}