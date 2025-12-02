/* FINAL VERSION: src/components/ui/VideoScroller.tsx */
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
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure audio is properly killed for browser compliance
    video.defaultMuted = true;
    video.muted = true;

    // --- DESKTOP LOGIC ---
    if (!isMobile) {
      // Pause immediately so we can control frames
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
      
      // Force ready state for desktop immediately
      setIsReady(true);
      return () => unsubscribe();
    }
    
    // --- MOBILE LOGIC ---
    // If we are here, we let the HTML attributes handle playback.
    // However, we listen for 'suspend' or 'play' events to manage the poster visibility.
    const handleMobilePlay = () => setIsReady(true);
    
    video.addEventListener("play", handleMobilePlay);
    video.addEventListener("playing", handleMobilePlay);

    // If mobile autoplays, good. If not, the poster handles it.
    
    return () => {
        video.removeEventListener("play", handleMobilePlay);
        video.removeEventListener("playing", handleMobilePlay);
    };
    
  }, [smoothProgress, isMobile]);

  return (
    <div className="fixed inset-0 h-screen w-full z-0 pointer-events-none overflow-hidden bg-navy">
      
        {/* Loading/Poster Overlay: 
            This div holds the Static Image. 
            It fades out ONLY when the video is actually ready and playing/scrubbing. 
            This prevents the "Two House" glitch.
        */}
        <div 
            className={`absolute inset-0 z-20 transition-opacity duration-700 ${isReady ? 'opacity-0' : 'opacity-100'}`}
        >
             {/* 
                ✅ YOUR NEW MATCHING POSTER
                This ensures that even if video is blocked, it looks like the right house.
             */}
             <img 
               src="/assets/hero-poster.jpg" 
               alt="Background Preview" 
               className="h-full w-full object-cover"
             />
             <div className="absolute inset-0 bg-navy/20" />
        </div>

        {/* VIDEO ELEMENT */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/assets/hero-scroller.mp4" 
          
          // Attributes for Mobile Autoplay success
          autoPlay={true}     
          loop={true}         
          muted={true}        
          playsInline={true}  
          
          preload="auto"
          // We DO NOT use the poster attribute on the video tag itself anymore 
          // because we are handling the poster manually with the div above for smoother transitions.
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-navy/20 z-10" />

        {/* Global Grain Texture */}
        <div className="bg-noise z-10" />
    </div>
  );
}
