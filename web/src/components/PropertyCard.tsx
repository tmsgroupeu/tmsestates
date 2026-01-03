/* FULL REPLACEMENT: src/components/PropertyCard.tsx */
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin, Crown } from "lucide-react";
import type { Property } from "@/lib/cms";
import { getStrapiMediaUrl } from "@/lib/media";

// Helper to format price
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

  return (
    <Link
      href={`/properties/${p.slug}`}
      className="group block h-full w-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden shrink-0">
        <Image
          src={imgUrl}
          alt={p.title || "Property"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* VIP Badge */}
        {showVipBadge && p.vip && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#D4AF37] px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm z-10">
            <Crown className="h-3 w-3" /> VIP
          </div>
        )}

        {/* Status Badge - Using 'prop_status' */}
        {/* Only show status if it's NOT 'for-sale' or 'for-rent' (e.g. show Sold/Rented) */}
        {p.prop_status && p.prop_status !== 'for-sale' && p.prop_status !== 'for-rent' && (
           <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
             {p.prop_status.toUpperCase()}
           </div>
        )}
      </div>

      {/* Details Section */}
      <div className="flex flex-col p-5 h-full">
        
        {/* Type & City */}
        <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
           {p.propertyType?.replace(/-/g, ' ') || 'Residence'}
           <span className="text-gray-300">•</span>
           {p.city}
        </div>

        {/* Title */}
        <h3 className="font-montserrat text-lg font-bold leading-snug text-[#0A2342] line-clamp-1 mb-1 group-hover:text-[#D4AF37] transition-colors">
          {p.title}
        </h3>

        {/* Price */}
        <p className="text-sm font-medium text-gray-500 mb-4">
           {formatPrice(p.price, p.currency)}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 my-auto" />

        {/* Stats Row */}
        <div className="flex items-center justify-between pt-4 mt-auto text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-4">
            {p.bedrooms && (
              <div className="flex items-center gap-1.5" title="Bedrooms">
                <BedDouble className="h-4 w-4 text-[#D4AF37]/80" /> 
                <span>{p.bedrooms}</span>
              </div>
            )}
            {p.bathrooms && (
              <div className="flex items-center gap-1.5" title="Bathrooms">
                <Bath className="h-4 w-4 text-[#D4AF37]/80" /> 
                <span>{p.bathrooms}</span>
              </div>
            )}
            {p.area && (
              <div className="flex items-center gap-1.5" title="Covered Area">
                <Ruler className="h-4 w-4 text-[#D4AF37]/80" /> 
                <span>{p.area} m²</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}