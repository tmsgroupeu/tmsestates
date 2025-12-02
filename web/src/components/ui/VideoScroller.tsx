/* UPDATED: src/components/ui/VideoScroller.tsx */
"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export default function VideoScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Track GLOBAL window scroll
  const { scrollYProgress } = useScroll();

  // 2. CREATE THE FADE EFFECT
  // [0, 0.05] means: At 0% scroll (top), Opacity is 1. At 5% scroll, Opacity is 0.
  // This makes the static image fade out immediately as you start scrolling.
  const imageOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  
  // This helps hide the overlay completely so it doesn't block clicks later
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.05 ? 'none' : 'auto');

  // 3. Physics smoother (Spring) for the Video Scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
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
          const targetTime = video.duration * latest;
          if (Number.isFinite(targetTime)) {
            video.currentTime = targetTime;
          }
        }
      };

      const unsubscribe = smoothProgress.on("change", updateVideo);
      return () => unsubscribe();
    }
    
    // --- MOBILE LOGIC ---
    // We let the HTML attributes handle the autoplay loop.
    // The "Static Image" overlay handles the transition gracefully.
    
  }, [smoothProgress, isMobile]);

  return (
    <div className="fixed inset-0 h-screen w-full z-0 overflow-hidden bg-navy">
      
        {/* 
            1. STATIC HIGH-QUALITY POSTER 
            Controlled by Framer Motion.
            It sits ON TOP (z-20) of the video.
            It fades out based on scroll position.
        */}
        <motion.div 
            style={{ opacity: imageOpacity, pointerEvents: pointerEvents }}
            className="absolute inset-0 z-20"
        >
             <img 
               src="/assets/hero-poster.jpg" 
               alt="Background Preview" 
               className="h-full w-full object-cover"
             />
             {/* Matching overlay to ensure text is readable on the static image too */}
             <div className="absolute inset-0 bg-navy/20" />
        </motion.div>


        {/* 
            2. THE VIDEO ENGINE (Background)
            z-0. Sits behind the poster.
            Revealed when user scrolls.
        */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/assets/hero-scroller.mp4" 
          
          // Attributes for Mobile Autoplay
          autoPlay={true}     
          loop={true}         
          muted={true}        
          playsInline={true}  
          
          preload="auto"
          // Important: We do NOT use the poster attribute here anymore
          // because our motion.div above handles the poster logic dynamically.
        />

        {/* Global Grain Texture (On top of everything) */}
        <div className="bg-noise z-10 pointer-events-none" />
    </div>
  );
}
