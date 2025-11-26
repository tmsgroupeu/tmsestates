import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import { headers } from "next/headers";

export const revalidate = 0;

// ... Types ...
type StrapiItem = {
  id: number;
  title?: string;
  slug: string;
  address?: string;
  city?: string;
  vip?: boolean;
  images?: { url: string; alternativeText?: string }[];
};
type StrapiResponse = { data: StrapiItem[] };

const API_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL;
const asUrl = (u?: string) => (!u ? "" : u.startsWith("http") ? u : `${API_URL}${u}`);
function firstImageUrl(item?: StrapiItem): string {
  return item?.images?.length ? asUrl(item.images[0].url) : "";
}

async function fetchVip(): Promise<StrapiItem[]> {
  if (!API_URL) return [];
  const params = new URLSearchParams({
    "filters[vip][$eq]": "true",
    populate: "*",
    sort: "updatedAt:desc",
  });
  try {
    const res = await fetch(`${API_URL}/api/properties?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) return [];
    const json: StrapiResponse = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function ExclusiveMandates() {
  headers();
  const items = await fetchVip();
  if (!items?.length) return null;

  return (
    <div className="w-full">
      {/* Header: White text for Glass effect */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md shadow-sm">
            <Crown className="h-3.5 w-3.5 text-[color:var(--gold)]" />
            Exclusive Mandates
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white drop-shadow-lg md:text-4xl">
            Our Premiere Collection
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/80 drop-shadow-md">
            A confidential portfolio of exceptional residences entrusted solely to TMS Estates.
          </p>
        </div>
      </div>

      {/* ✅ FIX: Grid layout restored so cards aren't huge */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const img = firstImageUrl(item);
          return (
            <article
              key={item.id}
              // ✅ FIX: White background restored for the card itself
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Link href={`/properties/${item.slug}`} className="absolute inset-0 z-10" />
              
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                {img && (
                  <Image
                    src={img}
                    alt={item.title || "Property"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--gold)] px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm">
                  <Crown className="h-3 w-3" /> VIP
                </div>
              </div>

              <div className="relative p-5">
                <h3 className="line-clamp-1 text-lg font-bold text-[var(--navy)]">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                  {item.address || item.city || "Cyprus"}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--gold)]">
                  View Details →
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}