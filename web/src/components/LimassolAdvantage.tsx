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
    <section className="relative w-full py-14 md:py-18 lg:flex lg:min-h-[88svh] lg:items-center">
      <div className="home-container">
        <div className="relative overflow-hidden border border-[#F5F0E8]/10 bg-[#242124]/58 shadow-[0_42px_150px_rgba(0,0,0,0.34)] backdrop-blur-[6px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(194,161,57,0.12),transparent_28%),radial-gradient(circle_at_92%_18%,rgba(245,240,232,0.07),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/60 to-transparent" />

          <div className="relative grid gap-0 lg:grid-cols-[1fr_1.12fr]">
            <div className="p-5 md:p-7 lg:p-8 xl:p-9">
              <div className="relative overflow-hidden border border-[#F5F0E8]/10 bg-[#242124]/82 px-6 py-8 shadow-[0_24px_85px_rgba(0,0,0,0.34)] backdrop-blur-[10px] md:px-8 md:py-10 lg:px-9 lg:py-11">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,240,232,0.06),transparent_38%,rgba(194,161,57,0.08))]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/62 to-transparent" />

                <div className="relative z-10">
                  <p className="section-eyebrow">Investment Perspective</p>

                  <h2 className="mt-4 font-montserrat text-[clamp(2.1rem,4.55vw,4.85rem)] font-bold leading-[0.98] tracking-[-0.06em] text-[#F5F0E8] text-balance">
                    Why Invest{" "}
                    <span className="block text-[#C2A139]">in Cyprus?</span>
                  </h2>

                  <p className="mt-6 max-w-xl text-base leading-8 text-[#F5F0E8]/82 md:text-lg md:leading-9">
                    A strategic gateway connecting continents, Cyprus offers a
                    stable legal framework, exceptional quality of life, and one
                    of the most attractive tax regimes in Europe.
                  </p>

                  <Link
                    href="/invest"
                    className="group relative mt-9 inline-flex min-h-[54px] w-fit items-center justify-center overflow-hidden border border-[#C2A139]/70 bg-[#242124]/72 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8] shadow-[0_22px_64px_rgba(0,0,0,0.32)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_28px_84px_rgba(194,161,57,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A139]/70 md:px-8"
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5F0E8] to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
                    <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#C2A139] transition-all duration-500 group-hover:w-full" />
                    <span className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/28 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

                    <span className="relative z-10 flex items-center gap-4">
                      Full Investment Guide
                      <span className="flex h-8 w-8 items-center justify-center border border-[#C2A139]/55 bg-[#05070B]/28 text-[#C2A139] transition-all duration-500 group-hover:border-[#242124]/40 group-hover:bg-[#242124] group-hover:text-[#F5F0E8]">
                        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid p-4 md:grid-cols-3 md:p-6 lg:grid-cols-1 lg:p-7 xl:p-8">
              {points.map((point, index) => (
                <div
                  key={point}
                  className="group relative flex min-h-[150px] items-start gap-5 overflow-hidden border-b border-[#F5F0E8]/10 bg-[#242124]/64 p-6 last:border-b-0 transition-all duration-300 hover:bg-[#242124]/78 md:min-h-[220px] md:border-b-0 md:border-r md:last:border-r-0 lg:min-h-[150px] lg:border-b lg:border-r-0 lg:p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/42 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center border border-[#C2A139]/35 bg-[#C2A139]/12 text-[#C2A139] shadow-[0_12px_42px_rgba(194,161,57,0.08)] transition-all group-hover:bg-[#C2A139] group-hover:text-[#05070B]">
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
