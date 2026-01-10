/* FULL REPLACEMENT: src/components/ui/VideoScroller.tsx */
"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export default function VideoScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // --- CLOUDINARY CONFIGURATION ---
  const CLOUD_NAME = "dkbpthpxg"; 
  const VIDEO_ID = "final_thom0s"; 
  
  // Optimized Video URL
  const VIDEO_SRC = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${VIDEO_ID}.mp4`;

  // 1. Track GLOBAL window scroll
  const { scrollYProgress } = useScroll();

  // --- LOGIC A: THE POSTER FADE ---
  // [0, 0.05] means: At 0% scroll (top), Opacity is 1. At 5% scroll, Opacity is 0.
  const imageOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.05 ? 'none' : 'auto');

  // --- LOGIC B: THE VIDEO TIMING (1:1 LINEAR) ---
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

    // --- DESKTOP LOGIC (Scrubbing) ---
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
    // Let HTML attributes handle playback (Autoplay loop)
    
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
               className="h-full w-full object-cover scale-110" // Scaled to match video crop
             />
             <div className="absolute inset-0 bg-navy/20" />
        </motion.div>


        {/* 
            2. THE VIDEO ENGINE (Background)
        */}
        <video
          ref={videoRef}
          // ✅ FIX: 'scale-110' zooms in 10%, pushing the watermark off the edges
          className="h-full w-full object-cover scale-110 origin-center"
          src={VIDEO_SRC}
          
          // Attributes for Mobile Autoplay
          autoPlay={true}     
          loop={true}         
          muted={true}        
          playsInline={true}  
          preload="auto"
        />

        {/* Global Grain Texture */}
        <div className="bg-noise z-10 pointer-events-none" />
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-navy/30 via-transparent to-navy/80" />
    </div>
  );
}
