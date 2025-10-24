import Image from "next/image";
import type { Metadata } from "next";
import { fetchPropertyBySlug } from "@/lib/cms";
import { MapPin, Phone, Mail } from "lucide-react";

function attrs<T = any>(p: any): T {
  return (p?.attributes ?? p ?? {}) as T;
}

type RouteParams = { slug: string };

export async function generateMetadata({
  params,
}: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await fetchPropertyBySlug(slug);
  if (!p) return {};

  const a = attrs(p);
  const images: string[] = (a.images?.data ?? [])
    .map((i: any) => i?.attributes?.url)
    .filter((u: unknown): u is string => typeof u === "string");

  return {
    title: a.seoTitle || a.title || "Property",
    description:
      a.seoDescription ||
      (typeof a.description === "string" ? a.description.slice(0, 155) : undefined),
    openGraph: { images },
  };
}

export default async function PropertyPage({
  params,
}: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const p = await fetchPropertyBySlug(slug);
  if (!p) {
    return (
      <div className="section py-16">
        <h1 className="text-2xl font-semibold">Property not found</h1>
        <p className="text-neutral-600 mt-2">This listing may have been removed or unpublished.</p>
      </div>
    );
  }

  const a = attrs(p);

  type Img = { url?: string; alt: string };
  const imgsRaw: Img[] = (a.images?.data ?? []).map((i: any) => ({
    url: i?.attributes?.url as string | undefined,
    alt: i?.attributes?.alternativeText || a.title || "Property image",
  }));

  // Type guard -> narrows to { url: string; alt: string }
  const imgs = imgsRaw.filter((img): img is { url: string; alt: string } =>
    typeof img.url === "string" && img.url.length > 0
  );

  const title: string = a.title ?? "Property";
  const city: string | undefined = a.city;
  const address: string | undefined = a.address;
  const price = typeof a.price === "number" ? a.price.toLocaleString() : a.price;
  const currency = a.currency ?? "€";
  const bedrooms = a.bedrooms;
  const bathrooms = a.bathrooms;
  const area = a.area;
  const status = a.status;

  return (
    <article className="section py-10">
      <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-montserrat)" }}>
        {title}
      </h1>
      <div className="text-neutral-600 mt-1 flex items-center gap-2">
        <MapPin size={16} />
        <span>{[city, address].filter(Boolean).join(" • ") || "Location available on request"}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mt-8">
        {imgs.length > 0 ? (
          imgs.slice(0, 6).map((img, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={img.url} alt={img.alt} fill className="object-cover" />
            </div>
          ))
        ) : (
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 grid place-items-center sm:col-span-2">
            <span className="text-neutral-500">Images coming soon</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-6 leading-relaxed text-neutral-800">
          {a.description ? <p>{a.description}</p> : <p className="text-neutral-600">Description coming soon.</p>}

          <div className="glass rounded-2xl overflow-hidden h-72">
            <iframe
              title="map"
              className="w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(address || city || "Cyprus")}&output=embed`}
            />
          </div>
        </div>

        <aside className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
          <div className="glass rounded-2xl p-6 space-y-5">
            <div className="text-2xl font-semibold">
              {price ? `${currency}${price}` : "Price on request"}
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-neutral-700">
              {bedrooms != null && <span className="glass rounded-full px-3 py-1">Bedrooms: <b>{bedrooms}</b></span>}
              {bathrooms != null && <span className="glass rounded-full px-3 py-1">Bathrooms: <b>{bathrooms}</b></span>}
              {area != null && <span className="glass rounded-full px-3 py-1">Area: <b>{area} m²</b></span>}
              {status && <span className="glass rounded-full px-3 py-1">Status: <b>{String(status).replace("-", " ")}</b></span>}
            </div>

            <a href="#contact" className="btn btn-primary w-full text-center">Request viewing</a>

            <div className="flex gap-3 text-sm text-neutral-700">
              <a className="glass rounded-full px-3 py-2 inline-flex items-center gap-2" href="tel:+1234567890">
                <Phone size={16}/> Call
              </a>
              <a className="glass rounded-full px-3 py-2 inline-flex items-center gap-2" href="mailto:info@tmsestates.com">
                <Mail size={16}/> Email
              </a>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
