"use client";

import { fetchProperties, Property } from "@/lib/cms";
import { getStrapiMediaUrl } from "@/lib/media";
import { useEffect, useMemo, useState } from "react";
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

function badgeFor(property: Property) {
  if ((property as any).vip) return "VIP";
  return (
    (property as any).marketing_label ||
    (property as any).marketing_tags ||
    property.propertyType ||
    property.prop_status ||
    "Property"
  );
}

export default function MarketInsights() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function loadProperties() {
      const { data } = await fetchProperties({
        "pagination[pageSize]": "14",
        "sort[0]": "createdAt:desc",
      });

      const items = data || [];
      setProperties(items.length > 0 && items.length < 7 ? [...items, ...items] : items);
    }

    loadProperties();
  }, []);

  const sortedProperties = useMemo(() => {
    return [...properties].sort((a: any, b: any) => Number(Boolean(b.vip)) - Number(Boolean(a.vip)));
  }, [properties]);

  if (!sortedProperties.length) return null;

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden py-16 md:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[#05070B]/30 backdrop-blur-[1px]" />

      <div className="home-container relative z-10">
        <div className="grid gap-8 pb-8 md:pb-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <h2 className="max-w-3xl font-montserrat text-[clamp(2.35rem,5.2vw,6.35rem)] font-bold leading-[0.96] tracking-[-0.065em] text-[#F5F0E8] text-balance">
            Looking for Your Next Property Opportunity?
          </h2>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-base leading-8 text-[#F5F0E8]/78 md:text-lg md:leading-9">
              Whether you are searching for a new home, an investment opportunity or information about our developments, our team would be pleased to assist.
            </p>
            <a
              href="mailto:info@tmsestates.com"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#F5F0E8] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0D1B2E] transition-colors hover:bg-[#C2A139] hover:text-[#05070B]"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-4 w-screen overflow-hidden md:mt-8">
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={sortedProperties.length > 3}
          navigation
          slidesPerView={1.12}
          centeredSlides
          spaceBetween={16}
          speed={900}
          autoplay={{ delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            640: { slidesPerView: 1.55, spaceBetween: 18, centeredSlides: true },
            900: { slidesPerView: 2.35, spaceBetween: 20, centeredSlides: true },
            1280: { slidesPerView: 3.25, spaceBetween: 24, centeredSlides: true },
            1680: { slidesPerView: 4.05, spaceBetween: 26, centeredSlides: true },
          }}
          className="tms-property-swiper tms-property-rail !overflow-visible px-5 md:px-8 lg:px-10"
        >
          {sortedProperties.map((property, index) => (
            <SwiperSlide key={`${property.id}-${index}`} className="h-auto py-2 md:py-3">
              <Link
                href={`/properties/${property.slug}`}
                className="group relative block h-[390px] overflow-hidden border border-white/10 bg-[#05070B]/48 backdrop-blur-[1px] transition-all duration-500 hover:-translate-y-1 hover:border-[#C2A139]/40 md:h-[440px] xl:h-[500px]"
              >
                <Image
                  src={imageFor(property)}
                  alt={property.title || "TMS Estates property"}
                  fill
                  sizes="(max-width: 640px) 86vw, (max-width: 900px) 62vw, (max-width: 1280px) 42vw, 28vw"
                  className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/96 via-[#05070B]/34 to-[#05070B]/4" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,240,232,0.09)_1px,transparent_1px)] bg-[size:50%_100%] opacity-[0.18]" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
                  <span className="border border-[#C2A139]/35 bg-[#05070B]/48 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#C2A139] backdrop-blur-md">
                    {badgeFor(property)}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/14 bg-[#05070B]/34 text-[#F5F0E8] backdrop-blur-md transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[#C2A139] group-hover:text-[#C2A139]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/65">
                    <MapPin className="h-3.5 w-3.5 text-[#C2A139]" />
                    <span>{property.city || "Cyprus"}</span>
                  </div>

                  <h3 className="line-clamp-2 font-montserrat text-2xl font-semibold leading-tight tracking-[-0.045em] text-[#F5F0E8] md:text-3xl">
                    {property.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium text-[#F5F0E8]/70">
                    {formatPrice(property.price, property.currency)}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs text-[#F5F0E8]/66">
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
