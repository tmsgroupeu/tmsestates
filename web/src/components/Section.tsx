/* Enhanced: ./components/Section.tsx */

"use client";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
  }
};

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
};

export default function Section({ id, className, children, title, subtitle, variant = 'light' }: SectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-30% 0px", once: true });

  const titleColor = variant === 'dark' ? 'text-white' : 'text-navy';
  const subtitleColor = variant === 'dark' ? 'text-white/80' : 'text-muted-foreground';

  return (
    <motion.section 
      id={id} 
      ref={ref} 
      className={`section ${className || ''}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      {(title || subtitle) && (
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {title && (
            <motion.h2 
              variants={itemVariants} 
              className={`text-4xl font-bold sm:text-5xl font-montserrat ${titleColor}`}
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p 
              variants={itemVariants}
              className={`mt-4 text-lg ${subtitleColor}`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
      
      {/* Motion variants will be inherited by this div's children */}
      <motion.div variants={itemVariants}>
        {children}
      </motion.div>

    </motion.section>
  );
};