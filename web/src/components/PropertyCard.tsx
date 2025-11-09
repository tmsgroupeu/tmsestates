// web/src/components/PropertyCard.tsx
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
      className="group block rounded-xl overflow-hidden bg-white shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <Image
          src={imgUrl}
          alt={p.title || "Luxury Property"}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 30vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {p.status && (
          <div className="absolute top-3 right-3 text-[9px] font-semibold uppercase tracking-[0.16em] rounded-md bg-white/92 backdrop-blur px-2.5 py-1.5 shadow-sm">
            {p.status.replace(/-/g, " ")}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        <div className="flex-grow space-y-1">
          <h3 className="font-montserrat font-semibold tracking-tight text-[17px] text-[color:var(--navy)] leading-snug line-clamp-2">
            {p.title || "Untitled Property"}
          </h3>

          {p.city && (
            <div className="flex items-center gap-1.5 text-xs text-[color:var(--muted-foreground)] line-clamp-1">
              <MapPin className="w-3 h-3 text-[color:var(--gold)]" />
              <span>{p.city}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-[color:var(--muted)]/80 flex items-center justify-between gap-3 text-[11px] text-[color:var(--foreground)]">
          <div className="flex items-center gap-4">
            {p.bedrooms && (
              <span className="inline-flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-[color:var(--muted-foreground)]" />
                {p.bedrooms}
              </span>
            )}
            {p.bathrooms && (
              <span className="inline-flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-[color:var(--muted-foreground)]" />
                {p.bathrooms}
              </span>
            )}
            {p.area && (
              <span className="inline-flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[color:var(--muted-foreground)]" />
                {p.area} m²
              </span>
            )}
          </div>
          <span className="hidden xs:inline-flex text-[10px] font-semibold text-[color:var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
