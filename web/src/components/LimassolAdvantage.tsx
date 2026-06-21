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
    <section className="relative w-full overflow-hidden py-12 md:py-14 lg:py-16">
      <div className="home-container">
        <div className="grid overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.32)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative bg-[#242124] px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-11">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(194,161,57,0.13),transparent_34%),linear-gradient(135deg,rgba(245,240,232,0.055),transparent_42%)]" />
            <div className="investment-gold-line pointer-events-none absolute inset-x-0 top-0 h-px" />

            <div className="relative z-10">
              <p className="section-eyebrow">Investment Perspective</p>

              <h2 className="mt-4 font-montserrat text-[clamp(2rem,3.8vw,4.05rem)] font-bold leading-[0.98] tracking-[-0.06em] text-[#F5F0E8] text-balance">
                Why Invest
                <span className="block text-[#C2A139]">in Cyprus?</span>
              </h2>

              <p className="mt-5 max-w-xl text-[0.98rem] leading-8 text-[#F5F0E8]/84 md:text-[1.04rem] md:leading-8">
                A strategic gateway connecting continents, Cyprus offers a
                stable legal framework, exceptional quality of life, and one of
                the most attractive tax regimes in Europe.
              </p>

              <Link
                href="/invest"
                className="group relative mt-7 inline-flex min-h-[52px] w-fit items-center justify-center overflow-hidden border border-[#C2A139]/70 bg-[#242124]/72 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8] shadow-[0_20px_58px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_26px_78px_rgba(194,161,57,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A139]/70 md:px-7"
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

          <div className="grid bg-[#F5F0E8]/8 md:grid-cols-3 lg:bg-transparent">
            {points.map((point, index) => (
              <article
                key={point}
                className="investment-point-card group relative min-h-[150px] overflow-hidden border-b border-[#F5F0E8]/10 bg-[#242124]/74 p-6 backdrop-blur-[5px] transition-all duration-500 hover:bg-[#242124]/90 md:border-b-0 md:border-r md:last:border-r-0 lg:min-h-full lg:p-7 xl:p-8"
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,240,232,0.045),transparent_44%,rgba(194,161,57,0.08))] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="investment-card-line pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C2A139]/86">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#F5F0E8]/34 bg-[#05070B]/18 text-[#C2A139] transition-all duration-500 group-hover:border-[#C2A139] group-hover:bg-[#C2A139] group-hover:text-[#242124]">
                      <CheckCircle2 className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </span>
                  </div>

                  <p className="max-w-sm font-montserrat text-[1.15rem] font-semibold leading-tight tracking-[-0.038em] text-[#F5F0E8] md:text-[1.25rem] xl:text-[1.45rem]">
                    {point}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .investment-gold-line,
        .investment-card-line {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(194, 161, 57, 0.28),
            rgba(194, 161, 57, 0.95),
            rgba(245, 240, 232, 0.56),
            rgba(194, 161, 57, 0.28),
            transparent
          );
          background-size: 240% 100%;
          animation: investmentGoldSweep 6.5s ease-in-out infinite;
        }

        @keyframes investmentGoldSweep {
          0% {
            background-position: 120% 0;
            opacity: 0.36;
          }
          45% {
            opacity: 1;
          }
          100% {
            background-position: -120% 0;
            opacity: 0.36;
          }
        }
      `}</style>
    </section>
  );
}
