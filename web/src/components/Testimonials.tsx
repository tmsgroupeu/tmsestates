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
    <section className="relative w-full border-t border-white/10 bg-[#05070B]/78 py-14 backdrop-blur-[2px] md:py-18 lg:flex lg:min-h-[78svh] lg:items-center">
      <div className="home-container">
        <div className="mb-9 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-eyebrow">Client Perspective</p>
            <h2 className="mt-4 font-montserrat text-[clamp(2.15rem,4.2vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.06em] text-[#F5F0E8] text-balance">
              Client Success Stories
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[#F5F0E8]/68 md:text-base md:leading-8 lg:justify-self-end">
            A discreet selection of experiences that reflect the way TMS Estates approaches property guidance: clearly, carefully and with long-term value in mind.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.map((t, index) => (
            <article
              key={t.name}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0D1B2E]/66 p-7 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C2A139]/35 hover:bg-[#0D1B2E]/78 md:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/48 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-8 flex items-center justify-between">
                <Quote className="h-8 w-8 text-[#C2A139] opacity-85" />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8]/32">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-base leading-8 text-[#F5F0E8]/82 md:text-lg md:leading-9">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-7 border-t border-white/10 pt-5">
                <div className="font-montserrat text-lg font-semibold tracking-[-0.035em] text-[#F5F0E8]">
                  {t.name}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C4B49A]/70">
                  {t.role}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
