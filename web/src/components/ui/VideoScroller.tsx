/* UPDATED & CORRECTED: src/components/ui/VideoScroller.tsx */
"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export default function VideoScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Track GLOBAL window scroll
  const { scrollYProgress } = useScroll();

  // --- LOGIC A: THE POSTER FADE (Keep existing behavior) ---
  // [0, 0.05] means: At 0% scroll (top), Opacity is 1. At 5% scroll, Opacity is 0.
  const imageOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.05 ? 'none' : 'auto');

  // --- LOGIC B: THE VIDEO TIMING (New Acceleration Fix) ---
  // Map scroll 0 -> 85% to video 0 -> 100%. 
  // This makes the video play faster relative to the scroll so you enter the house fully.
  const acceleratedProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  // 3. Physics smoother (Spring) applied to the ACCELERATED timing
  const smoothProgress = useSpring(acceleratedProgress, {
    damping: 20,
    stiffness: 60,
    mass: 0.2,
    restDelta: 0.001
  });

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile/Browser safety
    video.defaultMuted = true;
    video.muted = true;

    // --- DESKTOP LOGIC ---
    if (!isMobile) {
      video.pause();
      
      const updateVideo = (latest: number) => {
        if (video.duration && !isNaN(video.duration)) {
          // Clamp value between 0 and 1 just to be safe
          const safeLatest = Math.max(0, Math.min(1, latest));
          const targetTime = video.duration * safeLatest;
          
          if (Number.isFinite(targetTime)) {
            video.currentTime = targetTime;
          }
        }
      };

      const unsubscribe = smoothProgress.on("change", updateVideo);
      return () => unsubscribe();
    }
    
    // --- MOBILE LOGIC ---
    // On mobile, we let the video auto-play loosely behind the content
    
  }, [smoothProgress, isMobile]);

  return (
    <div className="fixed inset-0 h-screen w-full z-0 overflow-hidden bg-navy">
      
        {/* 
            1. STATIC HIGH-QUALITY POSTER (Your fade overlay)
            Sits ON TOP (z-20). Fades out instantly on scroll.
        */}
        <motion.div 
            style={{ opacity: imageOpacity, pointerEvents: pointerEvents }}
            className="absolute inset-0 z-20"
        >
             <img 
               // Ensure this path matches your public folder image
               src="/assets/hero-poster.jpg" 
               alt="Background Preview" 
               className="h-full w-full object-cover"
             />
             <div className="absolute inset-0 bg-navy/20" />
        </motion.div>


        {/* 
            2. THE VIDEO ENGINE (Background)
            Sits at z-0. 
        */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          // Ensure this path is correct
          src="/assets/hero-scroller.mp4" 
          
          // Attributes for Mobile Autoplay compatibility
          autoPlay={true}     
          loop={true}         
          muted={true}        
          playsInline={true}  
          preload="auto"
        />

        {/* Global Grain Texture */}
        <div className="bg-noise z-10 pointer-events-none" />
        
        {/* 
           Added: Vignette Overlay for Video 
           This helps the floating text (Insights/Filmstrip) pop against the moving video.
        */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-navy/30 via-transparent to-navy/80" />
    </div>
  );
}
