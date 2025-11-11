// src/components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#featured", label: "Properties" },
  { href: "#insights", label: "Insights" },
  { href: "#advantage", label: "Limassol Advantage" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <motion.header
      initial={false}
      animate={isScrolled ? "scrolled" : "top"}
      variants={{
        top: {
          backgroundColor: "rgba(8,15,23,0.0)",
          backdropFilter: "blur(0px)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          height: "5.5rem",
        },
        scrolled: {
          backgroundColor: "rgba(8,15,23,0.92)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 8px 28px rgba(0,0,0,0.28)",
          height: "4.5rem",
        },
      }}
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 md:px-12"
    >
      {/* Logo + brand */}
      <Link
        href="#hero"
        className="flex items-center gap-3 group"
        aria-label="TMS Estates home"
      >
        <div className="relative h-8 w-8">
          <Image
            src="/logo/tmsestates-mark.svg"
            alt="TMS Estates"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium uppercase tracking-[0.22em] text-sky-300">
            TMS Estates
          </span>
          <span className="text-sm text-slate-200 group-hover:text-white">
            Limassol Luxury Real Estate
          </span>
        </div>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-8 text-sm md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-slate-200 hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
        <Link
          href="#contact"
          className="rounded-full border border-sky-400/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300 hover:bg-sky-400/10"
        >
          Book Consultation
        </Link>
      </nav>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={toggleMenu}
        className="inline-flex items-center justify-center rounded-full border border-sky-400/60 p-2 text-sky-300 md:hidden"
        aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-30 rounded-2xl bg-slate-950/98 p-4 shadow-2xl ring-1 ring-sky-500/20 md:hidden"
          >
            <ul className="flex flex-col gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-xl px-3 py-2 text-slate-100 hover:bg-sky-500/10"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full justify-center rounded-full bg-sky-500/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 hover:bg-sky-400"
                >
                  Book Consultation
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
