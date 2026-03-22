/* NEW FILE: src/components/OurProjectsClient.tsx */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, CalendarClock } from "lucide-react";

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
  // 1. Auto-Focus State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 2. The Autoplay Loop (4.5 seconds)
  useEffect(() => {
    // If the user is interacting with the section, pause the loop
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 4500);

    return () => clearInterval(timer);
  },[isHovered, projects.length]);

  return (
    <div 
       // Pause autoplay on mouse enter or touch
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={() => setIsHovered(false)}
       onTouchStart={() => setIsHovered(true)}
       // Compact responsive heights: 60vh max on desktop, stacks vertically on mobile
       className="flex flex-col lg:flex-row w-full h-[65vh] min-h-[450px] max-h-[600px] gap-3 lg:gap-4"
    >
      {projects.map((project, index) => {
        const isActive = activeIndex === index;

        return (
          <Link 
              key={project.id} 
              href={`/projects/${project.slug}`}
              // Update state instantly on hover
              onMouseEnter={() => setActiveIndex(index)}
              // 🪄 THE ACCORDION ANIMATION:
              // Flex-1 (Shrunk) vs Flex-[3.5] (Expanded). 
              // Ease-out creates the luxurious slow-stop effect.
              className={`group relative min-w-0 min-h-0 overflow-hidden rounded-3xl bg-[#0A2342] border border-white/10 shadow-xl flex flex-col justify-end cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                 ${isActive ? 'flex-[3.5] lg:flex-[4] shadow-[#D4AF37]/15' : 'flex-1'}
              `}
          >
              {/* 1. BACKGROUND IMAGE */}
              <Image
                  src={project.image}
                  alt={project.title} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover object-center transition-all duration-[1.5s] ease-out
                     ${isActive ? 'scale-105 opacity-90' : 'scale-110 opacity-40 grayscale-[30%]'}
                  `}
                  priority
              />
              
              {/* 2. GRADIENTS FOR READABILITY */}
              <div className={`absolute inset-0 transition-all duration-700 
                  ${isActive ? 'bg-gradient-to-t from-[#0A2342] via-[#0A2342]/60 to-transparent' : 'bg-[#0A2342]/50'}
              `} />

              {/* 3. CONTENT CONTAINER */}
              {/* ✅ THE TEXT REFLOW FIX: 
                  By giving this absolute container a fixed width (w-[85vw] lg:w-[500px]), 
                  the text never wraps or jumps. The expanding card just acts like a window 
                  sliding open to reveal it. 
              */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-[85vw] lg:w-[550px] flex flex-col justify-end">
                  
                  {/* Top Right Arrow (Only on Active) */}
                  <div className={`absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-3 rounded-full text-white shadow-lg transition-all duration-500 delay-100
                      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
                  `}>
                      <ArrowUpRight size={20} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl md:text-3xl font-montserrat font-bold text-white mb-2 transition-colors duration-500 line-clamp-2
                      ${isActive ? 'text-[#D4AF37]' : ''}
                  `}>
                      {project.title}
                  </h3>

                  {/* Expanded Content Details */}
                  <div className={`overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                      ${isActive ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                      <div className="flex flex-col gap-4 pt-2">
                          
                          {/* Tags */}
                          <div className="flex flex-wrap items-center gap-2">
                               {project.completion && (
                                 <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A2342]/80 border border-[#D4AF37]/30 backdrop-blur-sm">
                                    <CalendarClock size={12} className="text-[#D4AF37]" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">
                                        {project.completion}
                                    </span>
                                 </div>
                               )}
                               {project.location && (
                                 <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                                    <MapPin size={12} className="text-white" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                                        {project.location}
                                    </span>
                                 </div>
                               )}
                          </div>

                          {/* Description */}
                          <p className="text-white/80 text-xs md:text-sm line-clamp-2 leading-relaxed font-light">
                              {project.description}
                          </p>

                          {/* CTA Text */}
                          <div className="mt-1">
                              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors border-b border-transparent hover:border-[#D4AF37] pb-1">
                                  Explore Project <ArrowUpRight size={14} />
                              </span>
                          </div>
                      </div>
                  </div>

              </div>
          </Link>
        )
      })}
    </div>
  );
}