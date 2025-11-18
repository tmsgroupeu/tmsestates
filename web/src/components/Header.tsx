/* Enhanced: ./components/Header.tsx */

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: '#featured', label: 'Properties' },
  { href: '#insights', label: 'Insights' },
  { href: '#advantage', label: 'Advantage' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Set initial state on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerVariants = {
    top: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      height: '8rem', // 128px
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      height: '6rem', // 96px
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    }
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="section h-full flex items-center justify-between !py-0">
          <Link href="/" className="relative flex-shrink-0">
            <motion.div layout transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                <Image 
                    src="/tms-logo.svg" 
                    alt="TMS Estates Logo" 
                    width={isScrolled ? 180 : 210}
                    height={isScrolled ? 45 : 52}
                    className="transition-all duration-300"
                    priority
                />
            </motion.div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-x-8">
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                className={`text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${
                  isScrolled ? 'text-navy hover:text-gold' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="md:hidden">
              <button onClick={toggleMenu} className={`p-2 transition-colors ${isScrolled ? 'text-navy' : 'text-white'}`}>
                <Menu size={28}/>
              </button>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] md:hidden"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="absolute top-0 right-0 h-full w-full max-w-sm bg-paper p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={toggleMenu} className="absolute top-6 right-6 text-muted-foreground"><X size={32}/></button>
              <nav className="flex flex-col gap-8 mt-24">
                {navLinks.map((link, i) => (
                  <motion.a 
                    key={link.href} 
                    href={link.href} 
                    onClick={toggleMenu} 
                    className="text-navy font-bold text-3xl hover:text-gold transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
