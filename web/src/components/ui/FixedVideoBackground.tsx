"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FixedVideoBackground() {
  const containerRef = useRef(null);
  
  // Track the page scroll to add subtle depth effects
  const { scrollYProgress } = useScroll();
  
  // As user scrolls down, the video gets slightly darker and scales up (Depth effect)
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden bg-navy">
      <motion.div style={{ scale }} className="relative h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          // Using your video source
          src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4" 
        />
        {/* Cinematic Overlay - controlled by scroll opacity */}
        <motion.div 
            style={{ opacity }} 
            className="absolute inset-0 bg-navy"
        />
        {/* Luxury Grain Texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </motion.div>
    </div>
  );
}