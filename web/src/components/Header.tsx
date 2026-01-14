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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        // Optional auto-close on resize logic
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

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

  const logoSrc = isScrolled ? "/tms-logo-white.svg" : "/tms-logo.svg";
  const navTextColor = isScrolled ? "text-white" : "text-[#0A2342] md:text-white";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
          
          {/* LOGO */}
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

          {/* RIGHT GROUP */}
          <div className="flex items-center gap-6 md:gap-8">

            {/* Desktop Navigation */}
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

            {/* Hamburger Button */}
            <button 
                onClick={toggleMenu} 
                className={`p-2 transition-colors hover:text-[#D4AF37] ${navTextColor}`}
             >
               <Menu size={28} strokeWidth={1.5} className="text-current" />
            </button>

            {/* Desktop Switcher (Right Aligned) */}
            <div className="hidden md:block">
               <LanguageSwitcher currentLocale={locale} align="right" />
            </div>

          </div>
        </div>
      </motion.header>

      {/* --- SIDE DRAWER MENU (Responsive) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={toggleMenu}
                className="fixed inset-0 z-[199] bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 right-0 z-[200] w-full md:w-[450px] h-full bg-[#0A2342] border-l border-white/10 shadow-2xl flex flex-col p-8 md:p-12"
            >
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
                        <div className="scale-125 origin-bottom-left relative z-[201]">
                            {/* ✅ FIX: Open Upwards AND align to the Left edge to fit screen */}
                            <LanguageSwitcher currentLocale={locale} upwards={true} align="left" />
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
