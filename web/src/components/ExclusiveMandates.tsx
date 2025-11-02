// web/src/components/ExclusiveMandates.tsx
import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";

export const revalidate = 900;

type StrapiImg = {
  data?: { attributes?: { url: string; alternativeText?: string } } | any[];
};
type StrapiItem<A> = { id: number; attributes: A };
type StrapiResponse<A> = { data: StrapiItem<A>[] };

interface PropertyAttr {
  title?: string;
  slug: string;
  address?: string;
  city?: string;
  vip?: boolean;
  cover?: StrapiImg;
  gallery?: StrapiImg;
}

const API = process.env.NEXT_PUBLIC_API_URL || "";
const asUrl = (u?: string) => (!u ? "" : u.startsWith("http") ? u : `${API}${u}`);

async function fetchVip(): Promise<StrapiItem<PropertyAttr>[]> {
  const params = new URLSearchParams({
    "filters[vip][$eq]": "true",
    "populate[cover]": "*",
    "populate[gallery]": "*",
    sort: "updatedAt:desc",
    "pagination[pageSize]": "12",
  });
  const res = await fetch(`${API}/api/properties?${params.toString()}`, {
    next: { revalidate },
  });
  if (!res.ok) return [];
  const json = (await res.json()) as StrapiResponse<PropertyAttr>;
  return json.data ?? [];
}

function firstImageUrl(p: PropertyAttr): string {
  const c = (p.cover as any)?.data?.attributes?.url;
  const gArr = Array.isArray((p.gallery as any)?.data)
    ? (p.gallery as any).data
    : [];
  const g = gArr[0]?.attributes?.url;
  return asUrl(c || g || "");
}

export default async function ExclusiveMandates() {
  const items = await fetchVip();

  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-6 flex items-center gap-2">
        <Crown className="h-5 w-5 text-yellow-500" />
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Our Premiere Collection
        </h2>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ id, attributes }) => {
          const img = firstImageUrl(attributes);
          return (
            <article
              key={id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow"
            >
              <Link
                href={`/properties/${attributes.slug}`}
                className="absolute inset-0 z-10"
                aria-label={attributes.title ?? "View property"}
              />
              <div className="relative aspect-[16/10] bg-gray-100">
                {img ? (
                  <Image
                    src={img}
                    alt={attributes.title ?? "Property image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                ) : null}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-yellow-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  <Crown className="h-3.5 w-3.5" />
                  VIP
                </div>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-1 text-lg font-medium">{attributes.title}</h3>
                <p className="line-clamp-1 text-sm text-ink/60">
                  {attributes.address || attributes.city || "Cyprus"}
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/contact?property=${encodeURIComponent(attributes.slug)}`}
                    className="z-10 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-[rgb(var(--gold-rgb,184,134,11))] hover:opacity-95"
                  >
                    Request price
                  </Link>
                  <Link
                    href={`/contact?type=tour&property=${encodeURIComponent(attributes.slug)}`}
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
