import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import { headers } from "next/headers";

export const revalidate = 0;

// Type definitions...
type UploadFileAttributes = { url: string; alternativeText?: string; };
type UploadFileEntity = { id: number; attributes: UploadFileAttributes; };
type MediaRelation = { data: UploadFileEntity | UploadFileEntity[] | null; };
type StrapiItem<A> = { id: number; attributes: A };
type StrapiResponse<A> = { data: StrapiItem<A>[] };
interface PropertyAttr { title?: string; slug: string; address?: string; city?: string; vip?: boolean; images?: MediaRelation; }

const API_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL;

const asUrl = (u?: string) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  return `${API_URL}${u}`;
};

function toArray(rel?: MediaRelation): UploadFileEntity[] {
  if (!rel?.data) return [];
  return Array.isArray(rel.data) ? rel.data : [rel.data];
}

function firstImageUrl(p?: PropertyAttr): string {
  if (!p) return ""; 
  const firstImage = toArray(p.images)[0]?.attributes.url;
  return asUrl(firstImage);
}

async function fetchVip(): Promise<StrapiItem<PropertyAttr>[]> {
  if (!API_URL) {
    console.error('[ExclusiveMandates ERROR] API URL is not defined.');
    return [];
  }

  const params = new URLSearchParams({
    "filters[vip][$eq]": "true",
    "populate": "*",
    sort: "updatedAt:desc",
    "pagination[pageSize]": "12",
  });

  const fetchUrl = `${API_URL}/api/properties?${params.toString()}`;

  try {
    const res = await fetch(fetchUrl, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error(`[ExclusiveMandates ERROR] Fetch failed: ${res.status}`);
      return [];
    }
    
    const json: StrapiResponse<PropertyAttr> = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error(`[ExclusiveMandates EXCEPTION]`, error);
    return [];
  }
}

export default async function ExclusiveMandates() {
  headers();
  const rawItems = await fetchVip();
  const items = rawItems.filter(item => item && item.attributes);
  
  if (!items.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-6 flex items-center gap-2">
        <Crown className="h-5 w-5 text-yellow-500" />
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Our Premiere Collection</h2>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ id, attributes }) => {
          const img = firstImageUrl(attributes);
          return (
            <article key={id} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow">
               <Link
                href={`/properties/${attributes.slug}`}
                className="absolute inset-0 z-10"
                aria-label={attributes.title ?? "View property"}
              />
              <div className="relative aspect-[16/10] bg-gray-100">
                {img && (
                  <Image
                    src={img}
                    alt={attributes.title ?? "Property image"}
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
                <h3 className="line-clamp-1 text-lg font-medium">{attributes.title}</h3>
                <p className="line-clamp-1 text-sm text-ink/60">{attributes.address || attributes.city || "Cyprus"}</p>
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
