/* UPDATED: src/components/Header.tsx */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing"; // ✅ Use the i18n Link
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Dynamic Styles
  const headerVariants = {
    top: {
      backgroundColor: 'rgba(10, 35, 66, 0)', // Transparent
      height: '7rem', // 112px
      backdropFilter: 'blur(0px)',
      borderBottom: '1px solid rgba(255,255,255,0)'
    },
    scrolled: {
      backgroundColor: 'rgba(10, 35, 66, 0.85)', // Navy Glass
      height: '5rem', // 80px
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }
  };

  const textClass = isScrolled ? "text-white" : "text-white";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]" // High Z-Index to sit above video
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
          
          {/* 1. Logo */}
          <Link href="/" className="relative flex-shrink-0 z-50">
            <motion.div layout>
              <Image
                src="/tms-logo.svg"
                alt="TMS Estates"
                width={isScrolled ? 160 : 190}
                height={isScrolled ? 40 : 48}
                className="transition-all duration-300 w-auto h-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {/* ✅ Links updated to correct sections */}
              <Link 
                href="/properties" 
                className={`${textClass} text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors`}
              >
                {t('properties')}
              </Link>
              <Link 
                href="/insights" 
                className={`${textClass} text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors`}
              >
                {t('insights')}
              </Link>
              {/* Advantage is an anchor on the homepage */}
              <Link 
                href="/#advantage" 
                className={`${textClass} text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors`}
              >
                {t('advantage')}
              </Link>
            </nav>

            {/* Separator */}
            <div className="h-4 w-[1px] bg-white/20" />

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* 3. Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {/* Show switcher on mobile bar too? Optional, keeping it in menu for cleaner look */}
             <button 
               onClick={toggleMenu} 
               className={`p-2 transition-colors ${textClass} hover:text-[#D4AF37]`}
             >
               <Menu size={28} />
             </button>
          </div>

        </div>
      </motion.header>

      {/* --- Mobile Full Screen Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0A2342]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col h-full p-8">
              
              {/* Top Bar */}
              <div className="flex justify-between items-center mb-12">
                 <Image src="/tms-logo.svg" alt="TMS" width={140} height={35} />
                 <button onClick={toggleMenu} className="text-white hover:text-[#D4AF37]">
                   <X size={32} />
                 </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-8 items-start">
                <Link 
                  href="/properties" 
                  onClick={toggleMenu}
                  className="text-3xl font-montserrat font-bold text-white hover:text-[#D4AF37] transition-colors"
                >
                  {t('properties')}
                </Link>
                <Link 
                  href="/insights" 
                  onClick={toggleMenu}
                  className="text-3xl font-montserrat font-bold text-white hover:text-[#D4AF37] transition-colors"
                >
                  {t('insights')}
                </Link>
                <Link 
                  href="/#advantage" 
                  onClick={toggleMenu}
                  className="text-3xl font-montserrat font-bold text-white hover:text-[#D4AF37] transition-colors"
                >
                  {t('advantage')}
                </Link>
              </nav>

              {/* Footer / Extras */}
              <div className="mt-auto border-t border-white/10 pt-8 flex justify-between items-end">
                 <div>
                    <span className="block text-xs text-white/50 mb-2 uppercase tracking-widest">Language</span>
                    <div className="scale-125 origin-bottom-left">
                       <LanguageSwitcher currentLocale={locale} />
                    </div>
                 </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}