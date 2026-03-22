/* FULL REPLACEMENT: src/components/PropertyCard.tsx */
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Ruler, MapPin, ArrowUpRight } from "lucide-react";
import type { Property } from "@/lib/cms";
import { getStrapiMediaUrl } from "@/lib/media";

const formatPrice = (price?: number, currency = 'EUR') => {
  if (!price) return 'Price Upon Request';
  return new Intl.NumberFormat('en-IE', {
    style: 'currency', currency: currency, maximumFractionDigits: 0
  }).format(price);
};

export default function PropertyCard({ p }: { p: Property }) {
  const imgUrl = getStrapiMediaUrl(p.images?.[0]);
  const tag = p.marketing_tags; // The new label

  return (
    <Link
      href={`/properties/${p.slug}`}
      className="group relative block w-full overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(10,35,66,0.15)] flex flex-col border border-gray-100/50"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={imgUrl}
          alt={p.title || "Property"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
        />

        {/* Shine Effect */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
             <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
        </div>

        {/* ✅ NEW DYNAMIC TAG (Top Right) */}
        {tag && (
          <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#0A2342] text-white shadow-lg border border-white/10 z-20">
            {tag.replace(/_/g, ' ')}
          </div>
        )}
        
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
      </div>

      <div className="relative flex flex-col p-6 bg-white h-full justify-between">
        <div>
            {/* Eyebrow: Type + City */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    <span className="truncate max-w-[120px]">{p.propertyType || 'Residence'}</span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1">
                        <MapPin size={10} />
                        <span className="truncate max-w-[100px]">{p.city}</span>
                    </div>
                </div>
                <div className="text-[#0A2342] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowUpRight size={18} />
                </div>
            </div>

            <h3 className="font-montserrat text-lg font-bold leading-snug text-[#0A2342] line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
              {p.title}
            </h3>
            
            {/* Price (or "Upon Request") */}
            <p className="text-sm font-medium text-gray-500 mt-2">
               {formatPrice(p.price, p.currency)}
            </p>
        </div>

        <div className="w-full h-px bg-gray-100 mt-6 mb-4" />

        <div className="flex items-center gap-6 text-xs font-medium text-gray-500">
            {p.bedrooms && (
                <div className="flex items-center gap-2">
                    <BedDouble size={16} className="text-[#D4AF37]" />
                    <span className="text-[#0A2342] font-bold">{p.bedrooms}</span> Beds
                </div>
            )}
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