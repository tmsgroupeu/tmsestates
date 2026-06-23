"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

const desktopNavItems = [
  { label: "Who We Are", href: "/#who-we-are" },
  { label: "Our Projects", href: "/#projects" },
  { label: "Invest", href: "/#invest" },
];

const menuPrimaryItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Investment", href: "/invest" },
  { label: "Our Projects", href: "/projects" },
  { label: "All Properties", href: "/properties" },
];

const menuSecondaryItems = [
  { label: "Market Insights", href: "/insights" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((value) => !value);

  const headerVariants = {
    top: {
      backgroundColor: isHomePage
        ? "rgba(36, 33, 36, 0)"
        : "rgba(36, 33, 36, 0.98)",
      height: "6rem",
      backdropFilter: isHomePage ? "blur(0px)" : "blur(18px)",
      borderBottom: isHomePage
        ? "1px solid rgba(245,240,232,0)"
        : "1px solid rgba(245,240,232,0.10)",
    },
    scrolled: {
      backgroundColor: "rgba(36, 33, 36, 0.98)",
      height: "4.5rem",
      backdropFilter: "blur(18px)",
      borderBottom: "1px solid rgba(245,240,232,0.10)",
    },
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-[100]"
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Link href="/" className="relative z-50 flex-shrink-0">
            <motion.div layout className="relative w-32 md:w-40">
              <Image
                src="/tms-logo-white.svg"
                alt="TMS Estates"
                width={160}
                height={40}
                className="h-auto w-full object-contain transition-opacity duration-300"
                priority
                unoptimized
              />
            </motion.div>
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            <AnimatePresence>
              {(isScrolled || !isHomePage) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="hidden items-center gap-7 md:flex"
                >
                  {desktopNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F5F0E8] transition-colors hover:text-[#C2A139]"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="h-4 w-px bg-[#F5F0E8]/18" />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={toggleMenu}
              className="p-2 text-[#F5F0E8] transition-colors hover:text-[#C2A139]"
              aria-label="Open menu"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>

            <div className="hidden md:block">
              <LanguageSwitcher currentLocale={locale} align="right" />
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-[199] bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-[200] flex h-full w-full flex-col overflow-y-auto border-l border-[#F5F0E8]/10 bg-[#242124] p-8 shadow-2xl md:w-[480px] md:p-12"
            >
              <div className="mb-12 flex items-center justify-between">
                <div className="w-32">
                  <Image
                    src="/tms-logo-white.svg"
                    alt="TMS Estates"
                    width={128}
                    height={32}
                    className="h-auto w-full"
                    unoptimized
                  />
                </div>

                <button
                  onClick={toggleMenu}
                  className="text-[#F5F0E8] transition-colors hover:text-[#C2A139]"
                  aria-label="Close menu"
                >
                  <X size={32} />
                </button>
              </div>

              <nav className="flex flex-col gap-9" aria-label="Main menu">
                <div>
                  <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#C2A139]">
                    Explore
                  </span>
                  <div className="flex flex-col items-start gap-5">
                    {menuPrimaryItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={toggleMenu}
                        className="group flex w-full items-center justify-between border-b border-[#F5F0E8]/10 pb-4 font-montserrat text-[clamp(1.65rem,5vw,2.15rem)] font-bold leading-none tracking-[-0.04em] text-[#F5F0E8] transition-colors hover:text-[#C2A139]"
                      >
                        <span>{item.label}</span>
                        <span className="h-px w-8 bg-[#F5F0E8]/28 transition-all duration-300 group-hover:w-12 group-hover:bg-[#C2A139]" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#F5F0E8]/45">
                    More
                  </span>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {menuSecondaryItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={toggleMenu}
                        className="border border-[#F5F0E8]/10 bg-[#05070B]/18 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5F0E8]/82 transition-all duration-300 hover:border-[#C2A139]/55 hover:bg-[#C2A139] hover:text-[#242124]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="mt-auto flex items-end justify-between border-t border-[#F5F0E8]/10 pt-8">
                <div>
                  <span className="mb-2 block text-xs uppercase tracking-widest text-[#F5F0E8]/50">
                    Language
                  </span>
                  <div className="relative z-[201]">
                    <LanguageSwitcher currentLocale={locale} upwards align="left" />
                  </div>
                </div>

                <Link
                  href="/contact"
                  onClick={toggleMenu}
                  className="hidden border border-[#C2A139]/70 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] transition-all duration-300 hover:bg-[#C2A139] hover:text-[#242124] sm:inline-flex"
                >
                  Enquire
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
