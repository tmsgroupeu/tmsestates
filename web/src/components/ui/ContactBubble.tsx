
/* ✨ Final Version: ./src/components/ui/ContactBubble.tsx */

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Send, X } from 'lucide-react'; // Removed 'Plus' import
import Link from 'next/link';

// Define the contact channels
const channels = [

  { href: 'https://wa.me/99875500', icon: MessageCircle, label: 'WhatsApp' },
  { href: 'https://t.me/YOUR_TELEGRAM_USERNAME', icon: Send, label: 'Telegram' },
  { href: 'mailto:info@tmsestates.com', icon: Mail, label: 'Email' },
];

export default function ContactBubble({ footerId }: { footerId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById(footerId);
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
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
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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
                    className="flex items-center gap-3 bg-white pl-4 pr-5 py-2 rounded-full shadow-lg group hover:bg-muted transition-colors"
                    variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: 20 } }}
                    whileHover={{ scale: 1.05 }}
                    aria-label={`Contact via ${channel.label}`}
                  >
                    <span className="text-sm font-semibold text-navy">{channel.label}</span>
                    <channel.icon className="w-5 h-5 text-navy" />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 bg-gold text-navy rounded-full shadow-2xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-expanded={isOpen}
            aria-label="Toggle contact options"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {/* ✅ FIX: Replaced the generic Plus icon with the intuitive MessageCircle icon */}
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
