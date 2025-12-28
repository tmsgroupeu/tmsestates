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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerVariants = {
    top: {
      backgroundColor: 'rgba(10, 35, 66, 0)', 
      height: '6rem', // Reduced initial height for elegance
      backdropFilter: 'blur(0px)',
      borderBottom: '1px solid rgba(255,255,255,0)'
    },
    scrolled: {
      backgroundColor: 'rgba(10, 35, 66, 0.85)', 
      height: '4.5rem', // Tighter, sleeker when scrolled
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
          
          {/* 1. LOGO - FIXED SIZING */}
          <Link href="/" className="relative flex-shrink-0 z-50">
            {/* 
               ✅ FIX: We constrain the width heavily here. 
               w-32 (128px) to w-40 (160px) is the sweet spot for luxury logos. 
            */}
            <motion.div layout className="relative w-32 md:w-40"> 
              <Image
                src="/tms-logo.svg"
                alt="TMS Estates"
                width={160} // Intrinsic width
                height={40} // Intrinsic height
                className="w-full h-auto object-contain" // Force aspect ratio
                priority
              />
            </motion.div>
          </Link>

          {/* 2. NAVIGATION LINKS - UPDATED TO ANCHORS */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              
              {/* Properties -> Scroll to Carousel */}
              <Link 
                href="/#properties" 
                className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors"
              >
                {t('properties')}
              </Link>
              
              {/* Insights -> Scroll to Informed Decisions */}
              <Link 
                href="/#insights" 
                className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors"
              >
                {t('insights')}
              </Link>
              
              {/* Advantage -> Scroll to Stats */}
              <Link 
                href="/#advantage" 
                className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors"
              >
                {t('advantage')}
              </Link>
            </nav>

            <div className="h-4 w-[1px] bg-white/20 mx-2" />
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* 3. MOBILE MENU */}
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleMenu} className="p-2 text-white hover:text-[#D4AF37] transition-colors">
               <Menu size={24} />
             </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0A2342]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-12">
                 {/* Smaller logo in mobile menu too */}
                 <div className="w-32">
                    <Image src="/tms-logo.svg" alt="TMS" width={128} height={32} className="w-full h-auto" />
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