import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import { headers } from "next/headers";

export const revalidate = 0;

// Update the types to reflect the flat structure
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

const asUrl = (u?: string) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return `${API_URL}${u}`;
};

function firstImageUrl(item?: StrapiItem): string {
  if (!item || !item.images || item.images.length === 0) return ""; 
  return asUrl(item.images[0].url);
}

async function fetchVip(): Promise<StrapiItem[]> {
  if (!API_URL) return [];

  const params = new URLSearchParams({
    "filters[vip][$eq]": "true",
    "populate": "*",
    sort: "updatedAt:desc",
  });

  const fetchUrl = `${API_URL}/api/properties?${params.toString()}`;

  try {
    const res = await fetch(fetchUrl, { cache: 'no-store' });
    if (!res.ok) return [];
    
    const json: StrapiResponse = await res.json();
    return json.data ?? [];
  } catch (error) {
    return [];
  }
}

export default async function ExclusiveMandates() {
  headers();
  const items = await fetchVip();
  
  if (!items || !items.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-6 flex items-center gap-2">
        <Crown className="h-5 w-5 text-yellow-500" />
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Our Premiere Collection</h2>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const img = firstImageUrl(item);
          return (
            <article key={item.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow">
               <Link
                href={`/properties/${item.slug}`}
                className="absolute inset-0 z-10"
                aria-label={item.title ?? "View property"}
              />
              <div className="relative aspect-[16/10] bg-gray-100">
                {img && (
                  <Image
                    src={img}
                    alt={item.title ?? "Property image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                )}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-yellow-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  <Crown className="h-3.5 w-3.5" />
                  VIP
                </div>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-1 text-lg font-medium">{item.title}</h3>
                <p className="line-clamp-1 text-sm text-ink/60">{item.address || item.city || "Cyprus"}</p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/contact?property=${encodeURIComponent(item.slug)}`}
                    className="z-10 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-[rgb(var(--gold-rgb,184,134,11))] hover:opacity-95"
                  >
                    Request price
                  </Link>
                  <Link
                    href={`/contact?type=tour&property=${encodeURIComponent(item.slug)}`}
                    className="z-10 inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-ink/80 bg-ink/5 hover:bg-ink/10"
                  >
                    Book tour
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
