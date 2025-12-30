/* UPDATED: src/components/Header.tsx */
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
    // Detect scroll earlier (10px) to switch logo faster
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
      backgroundColor: 'rgba(10, 35, 66, 0.95)', // Increased opacity for better contrast 
      height: '4.5rem', 
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }
  };

  // ✅ LOGIC: Toggle between the dark logo and the white logo
  // Make sure you have 'tms-logo-white.svg' in your public folder!
  const logoSrc = isScrolled ? "/tms-logo2.svg" : "/tms-logo.svg";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
          
          {/* 1. SMART LOGO */}
          <Link href="/" className="relative flex-shrink-0 z-50">
            <motion.div layout className="relative w-32 md:w-40"> 
              {/* 
                 We use key={logoSrc} to force React to re-render the image cleanly 
                 when the source changes, preventing visual glitches.
              */}
              <Image
                key={logoSrc} 
                src={logoSrc}
                alt="TMS Estates"
                width={160}
                height={40}
                className="w-full h-auto object-contain transition-opacity duration-300"
                priority
              />
            </motion.div>
          </Link>

          {/* 2. NAVIGATION LINKS */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <Link href="/#properties" className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors">
                {t('properties')}
              </Link>
              <Link href="/#insights" className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors">
                {t('insights')}
              </Link>
              <Link href="/#advantage" className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors">
                {t('advantage')}
              </Link>
            </nav>

            <div className="h-4 w-[1px] bg-white/20 mx-2" />
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* 3. MOBILE MENU TOGGLE */}
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleMenu} className="p-2 text-white hover:text-[#D4AF37] transition-colors">
               <Menu size={24} />
             </button>
          </div>

        </div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0A2342]/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-12">
                 {/* Always use white logo in the dark mobile menu */}
                 <div className="w-32">
                    <Image src="/tms-logo2.svg" alt="TMS" width={128} height={32} className="w-full h-auto" />
                 </div>
                 <button onClick={toggleMenu} className="text-white hover:text-[#D4AF37]"><X size={28} /></button>
              </div>

              <nav className="flex flex-col gap-6 items-start">
                <Link href="/#properties" onClick={toggleMenu} className="text-2xl font-montserrat font-bold text-white hover:text-[#D4AF37]">{t('properties')}</Link>
                <Link href="/#insights" onClick={toggleMenu} className="text-2xl font-montserrat font-bold text-white hover:text-[#D4AF37]">{t('insights')}</Link>
                <Link href="/#advantage" onClick={toggleMenu} className="text-2xl font-montserrat font-bold text-white hover:text-[#D4AF37]">{t('advantage')}</Link>
              </nav>

              <div className="mt-auto border-t border-white/10 pt-8">
                 <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
