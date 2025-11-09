// web/src/components/LimassolAdvantage.tsx

"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";
import Section from "@/components/Section";

const stats = [
  { value: 12, suffix: "%", label: "YoY Price Appreciation" },
  { value: 7500, prefix: "€", suffix: "/m²", label: "Prime Seafront Average" },
  {
    value: 1,
    prefix: "#",
    label: "Top EU Destination for Lifestyle & Investment",
  },
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
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 2.2,
      ease: [0.25, 1, 0.5, 1],
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = value.toLocaleString("en-US", {
            maximumFractionDigits: suffix === "/m²" ? 0 : 0,
          });
        }
      },
    });
    return () => controls.stop();
  }, [from, to, suffix]);

  return (
    <span className="inline-flex items-baseline justify-center gap-0.5">
      {prefix && (
        <span className="text-3xl md:text-4xl font-semibold text-[color:var(--gold)]">
          {prefix}
        </span>
      )}
      <span
        ref={ref}
        className="text-3xl md:text-4xl font-semibold text-white"
      />
      {suffix && (
        <span className="text-sm md:text-base font-medium text-[color:var(--gold)] ml-1">
          {suffix}
        </span>
      )}
    </span>
  );
}

export default function LimassolAdvantage() {
  const laneRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(laneRef, { once: true, margin: "-20% 0px" });

  return (
    <Section id="advantage" className="pt-10 pb-24">
      <div className="flex flex-col items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-[color:var(--navy)] text-center">
          Limassol Advantage at a Glance
        </h2>
        <p className="text-sm md:text-base text-[color:var(--muted-foreground)] text-center max-w-2xl">
          Key indicators that define Limassol&apos;s position as a leading hub
          for premium residential and investment-grade real estate.
        </p>
      </div>

      {/* 3D Floating Lane */}
      <div className="relative mt-4">
        {/* Soft glow shadow */}
        <div className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-[78%] -translate-x-1/2 rounded-[999px] bg-black/16 blur-2xl" />

        <div
          ref={laneRef}
          className={`relative mx-auto max-w-5xl rounded-[999px] bg-gradient-to-r from-[rgba(10,35,66,0.98)] via-[rgba(5,15,32,0.98)] to-[rgba(10,35,66,0.98)]
            border border-white/7 shadow-[0_18px_45px_rgba(0,0,0,0.22)]
            px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4
            transform-gpu transition-all duration-500
            ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
            hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(0,0,0,0.28)]
          `}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 flex flex-col items-center text-center px-2
                ${i > 0 ? "sm:border-l sm:border-white/10" : ""}
              `}
            >
              {inView ? (
                <Counter
                  from={0}
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              ) : (
                <span className="text-3xl md:text-4xl font-semibold text-white">
                  —
                </span>
              )}
              <p className="mt-1 text-[10px] sm:text-xs md:text-sm text-white/70 max-w-[180px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
