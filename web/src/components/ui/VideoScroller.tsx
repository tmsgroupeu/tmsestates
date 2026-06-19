"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export default function VideoScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();

  const imageOpacity = useTransform(scrollYProgress, [0, 0.055], [1, 0]);
  const pointerEvents = useTransform(scrollYProgress, (v) => (v > 0.055 ? "none" : "auto"));

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 60,
    mass: 0.2,
    restDelta: 0.001,
  });

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

    video.defaultMuted = true;
    video.muted = true;

    if (!isMobile) {
      video.pause();

      const updateVideo = (latest: number) => {
        if (video.duration && !Number.isNaN(video.duration)) {
          const targetTime = video.duration * latest;
          if (Number.isFinite(targetTime)) video.currentTime = targetTime;
        }
      };

      const unsubscribe = smoothProgress.on("change", updateVideo);
      return () => unsubscribe();
    }
  }, [smoothProgress, isMobile]);

  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-[#05070B]">
      <motion.div
        style={{ opacity: imageOpacity, pointerEvents }}
        className="absolute inset-0 z-20"
      >
        <img
          src="/assets/hero-poster.jpg"
          alt="Background Preview"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/38" />
      </motion.div>

      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/assets/hero-scroller.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <div className="bg-noise z-10 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/20 to-black/82" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_20%_50%,rgba(0,0,0,0.08),transparent_35%),radial-gradient(circle_at_85%_35%,rgba(13,27,46,0.20),transparent_38%)]" />
    </div>
  );
}
