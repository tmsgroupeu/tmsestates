/* UPDATED: src/components/ui/VideoScroller.tsx */
"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

export default function VideoScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Track GLOBAL window scroll
  const { scrollYProgress } = useScroll();

  // 2. Physics smoother (Spring)
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 60,
    mass: 0.2,
    restDelta: 0.001
  });

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => {
      // 1024px covers iPad Pros and large tablets which often struggle with scrubbing
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle Video Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fix for React/iOS hydration issues: ensure muted is set on the DOM element
    video.defaultMuted = true;
    video.muted = true;

    // --- DESKTOP LOGIC: SCROLL SCRUBBING ---
    if (!isMobile) {
      // If we are on Desktop, we STOP the default autoplay so we can scrub it
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
    // On mobile, we do nothing JS-wise. 
    // We rely 100% on the autoPlay/loop attributes in the HTML tag below.
    // This is the most reliable way to beat iOS blockers.
    
  }, [smoothProgress, isMobile]);

  return (
    <div className="fixed inset-0 h-screen w-full z-0 pointer-events-none overflow-hidden bg-navy">
      
        {/* Loading Overlay */}
        <div 
            className={`absolute inset-0 z-20 bg-navy transition-opacity duration-1000 ${isReady ? 'opacity-0' : 'opacity-100'}`} 
        />

        {/* 
            CRITICAL FOR MOBILE: 
            autoPlay, loop, muted, playsInline MUST be present in the JSX.
        */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/assets/hero-scroller.mp4" 
          
          autoPlay={true}     // 1. Force start
          loop={true}         // 2. Loop forever
          muted={true}        // 3. Audio off (Required for Autoplay)
          playsInline={true}  // 4. Do not fullscreen on iOS
          
          preload="auto"
          poster="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg" 
          
          // Use onCanPlay to detect readiness instead of loadedMetadata for better mobile response
          onCanPlay={() => setIsReady(true)}
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-navy/20 z-10" />

        {/* Global Grain Texture */}
        <div className="bg-noise z-10" />
    </div>
  );
}
