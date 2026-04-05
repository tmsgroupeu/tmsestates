/* NEW FILE: src/components/ProjectPageClient.tsx */
"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarClock, ChevronLeft, Building2, Download, Mail, X } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import PropertyCard from './PropertyCard';

const API_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337";

// --- Data Extractors ---
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
  
  // Extract clean data
  const title = p.Title || p.title || "Signature Development";
  const location = p.location || p.Location || p.city || p.City || "Cyprus";
  const completion = p.completionDate || p.CompletionDate || p.completionStatus || p.CompletionStatus || "Coming Soon";
  const rawDesc = p.Description || p.description;
  const description = extractText(rawDesc);
  
  const coverUrl = getSafeUrl(p.coverimage || p.coverImage || p.image) || '/assets/hero-poster.jpg';
  
  const rawGallery = getGalleryArray(p.gallery || p.Gallery);
  const galleryUrls = rawGallery.map((img: any) => getSafeUrl(img)).filter(Boolean);

  // Extract connected properties
  const connectedPropertiesRaw = p.properties?.data || p.properties ||[];
  const connectedProperties = Array.isArray(connectedPropertiesRaw) ? connectedPropertiesRaw :[];

  // Parallax Setup
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Lightbox State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F9F9F9] font-sans pb-32">
      
      {/* --- 1. HERO PARALLAX --- */}
      <div className="relative h-[75vh] w-full overflow-hidden bg-[#0A2342]">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 w-full h-full">
            <Image 
                src={coverUrl} 
                alt={title} 
                fill 
                priority
                className="object-cover object-center"
            />
            {/* Gradient to ensure text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342] via-[#0A2342]/40 to-transparent opacity-90" />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-24 md:pb-32">
            <div className="max-w-7xl mx-auto w-full">
                <Link href="/#properties" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors mb-6 backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                   <ChevronLeft size={14} /> Back to Projects
                </Link>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-bold text-white drop-shadow-xl max-w-4xl leading-[1.1] mb-6">
                    {title}
                </h1>
            </div>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 -mt-16">
          
          {/* --- 2. AT A GLANCE BAR --- */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
             className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 flex flex-wrap gap-8 items-center justify-between"
          >
             <div className="flex flex-wrap gap-8">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#0A2342]/5 flex items-center justify-center text-[#D4AF37]">
                        <MapPin size={18} />
                     </div>
                     <div>
                         <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Location</p>
                         <p className="text-sm font-bold text-[#0A2342]">{location}</p>
                     </div>
                 </div>
                 
                 <div className="hidden sm:block w-px h-10 bg-gray-100" />

                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#0A2342]/5 flex items-center justify-center text-[#D4AF37]">
                        <CalendarClock size={18} />
                     </div>
                     <div>
                         <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Status</p>
                         <p className="text-sm font-bold text-[#0A2342]">{completion}</p>
                     </div>
                 </div>

                 <div className="hidden md:block w-px h-10 bg-gray-100" />

                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#0A2342]/5 flex items-center justify-center text-[#D4AF37]">
                        <Building2 size={18} />
                     </div>
                     <div>
                         <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Available Units</p>
                         <p className="text-sm font-bold text-[#0A2342]">{connectedProperties.length} Residences</p>
                     </div>
                 </div>
             </div>

             <a href="#available-units" className="bg-[#0A2342] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors shadow-lg">
                View Availability
             </a>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20">
             
             {/* --- 3. THE STORY (Description) --- */}
             <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="lg:col-span-7 space-y-12"
             >
                 <div>
                     <h2 className="text-2xl font-montserrat font-bold text-[#0A2342] mb-8 flex items-center gap-3">
                         <span className="w-8 h-[2px] bg-[#D4AF37]" /> The Vision
                     </h2>
                     <div className="prose prose-lg prose-slate max-w-none text-gray-600 font-light leading-relaxed whitespace-pre-line">
                        {description ? (
                            <ReactMarkdown>{description}</ReactMarkdown>
                        ) : (
                            <p>Exclusive details and full project vision are available upon request during a private consultation.</p>
                        )}
                     </div>
                 </div>
             </motion.div>

             {/* --- 4. CAROUSEL RIBBON GALLERY --- */}
             <div className="lg:col-span-5 space-y-4">
                 {galleryUrls.length > 0 ? (
                     <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                         {galleryUrls.map((url, i) => (
                             <motion.div 
                                key={url}
                                layoutId={`gallery-${url}`}
                                onClick={() => setSelectedImage(url)}
                                className="relative flex-none w-64 aspect-[4/5] rounded-3xl overflow-hidden shadow-md bg-gray-200 snap-center cursor-pointer will-change-transform"
                             >
                                <Image src={url} alt={`Gallery ${i}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-700 pointer-events-none" />
                             </motion.div>
                         ))}
                     </div>
                 ) : (
                     <div className="aspect-[4/3] rounded-3xl bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                         Gallery images coming soon.
                     </div>
                 )}
                 {galleryUrls.length > 1 && (
                     <p className="text-right text-[10px] uppercase font-bold tracking-widest text-gray-400 pt-2 flex items-center justify-end gap-2">
                        ← Swipe to explore
                     </p>
                 )}
             </div>

          </div>

          {/* --- 5. AVAILABLE RESIDENCES (Connected Properties) --- */}
          <div id="available-units" className="mt-32 pt-20 border-t border-gray-200">
              <div className="mb-12">
                  <h2 className="text-3xl font-montserrat font-bold text-[#0A2342]">Available Residences</h2>
                  <p className="text-gray-500 mt-2">Explore the individual units currently available within {title}.</p>
              </div>

              {connectedProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {connectedProperties.map((rawProp: any) => {
                          const propData = rawProp.attributes || rawProp;
                          // Standardize ID and Slug for the Card component
                          propData.id = rawProp.id;
                          return <PropertyCard key={propData.id} p={propData} />;
                      })}
                  </div>
              ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                          <Building2 size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-[#0A2342]">Units Pending Release</h3>
                      <p className="text-gray-500 mt-2 max-w-md mx-auto">
                          Specific residences for this project are currently being prepared for release. Register your interest to receive the floorplans first.
                      </p>
                  </div>
              )}
          </div>

          {/* --- 6. CTA BANNER --- */}
          <div className="mt-32 bg-[#0A2342] rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">Request the Full Brochure</h2>
                  <p className="text-white/70 max-w-xl mx-auto mb-10">
                      Receive complete floorplans, pricing matrices, and technical specifications for {title} directly to your inbox.
                  </p>
                  <a href={`mailto:info@tmsestates.com?subject=Inquiry regarding ${title}`} className="inline-flex items-center gap-3 bg-[#D4AF37] text-[#0A2342] px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105">
                     <Mail size={16} /> Contact Sales Team
                  </a>
              </div>
          </div>

      </div>

      {/* --- LIGHTBOX OVERLAY --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
             <button title="Close overlay" className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white z-[60] bg-black/50 p-4 rounded-full transition-colors backdrop-blur-sm">
                <X size={24} />
             </button>
             <motion.div 
                layoutId={`gallery-${selectedImage}`}
                className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center pointer-events-none"
             >
                <Image src={selectedImage} alt="Expanded preview" fill sizes="100vw" className="object-contain" priority />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}