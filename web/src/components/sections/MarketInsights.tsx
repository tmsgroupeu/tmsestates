// web/src/components/LimassolAdvantage.tsx
"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

const stats = [
  { value: 12, suffix: "%", label: "YoY Price Appreciation" },
  { value: 7500, prefix: "€", suffix: "/m²", label: "Prime Seafront Average" },
  { value: 1, prefix: "#", label: "Top EU Destination for Lifestyle & Investment" },
];

function Counter({
  from,
  to,
  prefix,
  suffix,
}: {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 2.2,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (value) => {
        if (ref.current) {
          ref.current.textContent = `${prefix ?? ""}${value.toLocaleString("en-US", {
            maximumFractionDigits: 0,
          })}${suffix ?? ""}`;
        }
      },
    });
    return () => controls.stop();
  }, [from, to, prefix, suffix]);

  return <span ref={ref} className="text-xl font-semibold text-sky-300 md:text-2xl" />;
}

export default function LimassolAdvantage() {
  const laneRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="advantage" className="w-full bg-slate-950 py-16" aria-label="Limassol market advantages">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400/85">
            Limassol Advantage at a Glance
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50 md:text-3xl">
            Key indicators that define Limassol as a prime hub.
          </h2>
          <p className="mt-3 text-sm text-slate-300/85">
            Anchored by a strong legal framework, international business ecosystem and lifestyle appeal, Limassol offers a rare blend of resilience and long-term value.
          </p>
        </div>

        {/* 3D Floating Lane */}
        <div className="relative mt-2" ref={laneRef}>
          <div className="pointer-events-none absolute -inset-x-10 top-6 h-24 bg-sky-500/10 blur-3xl" />
          <div
            className="
              relative grid gap-3 rounded-3xl bg-slate-900/95 px-4 py-4
              shadow-[0_26px_90px_rgba(0,0,0,0.9)] ring-1 ring-sky-500/15
              md:grid-cols-3 md:gap-4 md:px-6 md:py-5
            "
            style={{ transform: "translateY(-6px)" }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`
                  flex flex-col gap-1 rounded-2xl bg-slate-950/40 px-3 py-3
                  shadow-[0_16px_40px_rgba(15,23,42,0.9)] ring-1 ring-sky-500/10
                  transition-all duration-300 hover:-translate-y-1 hover:ring-sky-400/40
                  ${i > 0 ? "md:border-l md:border-slate-700/40" : ""}
                `}
              >
                <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="text-[11px] text-slate-300/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-slate-500">
          Indicators are illustrative and can be aligned with your Strapi-backed insights in a later iteration.
        </p>
      </div>
    </section>
  );
}
