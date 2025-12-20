/* FULL REPLACEMENT: src/components/ui/VideoScroller.tsx */
"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

export default function VideoScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // 1. Track the Window Scroll (The entire page)
  const { scrollYProgress } = useScroll();

  // 2. VIDEO TIMING ACCELERATION
  // The 'input' array [0, 0.85] means: "From top of page (0) to 85% down the page"
  // The 'output' array [0, 1] means: "Play from Start (0) to Finish (1)"
  // RESULT: The video finishes PLAYING before you finish SCROLLING (at the footer).
  const scrubProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  // 3. Smooth out the motion so it doesn't jitter
  const smoothProgress = useSpring(scrubProgress, {
    damping: 20,
    stiffness: 50,
    mass: 0.2
  });

  useEffect(() => {
    const video = videoRef.current;
    
    // Sync function to update video frame based on scroll
    const updateVideo = (latest: number) => {
      if (video && video.duration) {
        // Clamp the value so it never goes beyond video duration
        const safeProgress = Math.min(Math.max(latest, 0), 1);
        const targetTime = video.duration * safeProgress;
        
        if (isFinite(targetTime)) {
          video.currentTime = targetTime;
        }
      }
    };

    const unsubscribe = smoothProgress.on("change", updateVideo);
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    // Fixed container that covers the entire viewport background
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-navy">
      
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        // Ensure this is the correct path to your high-res walkthrough video
        src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4" 
        muted
        playsInline
        preload="auto"
      />
      
      {/* Dark Overlay for text contrast */}
      <div className="absolute inset-0 bg-navy/20" />
      
      {/* 
         Vignette / Gradient Overlay 
         Makes the center clearer (for video focus) and edges darker (for floating UI)
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy/90" />

      {/* Luxury Texture Grain */}
      <div className="bg-noise" />

    </div>
  );
}
