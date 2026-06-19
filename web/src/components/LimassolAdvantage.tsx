"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";

const points = [
  "Attractive Tax & Financial Benefits",
  "Fast-Track Permanent Residency",
  "#1 EU Destination for Lifestyle & Investment",
];

export default function LimassolAdvantage() {
  return (
    <section className="relative w-full bg-[#05070B]/62 py-14 md:py-18 lg:flex lg:min-h-[88svh] lg:items-center">
      <div className="home-container">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0D1B2E]/82 via-[#05070B]/70 to-[#0D1B2E]/58 shadow-[0_42px_150px_rgba(0,0,0,0.38)] backdrop-blur-xl md:rounded-[2.75rem]">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(245,240,232,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(245,240,232,0.055)_1px,transparent_1px)] bg-[size:25%_100%,100%_50%] opacity-45" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C2A139]/16 blur-3xl" />
          <div className="absolute -bottom-28 left-12 h-72 w-72 rounded-full bg-[#C4B49A]/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-[1fr_1.12fr]">
            <div className="border-b border-white/10 p-7 md:p-10 lg:border-b-0 lg:border-r lg:p-12 xl:p-14">
              <p className="section-eyebrow">Investment Perspective</p>
              <h2 className="mt-4 font-montserrat text-[clamp(2.25rem,4.9vw,5.2rem)] font-bold leading-[0.98] tracking-[-0.06em] text-[#F5F0E8] text-balance">
                Why Invest <span className="text-[#C2A139]">in Cyprus?</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#F5F0E8]/74 md:text-lg md:leading-9">
                A strategic gateway connecting continents, Cyprus offers a stable legal framework, exceptional quality of life, and one of the most attractive tax regimes in Europe.
              </p>
              <Link
                href="/invest"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#F5F0E8] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0D1B2E] transition-colors hover:bg-[#C2A139] hover:text-[#05070B]"
              >
                Full Investment Guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid p-4 md:grid-cols-3 md:p-6 lg:grid-cols-1 lg:p-7 xl:p-8">
              {points.map((point, index) => (
                <div
                  key={point}
                  className="group relative flex min-h-[150px] items-start gap-5 overflow-hidden border-b border-white/10 bg-white/[0.035] p-6 last:border-b-0 first:rounded-t-[1.35rem] last:rounded-b-[1.35rem] transition-all duration-300 hover:bg-white/[0.06] md:min-h-[220px] md:border-b-0 md:border-r md:last:border-r-0 md:first:rounded-l-[1.35rem] md:first:rounded-tr-none md:last:rounded-r-[1.35rem] md:last:rounded-bl-none lg:min-h-[150px] lg:border-b lg:border-r-0 lg:first:rounded-t-[1.35rem] lg:first:rounded-bl-none lg:first:rounded-tr-[1.35rem] lg:last:rounded-b-[1.35rem] lg:last:rounded-tr-none lg:p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/42 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#C2A139]/35 bg-[#C2A139]/12 text-[#C2A139] shadow-[0_12px_42px_rgba(194,161,57,0.08)] transition-all group-hover:bg-[#C2A139] group-hover:text-[#05070B]">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8]/38">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 max-w-sm font-montserrat text-xl font-semibold leading-snug tracking-[-0.035em] text-[#F5F0E8] md:text-2xl lg:text-2xl">
                      {point}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
