// web/src/app/properties/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Ruler, MapPin, Crown, Calendar, Phone, Mail } from "lucide-react";

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
  area?: number | null;
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

function allImages(p: PropertyAttr): { url: string; alt: string }[] {
  const list = [...toArray(p.cover), ...toArray(p.gallery)];
  const unique: { url: string; alt: string }[] = [];
  const seen = new Set<string>();
  for (const img of list) {
    const url = asUrl(img.attributes.url);
    if (url && !seen.has(url)) {
      seen.add(url);
      unique.push({ url, alt: img.attributes.alternativeText || p.title || "Property photo" });
    }
  }
  return unique;
}

async function fetchProperty(slug: string): Promise<StrapiItem<PropertyAttr> | null> {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "populate[cover]": "*",
    "populate[gallery]": "*",
  });
  const res = await fetch(`${API}/api/properties?${params.toString()}`, {
    next: { revalidate },
  });
  if (!res.ok) return null;
  const json: StrapiResponse<PropertyAttr> = await res.json();
  return json?.data?.[0] ?? null;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const item = await fetchProperty(params.slug);
  if (!item) return notFound();
  const p = item.attributes;
  const imgs = allImages(p);
  const title = p.title ?? "Property";

  return (
    <main className="min-h-screen bg-[var(--background,theme(colors.gray.50))]">
      {/* Media header */}
      <section className="relative">
        <div className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
          <ul className="flex w-full">
            {imgs.map((img, i) => (
              <li key={`${img.url}-${i}`} className="relative snap-start shrink-0 w-full basis-full">
                <div className="relative aspect-[16/9] bg-gray-100">
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="100vw" priority={i === 0} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        {p.vip ? (
          <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-yellow-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <Crown className="h-3.5 w-3.5" />
            VIP Listing
          </div>
        ) : null}
      </section>

      {/* Body */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-3">
        {/* Left: content */}
        <article className="lg:col-span-2 flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
            <p className="flex items-center gap-2 text-ink/60">
              <MapPin className="h-4 w-4" />
              <span>{p.address || p.city || "Cyprus"}</span>
            </p>
          </header>

          {/* Essentials */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {p.bedrooms != null && (
              <div className="rounded-2xl bg-white/60 backdrop-blur p-4 ring-1 ring-black/5">
                <div className="text-ink/60 text-xs">Bedrooms</div>
                <div className="mt-1 flex items-center gap-2 text-lg font-medium">
                  <BedDouble className="h-5 w-5" /> {p.bedrooms}
                </div>
              </div>
            )}
            {p.bathrooms != null && (
              <div className="rounded-2xl bg-white/60 backdrop-blur p-4 ring-1 ring-black/5">
                <div className="text-ink/60 text-xs">Bathrooms</div>
                <div className="mt-1 flex items-center gap-2 text-lg font-medium">
                  <Bath className="h-5 w-5" /> {p.bathrooms}
                </div>
              </div>
            )}
            {p.area != null && (
              <div className="rounded-2xl bg-white/60 backdrop-blur p-4 ring-1 ring-black/5">
                <div className="text-ink/60 text-xs">Area</div>
                <div className="mt-1 flex items-center gap-2 text-lg font-medium">
                  <Ruler className="h-5 w-5" /> {p.area} m²
                </div>
              </div>
            )}
            {p.propertyType && (
              <div className="rounded-2xl bg-white/60 backdrop-blur p-4 ring-1 ring-black/5">
                <div className="text-ink/60 text-xs">Type</div>
                <div className="mt-1 text-lg font-medium">{p.propertyType}</div>
              </div>
            )}
          </div>

          {/* Description */}
          {p.description && (
            <section className="prose prose-neutral max-w-none prose-p:leading-relaxed">
              <h2 className="text-xl font-semibold">About this property</h2>
              <p className="mt-2 text-ink/75">{p.description}</p>
            </section>
          )}

          {/* Secondary gallery (thumbnails) */}
          {imgs.length > 1 && (
            <section className="mt-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {imgs.slice(1, 9).map((img, i) => (
                  <div key={`${img.url}-thumb-${i}`} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="(min-width:1024px) 25vw, 50vw" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Right: sticky actions */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-5 flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Interested?</h3>
            <p className="text-sm text-ink/70">We keep pricing discreet. Request price or schedule a private tour.</p>

            <div className="flex flex-col gap-2">
              <Link
                href={`/contact?property=${encodeURIComponent(p.slug)}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium text-white bg-[rgb(var(--gold-rgb,184,134,11))] hover:opacity-95"
              >
                <Mail className="h-4 w-4" />
                Request price
              </Link>
              <Link
                href={`/contact?type=tour&property=${encodeURIComponent(p.slug)}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium text-ink/80 bg-ink/5 hover:bg-ink/10"
              >
                <Calendar className="h-4 w-4" />
                Book a tour
              </Link>
              <a
                href={`tel:+35700000000`}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium text-ink/80 bg-ink/5 hover:bg-ink/10"
              >
                <Phone className="h-4 w-4" />
                Call us
              </a>
            </div>

            <div className="mt-2 rounded-xl bg-ink/5 p-3 text-xs text-ink/60">
              Ref: <span className="font-mono">{p.slug}</span>
            </div>
          </div>
        </aside>
      </section>

      {/* Mobile sticky footer CTAs */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-3 lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 px-1">
          <Link
            href={`/contact?property=${encodeURIComponent(p.slug)}`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium text-white bg-[rgb(var(--gold-rgb,184,134,11))]"
          >
            Request price
          </Link>
          <Link
            href={`/contact?type=tour&property=${encodeURIComponent(p.slug)}`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium text-ink/80 bg-ink/5"
          >
            Book tour
          </Link>
        </div>
      </div>
    </main>
  );
}
