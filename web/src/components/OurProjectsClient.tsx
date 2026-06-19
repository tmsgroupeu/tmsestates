"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, CalendarClock } from "lucide-react";
import { Link } from "@/i18n/routing";

type ProjectData = {
  id: string | number;
  title: string;
  slug: string;
  location: string;
  completion: string;
  description: string;
  image: string;
};

export default function OurProjectsClient({ projects }: { projects: ProjectData[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || projects.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [isHovered, projects.length]);

  return (
    <div className="relative w-full overflow-hidden border border-white/12 bg-black-premium/18 backdrop-blur-[2px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent 24.9%, rgba(245,240,232,.055) 25%, transparent 25.1%, transparent 49.9%, rgba(194,161,57,.10) 50%, transparent 50.1%, transparent 74.9%, rgba(245,240,232,.055) 75%, transparent 75.1%)",
        }}
      />

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        className="relative z-10 flex w-full flex-col lg:h-[68vh] lg:min-h-[560px] lg:max-h-[760px] lg:flex-row"
      >
        {projects.map((project, index) => {
          const isActive = activeIndex === index;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setActiveIndex(index)}
              className={`group relative flex min-h-[390px] min-w-0 cursor-pointer flex-col justify-end overflow-hidden border-b border-white/12 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] last:border-b-0 lg:min-h-0 lg:border-b-0 lg:border-r lg:last:border-r-0 ${
                isActive ? "lg:flex-[4.2]" : "lg:flex-[1.05]"
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`object-cover object-center transition-all duration-[1600ms] ease-out ${
                  isActive ? "scale-105 opacity-90" : "scale-110 opacity-[0.44] grayscale-[35%]"
                }`}
                priority={index === 0}
              />

              <div className={`absolute inset-0 transition-all duration-700 ${isActive ? "bg-gradient-to-t from-black-premium via-navy/58 to-transparent" : "bg-black-premium/64"}`} />
              <div className="absolute inset-0 bg-gradient-to-r from-black-premium/35 to-transparent" />

              <div className="absolute left-6 top-6 z-10 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full transition-colors ${isActive ? "bg-gold" : "bg-ivory/35"}`} />
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-ivory/70">0{index + 1}</span>
              </div>

              <div className={`absolute right-6 top-6 z-10 border border-white/18 bg-white/8 p-3 text-ivory backdrop-blur-md transition-all duration-500 ${isActive ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}>
                <ArrowUpRight size={20} />
              </div>

              <div className="relative z-10 p-7 md:p-9 lg:w-[560px]">
                <h3 className={`font-display text-2xl font-semibold leading-tight tracking-[-0.045em] transition-colors duration-500 md:text-4xl ${isActive ? "text-gold" : "text-ivory"}`}>
                  {project.title}
                </h3>

                <div className={`overflow-hidden transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "mt-5 max-h-[280px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    {project.completion && (
                      <div className="flex items-center gap-1.5 border border-gold/30 bg-navy/82 px-3 py-1.5 backdrop-blur-sm">
                        <CalendarClock size={12} className="text-gold" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gold">{project.completion}</span>
                      </div>
                    )}
                    {project.location && (
                      <div className="flex items-center gap-1.5 border border-white/12 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                        <MapPin size={12} className="text-ivory" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-ivory">{project.location}</span>
                      </div>
                    )}
                  </div>

                  <p className="line-clamp-3 max-w-xl text-sm leading-relaxed text-ivory/74 md:text-base">
                    {project.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-ivory transition-colors group-hover:text-gold">
                    Explore Project <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
