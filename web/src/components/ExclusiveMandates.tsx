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
  headers();
  const items = await fetchVip();
  if (!items?.length) return null;

  return (
    <section
      id="exclusive-mandates"
      className="relative overflow-hidden bg-gradient-to-b from-[rgba(10,35,66,0.02)] via-[rgba(10,35,66,0.05)] to-[rgba(10,35,66,0.0)]"
    >
      <div className="section pt-12 pb-16">
        {/* Top halo accent */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-40 w-[480px] -translate-x-1/2 rounded-full bg-[color:var(--gold)]/7 blur-3xl" />

        {/* Heading row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--navy)] shadow-soft">
              <Crown className="h-3.5 w-3.5 text-[color:var(--gold)]" />
              Exclusive Mandates
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-[color:var(--navy)]">
              Our Premiere Collection
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[color:var(--muted-foreground)]">
              A confidential portfolio of exceptional residences entrusted solely to TMS Estates,
              curated for discerning buyers seeking true quality and discretion.
            </p>
          </div>
          <div className="text-xs md:text-sm text-[color:var(--muted-foreground)] md:text-right max-w-sm">
            Fully vetted titles, architecturally considered design, and a
            dedicated advisory team ensure a seamless, private process from
            first viewing to handover.
          </div>
        </div>

        {/* Cards: swipe on mobile, grid on desktop */}
        <div className="stack-cards-carousel md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const img = firstImageUrl(item);

            return (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-medium hover:ring-black/10"
              >
                {/* Full-card link */}
                <Link
                  href={`/properties/${item.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={item.title ?? "View property"}
                />

                {/* Image */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  {img && (
                    <Image
                      src={img}
                      alt={item.title ?? "Property image"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 80vw"
                    />
                  )}

                  {/* VIP pill */}
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[color:var(--gold)]/95 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                    <Crown className="h-3.5 w-3.5" />
                    VIP Mandate
                  </div>

                  {/* Subtle bottom gradient for legibility */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/25 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-4 space-y-2">
                  <h3 className="line-clamp-1 text-[17px] font-semibold text-[color:var(--navy)]">
                    {item.title}
                  </h3>
                  <p className="line-clamp-1 text-sm text-[color:var(--muted-foreground)]">
                    {item.address || item.city || "Cyprus"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-[color:var(--muted-foreground)]">
                    <span className="rounded-full bg-[color:var(--muted)]/60 px-2 py-1">
                      Discreet viewings
                    </span>
                    <span className="rounded-full bg-[color:var(--muted)]/40 px-2 py-1">
                      Full-cycle support
                    </span>
                    <span className="rounded-full bg-[color:var(--muted)]/25 px-2 py-1">
                      By invitation
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/contact?property=${encodeURIComponent(
                        item.slug
                      )}`}
                      className="relative z-20 inline-flex flex-1 items-center justify-center rounded-xl bg-[color:var(--gold)] px-4 py-2 text-xs font-semibold text-[color:var(--ink)] shadow-sm transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
                    >
                      Request price
                    </Link>
                    <Link
                      href={`/contact?type=tour&property=${encodeURIComponent(
                        item.slug
                      )}`}
                      className="relative z-20 inline-flex flex-1 items-center justify-center rounded-xl bg-[color:var(--ink)]/4 px-3 py-2 text-xs font-medium text-[color:var(--ink)]/80 transition-all duration-300 hover:bg-[color:var(--ink)]/9 hover:-translate-y-0.5"
                    >
                      Book tour
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
