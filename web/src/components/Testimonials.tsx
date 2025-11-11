// web/src/components/Testimonials.tsx

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
    <section
      className="w-full bg-slate-950/0 py-16"
      aria-label="Client testimonials"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400/85">
            Client Success Stories
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50 md:text-3xl">
            Real feedback from buyers, sellers & investors.
          </h2>
          <p className="mt-2 text-sm text-slate-300/85">
            Built on trust, clarity and quiet execution across Cyprus.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name + i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="
                relative flex h-full flex-col gap-3
                rounded-3xl bg-slate-900/85 p-4
                shadow-[0_18px_70px_rgba(0,0,0,0.9)]
                ring-1 ring-sky-500/12
              "
            >
              <Quote className="h-4 w-4 text-sky-400/90" />
              <p className="text-xs leading-relaxed text-slate-200">
                “{t.quote}”
              </p>
              <div className="mt-2 text-[10px]">
                <p className="font-semibold text-sky-300">{t.name}</p>
                <p className="text-slate-400">{t.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
