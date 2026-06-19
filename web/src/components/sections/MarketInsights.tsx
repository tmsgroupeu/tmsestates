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

function shortLabel(property: Property) {
  return (
    (property as any).marketing_label ||
    (property as any).marketing_tags ||
    property.propertyType ||
    "Residence"
  );
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
      setProperties(items.length > 0 && items.length < 6 ? [...items, ...items] : items);
    }

    loadProperties();
  }, []);

  if (!properties.length) return null;

  return (
    <section className="relative w-full border-y border-white/10 bg-[#05070B]/70 py-14 backdrop-blur-[2px] md:py-18 lg:flex lg:min-h-screen lg:items-center">
      <div className="home-container">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D1B2E]/74 shadow-[0_40px_140px_rgba(0,0,0,0.34)] backdrop-blur-xl md:rounded-[2.5rem]">
          <div className="grid gap-8 border-b border-white/10 p-6 md:p-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:p-11 xl:p-12">
            <div>
              <p className="section-eyebrow">Property Opportunities</p>
              <h2 className="mt-4 max-w-3xl font-montserrat text-[clamp(2.15rem,4.2vw,4.85rem)] font-bold leading-[0.98] tracking-[-0.06em] text-[#F5F0E8] text-balance">
                Looking for Your Next Property Opportunity?
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-sm leading-7 text-[#F5F0E8]/74 md:text-base md:leading-8">
                Whether you are searching for a new home, an investment opportunity or information about our developments, our team would be pleased to assist.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:info@tmsestates.com"
                  className="inline-flex items-center gap-3 rounded-full bg-[#F5F0E8] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0D1B2E] transition-colors hover:bg-[#C2A139] hover:text-[#05070B] md:px-6 md:py-4"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-3 rounded-full border border-white/16 bg-white/[0.03] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] transition-colors hover:border-[#C2A139] hover:text-[#C2A139] md:px-6 md:py-4"
                >
                  Our Portfolio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-7 lg:p-9 xl:p-10">
            <Swiper
              modules={[Autoplay, Navigation]}
              loop={properties.length > 3}
              navigation
              slidesPerView={1}
              spaceBetween={16}
              speed={850}
              autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
              breakpoints={{
                700: { slidesPerView: 2, spaceBetween: 18 },
                1180: { slidesPerView: 3, spaceBetween: 22 },
              }}
              className="tms-property-swiper tms-property-showcase !overflow-visible !pb-4"
            >
              {properties.map((property, index) => (
                <SwiperSlide key={`${property.id}-${index}`} className="h-auto">
                  <Link
                    href={`/properties/${property.slug}`}
                    className="group relative block h-[390px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#05070B] shadow-[0_18px_70px_rgba(0,0,0,0.28)] md:h-[430px] xl:h-[470px]"
                  >
                    <Image
                      src={imageFor(property)}
                      alt={property.title || "TMS Estates property"}
                      fill
                      sizes="(max-width: 700px) 92vw, (max-width: 1180px) 46vw, 30vw"
                      className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/96 via-[#05070B]/38 to-[#05070B]/4" />
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(194,161,57,0.22),transparent_42%)]" />

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                      <span className="rounded-full border border-[#C2A139]/35 bg-[#05070B]/50 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#C2A139] backdrop-blur-md">
                        {shortLabel(property)}
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/14 bg-[#05070B]/38 text-[#F5F0E8] backdrop-blur-md transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[#C2A139] group-hover:text-[#C2A139]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/62">
                        <MapPin className="h-3.5 w-3.5 text-[#C2A139]" />
                        <span>{property.city || "Cyprus"}</span>
                      </div>

                      <h3 className="line-clamp-2 font-montserrat text-2xl font-semibold leading-tight tracking-[-0.045em] text-[#F5F0E8] xl:text-3xl">
                        {property.title}
                      </h3>

                      <p className="mt-3 text-sm font-medium text-[#F5F0E8]/70">
                        {formatPrice(property.price, property.currency)}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs text-[#F5F0E8]/62">
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
        </div>
      </div>
    </section>
  );
}
