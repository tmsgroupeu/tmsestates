"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

export default function ScrollyVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll();

  // ✅ SMOOTHING: This makes the video feel "heavy" and removes micro-jitters
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 40,
    mass: 0.5
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 1) {
        setDuration(video.duration);
      } else {
        const onLoaded = () => setDuration(video.duration);
        video.addEventListener("loadedmetadata", onLoaded);
        return () => video.removeEventListener("loadedmetadata", onLoaded);
      }
    }
  }, []);

  // ✅ PERFORMANCE LOOP: Only update frame when scroll value actually changes
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (videoRef.current && duration) {
      // Clamp value between 0 and duration
      const target = Math.max(0, Math.min(latest * duration, duration));
      
      // Check if the difference is significant enough to warrant a frame update
      // to save CPU cycles
      if (Math.abs(videoRef.current.currentTime - target) > 0.05) {
         videoRef.current.currentTime = target;
      }
    }
  });

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden bg-navy">
      <video
        ref={videoRef}
        className="h-full w-full object-cover opacity-60"
        src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4"
        muted
        playsInline
        preload="auto"
      />
      {/* Dark overlay so white text pops */}
      <div className="absolute inset-0 bg-navy/40" />
    </div>
  );
}