"use client";
import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: .6, ease: [.22,.61,.36,1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: .96 },
  show: { opacity: 1, scale: 1, transition: { duration: .5, ease: [.22,.61,.36,1] } },
};
