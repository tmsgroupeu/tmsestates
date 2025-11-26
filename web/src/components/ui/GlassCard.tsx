"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function GlassCard({ children, className = "", id }: GlassCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`apple-glass rounded-[40px] p-8 md:p-12 backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}