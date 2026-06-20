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
    <section className="relative w-full overflow-hidden py-14 md:py-18 lg:flex lg:min-h-[88svh] lg:items-center">
      <div className="absolute inset-0 -z-10 bg-[#05070B]/42" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#05070B]/12 via-transparent to-[#05070B]/42" />

      <div className="home-container relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <div>
            <p className="section-eyebrow mb-5">Investment Perspective</p>

            <h2 className="max-w-3xl font-montserrat text-[clamp(2.05rem,3vw,3.45rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8]">
              <span className="block">Why Invest</span>
              <span className="block text-[#C2A139]">in Cyprus?</span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#F5F0E8]/78 md:text-[1.04rem] md:leading-9">
              A strategic gateway connecting continents, Cyprus offers a stable legal framework, exceptional quality of life, and one of the most attractive tax regimes in Europe.
            </p>

            <Link
              href="/invest"
              className="group mt-8 inline-flex items-center gap-3 border border-[#C2A139]/48 bg-[#242124]/88 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_24px_75px_rgba(194,161,57,0.2)]"
            >
              Full Investment Guide
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="investment-panel relative overflow-hidden bg-[#242124] shadow-[0_34px_110px_rgba(5,7,11,0.46)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(194,161,57,0.12),transparent_32%),linear-gradient(135deg,rgba(245,240,232,0.045),transparent_34%,rgba(5,7,11,0.22))]" />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-[#C2A139]/12">
              <div className="investment-gold-sweep h-full w-1/2 bg-gradient-to-r from-transparent via-[#C2A139] to-transparent" />
            </div>

            <div className="relative grid md:grid-cols-3 lg:grid-cols-1">
              {points.map((point, index) => (
                <div
                  key={point}
                  className="group relative min-h-[168px] border-b border-[#F5F0E8]/10 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0 lg:p-8"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C2A139]/12 via-[#F5F0E8]/[0.035] to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/70 to-transparent" />
                  </div>

                  <div className="relative z-10 flex gap-5">
                    <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center border border-[#C2A139]/38 bg-[#C2A139]/10 text-[#C2A139] transition-all duration-300 group-hover:bg-[#C2A139] group-hover:text-[#242124]">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .investment-panel {
          box-shadow:
            0 32px 110px rgba(5, 7, 11, 0.46),
            inset 0 1px 0 rgba(194, 161, 57, 0.08),
            inset 0 -1px 0 rgba(245, 240, 232, 0.06);
        }

        .investment-gold-sweep {
          animation: investmentGoldSweep 5.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          opacity: 0.88;
          filter: drop-shadow(0 0 8px rgba(194, 161, 57, 0.48));
        }

        @keyframes investmentGoldSweep {
          0% {
            transform: translateX(-110%);
          }
          46%,
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>
    </section>
  );
}
