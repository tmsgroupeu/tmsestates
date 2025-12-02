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

  useEffect(() => {
    // Detect Mobile Device on mount
    const checkMobile = () => {
      // 768px is the standard breakpoint for tablets/phones
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // --- MOBILE LOGIC: AUTOPLAY LOOP ---
    if (isMobile) {
        // On mobile, we just play the video normally. 
        // This is much smoother and battery efficient.
        video.loop = true;
        // Try to play immediately
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                // Auto-play was prevented.
                // This is normal on Low Power Mode.
                console.log("Autoplay prevented:", error);
            });
        }
        // Force ready state
        setIsReady(true);
        return; // Exit, do not attach scrolly listener
    }

    // --- DESKTOP LOGIC: SCROLL SCRUBBING ---
    // Ensure video is paused so we can control frames manually
    video.pause();

    const updateVideo = (latest: number) => {
      if (video && video.duration && !isNaN(video.duration)) {
        const targetTime = video.duration * latest;
        if (Number.isFinite(targetTime)) {
            video.currentTime = targetTime;
        }
      }
    };

    const unsubscribe = smoothProgress.on("change", updateVideo);
    return () => unsubscribe();
  }, [smoothProgress, isMobile]);

  return (
    <div className="fixed inset-0 h-screen w-full z-0 pointer-events-none overflow-hidden bg-navy">
      
        {/* Loading Overlay */}
        <div 
            className={`absolute inset-0 z-20 bg-navy transition-opacity duration-1000 ${isReady ? 'opacity-0' : 'opacity-100'}`} 
        />

        {/* VIDEO ELEMENT */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/assets/hero-scroller.mp4" 
          muted
          playsInline // CRITICAL for iOS to play without fullscreen
          preload="auto"
          // Add a static image just in case video fails entirely (Low Power Mode)
          poster="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg" 
          onLoadedMetadata={() => setIsReady(true)}
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-navy/20 z-10" />

        {/* Global Grain Texture */}
        <div className="bg-noise z-10" />
    </div>
  );
}
