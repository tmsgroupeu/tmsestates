"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function GlassSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`relative w-full max-w-7xl mx-auto my-24 p-8 md:p-12 rounded-[40px] border border-white/10 bg-[rgba(10,35,66,0.6)] backdrop-blur-xl shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}