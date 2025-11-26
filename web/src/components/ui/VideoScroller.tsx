"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

export default function VideoScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  // Track scroll of the main window vs this component
  const { scrollYProgress } = useScroll({
    // We want the video to scrub from start of page until end of page
    offset: ["start start", "end end"] 
  });

  // --- THE LAG FIX ---
  // We use a 'spring' to dampen the scroll values.
  // stiffness: lower = smoother/slower catchup
  // damping: higher = less bouncy
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, 
    damping: 30,    
    mass: 1
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Wait for metadata to know total duration
      const onLoadedMetadata = () => setDuration(video.duration);
      video.addEventListener("loadedmetadata", onLoadedMetadata);
      return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
    }
  }, []);

  // Update video time when the spring value changes
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (videoRef.current && duration) {
      // Determine target time
      const targetTime = latest * duration;
      
      // Update only if finite and within bounds
      if (Number.isFinite(targetTime)) {
        videoRef.current.currentTime = targetTime;
      }
    }
  });

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      <video
        ref={videoRef}
        className="h-full w-full object-cover scale-[1.02]" // Slight scale avoids edge pixel issues
        // Use a high-quality but compressed MP4
        src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4" 
        muted
        playsInline
        preload="auto" // Critical for smoother seeking
      />
      {/* Cinematic Darken Overlay */}
      <div className="absolute inset-0 bg-navy/20" />
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
}