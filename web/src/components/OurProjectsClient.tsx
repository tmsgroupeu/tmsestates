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
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = useMemo(
    () => projects[activeIndex] || projects[0],
    [activeIndex, projects]
  );

  if (!projects.length) return null;

  return (
    <div className="grid overflow-hidden border border-white/10 bg-[#0D1B2E]/34 lg:grid-cols-[1.18fr_0.82fr]">
      <Link
        href={`/projects/${activeProject.slug}`}
        className="group relative min-h-[520px] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r"
      >
        <Image
          key={activeProject.image}
          src={activeProject.image}
          alt={activeProject.title}
          fill
          sizes="(max-width: 1024px) 100vw, 62vw"
          className="object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.045]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/38 to-transparent" />
        <div className="absolute inset-0 bg-[#0D1B2E]/10 mix-blend-multiply" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
          <div className="mb-5 flex flex-wrap gap-3">
            {activeProject.location && (
              <span className="inline-flex items-center gap-2 border border-white/16 bg-[#05070B]/45 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5F0E8] backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-[#C2A139]" />
                {activeProject.location}
              </span>
            )}
            {activeProject.completion && (
              <span className="inline-flex items-center gap-2 border border-[#C2A139]/30 bg-[#C2A139]/12 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2A139] backdrop-blur-md">
                <CalendarClock className="h-3.5 w-3.5" />
                {activeProject.completion}
              </span>
            )}
          </div>

          <h3 className="max-w-3xl font-montserrat text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8] md:text-6xl">
            {activeProject.title}
          </h3>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#F5F0E8]/76 md:text-base md:leading-8">
            {activeProject.description}
          </p>

          <span className="mt-8 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C2A139]">
            Explore Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>

      <div className="flex flex-col">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              className={`group grid min-h-[132px] grid-cols-[72px_1fr_auto] items-center gap-5 border-b border-white/10 px-5 py-6 text-left transition-all duration-300 last:border-b-0 md:min-h-[150px] md:px-7 ${
                isActive ? "bg-[#C2A139]/10" : "hover:bg-white/[0.035]"
              }`}
            >
              <span
                className={`font-montserrat text-2xl font-semibold tracking-[-0.05em] transition-colors ${
                  isActive ? "text-[#C2A139]" : "text-[#F5F0E8]/28 group-hover:text-[#F5F0E8]/55"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span className="block font-montserrat text-xl font-semibold leading-tight tracking-[-0.04em] text-[#F5F0E8] md:text-2xl">
                  {project.title}
                </span>
                <span className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/48">
                  {project.location && <span>{project.location}</span>}
                  {project.completion && <span className="text-[#C2A139]/80">{project.completion}</span>}
                </span>
              </span>

              <ArrowUpRight
                className={`h-5 w-5 transition-all duration-300 ${
                  isActive ? "text-[#C2A139]" : "text-[#F5F0E8]/32 group-hover:text-[#C2A139]"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
