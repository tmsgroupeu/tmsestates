// web/src/components/ExclusiveMandates.tsx
import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import { headers } from "next/headers";

export const revalidate = 0;

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
  if (!item?.images?.length) return "";
  return asUrl(item.images[0].url);
}

async function fetchVip(): Promise<StrapiItem[]> {
  if (!API_URL) return [];
  const params = new URLSearchParams({
    "filters[vip][$eq]": "true",
    populate: "*",
    sort: "updatedAt:desc",
  });

  try {
    const res = await fetch(`${API_URL}/api/properties?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json: StrapiResponse = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function ExclusiveMandates() {
  headers(); // keep for edge/runtime consistency
  const items = await fetchVip();
  if (!items?.length) return null;

  return (
    <section className="section">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-[color:var(--gold)]" />
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[color:var(--navy)]">
            Our Premiere Collection
          </h2>
        </div>
        <p className="text-sm text-[color:var(--muted-foreground)] max-w-xl">
          A confidential selection of high-spec residences entrusted exclusively to TMS Estates.
        </p>
      </header>

      {/* Mobile carousel / desktop grid */}
      <div className="stack-cards-carousel md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const img = firstImageUrl(item);
          return (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5 hover:shadow-medium transition-all duration-300"
            >
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
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 80vw"
                  />
                )}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[color:var(--gold)]/95 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
                  <Crown className="h-3.5 w-3.5" />
                  VIP
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="line-clamp-1 text-lg font-medium text-[color:var(--navy)]">
                  {item.title}
                </h3>
                <p className="line-clamp-1 text-sm text-[color:var(--muted-foreground)]">
                  {item.address || item.city || "Cyprus"}
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/contact?property=${encodeURIComponent(item.slug)}`}
                    className="z-10 inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold text-[color:var(--ink)] bg-[color:var(--gold)] hover:brightness-110"
                  >
                    Request price
                  </Link>
                  <Link
                    href={`/contact?type=tour&property=${encodeURIComponent(item.slug)}`}
                    className="z-10 inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-medium text-[color:var(--ink)]/80 bg-[color:var(--ink)]/4 hover:bg-[color:var(--ink)]/8"
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
