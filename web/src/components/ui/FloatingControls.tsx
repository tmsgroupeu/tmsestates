/* NEW FILE: src/components/ui/FloatingControls.tsx */
"use client";

import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function FloatingControls({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Logic: 
    // If NOT homepage -> Always visible (show immediately).
    // If homepage -> Show only after scrolling 100px (past the absolute top).
    
    if (pathname !== "/") {
        if (!isVisible) setIsVisible(true);
        return;
    }

    // Homepage Logic:
    const threshold = 100; // Pixel scroll amount before buttons appear
    if (latest > threshold && !isVisible) {
      setIsVisible(true);
    } else if (latest < threshold && isVisible) {
      setIsVisible(false);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-[9999]" // Wrapper maintains high z-index
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
