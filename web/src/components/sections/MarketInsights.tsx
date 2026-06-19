"use client";

import { fetchProperties, Property } from "@/lib/cms";
import { getStrapiMediaUrl } from "@/lib/media";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ArrowRight, ArrowUpRight, BedDouble, MapPin, Ruler } from "lucide-react";
import { Link } from "@/i18n/routing";
import "swiper/css";
import "swiper/css/navigation";

const formatPrice = (price?: number, currency = "EUR") => {
  if (!price) return "Price Upon Request";
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};

function imageFor(property: Property) {
  const url = getStrapiMediaUrl((property as any).images?.[0]);
  return url === "/placeholder.jpg" ? "/assets/hero-poster.jpg" : url;
}

export default function MarketInsights() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function loadProperties() {
      const { data } = await fetchProperties({
        "pagination[pageSize]": "12",
        "sort[0]": "createdAt:desc",
      });

      const items = data || [];
      setProperties(items.length > 0 && items.length < 7 ? [...items, ...items] : items);
    }

    loadProperties();
  }, []);

  if (!properties.length) return null;

  return (
    <section className="relative w-full border-y border-white/10 bg-[#0D1B2E]/68 py-16 backdrop-blur-sm md:py-20 lg:flex lg:min-h-screen lg:items-center">
      <div className="home-container">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="section-eyebrow">Property Opportunities</p>
            <h2 className="section-heading mt-4 max-w-3xl">
              Looking for Your Next Property Opportunity?
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-base leading-8 text-[#F5F0E8]/72 md:text-lg md:leading-9">
              Whether you are searching for a new home, an investment opportunity or information about our developments, our team would be pleased to assist.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="mailto:info@tmsestates.com"
                className="inline-flex items-center gap-3 rounded-full bg-[#F5F0E8] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0D1B2E] transition-colors hover:bg-[#C2A139] hover:text-[#05070B]"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/properties"
                className="inline-flex items-center gap-3 rounded-full border border-white/14 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] transition-colors hover:border-[#C2A139] hover:text-[#C2A139]"
              >
                Our Portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1720px] px-4 md:px-8">
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={properties.length > 3}
          navigation
          slidesPerView={1.12}
          spaceBetween={18}
          speed={950}
          autoplay={{ delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            700: { slidesPerView: 2.05, spaceBetween: 22 },
            1100: { slidesPerView: 3.05, spaceBetween: 24 },
            1480: { slidesPerView: 4.05, spaceBetween: 24 },
          }}
          className="tms-property-swiper !pb-12 !pt-3"
        >
          {properties.map((property, index) => (
            <SwiperSlide key={`${property.id}-${index}`} className="h-auto">
              <Link
                href={`/properties/${property.slug}`}
                className="group relative block h-[420px] overflow-hidden border border-white/10 bg-[#05070B] md:h-[480px] lg:h-[clamp(430px,52svh,540px)]"
              >
                <Image
                  src={imageFor(property)}
                  alt={property.title || "TMS Estates property"}
                  fill
                  sizes="(max-width: 700px) 88vw, (max-width: 1100px) 48vw, 25vw"
                  className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/30 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="border border-[#C2A139]/35 bg-[#05070B]/45 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C2A139] backdrop-blur-md">
                    {(property as any).marketing_label || (property as any).marketing_tags || property.propertyType || "Residence"}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/14 bg-[#05070B]/40 text-[#F5F0E8] backdrop-blur-md transition-colors group-hover:border-[#C2A139] group-hover:text-[#C2A139]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/62">
                    <MapPin className="h-3.5 w-3.5 text-[#C2A139]" />
                    <span>{property.city || "Cyprus"}</span>
                  </div>
                  <h3 className="font-montserrat text-2xl font-semibold leading-tight tracking-[-0.045em] text-[#F5F0E8]">
                    {property.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-[#F5F0E8]/70">
                    {formatPrice(property.price, property.currency)}
                  </p>

                  <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5 text-xs text-[#F5F0E8]/62">
                    {property.bedrooms && (
                      <span className="inline-flex items-center gap-2">
                        <BedDouble className="h-4 w-4 text-[#C2A139]" />
                        {property.bedrooms} Beds
                      </span>
                    )}
                    {property.area && (
                      <span className="inline-flex items-center gap-2">
                        <Ruler className="h-4 w-4 text-[#C2A139]" />
                        {property.area} m²
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
