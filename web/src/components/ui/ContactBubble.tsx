/* ./src/components/ui/ContactBubble.tsx */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Send, X } from "lucide-react";

// Contact channels (update hrefs with real values when ready)
const channels = [
  { href: "https://wa.me/YOUR_WHATSAPP_NUMBER", icon: MessageCircle, label: "WhatsApp" },
  { href: "https://t.me/YOUR_TELEGRAM_USERNAME", icon: Send, label: "Telegram" },
  { href: "mailto:info@tmsestates.com", icon: Mail, label: "Email" },
];

type ContactBubbleProps = {
  /** The id of the footer element to detect visibility and hide the bubble near the footer */
  footerId?: string;
};

export default function ContactBubble({ footerId = "footer" }: ContactBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById(footerId);
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [footerId]);

  return (
    <AnimatePresence>
      {!isFooterVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Expanded Bubbles */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="flex flex-col items-end gap-3"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } },
                  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                }}
              >
                {channels.map((channel) => (
                  <motion.a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-full bg-white pl-4 pr-5 py-2 shadow-lg transition-colors hover:bg-muted"
                    variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: 20 } }}
                    whileHover={{ scale: 1.05 }}
                    aria-label={`Contact via ${channel.label}`}
                  >
                    <span className="text-sm font-semibold text-navy">{channel.label}</span>
                    <channel.icon className="h-5 w-5 text-navy" />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <motion.button
            onClick={() => setIsOpen((v) => !v)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-expanded={isOpen}
            aria-label="Toggle contact options"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
