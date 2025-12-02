/* NEW FILE: src/components/ui/VideoScroller.tsx */
"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

export default function VideoScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  // --- CONFIGURATION ---
  // 300vh means the user scrolls 3 full screen heights to play the full video.
  const SCROLL_HEIGHT = "300vh";

  // 1. Track scroll progress relative to this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Physics smoother (Spring)
  // These settings prevent jittering.
  // damping: 20 absorbs the shock of fast scrolling.
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

    // Subscribe to the spring changes
    const unsubscribe = smoothProgress.on("change", updateVideo);
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative z-0">
      
      {/* Sticky Container: Holds the video fixed while you scroll past it */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy">
        
        {/* Loading Overlay: Hides the video until metadata is loaded */}
        <div 
            className={`absolute inset-0 z-20 bg-navy transition-opacity duration-1000 ${isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
        />

        {/* THE OPTIMIZED VIDEO */}
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
      </div>

      {/* Global Grain Texture (Optional, matches your design) */}
      <div className="bg-noise z-10" />

    </div>
  );
}
