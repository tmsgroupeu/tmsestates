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
    <section className="relative z-10 mx-auto max-w-7xl px-6">
      {/* Header Floating on Glass/Video */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
          <Crown className="h-3 w-3 text-[var(--gold)]" />
          The Collection
        </div>
        <h2 className="mt-4 text-3xl font-bold font-montserrat text-white drop-shadow-lg md:text-4xl">
          Exclusive Mandates
        </h2>
      </div>

      {/* Cards: Solid White for Readability */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const img = firstImageUrl(item);
          return (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Link href={`/properties/${item.slug}`} className="absolute inset-0 z-10" />
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
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
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] group-hover:text-[var(--navy)] transition-colors">
                  View Residence →
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
