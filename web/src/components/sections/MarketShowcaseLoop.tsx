/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchProperties } from "@/lib/cms";
import PropertyMarquee from "./PropertyMarquee";

const API_BASE =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  process.env.STRAPI_URL ??
  "http://127.0.0.1:1337";

export default async function MarketShowcaseLoop() {
  // Pull a decent batch for a rich loop; duplicates are handled in the marquee
  const { data: raw } = await fetchProperties({
    "pagination[pageSize]": "30",
    populate: "*",
    sort: "updatedAt:desc",
  });

  const items = (raw ?? []).map((n: any) => {
    const a = n?.attributes ?? {};
    return {
      id: Number(n?.id) || 0,
      href: `/properties/${a.slug}`,
      title: a.title,
      city: a.city ?? a.location ?? "",
      price: typeof a.price === "number" ? a.price : null,
      currency: a.currency ?? "EUR",
      coverUrl: mediaUrl(a.coverImage) || mediaUrl(a.cover) || firstGallery(a.images),
    };
  });

  return (
    <section className="relative bg-gradient-to-b from-paper to-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">
        <h2 className="font-montserrat text-2xl text-ink md:text-3xl">
          Discover Our Island-Wide Collection
        </h2>
        <p className="mt-2 max-w-2xl text-ink/70">
          A slow, elegant showcase of curated homes and investment opportunities.
        </p>

        <div className="mt-8">
          <PropertyMarquee items={items} />
        </div>
      </div>
    </section>
  );
}

function mediaUrl(rel: any): string | null {
  const url: string | undefined =
    rel?.data?.attributes?.url || rel?.url;
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
}

function firstGallery(rel: any): string | null {
  const arr = rel?.data;
  if (Array.isArray(arr) && arr[0]?.attributes?.url) {
    const u = arr[0].attributes.url;
    return u.startsWith("http") ? u : `${API_BASE}${u}`;
  }
  return null;
}
