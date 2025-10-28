// web/src/components/sections/CyprusStats.tsx
"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Percent, Clock3 } from "lucide-react";

type KPI = {
  label: string;
  value: string;
  change: string;
  serie: number[];
  icon: React.ComponentType<any>;
};

const KPIS: KPI[] = [
  { label: "Avg. Asking Price", value: "€365K", change: "+2.8% QoQ", serie: [280,300,290,310,320,335,365], icon: Building2 },
  { label: "Gross Rental Yield", value: "5.1%", change: "+0.4pp YoY", serie: [4.2,4.4,4.3,4.6,4.7,4.9,5.1], icon: Percent },
  { label: "Market Momentum", value: "↑ Healthy", change: "Demand rising", serie: [40,42,45,47,51,54,58], icon: TrendingUp },
  { label: "Avg. Days on Market", value: "64", change: "-7 days QoQ", serie: [92,88,81,77,72,69,64], icon: Clock3 },
];

export default function CyprusStats() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-montserrat text-2xl text-ink md:text-3xl"
        >
          Cyprus Real Estate Snapshot
        </motion.h2>
        <p className="mt-2 max-w-2xl text-ink/70">
          A quick overview of island-wide dynamics to guide your decisions.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-ink/60">{kpi.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-ink">{kpi.value}</p>
                  <p className="mt-1 text-xs font-medium text-emerald-600">{kpi.change}</p>
                </div>
                <div className="rounded-xl bg-ink/[0.04] p-2">
                  <kpi.icon className="size-5 text-ink/70" />
                </div>
              </div>

              <svg viewBox="0 0 100 32" className="mt-6 h-16 w-full">
                <LinearSpark serie={kpi.serie} />
              </svg>

              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(184,134,11,0.08) 45%, transparent 60%)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinearSpark({ serie }: { serie: number[] }) {
  const min = Math.min(...serie);
  const max = Math.max(...serie);
  const pts = serie.map((v, i) => {
    const x = (i / (serie.length - 1)) * 100;
    const y = 32 - ((v - min) / (max - min || 1)) * 28 - 2;
    return `${x},${y}`;
  });

  return (
    <>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="text-gold"
      />
      <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="rgba(184,134,11,0.25)" />
        <stop offset="100%" stopColor="rgba(184,134,11,0)" />
      </linearGradient>
      <polygon points={`0,32 ${pts.join(" ")} 100,32`} fill="url(#sparkFill)" />
    </>
  );
}
