/* NEW: src/components/LanguageSwitcher.tsx */
"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useState } from "react";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'zh', label: 'ZH' },
  { code: 'ar', label: 'AR' },
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (code: string) => {
    // Navigate to the same page but with new locale
    router.replace(pathname, { locale: code });
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/80 hover:text-[var(--gold)] transition-colors text-xs font-bold tracking-widest"
      >
        <Globe size={16} />
        <span className="uppercase">{currentLocale}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-8 right-0 bg-[#0A2342]/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md min-w-[80px]"
          >
            <div className="flex flex-col">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={`px-4 py-3 text-xs font-bold text-center hover:bg-white/10 transition-colors
                    ${currentLocale === lang.code ? 'text-[var(--gold)]' : 'text-white'}
                  `}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}