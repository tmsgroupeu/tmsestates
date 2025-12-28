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
          <SwiperSlide key={p.id} className="h-auto">
             {/* 
                We modify the styling logic by wrapping the card. 
                Using a blur container so the card pops off the video.
             */}
             <div className="apple-glass rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
               {/* 
                 Note: We reuse the PropertyCard, but ideally PropertyCard should detect 
                 if it's on a dark background. Since it has a white bg, it works well as 
                 a 'Polaroid' style on the glass. 
               */}
               <PropertyCard p={p} />
             </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
