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
  Bath,
  BedDouble,
  MapPin,
  Ruler,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import {
  areaText,
  bathroomText,
  bedroomText,
  formatPropertyPrice,
} from "@/lib/propertyDisplay";
import "swiper/css";
import "swiper/css/navigation";

function shuffleProperties(list: Property[]) {
  const shuffled = [...list];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

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
        "pagination[pageSize]": "50",
        "sort[0]": "createdAt:desc",
      });

      setProperties(shuffleProperties(data || []));
    }

    loadProperties();
  }, []);

  const carouselProperties = useMemo(() => {
    if (!properties.length) return [];

    const minimumSlides = 16;
    const repeated: Property[] = [];

    while (repeated.length < minimumSlides) {
      repeated.push(...properties);
    }

    return repeated;
  }, [properties]);

  if (!carouselProperties.length) return null;

  return (
    <section className="relative w-full overflow-hidden pt-12 md:pt-14 lg:pt-16">
      <div className="home-container relative z-10">
        <div className="grid gap-7 px-5 pb-8 pt-5 md:px-8 md:pb-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <h2 className="max-w-[760px] font-montserrat text-[clamp(1.75rem,2.4vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.052em] text-[#F5F0E8] text-balance drop-shadow-[0_18px_46px_rgba(0,0,0,0.44)]">
            <span className="block">Looking for Your Next</span>
            <span className="block text-[#C2A139]">
              Property Opportunity?
            </span>
          </h2>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-[0.98rem] leading-6 text-[#F5F0E8]/88 drop-shadow-[0_14px_34px_rgba(0,0,0,0.42)] md:text-[1.02rem] md:leading-7">
              Whether you are searching for a new home, an investment
              opportunity or information about our developments, our team would
              be pleased to assist.
            </p>

            <a
              href="mailto:info@tmsestates.com"
              className="group relative mt-6 inline-flex min-h-[54px] w-fit items-center justify-center overflow-hidden border border-[#C2A139]/70 bg-[#242124]/72 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8] shadow-[0_22px_64px_rgba(0,0,0,0.32)] backdrop-blur-[10px] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_28px_84px_rgba(194,161,57,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A139]/70 md:px-8"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5F0E8] to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
              <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#C2A139] transition-all duration-500 group-hover:w-full" />
              <span className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/28 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

              <span className="relative z-10 flex items-center gap-4">
                Contact Us
                <span className="flex h-8 w-8 items-center justify-center border border-[#C2A139]/55 bg-[#05070B]/28 text-[#C2A139] transition-all duration-500 group-hover:border-[#242124]/40 group-hover:bg-[#242124] group-hover:text-[#F5F0E8]">
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="property-opportunity-rail relative z-10 w-screen overflow-hidden bg-[#242124] py-7 shadow-[0_34px_110px_rgba(0,0,0,0.46)] md:py-9">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#242124]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_-28%,rgba(194,161,57,0.15),transparent_38%),linear-gradient(180deg,rgba(245,240,232,0.035),transparent_28%,rgba(5,7,11,0.22))]" />
        <div className="property-opportunity-rail-line pointer-events-none absolute left-0 top-0 z-[2] h-[2px] w-full" />
        <div className="property-opportunity-rail-line-bottom pointer-events-none absolute bottom-0 left-0 z-[2] h-px w-full" />

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
          className="tms-property-swiper tms-property-rail relative z-10 !overflow-visible !px-6 md:!px-10 lg:!px-[clamp(3rem,7vw,8.5rem)]"
        >
          {carouselProperties.map((property, index) => {
            const beds = bedroomText(property);
            const baths = bathroomText(property);
            const area = areaText(property);

            return (
            <SwiperSlide
              key={`${property.id}-${index}`}
              className="!w-[80vw] max-w-[360px] py-2 md:!w-[378px] md:max-w-none md:py-3 xl:!w-[405px]"
            >
              <Link
                href={`/properties/${property.slug}`}
                className="group relative block h-[360px] overflow-hidden border border-[#F5F0E8]/22 bg-[#05070B] shadow-[0_20px_65px_rgba(0,0,0,0.34)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C2A139]/60 hover:shadow-[0_28px_90px_rgba(0,0,0,0.44)] md:h-[405px] xl:h-[455px]"
              >
                <Image
                  src={imageFor(property)}
                  alt={property.title || "TMS Estates property"}
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1280px) 378px, 405px"
                  className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-[#05070B]/18 transition duration-500 group-hover:bg-[#05070B]/10" />
                <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#05070B]/68 via-[#05070B]/28 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-[#05070B]/99 via-[#05070B]/82 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-[68%] bg-gradient-to-r from-[#05070B]/50 to-transparent" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
                  <span className="max-w-[70%] truncate border border-[#C2A139]/50 bg-[#242124]/78 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#C2A139] shadow-[0_10px_35px_rgba(0,0,0,0.34)] backdrop-blur-md">
                    {badgeFor(property)}
                  </span>

                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-[#242124]/58 text-[#F5F0E8] shadow-[0_10px_32px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[#C2A139] group-hover:bg-[#C2A139] group-hover:text-[#05070B]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/22 bg-[#242124]/68 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/90 backdrop-blur-md">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C2A139]" />
                    <span className="truncate">{property.city || "Cyprus"}</span>
                  </div>

                  <h3 className="line-clamp-2 font-montserrat text-[1.35rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[#F5F0E8] drop-shadow-[0_8px_24px_rgba(0,0,0,0.78)] md:text-[1.55rem] xl:text-[1.75rem]">
                    {property.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-[#F5F0E8]/90 drop-shadow-[0_8px_22px_rgba(0,0,0,0.62)]">
                    {formatPropertyPrice(property)}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/16 pt-4 text-xs">
                    {beds ? (
                      <span className="inline-flex max-w-full items-center gap-2 border border-white/14 bg-[#05070B]/86 px-3 py-1.5 font-semibold text-[#F5F0E8] shadow-[0_8px_24px_rgba(0,0,0,0.42)] backdrop-blur-md">
                        <BedDouble className="h-4 w-4 shrink-0 text-[#C2A139]" />
                        <span className="truncate">{beds}</span>
                      </span>
                    ) : null}

                    {baths ? (
                      <span className="inline-flex max-w-full items-center gap-2 border border-white/14 bg-[#05070B]/86 px-3 py-1.5 font-semibold text-[#F5F0E8] shadow-[0_8px_24px_rgba(0,0,0,0.42)] backdrop-blur-md">
                        <Bath className="h-4 w-4 shrink-0 text-[#C2A139]" />
                        <span className="truncate">{baths}</span>
                      </span>
                    ) : null}

                    {area ? (
                      <span className="inline-flex max-w-full items-center gap-2 border border-white/14 bg-[#05070B]/86 px-3 py-1.5 font-semibold text-[#F5F0E8] shadow-[0_8px_24px_rgba(0,0,0,0.42)] backdrop-blur-md">
                        <Ruler className="h-4 w-4 shrink-0 text-[#C2A139]" />
                        <span className="truncate">{area}</span>
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <style jsx>{`
        .property-opportunity-rail {
          isolation: isolate;
          transform: translateZ(0);
        }

        .property-opportunity-rail-line,
        .property-opportunity-rail-line-bottom {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(194, 161, 57, 0.4),
            rgba(194, 161, 57, 1),
            rgba(245, 240, 232, 0.78),
            rgba(194, 161, 57, 1),
            rgba(194, 161, 57, 0.4),
            transparent
          );
          background-size: 260% 100%;
          box-shadow: 0 0 20px rgba(194, 161, 57, 0.36);
          animation: propertyRailGoldSweep 5.6s ease-in-out infinite;
        }

        .property-opportunity-rail-line-bottom {
          opacity: 0.56;
          animation-delay: 1.25s;
        }

        @keyframes propertyRailGoldSweep {
          0% {
            background-position: 130% 0;
            opacity: 0.5;
          }
          42% {
            opacity: 1;
          }
          100% {
            background-position: -130% 0;
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
