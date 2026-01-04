/* FULL REPLACEMENT: src/components/Header.tsx */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing"; 
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20); // Faster trigger
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerVariants = {
    top: {
      backgroundColor: 'rgba(10, 35, 66, 0)', 
      height: '6rem', 
      backdropFilter: 'blur(0px)',
      borderBottom: '1px solid rgba(255,255,255,0)'
    },
    scrolled: {
      backgroundColor: 'rgba(10, 35, 66, 0.95)', 
      height: '4.5rem', 
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }
  };

  // Always use white logo for consistent contrast against video/navy
  const logoSrc = "/tms-logo2";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
          
          {/* 1. LOGO */}
          {/* Always visible, anchored left */}
          <Link href="/" className="relative flex-shrink-0 z-50">
            <motion.div layout className="relative w-32 md:w-40"> 
              <Image
                key={logoSrc} 
                src={logoSrc}
                alt="TMS Estates"
                width={160}
                height={40}
                className="w-full h-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* 
             2. CENTER NAVIGATION (The Dynamic Part)
             Hidden on Hero (top), Visible on Scroll
          */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
              >
                <nav className="flex items-center gap-8">
                  <Link href="/properties" className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors">
                    {t('properties')}
                  </Link>
                  <Link href="/insights" className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors">
                    {t('insights')}
                  </Link>
                  <Link href="/invest" className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors">
                    {t('invest')}
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 
             3. RIGHT SECTION (Always Visible)
             Language Switcher + Hamburger Menu
          */}
          <div className="flex items-center gap-6">
             {/* Language Switcher */}
             <div className="hidden md:block">
                <LanguageSwitcher currentLocale={locale} />
             </div>

             {/* Hamburger Menu (Triggers full overlay) */}
             <button onClick={toggleMenu} className="p-2 text-white hover:text-[#D4AF37] transition-colors">
               <Menu size={28} strokeWidth={1.5} />
             </button>
          </div>

        </div>
      </motion.header>

      {/* MOBILE / FULLSCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0A2342]/98 backdrop-blur-xl flex justify-end"
          >
            {/* Menu Panel - Slides in from right */}
            <motion.div 
               initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="w-full md:max-w-md h-full bg-[#0A2342] border-l border-white/10 p-8 md:p-12 flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-16">
                   <div className="w-32">
                      <Image src="/tms-logo2.svg" alt="TMS" width={128} height={32} className="w-full h-auto" />
                   </div>
                   <button onClick={toggleMenu} className="text-white hover:text-[#D4AF37]"><X size={32} /></button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-8 items-start">
                  <Link href="/" onClick={toggleMenu} className="text-3xl font-montserrat font-bold text-white hover:text-[#D4AF37]">
                    Home
                  </Link>
                  <Link href="/about" onClick={toggleMenu} className="text-3xl font-montserrat font-bold text-white hover:text-[#D4AF37]">
                    {t('about')}
                  </Link>
                  <Link href="/properties" onClick={toggleMenu} className="text-3xl font-montserrat font-bold text-white hover:text-[#D4AF37]">
                    {t('portfolio')}
                  </Link>
                  <Link href="/invest" onClick={toggleMenu} className="text-3xl font-montserrat font-bold text-white hover:text-[#D4AF37]">
                    {t('invest')}
                  </Link>
                  <div className="h-[1px] w-full bg-white/10 my-2" />
                  <Link href="/insights" onClick={toggleMenu} className="text-xl font-light text-white/70 hover:text-white">
                    {t('insights')}
                  </Link>
                </nav>

                {/* Footer Actions */}
                <div className="mt-auto pt-8">
                   <LanguageSwitcher currentLocale={locale} />
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}