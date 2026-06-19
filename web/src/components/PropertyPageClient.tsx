"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Bath, BedDouble, ChevronLeft, Home, MapPin, Ruler } from "lucide-react";
import { Link } from "@/i18n/routing";

const API = process.env.NEXT_PUBLIC_API_URL || process.env.STRAPI_API_URL || "";

type StrapiMedia = { url: string; alternativeText?: string; formats?: any };

type ProjectRelation = {
  id?: number;
  title?: string;
  Title?: string;
  slug?: string;
  location?: string;
  Location?: string;
  coverImage?: StrapiMedia | StrapiMedia[];
};

export type Property = {
  id: number;
  title?: string;
  slug: string;
  description?: string;
  city?: string;
  address?: string;
  area?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  propertyType?: string | null;
  price?: number | null;
  currency?: "EUR" | "USD" | "GBP" | null;
  prop_status?: "for-sale" | "for-rent" | "sold" | "rented" | null;
  marketing_label?: string | null;
  marketing_tags?: string | null;
  vip?: boolean;
  images?: StrapiMedia[];
  project?: ProjectRelation | { data?: ProjectRelation } | null;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
};

function asUrl(u?: string) {
  if (!u) return "";
  return u.startsWith("http") ? u : `${API}${u}`;
}

function mediaUrl(media?: StrapiMedia) {
  if (!media) return "/assets/hero-poster.jpg";
  return asUrl(media.formats?.large?.url || media.formats?.medium?.url || media.url) || "/assets/hero-poster.jpg";
}

function formatPrice(price?: number | null, currency?: string | null) {
  if (!price) return "Price Upon Request";
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: currency || "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

function readable(value?: string | null) {
  if (!value) return "";
  return value.replace(/[-_]/g, " ");
}

function extractProject(property: Property): ProjectRelation | null {
  const raw: any = property.project;
  if (!raw) return null;
  return raw.data?.attributes ? { id: raw.data.id, ...raw.data.attributes } : raw.data || raw.attributes || raw;
}

function paragraphs(value?: string) {
  return (value || "")
    .split(/\n{2,}|\r\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function PropertyPageClient({ property }: { property: Property }) {
  if (!property) return <div className="min-h-screen bg-[#05070B] text-[#F5F0E8]" />;

  const images = property.images || [];
  const heroImage = mediaUrl(images[0]);
  const sideImage = mediaUrl(images[1] || images[0]);
  const project = extractProject(property);
  const projectTitle = project?.Title || project?.title;
  const projectSlug = project?.slug;
  const descriptionParagraphs = paragraphs(property.description);

  const label = property.vip ? "VIP" : property.marketing_label || property.marketing_tags || property.propertyType || property.prop_status || "Property";

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070B] text-[#F5F0E8]">
      <section className="relative flex min-h-[94svh] items-end overflow-hidden pt-32">
        <Image src={heroImage} alt={property.title || "Property"} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,11,0.94),rgba(5,7,11,0.62)_42%,rgba(5,7,11,0.82)),linear-gradient(to_top,rgba(5,7,11,1),rgba(5,7,11,0.10)_58%)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-14 md:px-10 lg:pb-20 xl:px-16">
          <Link href="/properties" className="mb-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C2A139] transition-colors hover:text-[#F5F0E8]">
            <ChevronLeft className="h-4 w-4" /> Properties
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="border border-[#C2A139]/45 bg-[#C2A139]/12 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C2A139]">
                  {label}
                </span>
                {property.prop_status && (
                  <span className="border border-white/14 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#F5F0E8]/76">
                    {readable(property.prop_status)}
                  </span>
                )}
              </div>
              <h1 className="max-w-5xl font-montserrat text-[clamp(3.4rem,7.8vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.075em] text-[#F5F0E8]">
                {property.title}
              </h1>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.72, ease: [0.16, 1, 0.3, 1] } } }} className="border border-white/12 bg-[#0D1B2E]/40 p-6 backdrop-blur-xl md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.32em] text-[#C2A139]">Price</p>
                  <p className="font-montserrat text-3xl font-semibold tracking-[-0.04em] text-[#F5F0E8] md:text-4xl">
                    {formatPrice(property.price, property.currency)}
                  </p>
                </div>
                <MapPin className="mt-1 h-5 w-5 text-[#C2A139]" />
              </div>
              <p className="mt-6 text-base leading-8 text-[#F5F0E8]/76">{property.city || property.address || "Cyprus"}</p>
              {projectTitle && projectSlug && (
                <Link href={`/projects/${projectSlug}`} className="mt-6 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#C2A139] transition-colors hover:text-[#F5F0E8]">
                  Part of {projectTitle}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#05070B] py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-2 gap-3 px-6 md:grid-cols-4 md:gap-4 md:px-10 xl:px-16">
          <Spec icon={<BedDouble className="h-5 w-5" />} label="Bedrooms" value={property.bedrooms ? String(property.bedrooms) : "—"} />
          <Spec icon={<Bath className="h-5 w-5" />} label="Bathrooms" value={property.bathrooms ? String(property.bathrooms) : "—"} />
          <Spec icon={<Ruler className="h-5 w-5" />} label="Area" value={property.area ? `${property.area} m²` : "—"} />
          <Spec icon={<Home className="h-5 w-5" />} label="Type" value={readable(property.propertyType) || "Residence"} />
        </div>
      </section>

      <section className="relative z-10 border-t border-white/10 bg-[#0D1B2E]/32 py-16 backdrop-blur-md md:py-24">
        <div className="mx-auto grid w-full max-w-[1500px] gap-12 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center xl:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="space-y-6 text-lg leading-9 text-[#F5F0E8]/78">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C2A139]">Property Overview</p>
            {descriptionParagraphs.length > 0 ? (
              descriptionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <p>Property details will be available soon.</p>
            )}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="relative min-h-[420px] overflow-hidden border border-white/12 bg-[#05070B] shadow-[0_30px_110px_rgba(0,0,0,0.34)] lg:min-h-[560px]">
            <Image src={sideImage} alt={property.title || "Property"} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/42 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {projectTitle && projectSlug && (
        <section className="relative z-10 border-t border-white/10 bg-[#05070B] py-14 md:py-20">
          <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10 xl:px-16">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C2A139]">Project Connection</p>
              <h2 className="font-montserrat text-3xl font-semibold tracking-[-0.05em] text-[#F5F0E8] md:text-5xl">{projectTitle}</h2>
            </div>
            <Link href={`/projects/${projectSlug}`} className="inline-flex items-center justify-center gap-3 rounded-full border border-white/16 bg-[#F5F0E8] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0D1B2E] transition-colors hover:bg-[#C2A139]">
              View Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm md:p-6">
      <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-[#C2A139]/35 bg-[#C2A139]/10 text-[#C2A139]">{icon}</div>
      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[#C2A139]/80">{label}</p>
      <p className="font-montserrat text-2xl font-semibold tracking-[-0.04em] text-[#F5F0E8]">{value}</p>
    </div>
  );
}
