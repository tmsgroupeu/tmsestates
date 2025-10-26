/* Fully Updated: ./components/PropertyCard.tsx */

import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import type { Property } from "@/lib/cms";
import { getStrapiMediaUrl } from "@/lib/media";

function formatPrice(price?: number, currency = '€'): string {
  if (typeof price !== 'number' || price <= 0) return "Price on Request";
  return `${currency}${price.toLocaleString('en-US')}`;
}

export default function PropertyCard({ p }: { p: Property }) {
  // Get the URL from the very first image in the 'images' array.
  const imgUrl = getStrapiMediaUrl(p.images?.[0]);

  return (
    <Link
      href={`/properties/${p.slug}`}
      className="group block rounded-xl overflow-hidden bg-white shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <Image
          src={imgUrl}
          alt={p.title || "Luxury Property"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {p.status && (
          <div className="absolute top-3 right-3 text-xs font-semibold uppercase tracking-wider rounded-md bg-white/90 backdrop-blur-sm px-2.5 py-1.5 shadow-sm">
            {p.status.replace(/-/g, " ")}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col h-[180px]">
        <div className="flex-grow">
          <div className="flex justify-between items-start gap-3">
              <h3 className="font-semibold font-montserrat tracking-tight text-lg text-navy pr-2 line-clamp-2">{p.title || "Untitled Property"}</h3>
              <div className="text-md font-semibold text-gold whitespace-nowrap pt-0.5">
                  {formatPrice(p.price, p.currency)}
              </div>
          </div>
          {p.city && (
            <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5 line-clamp-1">
              <MapPin size={14} />
              <span>{p.city}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-muted/80 flex items-center gap-x-5 text-sm text-foreground">
          {p.bedrooms && <span className="inline-flex items-center gap-2"><BedDouble size={18} className="text-muted-foreground"/> {p.bedrooms}</span>}
          {p.bathrooms && <span className="inline-flex items-center gap-2"><Bath size={18} className="text-muted-foreground"/> {p.bathrooms}</span>}
          {p.area && <span className="inline-flex items-center gap-2"><Ruler size={18} className="text-muted-foreground"/> {p.area} m²</span>}
        </div>
      </div>
    </Link>
  );
}