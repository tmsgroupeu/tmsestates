/* UPDATED: src/components/ui/VideoScroller.tsx */
"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

export default function VideoScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

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
    const video = videoRef.current;
    
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
  }, [smoothProgress]);

  return (
    <div className="fixed inset-0 h-screen w-full z-0 pointer-events-none overflow-hidden bg-navy">
      
        {/* Loading Overlay */}
        <div 
            className={`absolute inset-0 z-20 bg-navy transition-opacity duration-1000 ${isReady ? 'opacity-0' : 'opacity-100'}`} 
        />

        {/* OPTIMIZED VIDEO */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/assets/hero-scroller.mp4" 
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => setIsReady(true)}
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-navy/20 z-10" />

        {/* Global Grain Texture */}
        <div className="bg-noise z-10" />
    </div>
  );
}
