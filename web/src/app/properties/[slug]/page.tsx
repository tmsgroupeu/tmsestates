/* Fully Updated: ./app/properties/[slug]/page.tsx */

import { fetchPropertyBySlug } from "@/lib/cms";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import { getStrapiMediaUrl } from "@/lib/media";

function formatPrice(price?: number, currency = "€"): string {
  if (typeof price !== "number" || price <= 0) return "Price on Request";
  return `${currency}${price.toLocaleString("en-US")}`;
}

export default async function PropertyDetails({
  params,
}: {
  params: { slug: string };
}) {
  const property = await fetchPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  // Normalize gallery to a strict string[] of URLs
  const images: string[] = Array.isArray(property.images)
    ? property.images
        .map((m: unknown) => getStrapiMediaUrl(m as any))
        .filter((u: string | undefined): u is string => Boolean(u))
    : [];

  const heroImage: string = images[0] || "/placeholder.jpg";

  return (
    <main className="pt-24 bg-paper">
      {/* HERO */}
      <section className="relative h-[40vh] md:h-[60vh] w-full">
        <Image
          src={heroImage}
          alt={property.title || "Property"}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </section>

      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* LEFT: Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-navy">
              {property.title}
            </h1>

            <div className="text-lg text-muted-foreground mt-2 flex items-center gap-2">
              <MapPin size={20} />
              <span>{property.address || property.city || "—"}</span>
            </div>

            <div className="mt-8 py-6 border-y flex flex-wrap items-center gap-x-8 gap-y-4 text-lg">
              {property.bedrooms ? (
                <span className="inline-flex items-center gap-2.5">
                  <BedDouble className="text-muted-foreground" />{" "}
                  {property.bedrooms} Bedrooms
                </span>
              ) : null}
              {property.bathrooms ? (
                <span className="inline-flex items-center gap-2.5">
                  <Bath className="text-muted-foreground" /> {property.bathrooms}{" "}
                  Bathrooms
                </span>
              ) : null}
              {property.area ? (
                <span className="inline-flex items-center gap-2.5">
                  <Ruler className="text-muted-foreground" /> {property.area} m²
                </span>
              ) : null}
            </div>

            <h3 className="text-2xl font-bold font-montserrat mt-10 mb-4 text-navy">
              Description
            </h3>
            {/* For production, consider rendering Markdown safely (e.g., react-markdown). */}
            <div className="prose prose-lg max-w-none">
              <p>
                {property.description?.replace(/\n/g, "<br />") ||
                  "No description available."}
              </p>
            </div>
          </div>

          {/* RIGHT: CTA / Price */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 bg-white p-8 rounded-xl shadow-medium">
              <div className="text-4xl font-bold text-gold mb-6">
                {formatPrice(property.price, property.currency)}
              </div>
              <a href="#contact" className="btn btn-primary w-full">
                Enquire Now
              </a>
            </div>
          </aside>
        </div>

        {/* GALLERY */}
        {images.length > 1 && (
          <div className="mt-24">
            <h3 className="text-3xl font-bold font-montserrat mb-8 text-center text-navy">
              Property Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img: string, index: number) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${property.title || "Property"} gallery image ${
                      index + 1
                    }`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
