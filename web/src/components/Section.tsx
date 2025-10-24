"use client";
import { motion, useInView, Variants, Transition } from "framer-motion";
import { useRef } from "react";

// Define a reusable transition object with a specific type.
const viewTransition: Transition = { 
  duration: 0.7, 
  ease: [0.25, 1, 0.5, 1] 
};

// Define the base variants using the transition object.
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: viewTransition
  },
};

export default function Section({ id, title, subtitle, children }: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px", once: true });

  // Create the variants for the content div dynamically and safely.
  const contentVariants: Variants = {
    hidden: sectionVariants.hidden,
    visible: {
      opacity: 1, // Re-state properties for clarity
      y: 0,
      transition: { 
        ...viewTransition, // Spread the base transition properties
        delay: (title || subtitle) ? 0.2 : 0 // Add the conditional delay
      }
    }
  };

  return (
    <section id={id} className="section">
      {(title || subtitle) && (
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          {title && <h2 className="text-3xl font-bold sm:text-4xl text-navy font-display">{title}</h2>}
          {subtitle && <p className="text-muted-foreground mt-3 text-lg">{subtitle}</p>}
        </motion.div>
      )}
      <motion.div
        // Use the same ref as the header to trigger animation, but with its own variants.
        ref={ref} 
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </section>
  );
}