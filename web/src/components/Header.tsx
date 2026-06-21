"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

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
                  <Link href="/#projects" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F5F0E8] transition-colors hover:text-[#C2A139]">
                    Our Projects
                  </Link>
                  <Link href="/about" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F5F0E8] transition-colors hover:text-[#C2A139]">
                    Who We Are
                  </Link>
                  <Link href="/contact" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F5F0E8] transition-colors hover:text-[#C2A139]">
                    Contact
                  </Link>
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
              className="fixed inset-y-0 right-0 z-[200] flex h-full w-full flex-col border-l border-[#F5F0E8]/10 bg-[#242124] p-8 shadow-2xl md:w-[450px] md:p-12"
            >
              <div className="mb-16 flex items-center justify-between">
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

              <nav className="flex flex-col items-start gap-6">
                <Link href="/" onClick={toggleMenu} className="font-montserrat text-3xl font-bold text-[#F5F0E8] transition-colors hover:text-[#C2A139]">
                  Home
                </Link>
                <Link href="/about" onClick={toggleMenu} className="font-montserrat text-3xl font-bold text-[#F5F0E8] transition-colors hover:text-[#C2A139]">
                  Who We Are
                </Link>
                <Link href="/properties" onClick={toggleMenu} className="font-montserrat text-3xl font-bold text-[#F5F0E8] transition-colors hover:text-[#C2A139]">
                  Developments
                </Link>
                <Link href="/#contact" onClick={toggleMenu} className="font-montserrat text-3xl font-bold text-[#F5F0E8] transition-colors hover:text-[#C2A139]">
                  Contact
                </Link>
              </nav>

              <div className="mt-auto flex items-end justify-between border-t border-[#F5F0E8]/10 pt-8">
                <div>
                  <span className="mb-2 block text-xs uppercase tracking-widest text-[#F5F0E8]/50">
                    Language
                  </span>
                  <div className="relative z-[201] scale-125 origin-bottom-left">
                    <LanguageSwitcher currentLocale={locale} upwards align="left" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
