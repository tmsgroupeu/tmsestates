/* FULL REPLACEMENT: src/components/sections/MarketInsights.tsx */
"use client";

import { fetchProperties, Property } from "@/lib/cms";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function MarketInsights() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function loadProperties() {
      const { data } = await fetchProperties({ "pagination[pageSize]": "12", "sort[0]": "createdAt:desc" });
      const items = data || [];
      const safeLoopData = items.length > 0 && items.length < 8 ? [...items, ...items, ...items] : items;
      
      setProperties(safeLoopData);
    }
    loadProperties();
  }, []);

  if (!properties.length) return null;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4">
      {/* 
         HUD / Filmstrip Style
         - Cards are transparent glass
         - Speed is slow and smooth 
      */}
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        navigation={true}
        // Base view for mobile
        slidesPerView={1.2}
        centeredSlides={true}
        spaceBetween={20}
        speed={1000} // Smooth swipe
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1400: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="!pb-12 px-4" // Padding for hover effects/shadows
      >
        {properties.map((p) => (
          <SwiperSlide key={p.id} className="h-auto pb-10 pt-4 px-2"> 
             {/* 
                ✅ FIX: Removed the 'apple-glass' wrapper div entirely.
                Added padding to SwiperSlide so the Card's shadow isn't cut off.
                The PropertyCard component handles its own beautiful white rounded styling.
             */}
             <div className="h-full">
               <PropertyCard p={p} />
             </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
