import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import type { Property } from "@/lib/cms";

function attrs(p: any) {
  return p?.attributes ?? p ?? {};
}

function formatPrice(price?: number | string, currency?: string): string {
  if (typeof price !== 'number') {
    return "Price on request";
  }
  return `${currency ?? '€'}${price.toLocaleString('en-US')}`;
}

export default function PropertyCard({ p }: { p: Property | any }) {
  const a = attrs(p);
  const img = a.images?.data?.[0]?.attributes?.url || "/placeholder.jpg";
  const slug: string = a.slug || String(p.id);

  return (
    <Link
      href={`/properties/${slug}`}
      className="group block rounded-xl overflow-hidden bg-white shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative bg-muted" style={{ aspectRatio: "16/10" }}>
        <Image
          src={img}
          alt={a.title ?? "Property"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        {a.status && (
          <div className="absolute top-3 right-3 text-xs font-semibold uppercase tracking-wider rounded-md bg-white/90 backdrop-blur-sm px-2.5 py-1 shadow-sm">
            {String(a.status).replace("-", " ")}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
            <h3 className="font-semibold font-display tracking-tight text-lg text-navy pr-2 line-clamp-1">{a.title ?? "Untitled Property"}</h3>
            <div className="text-md font-semibold text-gold whitespace-nowrap">
                {formatPrice(a.price, a.currency)}
            </div>
        </div>
        <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5 line-clamp-1">
          <MapPin size={14} />
          <span>{a.city ?? "Exclusive Location"}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-muted/80 flex items-center gap-x-4 text-sm text-foreground">
          {a.bedrooms != null && <span className="inline-flex items-center gap-1.5"><BedDouble size={16} className="text-muted-foreground"/> {a.bedrooms}</span>}
          {a.bathrooms != null && <span className="inline-flex items-center gap-1.5"><Bath size={16} className="text-muted-foreground"/> {a.bathrooms}</span>}
          {a.area != null && <span className="inline-flex items-center gap-1.5"><Ruler size={16} className="text-muted-foreground"/> {a.area} m²</span>}
        </div>
      </div>
    </Link>
  );
}