"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useState } from "react";
import { Globe, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "ru", label: "Русский", shortLabel: "RU" },
  { code: "zh", label: "中文", shortLabel: "ZH" },
];

interface Props {
  currentLocale: string;
  upwards?: boolean;
  align?: "left" | "right";
}

export default function LanguageSwitcher({
  currentLocale,
  upwards = false,
  align = "right",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const activeLanguage =
    languages.find((language) => language.code === currentLocale) ||
    languages[0];

  const switchLanguage = (code: string) => {
    router.replace(pathname, { locale: code });
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group inline-flex min-h-10 items-center gap-2 border border-[#F5F0E8]/14 bg-[#05070B]/18 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/82 backdrop-blur-[10px] transition-all duration-300 hover:border-[#C2A139]/55 hover:bg-[#242124]/78 hover:text-[#C2A139] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A139]/70"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Globe
          size={15}
          strokeWidth={1.6}
          className="text-[#C2A139] transition-transform duration-300 group-hover:scale-105"
        />
        <span>{activeLanguage.shortLabel}</span>
        {upwards ? (
          <ChevronUp size={13} strokeWidth={1.8} />
        ) : (
          <ChevronDown size={13} strokeWidth={1.8} />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: upwards ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: upwards ? 10 : -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute min-w-[172px] overflow-hidden border border-[#F5F0E8]/12 bg-[#242124]/96 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl
                ${align === "left" ? "left-0" : "right-0"}
                ${upwards ? "bottom-full mb-3 origin-bottom" : "top-full mt-3 origin-top"}
            `}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139] to-transparent opacity-80" />

            <div className="flex flex-col p-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => switchLanguage(lang.code)}
                  className={`flex items-center justify-between px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300
                    ${
                      currentLocale === lang.code
                        ? "bg-[#C2A139] text-[#242124]"
                        : "text-[#F5F0E8]/82 hover:bg-[#F5F0E8]/8 hover:text-[#C2A139]"
                    }
                  `}
                >
                  <span>{lang.label}</span>
                  <span className="text-[10px] opacity-70">{lang.shortLabel}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
