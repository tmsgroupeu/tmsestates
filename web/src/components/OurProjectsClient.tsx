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

export default function OurProjectsClient({
  projects,
}: {
  projects: ProjectData[];
}) {
  const visibleProjects = useMemo(() => projects.slice(0, 5), [projects]);
  const [activeIndex, setActiveIndex] = useState(
    Math.min(1, Math.max(0, visibleProjects.length - 1)),
  );

  if (!visibleProjects.length) return null;

  return (
    <div className="relative overflow-visible">
      <div className="hidden h-[clamp(420px,52svh,590px)] w-full gap-4 lg:flex">
        {visibleProjects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              style={{ flexGrow: isActive ? 1.72 : 0.62 }}
              className={`group relative min-w-[150px] overflow-hidden border transition-[flex-grow,transform,border-color,box-shadow,opacity,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive
                  ? "z-20 border-[#C2A139]/55 shadow-[0_30px_105px_rgba(0,0,0,0.46)]"
                  : "z-10 border-white/16 opacity-[0.86] saturate-[0.92] hover:border-[#C2A139]/36 hover:opacity-100"
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes={isActive ? "56vw" : "20vw"}
                className={`object-cover transition duration-[1400ms] ease-out ${isActive ? "scale-100" : "scale-[1.02]"} group-hover:scale-[1.045]`}
              />

              {/* Dark editorial overlay: keeps images visible, but guarantees readable project information. */}
              <div
                className={`absolute inset-0 transition duration-500 ${isActive ? "bg-[#05070B]/18" : "bg-[#05070B]/42"}`}
              />
              <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#05070B]/76 via-[#05070B]/38 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[76%] bg-gradient-to-t from-[#05070B]/98 via-[#05070B]/78 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#05070B]/72 via-[#05070B]/28 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/8" />

              {!isActive && (
                <div className="absolute inset-0 bg-[#05070B]/20 transition-opacity group-hover:opacity-0" />
              )}

              {isActive && (
                <>
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#C2A139]/50" />
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#C2A139] via-[#C2A139]/55 to-transparent" />
                </>
              )}

              <div className="absolute left-6 top-6 z-10 flex items-center gap-3 rounded-full border border-white/16 bg-[#05070B]/66 px-3 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-md">
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${isActive ? "bg-[#C2A139]" : "bg-[#F5F0E8]/44"}`}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8]/86">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className={`absolute right-6 top-6 z-10 grid h-11 w-11 place-items-center rounded-full border shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? "border-[#C2A139]/60 bg-[#C2A139]/94 text-[#05070B] opacity-100"
                    : "border-white/20 bg-[#05070B]/48 text-[#F5F0E8] opacity-75 group-hover:border-[#C2A139]/55 group-hover:bg-[#C2A139]/90 group-hover:text-[#05070B]"
                } group-hover:-translate-y-1 group-hover:translate-x-1`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                {isActive ? (
                  <div className="max-w-[680px]">
                    <div className="mb-5 flex flex-wrap gap-3">
                      {project.location && (
                        <span className="inline-flex max-w-full items-center gap-2 border border-white/22 bg-[#05070B]/76 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8] shadow-[0_12px_34px_rgba(0,0,0,0.34)] backdrop-blur-md">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C2A139]" />
                          <span className="truncate">{project.location}</span>
                        </span>
                      )}
                      {project.completion && (
                        <span className="inline-flex max-w-full items-center gap-2 border border-[#C2A139]/52 bg-[#05070B]/76 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C2A139] shadow-[0_12px_34px_rgba(0,0,0,0.34)] backdrop-blur-md">
                          <CalendarClock className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{project.completion}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-montserrat text-[clamp(1.85rem,3vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.052em] text-[#F5F0E8] drop-shadow-[0_12px_32px_rgba(0,0,0,0.82)]">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-[#F5F0E8]/88 line-clamp-3 xl:text-[0.98rem] xl:leading-8">
                      {project.description}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C2A139] drop-shadow-[0_8px_22px_rgba(0,0,0,0.7)]">
                      Explore Project
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                  </div>
                ) : (
                  <div className="max-w-[280px]">
                    <h3 className="font-montserrat text-[1.55rem] font-semibold leading-tight tracking-[-0.05em] text-[#F5F0E8] drop-shadow-[0_10px_28px_rgba(0,0,0,0.82)] xl:text-[1.8rem]">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/84 line-clamp-2 drop-shadow-[0_8px_20px_rgba(0,0,0,0.75)]">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/96 via-[#05070B]/64 to-[#05070B]/20" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#05070B]/68 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-[#05070B]/98 via-[#05070B]/82 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2A139]">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="line-clamp-1">
                  {project.location || "Cyprus"}
                </span>
              </div>
              <h3 className="font-montserrat text-3xl font-semibold leading-tight tracking-[-0.055em] text-[#F5F0E8] drop-shadow-[0_10px_26px_rgba(0,0,0,0.72)]">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/84 line-clamp-2">
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
