"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const CLOUD_NAME = "dkbpthpxg";
const VIDEO_PUBLIC_ID = "hero-scroller_xxfvss";
const POSTER_PUBLIC_ID = "hero-poster_jo6bco";

const DESKTOP_BREAKPOINT = 1024;

function cloudinaryVideo(publicId: string, width: number, quality: "good" | "eco") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto:${quality},vc_auto,w_${width}/${publicId}.mp4`;
}

function cloudinaryImage(publicId: string, width: number) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:good,w_${width}/${publicId}`;
}

export default function VideoScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const latestProgressRef = useRef(0);
  const lastSeekTimeRef = useRef(-1);

  const [isMobile, setIsMobile] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll();

  const openingPosterOpacity = useTransform(scrollYProgress, [0, 0.055], [1, 0]);
  const openingPointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.055 ? "none" : "auto",
  );

  const mobilePosterScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);
  const mobilePosterY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  const desktopVideo = cloudinaryVideo(VIDEO_PUBLIC_ID, 1920, "good");
  const desktopPoster = cloudinaryImage(POSTER_PUBLIC_ID, 1920);
  const tabletPoster = cloudinaryImage(POSTER_PUBLIC_ID, 1400);
  const mobilePoster = cloudinaryImage(POSTER_PUBLIC_ID, 900);

  useEffect(() => {
    const mobileQuery = window.matchMedia(`(max-width: ${DESKTOP_BREAKPOINT}px)`);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setIsMobile(mobileQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    update();

    mobileQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (isMobile || reducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.pause();

    const handleReady = () => setVideoReady(true);

    video.addEventListener("loadedmetadata", handleReady);
    video.addEventListener("canplay", handleReady);

    if (video.readyState >= 2) {
      setVideoReady(true);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleReady);
      video.removeEventListener("canplay", handleReady);
    };
  }, [isMobile, reducedMotion]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile || reducedMotion) return;

    latestProgressRef.current = latest;

    if (rafRef.current !== null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;

      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      const targetTime = video.duration * latestProgressRef.current;
      const previousTime = lastSeekTimeRef.current;

      if (previousTime >= 0 && Math.abs(targetTime - previousTime) < 0.045) {
        return;
      }

      lastSeekTimeRef.current = targetTime;

      if ("fastSeek" in video && Math.abs(video.currentTime - targetTime) > 0.25) {
        video.fastSeek(targetTime);
      } else {
        video.currentTime = targetTime;
      }
    });
  });

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-[#05070B]">
      {isMobile || reducedMotion ? (
        <motion.picture
          style={{ scale: mobilePosterScale, y: mobilePosterY }}
          className="block h-full w-full"
        >
          <source media="(max-width: 640px)" srcSet={mobilePoster} />
          <source media="(max-width: 1024px)" srcSet={tabletPoster} />
          <motion.img
            src={tabletPoster}
            alt="TMS Estates background"
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        </motion.picture>
      ) : (
        <>
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={desktopVideo}
            poster={desktopPoster}
            muted
            playsInline
            preload="auto"
          />

          <motion.div
            style={{
              opacity: videoReady ? openingPosterOpacity : 1,
              pointerEvents: openingPointerEvents,
            }}
            className="absolute inset-0 z-20"
          >
            <img
              src={desktopPoster}
              alt="TMS Estates background preview"
              className="h-full w-full object-cover"
              draggable={false}
              loading="eager"
            />
            <div className="absolute inset-0 bg-[#05070B]/34" />
          </motion.div>
        </>
      )}

      <div className="bg-noise pointer-events-none absolute inset-0 z-10" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#05070B]/42 via-[#05070B]/20 to-[#05070B]/68" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_18%_44%,rgba(194,161,57,0.10),transparent_30%),radial-gradient(circle_at_82%_36%,rgba(13,27,46,0.18),transparent_38%)]" />
    </div>
  );
}
