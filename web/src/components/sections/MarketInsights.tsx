"use client";

import { fetchProperties, Property } from "@/lib/cms";
import { getStrapiMediaUrl } from "@/lib/media";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  MapPin,
  Ruler,
} from "lucide-react";
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

      setProperties(data || []);
    }

    loadProperties();
  }, []);

  const sortedProperties = useMemo(() => {
    return [...properties].sort(
      (a: any, b: any) => Number(Boolean(b.vip)) - Number(Boolean(a.vip)),
    );
  }, [properties]);

  const carouselProperties = useMemo(() => {
    if (!sortedProperties.length) return [];

    const minimumSlides = 16;
    const repeated: Property[] = [];

    while (repeated.length < minimumSlides) {
      repeated.push(...sortedProperties);
    }

    return repeated;
  }, [sortedProperties]);

  if (!carouselProperties.length) return null;

  return (
    <section className="relative flex min-h-[88svh] w-full flex-col justify-center overflow-hidden py-12 md:py-14 lg:py-16">
      <div className="absolute inset-0 -z-10 bg-[#05070B]/54" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#05070B]/12 via-transparent to-[#05070B]/34" />

      <div className="home-container relative z-10">
        <div className="grid gap-7 pb-10 md:pb-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,0.9fr)] lg:items-end lg:gap-20">
          <h2 className="max-w-3xl font-montserrat text-[clamp(2.05rem,3vw,3.45rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8]">
            <span className="block">Looking for Your Next</span>
            <span className="block text-[#C2A139]">
              Property Opportunity?
            </span>
          </h2>

          <div className="max-w-2xl lg:pb-2">
            <p className="text-balance text-base leading-8 text-[#F5F0E8]/84 md:text-[1.04rem] md:leading-9">
              Whether you are searching for a new home, an investment
              opportunity or information about our developments, our team would
              be pleased to assist.
            </p>

            <a
              href="mailto:info@tmsestates.com"
              className="group mt-7 inline-flex items-center gap-3 border border-[#C2A139]/48 bg-[#242124]/88 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_24px_75px_rgba(194,161,57,0.2)]"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-screen overflow-hidden border-y border-[#C2A139]/18 bg-[#242124] py-6 shadow-[0_30px_110px_rgba(0,0,0,0.36)] md:py-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05070B]/18 via-transparent to-[#05070B]/18" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden bg-[#C2A139]/18">
          <div className="gold-rail-line h-full w-1/3 bg-gradient-to-r from-transparent via-[#C2A139] to-transparent" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden bg-[#C2A139]/10">
          <div className="gold-rail-line gold-rail-line-delayed h-full w-1/3 bg-gradient-to-r from-transparent via-[#C2A139]/80 to-transparent" />
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          loop={carouselProperties.length > 6}
          loopAdditionalSlides={carouselProperties.length}
          watchOverflow={false}
          navigation
          slidesPerView="auto"
          spaceBetween={18}
          speed={850}
          autoplay={{
            delay: 3400,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: { spaceBetween: 22 },
            1280: { spaceBetween: 26 },
          }}
          className="tms-property-swiper tms-property-rail !overflow-visible !px-6 md:!px-10 lg:!px-[clamp(3rem,7vw,8.5rem)]"
        >
          {carouselProperties.map((property, index) => (
            <SwiperSlide
              key={`${property.id}-${index}`}
              className="!w-[80vw] max-w-[360px] py-2 md:!w-[378px] md:max-w-none md:py-3 xl:!w-[405px]"
            >
              <Link
                href={`/properties/${property.slug}`}
                className="group relative block h-[360px] overflow-hidden border border-[#F5F0E8]/14 bg-[#05070B]/70 shadow-[0_20px_65px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C2A139]/50 hover:shadow-[0_28px_90px_rgba(0,0,0,0.42)] md:h-[405px] xl:h-[455px]"
              >
                <Image
                  src={imageFor(property)}
                  alt={property.title || "TMS Estates property"}
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1280px) 378px, 405px"
                  className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/97 via-[#05070B]/70 to-[#05070B]/30" />
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05070B]/74 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#05070B]/99 via-[#05070B]/90 to-transparent" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
                  <span className="max-w-[70%] truncate border border-[#C2A139]/50 bg-[#05070B]/72 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#C2A139] shadow-[0_10px_35px_rgba(0,0,0,0.34)] backdrop-blur-md">
                    {badgeFor(property)}
                  </span>

                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-[#05070B]/56 text-[#F5F0E8] shadow-[0_10px_32px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[#C2A139] group-hover:bg-[#C2A139] group-hover:text-[#05070B]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/14 bg-[#05070B]/58 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/86 backdrop-blur-md">
                    <MapPin className="h-3.5 w-3.5 text-[#C2A139]" />
                    <span>{property.city || "Cyprus"}</span>
                  </div>

                  <h3 className="line-clamp-2 font-montserrat text-[1.35rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[#F5F0E8] drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)] md:text-[1.55rem] xl:text-[1.75rem]">
                    {property.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-[#F5F0E8]/84">
                    {formatPrice(property.price, property.currency)}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/12 pt-4 text-xs text-[#F5F0E8]/82">
                    {property.bedrooms && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.075] px-3 py-1.5 backdrop-blur-sm">
                        <BedDouble className="h-4 w-4 text-[#C2A139]" />
                        {property.bedrooms} Beds
                      </span>
                    )}

                    {property.area && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.075] px-3 py-1.5 backdrop-blur-sm">
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

      <style jsx>{`
        .gold-rail-line {
          animation: goldRailSweep 5.8s ease-in-out infinite;
          opacity: 0.72;
        }

        .gold-rail-line-delayed {
          animation-delay: 2.9s;
          opacity: 0.45;
        }

        @keyframes goldRailSweep {
          0% {
            transform: translateX(-120%);
          }
          48%,
          100% {
            transform: translateX(320%);
          }
        }
      `}</style>
    </section>
  );
}
