import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import type { Property } from "@/lib/cms";
import { getStrapiMediaUrl } from "@/lib/media";

export default function PropertyCard({ p }: { p: Property }) {
  const imgUrl = getStrapiMediaUrl(p.images?.[0]);

  return (
    <Link
      href={`/properties/${p.slug}`}
      // ✅ FIX: Enforce bg-white and shadow to fix "missing info" visibility issues
      className="group block h-full w-full overflow-hidden rounded-xl bg-white text-[color:var(--navy)] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
        <Image
          src={imgUrl}
          alt={p.title || "Property"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Status Badge */}
        {p.status && (
          <div className="absolute top-3 right-3 rounded-md bg-white/95 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--navy)] shadow-sm backdrop-blur-sm">
            {p.status.replace(/-/g, " ")}
          </div>
        )}
      </div>

      {/* Content Container - ensuring high contrast text */}
      <div className="flex h-full flex-col p-5">
        <div className="flex-grow space-y-2">
          <h3 className="font-montserrat text-[17px] font-bold leading-snug text-[var(--navy)] line-clamp-2 group-hover:text-[var(--gold)] transition-colors">
            {p.title || "Untitled Property"}
          </h3>

          {p.city && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <MapPin className="h-3.5 w-3.5 text-[var(--gold)]" />
              <span>{p.city}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-600">
          <div className="flex items-center gap-4">
            {p.bedrooms && (
              <span className="flex items-center gap-1.5" title="Bedrooms">
                <BedDouble className="h-4 w-4 text-gray-400" /> {p.bedrooms}
              </span>
            )}
            {p.bathrooms && (
              <span className="flex items-center gap-1.5" title="Bathrooms">
                <Bath className="h-4 w-4 text-gray-400" /> {p.bathrooms}
              </span>
            )}
            {p.area && (
              <span className="flex items-center gap-1.5" title="Area">
                <Ruler className="h-4 w-4 text-gray-400" /> {p.area} m²
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}