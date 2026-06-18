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
    <div className="relative w-full overflow-hidden rounded-[1.75rem] border border-[rgba(245,240,232,0.11)] bg-[rgba(5,7,11,0.35)]">
      <div className="absolute inset-0 pointer-events-none opacity-70" style={{
        backgroundImage: "linear-gradient(to right, transparent 24.9%, rgba(245,240,232,.055) 25%, transparent 25.1%, transparent 49.9%, rgba(194,161,57,.10) 50%, transparent 50.1%, transparent 74.9%, rgba(245,240,232,.055) 75%, transparent 75.1%)"
      }} />

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        className="relative z-[1]0 flex flex-col lg:flex-row w-full min-h-[620px] lg:h-[68vh] lg:min-h-[560px] lg:max-h-[760px]"
      >
        {projects.map((project, index) => {
          const isActive = activeIndex === index;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setActiveIndex(index)}
              className={`group relative min-w-0 min-h-[390px] lg:min-h-0 overflow-hidden border-b lg:border-b-0 lg:border-r last:border-b-0 lg:last:border-r-0 border-[rgba(245,240,232,0.12)] flex flex-col justify-end cursor-pointer transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isActive ? "lg:flex-[4.2]" : "lg:flex-[1.05]"}
              `}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`object-cover object-center transition-all duration-[1600ms] ease-out ${isActive ? "scale-105 opacity-90" : "scale-110 opacity-[0.42] grayscale-[35%]"}`}
                priority={index === 0}
              />

              <div className={`absolute inset-0 transition-all duration-700 ${isActive ? "bg-gradient-to-t from-[rgba(5,7,11,0.96)] via-[rgba(13,27,46,0.62)] to-transparent" : "bg-[rgba(5,7,11,0.62)]"}`} />
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,7,11,0.35)] to-transparent" />

              <div className="absolute top-6 left-6 z-[1]0 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full transition-colors ${isActive ? "bg-[var(--gold)]" : "bg-[var(--ivory)]/35"}`} />
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--ivory)]/70">0{index + 1}</span>
              </div>

              <div className={`absolute top-6 right-6 z-[1]0 rounded-full border border-[rgba(245,240,232,0.18)] bg-[rgba(245,240,232,0.08)] p-3 text-[var(--ivory)] backdrop-blur-md transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}>
                <ArrowUpRight size={20} />
              </div>

              <div className="relative z-[1]0 p-7 md:p-9 lg:w-[560px]">
                <h3 className={`font-montserrat text-2xl md:text-4xl font-bold leading-tight tracking-[-0.04em] transition-colors duration-500 ${isActive ? "text-[var(--gold)]" : "text-[var(--ivory)]"}`}>
                  {project.title}
                </h3>

                <div className={`overflow-hidden transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "max-h-[260px] opacity-100 mt-5" : "max-h-0 opacity-0"}`}>
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {project.completion && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(13,27,46,0.82)] border border-[rgba(194,161,57,0.32)] backdrop-blur-sm">
                        <CalendarClock size={12} className="text-[var(--gold)]" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--gold)]">{project.completion}</span>
                      </div>
                    )}
                    {project.location && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(245,240,232,0.10)] border border-[rgba(245,240,232,0.10)] backdrop-blur-sm">
                        <MapPin size={12} className="text-[var(--ivory)]" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--ivory)]">{project.location}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm md:text-base leading-relaxed text-[rgba(245,240,232,0.74)] line-clamp-3 max-w-xl">
                    {project.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--ivory)] transition-colors group-hover:text-[var(--gold)]">
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
