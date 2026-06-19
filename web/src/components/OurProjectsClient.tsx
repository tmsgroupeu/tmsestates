"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CalendarClock, MapPin } from "lucide-react";
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
  const visibleProjects = useMemo(() => projects.slice(0, 5), [projects]);
  const [activeIndex, setActiveIndex] = useState(Math.min(1, Math.max(0, visibleProjects.length - 1)));

  if (!visibleProjects.length) return null;

  return (
    <div className="relative overflow-visible">
      <div className="hidden h-[clamp(430px,54svh,610px)] w-full gap-3 lg:flex">
        {visibleProjects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              style={{ flexGrow: isActive ? 1.88 : 0.56 }}
              className={`group relative min-w-[128px] overflow-hidden border transition-[flex-grow,transform,border-color,box-shadow,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive
                  ? "z-20 border-[#C2A139]/46 shadow-[0_30px_110px_rgba(0,0,0,0.42)]"
                  : "z-10 border-white/12 opacity-[0.88] hover:border-[#C2A139]/32"
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes={isActive ? "58vw" : "18vw"}
                className={`object-cover transition duration-[1400ms] ease-out ${isActive ? "scale-100" : "scale-[1.015]"} group-hover:scale-[1.045]`}
              />

              {/* Separation + readability system */}
              <div
                className={`absolute inset-0 transition duration-500 ${
                  isActive
                    ? "bg-gradient-to-t from-[#05070B]/88 via-[#05070B]/34 to-[#05070B]/20"
                    : "bg-[#05070B]/66"
                }`}
              />
              <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#05070B]/64 via-[#05070B]/28 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#05070B]/97 via-[#05070B]/80 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-px bg-white/14" />
              <div className="absolute inset-y-0 right-0 w-px bg-black/40" />
              {isActive && (
                <>
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#C2A139]/42" />
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#C2A139] via-[#C2A139]/50 to-transparent" />
                </>
              )}

              <div className="absolute left-6 top-6 z-10 flex items-center gap-3 rounded-full border border-white/12 bg-[#05070B]/44 px-3 py-2 backdrop-blur-md">
                <span className={`h-2 w-2 rounded-full transition-colors ${isActive ? "bg-[#C2A139]" : "bg-[#F5F0E8]/42"}`} />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8]/76">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={`absolute right-6 top-6 z-10 grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 ${
                isActive
                  ? "border-[#C2A139]/55 bg-[#C2A139]/92 text-[#05070B] opacity-100"
                  : "border-white/14 bg-[#F5F0E8]/10 text-[#F5F0E8] opacity-0 group-hover:opacity-100"
              } group-hover:-translate-y-1 group-hover:translate-x-1`}>
                <ArrowUpRight className="h-4 w-4" />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-8">
                {isActive ? (
                  <div className="max-w-2xl">
                    <div className="mb-5 flex flex-wrap gap-3">
                      {project.location && (
                        <span className="inline-flex max-w-full items-center gap-2 border border-white/18 bg-[#05070B]/64 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8] shadow-[0_12px_34px_rgba(0,0,0,0.28)] backdrop-blur-md">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C2A139]" />
                          <span className="truncate">{project.location}</span>
                        </span>
                      )}
                      {project.completion && (
                        <span className="inline-flex max-w-full items-center gap-2 border border-[#C2A139]/40 bg-[#05070B]/64 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C2A139] shadow-[0_12px_34px_rgba(0,0,0,0.28)] backdrop-blur-md">
                          <CalendarClock className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{project.completion}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-montserrat text-[clamp(2.05rem,3.8vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.72)]">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-[#F5F0E8]/82 line-clamp-3 xl:text-base xl:leading-8">
                      {project.description}
                    </p>

                    <span className="mt-7 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C2A139] drop-shadow-[0_8px_22px_rgba(0,0,0,0.6)]">
                      Explore Project
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                  </div>
                ) : (
                  <div className="max-w-[260px]">
                    <h3 className="font-montserrat text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#F5F0E8] drop-shadow-[0_10px_26px_rgba(0,0,0,0.72)]">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C2A139]/88 line-clamp-2">
                      {project.location || "Cyprus"}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-3 lg:hidden">
        {visibleProjects.map((project, index) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group relative min-h-[320px] overflow-hidden border border-white/12 bg-[#05070B] shadow-[0_20px_70px_rgba(0,0,0,0.28)]"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover transition duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/92 via-[#05070B]/45 to-[#05070B]/18" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#05070B]/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#05070B]/98 via-[#05070B]/82 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2A139]">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="line-clamp-1">{project.location || "Cyprus"}</span>
              </div>
              <h3 className="font-montserrat text-3xl font-semibold leading-tight tracking-[-0.055em] text-[#F5F0E8] drop-shadow-[0_10px_26px_rgba(0,0,0,0.72)]">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/78 line-clamp-2">
                {project.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C2A139]">
                Explore Project
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
