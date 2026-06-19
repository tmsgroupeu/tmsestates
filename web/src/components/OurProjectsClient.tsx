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
    <div className="relative overflow-hidden bg-[#05070B]/24 shadow-[0_30px_120px_rgba(0,0,0,0.24)] backdrop-blur-[2px]">
      <div className="hidden h-[clamp(430px,55svh,620px)] w-full lg:flex">
        {visibleProjects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              style={{ flexGrow: isActive ? 1.95 : 0.58 }}
              className="group relative min-w-[120px] overflow-hidden border-r border-white/10 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] last:border-r-0"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes={isActive ? "55vw" : "18vw"}
                className="object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
              <div className={`absolute inset-0 transition duration-500 ${isActive ? "bg-gradient-to-t from-[#05070B]/94 via-[#05070B]/36 to-[#05070B]/12" : "bg-[#05070B]/70"}`} />
              <div className="absolute left-6 top-6 z-10 flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full transition-colors ${isActive ? "bg-[#C2A139]" : "bg-[#F5F0E8]/38"}`} />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8]/72">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="absolute right-6 top-6 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/14 bg-[#F5F0E8]/10 text-[#F5F0E8] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1">
                <ArrowUpRight className="h-4 w-4" />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-8">
                {isActive ? (
                  <div className="max-w-2xl">
                    <div className="mb-5 flex flex-wrap gap-3">
                      {project.location && (
                        <span className="inline-flex items-center gap-2 border border-white/16 bg-[#05070B]/45 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8] backdrop-blur-md">
                          <MapPin className="h-3.5 w-3.5 text-[#C2A139]" />
                          {project.location}
                        </span>
                      )}
                      {project.completion && (
                        <span className="inline-flex items-center gap-2 border border-[#C2A139]/35 bg-[#C2A139]/12 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C2A139] backdrop-blur-md">
                          <CalendarClock className="h-3.5 w-3.5" />
                          {project.completion}
                        </span>
                      )}
                    </div>

                    <h3 className="font-montserrat text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8] xl:text-6xl">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-[#F5F0E8]/74 line-clamp-3 xl:text-base xl:leading-8">
                      {project.description}
                    </p>

                    <span className="mt-7 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C2A139]">
                      Explore Project
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                  </div>
                ) : (
                  <div className="max-w-[260px]">
                    <h3 className="font-montserrat text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#F5F0E8] [writing-mode:horizontal-tb]">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C2A139]/78">
                      {project.location || "Cyprus"}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-3 p-3 lg:hidden">
        {visibleProjects.map((project, index) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group relative min-h-[320px] overflow-hidden border border-white/10 bg-[#05070B]"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover transition duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/94 via-[#05070B]/34 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2A139]">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.location || "Cyprus"}</span>
              </div>
              <h3 className="font-montserrat text-3xl font-semibold leading-tight tracking-[-0.055em] text-[#F5F0E8]">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/72 line-clamp-2">
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
