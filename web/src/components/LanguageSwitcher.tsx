/* FULL REPLACEMENT: src/components/LanguageSwitcher.tsx */
"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useState } from "react";
import { Globe, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' },
];

interface Props {
  currentLocale: string;
  upwards?: boolean;
  align?: 'left' | 'right'; // ✅ NEW: Control horizontal alignment
}

export default function LanguageSwitcher({ currentLocale, upwards = false, align = 'right' }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (code: string) => {
    router.replace(pathname, { locale: code });
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition-colors text-xs font-bold tracking-widest uppercase"
      >
        <Globe size={16} />
        <span>{currentLocale}</span>
        {upwards ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: upwards ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: upwards ? 10 : -10 }}
            // ✅ LOGIC: Dynamic Alignment
            // If align="left" -> use 'left-0' (Grows to the right)
            // If align="right" -> use 'right-0' (Grows to the left)
            className={`absolute bg-[#0A2342]/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md min-w-[120px]
                ${align === 'left' ? 'left-0' : 'right-0'}
                ${upwards ? 'bottom-full mb-3 origin-bottom' : 'top-full mt-3 origin-top'}
            `}
          >
            <div className="flex flex-col py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={`px-4 py-3 text-xs font-bold text-left hover:bg-white/10 transition-colors
                    ${currentLocale === lang.code ? 'text-[#D4AF37]' : 'text-white'}
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
