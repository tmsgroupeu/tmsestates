/* UPDATED: src/components/ui/VideoScroller.tsx */
"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export default function VideoScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Track GLOBAL window scroll
  const { scrollYProgress } = useScroll();

  // --- LOGIC A: THE POSTER FADE ---
  // [0, 0.05] means: At 0% scroll (top), Opacity is 1. At 5% scroll, Opacity is 0.
  const imageOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.05 ? 'none' : 'auto');

  // --- LOGIC B: THE VIDEO TIMING (1:1 LINEAR) ---
  // We feed 'scrollYProgress' directly into useSpring.
  // Result: The video starts at 0% scroll and finishes exactly when the user hits the bottom of the page (100% scroll).
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
    // On mobile, let the video play naturally loop in background
    
  }, [smoothProgress, isMobile]);

  return (
    <div className="fixed inset-0 h-screen w-full z-0 overflow-hidden bg-navy">
      
        {/* 
            1. STATIC HIGH-QUALITY POSTER 
            Fades out as you start scrolling.
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
            Sits behind the poster.
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
        />

        {/* Global Grain Texture (On top of everything) */}
        <div className="bg-noise z-10 pointer-events-none" />
        
        {/* 
           Vignette Overlay
           I kept this distinct addition because it helps the white text 
           in the middle of the page stay readable against bright video frames.
        */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-navy/30 via-transparent to-navy/80" />
    </div>
  );
}
