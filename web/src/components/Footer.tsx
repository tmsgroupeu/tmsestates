"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "@/i18n/routing";

const primaryLinks = [
  { label: "Our Projects", href: "/projects" },
  { label: "Properties", href: "/properties" },
  { label: "Investment", href: "/invest" },
  { label: "Who We Are", href: "/about" },
];

const secondaryLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.8 2h-3.3v13.2c0 1.53-1.24 2.79-2.79 2.79a2.79 2.79 0 0 1-2.79-2.79c0-1.54 1.25-2.79 2.79-2.79.25 0 .49.03.72.1V9.1a6.1 6.1 0 0 0-.72-.04A6.13 6.13 0 0 0 4.6 15.2a6.13 6.13 0 0 0 6.11 6.12 6.13 6.13 0 0 0 6.11-6.12V8.36a8.3 8.3 0 0 0 4.68 1.44V6.5a5 5 0 0 1-4.7-4.5Z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tms-estates/",
    Icon: Linkedin,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@tms.estates?_r=1&_t=ZN-97Tlo9SHLNO",
    Icon: TikTokIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tmsestates/",
    Icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/TMS-Estates",
    Icon: Facebook,
  },
];

export default function Footer() {
  return (
    <footer
      id="page-footer"
      className="relative z-20 overflow-hidden bg-transparent pt-20 text-[#F5F0E8] md:pt-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-[#242124]/86" />

      <div className="relative bg-[#242124]">
        <div className="footer-gold-line pointer-events-none absolute inset-x-0 top-0 h-px" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(194,161,57,0.12),transparent_30%),linear-gradient(135deg,rgba(245,240,232,0.045),transparent_40%)]" />

        <div className="home-container relative py-9 md:py-11">
          <div className="grid gap-8 border-b border-[#F5F0E8]/10 pb-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:items-start">
            <div>
              <Link href="/" className="inline-flex">
                <Image
                  src="/tms-logo-white.svg"
                  alt="TMS Estates"
                  width={190}
                  height={70}
                  className="h-auto w-36 md:w-40"
                  unoptimized
                />
              </Link>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#F5F0E8]/68">
                Building value. Creating places. Contemporary residential and
                mixed-use developments in carefully selected locations across
                Cyprus.
              </p>
            </div>

            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 gap-8 sm:grid-cols-[1fr_0.8fr]"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#C2A139]">
                  Explore
                </p>

                <div className="mt-4 grid gap-3">
                  {primaryLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#F5F0E8]/78 transition-colors hover:text-[#C2A139]"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#C2A139]">
                  Company
                </p>

                <div className="mt-4 grid gap-3">
                  {secondaryLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#F5F0E8]/68 transition-colors hover:text-[#C2A139]"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            <div className="lg:justify-self-end">
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#C2A139]">
                Start A Conversation
              </p>

              <p className="mt-4 max-w-xs text-sm leading-7 text-[#F5F0E8]/68">
                Speak with our team about developments, available units, or
                investment opportunities.
              </p>

              <Link
                href="/contact"
                className="group relative mt-5 inline-flex min-h-[52px] w-fit items-center justify-center overflow-hidden border border-[#C2A139]/70 bg-[#242124]/72 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8] shadow-[0_20px_58px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_26px_78px_rgba(194,161,57,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A139]/70"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5F0E8] to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
                <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#C2A139] transition-all duration-500 group-hover:w-full" />
                <span className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/28 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

                <span className="relative z-10 flex items-center gap-4">
                  Contact Us
                  <span className="flex h-8 w-8 items-center justify-center border border-[#C2A139]/55 bg-[#05070B]/28 text-[#C2A139] transition-all duration-500 group-hover:border-[#242124]/40 group-hover:bg-[#242124] group-hover:text-[#F5F0E8]">
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-6 pt-6 text-xs text-[#F5F0E8]/46 sm:flex-row sm:justify-between">
            <p className="order-2 sm:order-1">
              &copy; {new Date().getFullYear()} TMS ESTATES. All rights
              reserved.
            </p>

            <div className="order-1 flex items-center gap-2.5 sm:order-2 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative flex h-9 w-9 items-center justify-center overflow-hidden border border-[#C2A139]/40 bg-[#F5F0E8]/[0.03] text-[#F5F0E8]/70 transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_14px_34px_rgba(194,161,57,0.24)]"
                >
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-[#C2A139] transition-all duration-500 group-hover:w-full" />
                  <Icon className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:scale-110" />
                </a>
              ))}
            </div>

            <p className="order-3 uppercase tracking-[0.22em]">
              Real Estate Development · Cyprus
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-gold-line {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(194, 161, 57, 0.32),
            rgba(194, 161, 57, 0.96),
            rgba(245, 240, 232, 0.56),
            rgba(194, 161, 57, 0.32),
            transparent
          );
          background-size: 240% 100%;
          animation: footerGoldSweep 7s ease-in-out infinite;
        }

        @keyframes footerGoldSweep {
          0% {
            background-position: 120% 0;
            opacity: 0.34;
          }
          45% {
            opacity: 1;
          }
          100% {
            background-position: -120% 0;
            opacity: 0.34;
          }
        }
      `}</style>
    </footer>
  );
}
