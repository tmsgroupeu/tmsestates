/* NEW FILE: src/components/ui/VideoScroller.tsx */
"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

export default function VideoScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track scroll for the ENTIRE height of the scrollytelling section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll value so the video doesn't jitter
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 50,
    mass: 0.2
  });

  useEffect(() => {
    const video = videoRef.current;
    // Sync function to update video frame
    const updateVideo = (latest: number) => {
      if (video && video.duration) {
        // Be careful: video.currentTime is inherently "step-based"
        const targetTime = video.duration * latest;
        if (isFinite(targetTime)) {
          video.currentTime = targetTime;
        }
      }
    };

    // Subscribe to spring updates
    const unsubscribe = smoothProgress.on("change", updateVideo);
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    // We make this container very tall (e.g. 300vh) so we have scrolling room
    <div ref={containerRef} className="relative h-[300vh]"> 
      
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4" // REPLACE with your 'walkthrough' video
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-navy/30" />
        
        {/* Global Overlay Gradient for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-transparent to-navy/90 pointer-events-none" />
      </div>

      {/* 
        This "Grain" div adds that texture you wanted. 
        It stays fixed over the video. 
      */}
      <div className="bg-noise" />

    </div>
  );
}
