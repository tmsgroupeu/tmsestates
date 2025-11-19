// UPDATED: src/components/sections/MarketInsights.tsx

"use client"; // This component is now interactive and must be a client component.

import { fetchProperties, Property } from "@/lib/cms";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import Section from "@/components/Section";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function MarketInsights() {
  // We now fetch data client-side because the component is interactive
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function loadProperties() {
      const { data } = await fetchProperties({
        "pagination[pageSize]": "12",
        "sort[0]": "createdAt:desc",
      });
      setProperties(data || []);
    }
    loadProperties();
  }, []);

  if (!properties.length) {
    // You can add a loading skeleton here if you like
    return null;
  }

  return (
    <Section
      id="featured"
      title="Selected Listings"
      subtitle="Explore a rotating selection of hand-picked properties from our portfolio."
    >
      <div className="relative mx-auto max-w-7xl">
        <Swiper
          modules={[Autoplay, Navigation]}
          // --- Carousel Settings ---
          loop={true} // ✅ Enables the infinite loop
          navigation={true} // ✅ Enables the navigation arrows
          slidesPerView={1} // Base for mobile
          spaceBetween={16}
          // Autoplay settings
          autoplay={{
            delay: 4000, // Time between slides
            disableOnInteraction: false, // Autoplay resumes after user interaction
            pauseOnMouseEnter: true, // Pauses when the user hovers over the carousel
          }}
          // Responsive breakpoints
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="!pb-4" // Add some padding for shadow visibility
        >
          {properties.map((p) => (
            <SwiperSlide key={p.id}>
              {/* The PropertyCard is styled to have h-full for consistent height */}
              <PropertyCard p={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}