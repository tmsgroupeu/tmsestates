"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CLOUD_NAME = "dkbpthpxg";
const VIDEO_PUBLIC_ID = "hero-scroller-scrub_vqrlto";
const POSTER_PUBLIC_ID = "hero-poster_jo6bco";

function cloudinaryVideo(publicId: string, width: number, quality: "good" | "eco") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto:${quality},vc_auto,c_limit,w_${width}/${publicId}.mp4`;
}

function cloudinaryImage(publicId: string, width: number) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:good,c_limit,w_${width}/${publicId}`;
}

export default function VideoScroller() {
  const [isMobile, setIsMobile] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll();

  const heroPosterOpacity = useTransform(scrollYProgress, [0, 0.065], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const mobilePosterScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.07]);
  const mobilePosterY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  const desktopVideo = cloudinaryVideo(VIDEO_PUBLIC_ID, 1920, "good");
  const tabletVideo = cloudinaryVideo(VIDEO_PUBLIC_ID, 1280, "eco");

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
          <motion.video
            style={{ scale: videoScale, y: videoY }}
            className="h-full w-full object-cover"
            poster={desktopPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onLoadedData={() => setVideoReady(true)}
          >
            <source media="(max-width: 1440px)" src={tabletVideo} type="video/mp4" />
            <source src={desktopVideo} type="video/mp4" />
          </motion.video>

          <motion.div
            style={{ opacity: videoReady ? heroPosterOpacity : 1 }}
            className="pointer-events-none absolute inset-0 z-20"
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
