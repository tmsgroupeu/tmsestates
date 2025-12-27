/* UPDATED: src/components/ai/MiniPropertyCard.tsx */
"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Ruler, ArrowRight } from "lucide-react";

interface MiniPropertyProps {
  data: {
    title: string;
    city: string;
    slug: string;
    imageUrl: string;
    bedrooms?: number;
    area?: number;
  };
}

export default function MiniPropertyCard({ data }: MiniPropertyProps) {
  // 🛡️ SAFETY CHECKS: Ensure we never render an Object directly
  // This prevents the "Minified React Error #130"
  
  const safeTitle = typeof data.title === 'string' ? data.title : 'Exclusive Property';
  const safeCity = typeof data.city === 'string' ? data.city : 'Cyprus';
  const safeSlug = typeof data.slug === 'string' ? data.slug : '#';
  const safeImage = typeof data.imageUrl === 'string' ? data.imageUrl : '/placeholder.jpg';
  
  // Ensure numbers are valid numbers (not objects or nulls)
  const safeBeds = (typeof data.bedrooms === 'number' || typeof data.bedrooms === 'string') ? data.bedrooms : null;
  const safeArea = (typeof data.area === 'number' || typeof data.area === 'string') ? data.area : null;

  // If slug is missing or invalid, don't render a broken card
  if (safeSlug === '#') return null;

  return (
    <Link 
      href={`/properties/${safeSlug}`}
      className="block w-full max-w-[280px] bg-white/10 border border-white/10 rounded-xl overflow-hidden hover:bg-white/20 transition-all group my-3 shadow-lg"
    >
      {/* Image Header */}
      <div className="relative h-32 w-full bg-navy/50">
        <Image 
          src={safeImage} 
          alt={safeTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="280px"
        />
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold uppercase tracking-wider border border-white/10">
            View
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="text-sm font-bold text-white leading-tight line-clamp-1 font-montserrat">
            {safeTitle}
        </h4>
        
        <div className="flex items-center gap-1 mt-1 text-white/60 text-xs">
            <MapPin size={10} className="text-[#D4AF37]" />
            <span>{safeCity}</span>
        </div>

        {/* Specs Grid */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10">
            {safeBeds && (
                <div className="flex items-center gap-1 text-[10px] text-white/80">
                    <BedDouble size={12} /> {safeBeds} Bed
                </div>
            )}
            {safeArea && (
                <div className="flex items-center gap-1 text-[10px] text-white/80">
                    <Ruler size={12} /> {safeArea}m²
                </div>
            )}
            <div className="ml-auto">
                <ArrowRight size={12} className="text-[#D4AF37] -rotate-45 group-hover:rotate-0 transition-transform" />
            </div>
        </div>
      </div>
    </Link>
  );
}