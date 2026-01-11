/* FULL REPLACEMENT: src/components/Header.tsx */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing"; // ✅ Added usePathname
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname(); // Get current route
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if we are on the Homepage ('/')
  const isHomePage = pathname === '/';

  useEffect(() => {
    // Detect scroll to toggle modes
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Dynamic Header Styles
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

  // ✅ LOGO LOGIC UPDATED:
  // 1. If we are Scrolled -> ALWAYS White.
  // 2. If we are NOT on Home (e.g. Privacy/Properties) -> ALWAYS White (because background is Navy).
  // 3. Only on Home Top -> Original (Black/Gold).
  const showWhiteVersion = isScrolled || !isHomePage;
  const logoSrc = showWhiteVersion ? "/tms-logo-white.svg" : "/tms-logo.svg";

  // ✅ COLOR LOGIC:
  // Ensure Hamburger and Text are White on subpages immediately
  const navTextColor = showWhiteVersion ? "text-white" : "text-[#0A2342] md:text-white";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        variants={headerVariants}
        // If not home, force the "scrolled" style (Navy Glass) immediately? 
        // Or keep transparent but force white logo?
        // Let's keep animation logic but force white logo.
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
          
          {/* --- LEFT: LOGO --- */}
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

          {/* --- RIGHT: CONTROLS GROUP --- */}
          <div className="flex items-center gap-6 md:gap-8">

            {/* 1. NAVIGATION LINKS (Only visible when scrolled OR on subpages if desired) */}
            {/* Keeping original logic: Only visible on Scroll to keep Hero clean */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="hidden md:flex items-center gap-8"
                >
                  <Link href="/properties" className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors">
                    {t('properties')}
                  </Link>
                  <Link href="/insights" className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors">
                    {t('insights')}
                  </Link>
                  <Link href="/invest" className="text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#D4AF37] transition-colors">
                    {t('invest')}
                  </Link>
                  
                  <div className="h-4 w-[1px] bg-white/20" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. HAMBURGER MENU */}
            <button 
                onClick={toggleMenu} 
                className={`p-2 transition-colors hover:text-[#D4AF37] ${navTextColor}`}
             >
               <Menu size={28} strokeWidth={1.5} className="text-current" />
            </button>

            {/* 3. LANGUAGE SWITCHER */}
            <div className="hidden md:block">
               {/* Pass a prop to LanguageSwitcher to force white color if needed, or rely on its internal styles */}
               <LanguageSwitcher currentLocale={locale} />
            </div>

          </div>
        </div>
      </motion.header>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0A2342]/98 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full p-8">
              
              <div className="flex justify-between items-center mb-16">
                 <div className="w-32">
                    <Image src="/tms-logo-white.svg" alt="TMS" width={128} height={32} className="w-full h-auto" />
                 </div>
                 <button onClick={toggleMenu} className="text-white hover:text-[#D4AF37]">
                    <X size={32} />
                 </button>
              </div>

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

              <div className="mt-auto pt-8 border-t border-white/10 flex justify-between items-end">
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
