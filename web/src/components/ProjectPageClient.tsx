/* FULL REPLACEMENT: src/components/ProjectPageClient.tsx */
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarClock, ChevronLeft, ChevronRight, Building2, X } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import PropertyCard from './PropertyCard';

const API_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337";

const getSafeUrl = (data: any) => {
  if (!data) return null;
  const item = Array.isArray(data) ? data[0] : (data.data ? (Array.isArray(data.data) ? data.data[0] : data.data) : data);
  if (!item) return null;
  const url = item.attributes?.url || item.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `${API_URL}${url}`;
};

const extractText = (desc: any): string => {
  if (!desc) return "";
  if (typeof desc === 'string') return desc;
  if (Array.isArray(desc)) {
    try {
      return desc.map((block: any) => block.children?.map((child: any) => child.text).join(" ")).join("\n\n");
    } catch(e) { return ""; }
  }
  return "";
};

const getGalleryArray = (galleryData: any) => {
    if (!galleryData) return[];
    const items = galleryData.data || galleryData;
    if (!Array.isArray(items)) return [items];
    return items;
};

export default function ProjectPageClient({ project }: { project: any }) {
  const p = project.attributes || project;
  
  const title = p.Title || p.title || "Signature Development";
  const location = p.location || p.Location || p.city || p.City || "Cyprus";
  const completion = p.completionDate || p.CompletionDate || p.completionStatus || p.CompletionStatus || "Coming Soon";
  const rawDesc = p.Description || p.description;
  const description = extractText(rawDesc);
  
  const coverUrl = getSafeUrl(p.coverimage || p.coverImage || p.image) || '/assets/hero-poster.jpg';
  
  const rawGallery = getGalleryArray(p.gallery || p.Gallery);
  const galleryUrls = rawGallery.map((img: any) => getSafeUrl(img)).filter(Boolean);

  const connectedPropertiesRaw = p.properties?.data || p.properties || [];
  const connectedProperties = Array.isArray(connectedPropertiesRaw) ? connectedPropertiesRaw : [];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // --- CAROUSEL LOGIC ---
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || galleryUrls.length === 0) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
         const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
         // If we are at the end, smoothly scroll back to the start
         if (carouselRef.current.scrollLeft >= maxScroll - 10) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
         } else {
            // Otherwise, jump forward by roughly half a screen length, aligning to the next snap point natively
            carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth * 0.4, behavior: 'smooth' });
         }
      }
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovered, galleryUrls]);

  const handleScrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -(carouselRef.current.clientWidth * 0.6), behavior: 'smooth' });
  };
  const handleScrollRight = () => {
    carouselRef.current?.scrollBy({ left: (carouselRef.current.clientWidth * 0.6), behavior: 'smooth' });
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F0F2F5] font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#0A2342]">
      
      {/* --- 1. HERO REVEAL & PARALLAX --- */}
      <motion.div 
        initial={{ clipPath: "inset(15% 10% 15% 10% round 2rem)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0rem)" }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        className="relative h-[85vh] w-full overflow-hidden bg-[#0A2342]"
      >
        <motion.div 
          style={{ y: yHero }} 
          className="absolute inset-0 w-full h-full"
        >
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full h-full"
            >
              <Image 
                  src={coverUrl} 
                  alt={title} 
                  fill 
                  priority
                  className="object-cover object-center opacity-80"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342] via-[#0A2342]/40 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-40">
            <div className="max-w-screen-2xl mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="max-w-5xl"
                >
                  <Link href="/properties" className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/50 hover:text-[#D4AF37] transition-colors mb-6">
                     <ChevronLeft size={16} /> The Portfolio
                  </Link>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-playfair font-bold text-white drop-shadow-2xl leading-[1.15] mb-6 w-full">
                      {title}
                  </h1>
                </motion.div>
            </div>
        </div>
      </motion.div>

      {/* --- 2. THE ANCHOR (Sticky Stats Bar) --- */}
      <div className="relative z-40 w-full px-4 md:px-12 max-w-screen-2xl mx-auto -mt-20 sticky top-32 pointer-events-none">
          <motion.div 
             initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease: [0.25, 1, 0.5, 1] }}
             className="w-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row flex-wrap gap-8 items-center justify-between pointer-events-auto border border-white shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
          >
             <div className="flex flex-wrap gap-8 md:gap-16 w-full md:w-auto">
                 <div>
                     <p className="text-[9px] uppercase tracking-[0.2em] text-[#0A2342]/40 font-bold mb-1">Destination</p>
                     <p className="text-xl md:text-2xl font-playfair font-semibold text-[#0A2342] flex items-center gap-2"><MapPin size={18} className="text-[#D4AF37]" />{location}</p>
                 </div>
                 <div className="hidden md:block w-px h-12 bg-black/5" />
                 <div>
                     <p className="text-[9px] uppercase tracking-[0.2em] text-[#0A2342]/40 font-bold mb-1">Status</p>
                     <p className="text-xl md:text-2xl font-playfair font-semibold text-[#0A2342] flex items-center gap-2"><CalendarClock size={18} className="text-[#D4AF37]" />{completion}</p>
                 </div>
                 <div className="hidden md:block w-px h-12 bg-black/5" />
                 <div>
                     <p className="text-[9px] uppercase tracking-[0.2em] text-[#0A2342]/40 font-bold mb-1">Scale</p>
                     <p className="text-xl md:text-2xl font-playfair font-semibold text-[#0A2342]">{connectedProperties.length} Residences</p>
                 </div>
             </div>

             <a href="#available-units" className="group relative overflow-hidden bg-[#0A2342] text-white px-10 py-5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-[0_15px_40px_rgba(10,35,66,0.25)] w-full md:w-auto text-center isolate">
                <span className="relative z-10 transition-colors group-hover:text-[#D4AF37]">Explore Availability</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:transition-transform group-hover:duration-700 group-hover:translate-x-[150%] z-0" />
             </a>
          </motion.div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pb-32">
          
          {/* --- 3. THE VISION (Editorial Text) --- */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mt-32 md:mt-48 mb-32 md:mb-60 max-w-6xl mx-auto items-start">
             
             <motion.div 
               initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }}
               className="lg:w-1/3 flex-shrink-0 sticky top-48"
             >
                <div className="w-12 h-[2px] bg-[#D4AF37] mb-8" />
                <h2 className="text-4xl md:text-6xl font-montserrat font-bold text-[#0A2342] leading-[1.1]">
                   The Vision
                </h2>
                <p className="mt-6 text-[#0A2342]/50 font-playfair text-2xl italic">A lifestyle redefined.</p>
             </motion.div>

             <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                 className="lg:w-2/3"
             >
                 {description ? (
                    <div className="prose prose-xl md:prose-2xl prose-slate max-w-none text-[#0A2342]/80 font-light leading-[2.2] whitespace-pre-line tracking-wide 
                                    first-letter:float-left first-letter:text-8xl first-letter:font-playfair first-letter:text-[#D4AF37] first-letter:mr-6 first-letter:-mt-2 first-letter:leading-none">
                       <ReactMarkdown>{description}</ReactMarkdown>
                    </div>
                 ) : (
                    <p className="text-3xl font-light text-[#0A2342]/50 italic font-playfair">Exclusive details and specific architectural vision are available upon request during a private consultation.</p>
                 )}
             </motion.div>
          </div>

          {/* --- 4. AUTO-SCROLLING DISCRETE CAROUSEL --- */}
          {galleryUrls.length > 0 && (
             <div className="mb-32 md:mb-60 w-full overflow-hidden">
                <div className="flex items-center justify-between gap-4 mb-10 max-w-6xl mx-auto px-6">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-[2px] bg-[#D4AF37]" />
                      <h2 className="text-2xl md:text-4xl font-montserrat font-bold text-[#0A2342]">Gallery Overview</h2>
                   </div>
                   
                   {/* NAV BUTTONS */}
                   <div className="hidden sm:flex items-center gap-3">
                       <button onClick={handleScrollLeft} className="w-12 h-12 rounded-full border border-[#0A2342]/10 flex items-center justify-center text-[#0A2342] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-white transition-colors duration-300">
                          <ChevronLeft size={20} />
                       </button>
                       <button onClick={handleScrollRight} className="w-12 h-12 rounded-full border border-[#0A2342]/10 flex items-center justify-center text-[#0A2342] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-white transition-colors duration-300">
                          <ChevronRight size={20} />
                       </button>
                   </div>
                </div>
                
                <div 
                  className="relative w-full group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                   <div 
                      ref={carouselRef}
                      className="flex gap-6 md:gap-10 items-center overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide px-6 md:px-12 w-full"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                   >
                      {galleryUrls.map((url, i) => {
                          const isPortrait = i % 3 === 1;
                          const isSquare = i % 3 === 2;

                          let aspectClass = "w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] aspect-[16/9]";
                          if (isPortrait) aspectClass = "w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw] aspect-[4/5]";
                          else if (isSquare) aspectClass = "w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] aspect-square";

                          return (
                             <div 
                               key={`${url}-${i}`}
                               className={`relative ${aspectClass} rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex-shrink-0 cursor-zoom-in group/item hover:opacity-90 transition-opacity duration-300 snap-center`}
                               onClick={() => setSelectedImage(url)}
                             >
                                <Image 
                                   src={url}
                                   alt={`Gallery item ${i}`}
                                   fill
                                   sizes="(max-width: 768px) 80vw, 40vw"
                                   className="object-cover transition-transform duration-[1500ms] group-hover/item:scale-105"
                                />
                             </div>
                          );
                      })}
                   </div>
                </div>
             </div>
          )}

          {/* --- 5. AVAILABLE RESIDENCES --- */}
          <div id="available-units" className="scroll-mt-48 relative max-w-6xl mx-auto">
              
              <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 className="flex flex-col items-center text-center mb-24"
              >
                  <span className="text-[#D4AF37] mb-8">
                     <Building2 size={40} strokeWidth={1} />
                  </span>
                  <h2 className="text-4xl md:text-6xl font-playfair mb-6 text-[#0A2342]">Available Residences</h2>
                  <p className="text-[#0A2342]/60 max-w-xl mx-auto font-light leading-relaxed text-lg">
                     Explore the individual units currently available within the highly anticipated {title} development.
                  </p>
              </motion.div>

              {connectedProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
                      {connectedProperties.map((rawProp: any, index: number) => {
                          const propData = rawProp.attributes || rawProp;
                          propData.id = rawProp.id;
                          return (
                             <motion.div
                               key={propData.id}
                               initial={{ opacity: 0, y: 40 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true, margin: "-50px" }}
                               transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                             >
                                <PropertyCard p={propData} />
                             </motion.div>
                          );
                      })}
                  </div>
              ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-[#0A2342] rounded-[3rem] p-16 md:p-32 text-center shadow-2xl relative overflow-hidden isolate"
                  >
                      <div className="absolute inset-0 bg-[url('/assets/hero-poster.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity grayscale" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342] via-[#0A2342]/80 to-transparent" />
                      
                      <div className="relative z-10">
                          <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-10 border border-[#D4AF37]/30 text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                              <Building2 size={32} />
                          </div>
                          <h3 className="text-3xl md:text-5xl font-playfair text-white mb-6">Pending Release</h3>
                          <p className="text-white/60 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                              Specific residences for this signature development are currently being prepared for exclusive release to our VIP inner circle.
                          </p>
                      </div>
                  </motion.div>
              )}
          </div>
      </div>

      {/* --- LIGHTBOX OVERLAY --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A2342]/80 p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
             <button title="Close overlay" className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-[#D4AF37] z-[60] bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-full transition-all flex items-center gap-2 group">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] hidden md:block opacity-0 group-hover:opacity-100 transition-opacity -mr-2">Close</span>
                <X size={20} />
             </button>
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full max-w-screen-2xl max-h-[90vh] flex items-center justify-center pointer-events-none"
             >
                <Image src={selectedImage} alt="Expanded preview" fill sizes="100vw" className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" priority />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}