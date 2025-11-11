// web/src/components/ExclusiveMandates.tsx

import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import { headers } from "next/headers";

export const revalidate = 0;

type StrapiImage = {
  url: string;
  alternativeText?: string;
};

type StrapiItem = {
  id: number;
  title?: string;
  slug: string;
  address?: string;
  city?: string;
  vip?: boolean;
  images?: StrapiImage[];
};

type StrapiResponse = {
  data: StrapiItem[];
};

const API_URL =
  process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL || "";

// Keep URL helper behavior identical in spirit
const asUrl = (u?: string) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  if (!API_URL) return u;
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
    const res = await fetch(
      `${API_URL}/api/properties?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return [];

    const json = (await res.json()) as StrapiResponse;
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function ExclusiveMandates() {
  // Mark this as dynamic (matches your current pattern)
  headers();

  const items = await fetchVip();
  if (!items?.length) return null;

  return (
    <section
      id="featured"
      className="w-full bg-slate-950/0 py-16"
      aria-label="Exclusive property mandates"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        {/* Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-400/85">
              <Crown className="h-3 w-3 text-sky-300" />
              Exclusive Mandates
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-50 md:text-3xl">
              Our Premiere Collection
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300/85">
              A confidential portfolio of exceptional residences entrusted solely
              to TMS Estates, curated for discerning buyers seeking true quality,
              legal clarity, and discretion.
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 text-[10px] text-slate-400 md:items-end">
            <p>
              Only{" "}
              <span className="font-semibold text-sky-300">
                verified VIP listings
              </span>{" "}
              from your Strapi CMS.
            </p>
            <p className="uppercase tracking-[0.18em] text-slate-500">
              Swipe on mobile · Grid on desktop
            </p>
          </div>
        </div>

        {/* Cards */}
        <div
          className="
            -mx-6 flex gap-4 overflow-x-auto px-6 pb-3 pt-1
            snap-x snap-mandatory
            md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none
          "
        >
          {items.map((item) => {
            const img = firstImageUrl(item);
            const href = item.slug
              ? `/properties/${item.slug}`
              : undefined;

            const CardContent = (
              <article
                className="
                  group relative flex h-full min-w-[260px] flex-col overflow-hidden
                  rounded-3xl border border-sky-500/10 bg-slate-900/70
                  shadow-[0_18px_80px_rgba(0,0,0,0.7)]
                  transition-all duration-300
                  hover:-translate-y-1 hover:border-sky-400/40 hover:bg-slate-900/95
                  hover:shadow-[0_24px_100px_rgba(15,23,42,0.95)]
                "
              >
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  {img && (
                    <Image
                      src={img}
                      alt={item.title || item.address || "VIP property"}
                      fill
                      sizes="(max-width: 768px) 90vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/0 to-slate-950/40" />
                  {item.vip && (
                    <span
                      className="
                        absolute left-3 top-3 inline-flex items-center gap-1
                        rounded-full bg-slate-950/85 px-3 py-1
                        text-[9px] font-semibold uppercase tracking-[0.18em]
                        text-sky-300 ring-1 ring-sky-500/40
                      "
                    >
                      <Crown className="h-3 w-3" />
                      VIP Mandate
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-2 px-4 py-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                    {item.city || "Limassol"}
                  </p>
                  <h3 className="text-sm font-semibold text-slate-50">
                    {item.title || "Exclusive Residence"}
                  </h3>
                  <p className="text-xs text-slate-300/85">
                    {item.address || item.city || "Cyprus"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-[8px] text-slate-400">
                    <span className="rounded-full bg-slate-900/80 px-2 py-1">
                      Discreet viewings
                    </span>
                    <span className="rounded-full bg-slate-900/80 px-2 py-1">
                      Full-cycle support
                    </span>
                    <span className="rounded-full bg-slate-900/80 px-2 py-1">
                      By invitation
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 text-[9px]">
                    <span className="text-sky-300">
                      Request full details &rarr;
                    </span>
                    <span className="text-slate-500">
                      Updated via Strapi VIP flag
                    </span>
                  </div>
                </div>
              </article>
            );

            // Wrap with Link if slug exists; keep behavior simple
            return (
              <div key={item.id} className="snap-start md:snap-none">
                {href ? (
                  <Link href={href} className="block focus:outline-none">
                    {CardContent}
                  </Link>
                ) : (
                  CardContent
                )}
              </div>
            );
          })}
        </div>

        {/* Secondary CTA */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-400">
          <p>
            For ultra-discreet opportunities,{" "}
            <span className="text-sky-300">
              request our off-market brief directly.
            </span>
          </p>
          <Link
            href="#contact"
            className="rounded-full border border-sky-500/40 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-sky-300 hover:bg-sky-500/10"
          >
            Contact TMS Estates
          </Link>
        </div>
      </div>
    </section>
  );
}
