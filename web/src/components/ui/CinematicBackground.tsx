/* NEW FILE: src/components/ui/CinematicBackground.tsx */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function CinematicBackground() {
  const { scrollYProgress } = useScroll();

  // --- TRANSITION TIMING ---
  // 0.0 to 0.25 = Hero (Video)
  // 0.25 to 0.50 = Living Room (Image 1)
  // 0.50 to 1.00 = Terrace/Pool (Image 2)

  // Opacity for Video: Visible at start, fades out as we enter the Living Room
  const opacityVideo = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);

  // Opacity for Living Room: Fades in at 0.2, fades out at 0.5
  const opacityLiving = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);

  // Opacity for Terrace: Fades in at 0.5, stays visible
  const opacityTerrace = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);

  return (
    <div className="fixed inset-0 h-full w-full z-[-1] overflow-hidden bg-navy">
      
      {/* --- LAYER 3: TERRACE / POOL (Deepest Layer) --- */}
      <motion.div style={{ opacity: opacityTerrace }} className="absolute inset-0 h-full w-full">
        <Image 
           // Replace with a high-res pool/sea view image
           src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg" 
           alt="Terrace View"
           fill
           className="object-cover"
           priority
        />
        <div className="absolute inset-0 bg-navy/30" /> {/* Dark overlay for text readability */}
      </motion.div>

      {/* --- LAYER 2: GRAND INTERIOR (Middle Layer) --- */}
      <motion.div style={{ opacity: opacityLiving }} className="absolute inset-0 h-full w-full">
        <Image 
           // Replace with a high-res luxury living room image
           src="https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg" 
           alt="Luxury Interior"
           fill
           className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/40" />
      </motion.div>

      {/* --- LAYER 1: EXTERIOR VIDEO (Top Layer - Hero) --- */}
      <motion.div style={{ opacity: opacityVideo }} className="absolute inset-0 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          // Keep your existing video source here
          poster="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
        >
          <source
            src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-navy/30" />
      </motion.div>

      {/* Smooth gradient at the very bottom to blend into the footer/white sections if needed */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
