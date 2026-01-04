/* FULL REPLACEMENT: src/components/sections/MarketInsights.tsx */
"use client";

import { fetchProperties, Property } from "@/lib/cms";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from "@/i18n/routing"; // Use i18n Link
import { ArrowRight } from "lucide-react";
import 'swiper/css';
import 'swiper/css/navigation';

export default function MarketInsights() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function loadProperties() {
      const { data } = await fetchProperties({ "pagination[pageSize]": "12", "sort[0]": "createdAt:desc" });
      const items = data || [];
      // Ensure loop works smoothly
      const safeLoopData = items.length > 0 && items.length < 8 ? [...items, ...items, ...items] : items;
      setProperties(safeLoopData);
    }
    loadProperties();
  }, []);

  if (!properties.length) return null;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 flex flex-col items-center">
      
      {/* 1. THE CAROUSEL */}
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        navigation={true}
        slidesPerView={1.2}
        centeredSlides={true}
        spaceBetween={20}
        speed={1000} 
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1400: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="!pb-12 px-4 w-full"
      >
        {properties.map((p, idx) => (
          // Using idx in key to avoid dup keys in forced loop
          <SwiperSlide key={`${p.id}-${idx}`} className="h-auto pb-10 pt-4 px-2">
             <div className="h-full">
               <PropertyCard p={p} />
             </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 2. THE PORTFOLIO BUTTON */}
      <div className="mt-8 relative z-20">
        <Link 
            href="/properties"
            className="group inline-flex items-center gap-3 bg-white/90 backdrop-blur-md text-[#0A2342] px-10 py-4 rounded-full font-bold uppercase text-sm tracking-widest border border-white/20 hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] hover:-translate-y-1"
        >
            Our Portfolio
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  );
}