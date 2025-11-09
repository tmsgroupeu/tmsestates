import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";

// The revalidate value is not used in this debug version but kept for consistency
export const revalidate = 900;

// --- Type definitions (unchanged) ---
type UploadFileAttributes = { url: string; alternativeText?: string; };
type UploadFileEntity = { id: number; attributes: UploadFileAttributes; };
type MediaRelation = { data: UploadFileEntity | UploadFileEntity[] | null; };
type StrapiItem<A> = { id: number; attributes: A };
type StrapiResponse<A> = { data: StrapiItem<A>[] };
interface PropertyAttr {
  title?: string;
  slug: string;
  address?: string;
  city?: string;
  vip?: boolean;
  cover?: MediaRelation;
  gallery?: MediaRelation;
}
const API = process.env.NEXT_PUBLIC_API_URL || "";
const asUrl = (u?: string) => (!u ? "" : u.startsWith("http") ? u : `${API}${u}`);
function toArray(rel?: MediaRelation): UploadFileEntity[] {
  if (!rel?.data) return [];
  return Array.isArray(rel.data) ? rel.data : [rel.data];
}
function firstImageUrl(p: PropertyAttr): string {
  const cover = toArray(p.cover)[0]?.attributes.url;
  const firstGallery = toArray(p.gallery)[0]?.attributes.url;
  return asUrl(cover || firstGallery || "");
}
// --- End of helpers ---

async function fetchVip(): Promise<{ items: StrapiItem<PropertyAttr>[]; debug: string[] }> {
  const debug = [];
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  debug.push(`Attempting to fetch VIP properties...`);
  debug.push(`1. NEXT_PUBLIC_API_URL is: "${API_URL}"`);

  if (!API_URL) {
    debug.push("CRITICAL ERROR: The API URL is not set in Vercel's environment variables.");
    return { items: [], debug };
  }

  const params = new URLSearchParams({
    "filters[vip][$eq]": "true",
    "populate[cover]": "*",
    "populate[gallery]": "*",
    sort: "updatedAt:desc",
    "pagination[pageSize]": "12",
  });
  
  const fetchUrl = `${API_URL}/api/properties?${params.toString()}`;
  debug.push(`2. Fetching from this URL: ${fetchUrl}`);

  try {
    // We set revalidate to 0 to bypass the cache completely for this test
    const res = await fetch(fetchUrl, { next: { revalidate: 0 } });

    debug.push(`3. Response status code: ${res.status}`);
    debug.push(`4. Response 'ok' property: ${res.ok}`);

    if (!res.ok) {
      const errorText = await res.text();
      debug.push(`5. Fetch failed. Raw response: ${errorText}`);
      return { items: [], debug };
    }

    const json: StrapiResponse<PropertyAttr> = await res.json();
    debug.push(`5. Fetch successful. Got ${json.data?.length ?? 0} items.`);
    return { items: json.data ?? [], debug };
  } catch (error) {
    // Correctly handle the unknown error type
    const err = error as Error;
    debug.push(`6. An exception occurred during fetch: ${err.message}`);
    return { items: [], debug };
  }
}

export default async function ExclusiveMandates() {
  const { items, debug } = await fetchVip();

  if (!items.length) {
    // This will now render a visible debug box on your live website
    return (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Debug Information:</strong>
          <span className="block sm:inline"> The Premiere Collection failed to load.</span>
          <ul className="mt-3 list-disc list-inside text-left text-sm">
            {debug.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // --- Original rendering logic (unchanged) ---
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
                    className="z-10 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-[rgb(var(--gold-rgb,184,1b4,11))] hover:opacity-95"
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
