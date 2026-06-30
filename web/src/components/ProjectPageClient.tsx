"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  CalendarClock,
  ChevronLeft,
  Mail,
  MapPin,
  Ruler,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import {
  areaText,
  bathroomText,
  bedroomText,
  formatPropertyPrice,
  readable,
} from "@/lib/propertyDisplay";
import "swiper/css";
import "swiper/css/navigation";

const API_URL =
  process.env.CMS_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tmsestates.onrender.com";

function firstDefined(...values: any[]) {
  return values.find(
    (value) => value !== undefined && value !== null && String(value).trim() !== "",
  );
}

function getSafeUrl(data: any): string | null {
  if (!data) return null;

  let item = Array.isArray(data) ? data[0] : data;
  if (item?.data) item = Array.isArray(item.data) ? item.data[0] : item.data;
  if (!item) return null;

  const attributes = item.attributes || item;
  const url =
    attributes?.formats?.large?.url ||
    attributes?.formats?.medium?.url ||
    attributes?.formats?.small?.url ||
    attributes?.url ||
    item.url;

  if (!url) return null;
  return url.startsWith("http") ? url : `${API_URL}${url}`;
}

function getMediaArray(data: any): any[] {
  if (!data) return [];
  const items = data.data || data;
  return Array.isArray(items) ? items : [items];
}

function extractText(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value.trim();

  if (Array.isArray(value)) {
    return value
      .map((block) => block.children?.map((child: any) => child.text).join("") || "")
      .filter(Boolean)
      .join("\n\n")
      .trim();
  }

  return "";
}

function splitDescription(text: string) {
  const clean = text.replace(/\r\n/g, "\n").trim();

  if (clean.includes("\n---\n")) {
    const [first, ...rest] = clean.split("\n---\n");

    return {
      first: first.trim(),
      second: rest.join("\n---\n").trim(),
    };
  }

  const paragraphs = clean
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (paragraphs.length <= 1) {
    const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean];
    const middle = Math.ceil(sentences.length / 2);

    return {
      first: sentences.slice(0, middle).join(" ").trim(),
      second: sentences.slice(middle).join(" ").trim(),
    };
  }

  const middle = Math.ceil(paragraphs.length / 2);

  return {
    first: paragraphs.slice(0, middle).join("\n\n"),
    second: paragraphs.slice(middle).join("\n\n"),
  };
}

function paragraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export default function ProjectPageClient({ project }: { project: any }) {
  const p = project?.attributes || project || {};

  const title = firstDefined(p.Title, p.title, "Signature Development");
  const location = firstDefined(
    p.Location,
    p.location,
    p.Destination,
    p.destination,
    p.city,
    "Cyprus",
  );
  const status = firstDefined(
    p.CompletionStatus,
    p.completionStatus,
    p.Status,
    p.status,
    "",
  );
  const scale = firstDefined(p.Scale, p.scale, "");

  const overview = extractText(firstDefined(p.Description, p.description));
  const { first, second } = splitDescription(overview);

  const coverUrl =
    getSafeUrl(firstDefined(p.coverImage, p.coverimage, p.CoverImage, p.image)) ||
    "/assets/hero-poster.jpg";

  const galleryUrls = getMediaArray(firstDefined(p.gallery, p.Gallery))
    .map((img) => getSafeUrl(img))
    .filter(Boolean) as string[];

  const firstVisual = galleryUrls[0] || coverUrl;
  const secondVisual = galleryUrls[1] || galleryUrls[0] || coverUrl;

  const connectedPropertiesRaw = p.properties?.data || p.properties || [];
  const connectedProperties = Array.isArray(connectedPropertiesRaw)
    ? connectedPropertiesRaw
    : [];

  return (
    <main className="detail-page-main overflow-hidden bg-[#F5F0E8] text-[#242124]">
      <section className="relative flex min-h-[56svh] items-end overflow-hidden bg-[#242124] px-6 pb-20 pt-36 md:px-10 md:pt-44 lg:min-h-[64svh]">
        <Image
          src={coverUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#242124]/36" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#242124]/88 via-[#242124]/48 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#242124]/94 via-[#242124]/56 to-[#242124]/22" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242124]/98 via-[#242124]/48 to-transparent" />
        <div className="absolute bottom-0 left-0 h-[54%] w-full bg-gradient-to-t from-[#242124] via-[#242124]/78 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp}>
              <Link
                href="/projects"
                className="mb-7 inline-flex items-center gap-3 border border-[#C2A139]/44 bg-[#242124]/62 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C2A139] shadow-[0_12px_36px_rgba(0,0,0,0.34)] backdrop-blur-md transition-all duration-300 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124]"
              >
                <ChevronLeft className="h-4 w-4" />
                Projects
              </Link>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-montserrat text-[clamp(2.75rem,6vw,6.8rem)] font-bold leading-[0.95] tracking-[-0.07em] text-[#F5F0E8] drop-shadow-[0_16px_44px_rgba(0,0,0,0.72)]"
            >
              {title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 bg-[#F5F0E8] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="project-meta-bar relative mx-auto -mt-12 grid w-full max-w-6xl overflow-hidden bg-white shadow-[0_28px_95px_rgba(36,33,36,0.18)] md:grid-cols-3"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-[#C2A139]/14">
            <div className="project-meta-gold-line h-full w-1/3 bg-gradient-to-r from-transparent via-[#C2A139] to-transparent" />
          </div>

          <ProjectMeta icon={<MapPin />} label="Location" value={location} />
          {status && <ProjectMeta icon={<CalendarClock />} label="Status" value={status} />}
          {scale && <ProjectMeta icon={<Ruler />} label="Available Units" value={scale} />}
        </motion.div>
      </section>

      <section className="bg-[#F5F0E8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-90px" }}
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]"
            >
              Project Overview
            </motion.p>

            <div className="space-y-5 text-sm leading-7 text-[#242124]/74 md:text-[0.95rem] md:leading-8">
              {paragraphs(first).map((item) => (
                <motion.p key={item} variants={fadeUp}>
                  {item}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <EditorialImage src={firstVisual} alt={`${title} interior`} light />
        </div>
      </section>

      <section className="bg-[#242124] px-6 py-16 text-[#F5F0E8] md:px-10 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:gap-20">
          <EditorialImage src={secondVisual} alt={`${title} detail`} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-90px" }}
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]"
            >
              Design & Value
            </motion.p>

            <div className="space-y-5 text-sm leading-7 text-[#F5F0E8]/76 md:text-[0.95rem] md:leading-8">
              {paragraphs(second || first).map((item) => (
                <motion.p key={item} variants={fadeUp}>
                  {item}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F5F0E8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-90px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]"
              >
                Residences
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="font-montserrat text-[clamp(2rem,3.6vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#242124]"
              >
                Available Units
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-90px" }}
              variants={fadeUp}
              className="max-w-2xl text-sm leading-7 text-[#242124]/68 md:text-[0.95rem] md:leading-8"
            >
              Explore the available residences connected to this development, or contact our team for current availability and project guidance.
            </motion.div>
          </div>

          {connectedProperties.length > 0 ? (
            <div className="available-units-rail relative mt-10 w-screen overflow-hidden bg-[#242124] py-7 shadow-[0_34px_110px_rgba(36,33,36,0.2)] md:py-9">
              <div className="pointer-events-none absolute inset-0 z-0 bg-[#242124]" />
              <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_-28%,rgba(194,161,57,0.15),transparent_38%),linear-gradient(180deg,rgba(245,240,232,0.035),transparent_28%,rgba(5,7,11,0.22))]" />
              <div className="available-units-rail-line pointer-events-none absolute left-0 top-0 z-[2] h-[2px] w-full" />
              <div className="available-units-rail-line-bottom pointer-events-none absolute bottom-0 left-0 z-[2] h-px w-full" />

              <Swiper
                modules={[Autoplay, Navigation]}
                loop={connectedProperties.length > 3}
                watchOverflow
                navigation
                slidesPerView="auto"
                spaceBetween={18}
                speed={850}
                autoplay={
                  connectedProperties.length > 3
                    ? {
                        delay: 3400,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }
                    : false
                }
                breakpoints={{
                  768: { spaceBetween: 22 },
                  1280: { spaceBetween: 26 },
                }}
                className="tms-property-swiper relative z-10 !overflow-visible !px-6 md:!px-10 lg:!px-[clamp(3rem,7vw,8.5rem)]"
              >
                {connectedProperties.map((rawProp: any) => {
                  const prop = rawProp.attributes || rawProp;

                  return (
                    <SwiperSlide
                      key={rawProp.id || prop.id || prop.slug}
                      className="!w-[80vw] max-w-[360px] py-2 md:!w-[378px] md:max-w-none md:py-3 xl:!w-[405px]"
                    >
                      <UnitCard property={{ ...prop, id: rawProp.id || prop.id }} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          ) : (
            <div className="mt-10 border border-[#242124]/10 bg-white/46 p-8 text-sm leading-7 text-[#242124]/68">
              Available units will be updated soon. Contact our team for more information about this development.
            </div>
          )}

          <div className="mt-12 flex flex-col gap-3 border-t border-[#242124]/10 pt-8 sm:flex-row">
            <a
              href="mailto:info@tmsestates.com"
              className="group inline-flex items-center justify-center gap-3 bg-[#242124] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] transition-all duration-300 hover:bg-[#C2A139] hover:text-[#242124]"
            >
              Request Project Details
              <Mail className="h-4 w-4" />
            </a>

            <Link
              href="/projects"
              className="group inline-flex items-center justify-center gap-3 border border-[#242124]/18 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#242124] transition-all duration-300 hover:border-[#C2A139] hover:text-[#C2A139]"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .project-meta-bar {
          box-shadow:
            0 28px 95px rgba(36, 33, 36, 0.18),
            0 -10px 32px rgba(36, 33, 36, 0.1),
            inset 0 1px 0 rgba(194, 161, 57, 0.08);
        }

        .project-meta-gold-line {
          animation: projectMetaGoldSweep 4.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          opacity: 0.9;
          filter: drop-shadow(0 0 8px rgba(194, 161, 57, 0.45));
        }

        .available-units-rail {
          isolation: isolate;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          transform: translateZ(0);
        }

        .available-units-rail-line,
        .available-units-rail-line-bottom {
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
          animation: availableUnitsGoldSweep 5.6s ease-in-out infinite;
        }

        .available-units-rail-line-bottom {
          opacity: 0.56;
          animation-delay: 1.25s;
        }

        :global(body:has(.detail-page-main) #page-footer) {
          padding-top: 0;
        }

        :global(body:has(.detail-page-main) #page-footer > div:first-child) {
          display: none;
        }

        @keyframes projectMetaGoldSweep {
          0% {
            transform: translateX(-115%);
          }
          46%,
          100% {
            transform: translateX(320%);
          }
        }

        @keyframes availableUnitsGoldSweep {
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
    </main>
  );
}

function ProjectMeta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="group relative border-b border-[#242124]/8 bg-white px-6 py-6 transition-colors duration-300 last:border-b-0 hover:bg-[#F5F0E8] md:border-b-0 md:border-r md:px-8 md:last:border-r-0">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/70 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="mb-3 flex h-9 w-9 items-center justify-center border border-[#C2A139]/30 bg-[#C2A139]/[0.09] text-[#C2A139] transition-all duration-300 group-hover:bg-[#C2A139] group-hover:text-[#242124]">
          <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        </div>

        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[#C2A139]">
          {label}
        </p>

        <p className="text-sm font-semibold leading-6 text-[#242124]">{value}</p>
      </div>
    </div>
  );
}

function EditorialImage({
  src,
  alt,
  light = false,
}: {
  src: string;
  alt: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      variants={fadeUp}
      className={`relative min-h-[320px] overflow-hidden shadow-[0_28px_90px_rgba(36,33,36,0.18)] md:min-h-[420px] ${
        light ? "bg-white" : "bg-[#05070B]"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 48vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#242124]/34 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#C2A139]/70 to-transparent" />
    </motion.div>
  );
}

function UnitCard({ property }: { property: any }) {
  const beds = bedroomText(property);
  const baths = bathroomText(property);
  const area = areaText(property);
  const imageData = property.images?.data?.[0] || property.images?.[0];
  const image = getSafeUrl(imageData) || "/assets/hero-poster.jpg";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group relative block h-[360px] overflow-hidden border border-[#F5F0E8]/22 bg-[#05070B] shadow-[0_20px_65px_rgba(0,0,0,0.34)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C2A139]/60 hover:shadow-[0_28px_90px_rgba(0,0,0,0.44)] md:h-[405px] xl:h-[455px]"
    >
      <Image
        src={image}
        alt={property.title || "TMS Estates residence"}
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
          {readable(property.marketing_label || property.marketing_tags || property.propertyType || property.prop_status || "Residence")}
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
          {beds && (
            <span className="inline-flex max-w-full items-center gap-2 border border-white/14 bg-[#05070B]/86 px-3 py-1.5 font-semibold text-[#F5F0E8] shadow-[0_8px_24px_rgba(0,0,0,0.42)] backdrop-blur-md">
              <BedDouble className="h-4 w-4 shrink-0 text-[#C2A139]" />
              <span className="truncate">{beds}</span>
            </span>
          )}

          {baths && (
            <span className="inline-flex max-w-full items-center gap-2 border border-white/14 bg-[#05070B]/86 px-3 py-1.5 font-semibold text-[#F5F0E8] shadow-[0_8px_24px_rgba(0,0,0,0.42)] backdrop-blur-md">
              <Bath className="h-4 w-4 shrink-0 text-[#C2A139]" />
              <span className="truncate">{baths}</span>
            </span>
          )}

          {area && (
            <span className="inline-flex max-w-full items-center gap-2 border border-white/14 bg-[#05070B]/86 px-3 py-1.5 font-semibold text-[#F5F0E8] shadow-[0_8px_24px_rgba(0,0,0,0.42)] backdrop-blur-md">
              <Ruler className="h-4 w-4 shrink-0 text-[#C2A139]" />
              <span className="truncate">{area}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
