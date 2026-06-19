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
    <section className="relative w-full bg-[#05070B]/88 py-20 md:py-28">
      <div className="home-container">
        <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[1fr_1.1fr]">
          <div className="border-b border-white/10 bg-[#0D1B2E]/36 p-7 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
            <p className="section-eyebrow">Investment Perspective</p>
            <h2 className="section-heading mt-4">
              Why Invest <span className="text-[#C2A139]">in Cyprus?</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#F5F0E8]/72 md:text-lg md:leading-9">
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

          <div className="grid md:grid-cols-3 lg:grid-cols-1">
            {points.map((point, index) => (
              <div
                key={point}
                className="group flex min-h-[150px] items-start gap-5 border-b border-white/10 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0 md:p-8 lg:p-10"
              >
                <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#C2A139]/30 bg-[#C2A139]/10 text-[#C2A139] transition-all group-hover:bg-[#C2A139] group-hover:text-[#05070B]">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8]/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 max-w-sm font-montserrat text-xl font-semibold leading-snug tracking-[-0.035em] text-[#F5F0E8]">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
