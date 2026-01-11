/* FULL REPLACEMENT: src/components/PropertyCard.tsx */
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Ruler, MapPin, Crown, ArrowUpRight } from "lucide-react";
import type { Property } from "@/lib/cms";
import { getStrapiMediaUrl } from "@/lib/media";

// Helper to format price elegantly
const formatPrice = (price?: number, currency = 'EUR') => {
  if (!price) return 'Price Upon Request';
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function PropertyCard({ p, showVipBadge = false }: { p: Property; showVipBadge?: boolean }) {
  const imgUrl = getStrapiMediaUrl(p.images?.[0]);

  // Determine Label Colors based on status
  const isSold = p.prop_status === 'sold' || p.prop_status === 'rented';
  const statusLabel = p.prop_status ? p.prop_status.replace('-', ' ') : 'Listing';

  return (
    <Link
      href={`/properties/${p.slug}`}
      className="group relative block h-full w-full overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(10,35,66,0.15)] flex flex-col border border-gray-100/50"
    >
      {/* 
         ✨ IMAGE CONTAINER 
         Aspect ratio optimized for modern displays (4:3)
      */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        
        {/* The Image */}
        <Image
          src={imgUrl}
          alt={p.title || "Property"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110 ${isSold ? 'grayscale opacity-80' : ''}`}
        />

        {/* 
           ✨ LUXURY SHINE EFFECT
           Only visible on hover. A sleek light reflection.
        */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
             <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
        </div>

        {/* 
           🏷️ BADGES LAYER 
        */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20">
            
            {/* LEFT: VIP (If applicable) */}
            <div>
              {(p.vip || showVipBadge) && (
                <div className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-md border border-white/20">
                  <Crown size={12} fill="currentColor" />
                  <span>Exclusive</span>
                </div>
              )}
            </div>

            {/* RIGHT: STATUS (Sale/Rent/Sold) */}
            {/* We always show this to clarify the offering */}
            {p.prop_status && (
              <div className={`
                 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-md border border-white/20
                 ${isSold ? 'bg-red-600 text-white' : 'bg-[#0A2342]/90 text-white'}
              `}>
                {statusLabel}
              </div>
            )}
        </div>
        
        {/* Bottom Gradient for Contrast (optional, keeps image clean) */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
      </div>

      {/* 
         📝 INFO CONTAINER 
         Designed for high readability and elegance
      */}
      <div className="relative flex flex-col p-6 h-full bg-white">
        
        {/* 1. EYEBROW: Location & Type */}
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                <span className="truncate max-w-[120px]">{p.propertyType || 'Residence'}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1">
                    <MapPin size={10} />
                    <span className="truncate max-w-[100px]">{p.city}</span>
                </div>
            </div>
            
            {/* Tiny Arrow Icon on Hover */}
            <div className="text-[#0A2342] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
               <ArrowUpRight size={18} />
            </div>
        </div>

        {/* 2. TITLE */}
        <h3 className="font-montserrat text-lg font-bold leading-snug text-[#0A2342] mb-2 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
          {p.title}
        </h3>

        {/* 3. PRICE */}
        <div className="text-xl font-medium text-[#0A2342] mb-6">
           {formatPrice(p.price, p.currency)}
           {p.prop_status === 'for-rent' && <span className="text-xs text-gray-400 font-normal ml-1">/ month</span>}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 mb-4 mt-auto" />

        {/* 4. STATS (Beds & Area) */}
        <div className="flex items-center gap-6 text-xs font-medium text-gray-500">
            {/* Bedrooms */}
            {p.bedrooms && (
                <div className="flex items-center gap-2">
                    <BedDouble size={16} className="text-[#D4AF37]" />
                    <span className="text-[#0A2342] font-bold">{p.bedrooms}</span> Beds
                </div>
            )}
            
            {/* Area */}
            {p.area && (
                <div className="flex items-center gap-2">
                    <Ruler size={16} className="text-[#D4AF37]" />
                    <span className="text-[#0A2342] font-bold">{p.area}</span> m²
                </div>
            )}
        </div>

      </div>
    </Link>
  );
}
