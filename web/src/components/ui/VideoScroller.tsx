"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const CLOUD_NAME = "dkbpthpxg";
const VIDEO_PUBLIC_ID = "hero-scroller-scrub_vqrlto";
const POSTER_PUBLIC_ID = "hero-poster_jo6bco";

function cloudinaryOriginalVideo(publicId: string) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${publicId}.mp4`;
}

function cloudinaryImage(publicId: string, width: number) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:good,c_limit,w_${width}/${publicId}`;
}

export default function VideoScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const latestProgressRef = useRef(0);
  const lastTargetTimeRef = useRef(-1);

  const [isMobile, setIsMobile] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll();

  const openingPosterOpacity = useTransform(scrollYProgress, [0, 0.055], [1, 0]);
  const posterPointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.055 ? "none" : "auto",
  );

  const mobilePosterScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.07]);
  const mobilePosterY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  const scrubVideo = cloudinaryOriginalVideo(VIDEO_PUBLIC_ID);
  const desktopPoster = cloudinaryImage(POSTER_PUBLIC_ID, 1920);
  const tabletPoster = cloudinaryImage(POSTER_PUBLIC_ID, 1400);
  const mobilePoster = cloudinaryImage(POSTER_PUBLIC_ID, 900);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1024px)");
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
    video.playsInline = true;
    video.pause();

    const markReady = () => {
      setVideoReady(true);

      // Safari/Chrome often decode the first frame more reliably after a tiny seek.
      if (video.currentTime === 0 && video.duration) {
        video.currentTime = 0.001;
      }
    };

    video.addEventListener("loadedmetadata", markReady);
    video.addEventListener("canplay", markReady);

    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", markReady);
      video.removeEventListener("canplay", markReady);
    };
  }, [isMobile, reducedMotion]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile || reducedMotion || !videoReady) return;

    latestProgressRef.current = latest;

    if (rafRef.current !== null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;

      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      const duration = video.duration;
      const targetTime = duration * latestProgressRef.current;

      // Avoid micro-seeking. This is critical for scroll smoothness.
      if (
        lastTargetTimeRef.current >= 0 &&
        Math.abs(targetTime - lastTargetTimeRef.current) < 0.055
      ) {
        return;
      }

      lastTargetTimeRef.current = targetTime;

      try {
        if (
          "fastSeek" in video &&
          Math.abs(video.currentTime - targetTime) > 0.35
        ) {
          video.fastSeek(targetTime);
        } else {
          video.currentTime = targetTime;
        }
      } catch {
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
          <img
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
            src={scrubVideo}
            poster={desktopPoster}
            muted
            playsInline
            preload="auto"
          />

          <motion.div
            style={{
              opacity: videoReady ? openingPosterOpacity : 1,
              pointerEvents: posterPointerEvents,
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
