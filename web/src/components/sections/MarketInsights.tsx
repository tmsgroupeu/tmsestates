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

      setProperties(data || []);
    }

    loadProperties();
  }, []);

  const sortedProperties = useMemo(() => {
    return [...properties].sort((a: any, b: any) => Number(Boolean(b.vip)) - Number(Boolean(a.vip)));
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
    <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden py-16 md:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[#05070B]/30 backdrop-blur-[1px]" />

      <div className="home-container relative z-10">
        <div className="grid gap-8 pb-8 md:pb-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <h2 className="max-w-3xl font-montserrat text-[clamp(2.15rem,4.5vw,5.15rem)] font-bold leading-[1.0] tracking-[-0.055em] text-[#F5F0E8] text-balance">
            Looking for Your Next Property Opportunity?
          </h2>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-base leading-8 text-[#F5F0E8]/82 md:text-lg md:leading-9">
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
          loop={carouselProperties.length > 6}
          loopAdditionalSlides={carouselProperties.length}
          watchOverflow={false}
          navigation
          slidesPerView="auto"
          spaceBetween={18}
          speed={850}
          autoplay={{ delay: 3400, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            768: { spaceBetween: 22 },
            1280: { spaceBetween: 26 },
          }}
          className="tms-property-swiper tms-property-rail !overflow-visible !px-6 md:!px-10 lg:!px-[clamp(3rem,7vw,8.5rem)]"
        >
          {carouselProperties.map((property, index) => (
            <SwiperSlide key={`${property.id}-${index}`} className="!w-[82vw] max-w-[390px] py-2 md:!w-[405px] md:max-w-none md:py-3 xl:!w-[430px]">
              <Link
                href={`/properties/${property.slug}`}
                className="group relative block h-[390px] overflow-hidden border border-white/10 bg-[#05070B]/50 shadow-[0_22px_75px_rgba(0,0,0,0.28)] backdrop-blur-[1px] transition-all duration-500 hover:-translate-y-1 hover:border-[#C2A139]/45 hover:shadow-[0_30px_95px_rgba(0,0,0,0.38)] md:h-[440px] xl:h-[500px]"
              >
                <Image
                  src={imageFor(property)}
                  alt={property.title || "TMS Estates property"}
                  fill
                  sizes="(max-width: 768px) 82vw, (max-width: 1280px) 405px, 430px"
                  className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/90 via-[#05070B]/44 to-[#05070B]/10" />
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05070B]/42 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#05070B]/97 via-[#05070B]/82 to-transparent" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
                  <span className="max-w-[70%] truncate border border-[#C2A139]/45 bg-[#05070B]/62 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#C2A139] shadow-[0_10px_35px_rgba(0,0,0,0.28)] backdrop-blur-md">
                    {badgeFor(property)}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-[#05070B]/42 text-[#F5F0E8] backdrop-blur-md transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[#C2A139] group-hover:bg-[#C2A139] group-hover:text-[#05070B]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#05070B]/46 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/82 backdrop-blur-md">
                    <MapPin className="h-3.5 w-3.5 text-[#C2A139]" />
                    <span>{property.city || "Cyprus"}</span>
                  </div>

                  <h3 className="line-clamp-2 font-montserrat text-[1.45rem] font-semibold leading-[1.05] tracking-[-0.045em] text-[#F5F0E8] drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] md:text-[1.75rem] xl:text-[1.95rem]">
                    {property.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-[#F5F0E8]/82">
                    {formatPrice(property.price, property.currency)}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/12 pt-4 text-xs text-[#F5F0E8]/78">
                    {property.bedrooms && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.065] px-3 py-1.5 backdrop-blur-sm">
                        <BedDouble className="h-4 w-4 text-[#C2A139]" />
                        {property.bedrooms} Beds
                      </span>
                    )}
                    {property.area && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.065] px-3 py-1.5 backdrop-blur-sm">
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
