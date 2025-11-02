// web/src/app/properties/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Ruler, Crown } from "lucide-react";

export const revalidate = 900;
export const dynamic = "force-static";

/** ---------- Shared Strapi Types ---------- */
type UploadFileAttributes = {
  url: string;
  alternativeText?: string;
};
type UploadFileEntity = {
  id: number;
  attributes: UploadFileAttributes;
};
type MediaRelation = {
  data: UploadFileEntity | UploadFileEntity[] | null;
};

type StrapiItem<A> = { id: number; attributes: A };
type StrapiResponse<A> = { data: StrapiItem<A>[] };

interface PropertyAttr {
  title?: string;
  slug: string;
  description?: string;
  address?: string;
  city?: string;
  area?: number | null; // m²
  bedrooms?: number | null;
  bathrooms?: number | null;
  propertyType?: string | null;
  vip?: boolean;
  cover?: MediaRelation;
  gallery?: MediaRelation;
  updatedAt?: string;
}

/** ---------- Helpers ---------- */
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

async function fetchAllProperties(): Promise<StrapiItem<PropertyAttr>[]> {
  const params = new URLSearchParams({
    "populate[cover]": "*",
    "populate[gallery]": "*",
    sort: "updatedAt:desc",
    "pagination[pageSize]": "48",
  });
  const res = await fetch(`${API}/api/properties?${params.toString()}`, {
    next: { revalidate },
  });
  if (!res.ok) return [];
  const json: StrapiResponse<PropertyAttr> = await res.json();
  return json.data ?? [];
}

function Spec({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-1 text-sm text-ink/70">
      <Icon className="h-4 w-4" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

export default async function Page() {
  const items = await fetchAllProperties();

  return (
    <main className="min-h-screen bg-[var(--background,theme(colors.gray.50))]">
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6">
        <header className="mb-6 flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Our Properties</h1>
          <p className="text-ink/60">
            Curated listings across Limassol & Cyprus — contact us to request price or book a private tour.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ id, attributes }) => {
            const url = `/properties/${attributes.slug}`;
            const img = firstImageUrl(attributes);
            return (
              <article
                key={id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow"
              >
                <Link href={url} className="absolute inset-0 z-10" aria-label={attributes.title ?? "View property"} />
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
                  {attributes.vip ? (
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-yellow-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      <Crown className="h-3.5 w-3.5" />
                      VIP
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 p-4">
                  <h3 className="line-clamp-1 text-lg font-medium">{attributes.title ?? "Untitled property"}</h3>
                  <p className="line-clamp-1 text-sm text-ink/60">
                    {attributes.address || attributes.city || "Cyprus"}
                  </p>

                  <div className="mt-1 flex flex-wrap gap-4">
                    {attributes.bedrooms != null && <Spec icon={BedDouble} label={`${attributes.bedrooms} bd`} />}
                    {attributes.bathrooms != null && <Spec icon={Bath} label={`${attributes.bathrooms} ba`} />}
                    {attributes.area != null && <Spec icon={Ruler} label={`${attributes.area} m²`} />}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
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
                      Book a tour
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
