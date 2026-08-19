"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  ChevronLeft,
  Home,
  Mail,
  Ruler,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import {
  areaValue,
  bathroomValue,
  bedroomValue,
  formatPropertyPrice,
  readable,
} from "@/lib/propertyDisplay";

const API =
  process.env.CMS_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tmsestates.onrender.com";

type StrapiMedia = {
  url?: string;
  alternativeText?: string;
  formats?: any;
};

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
  description?: any;
  city?: string;
  address?: string;
  locationLink?: string | null;
  area?: number | string | null;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  propertyType?: string | null;
  price?: number | null;
  currency?: "EUR" | "USD" | "GBP" | null;
  prop_status?: "for-sale" | "for-rent" | "sold" | "rented" | null;
  marketing_label?: string | null;
  marketing_tags?: string | null;
  vip?: boolean;
  images?: StrapiMedia[] | { data?: any[] };
  project?: ProjectRelation | { data?: ProjectRelation } | null;
};

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

function asUrl(u?: string) {
  if (!u) return "";
  return u.startsWith("http") ? u : `${API}${u}`;
}

function normalizeMedia(media: any): StrapiMedia | undefined {
  if (!media) return undefined;
  if (media.attributes) return media.attributes;
  return media;
}

function mediaUrl(media?: any) {
  const item = normalizeMedia(media);
  if (!item) return "/assets/hero-poster.jpg";

  const url =
    item.formats?.large?.url ||
    item.formats?.medium?.url ||
    item.formats?.small?.url ||
    item.url;

  return asUrl(url) || "/assets/hero-poster.jpg";
}

function mediaArray(images: any): any[] {
  if (!images) return [];
  const data = images.data || images;
  return Array.isArray(data) ? data : [data];
}

/**
 * Converts Strapi rich-text content into plain text while preserving
 * links in the structured Strapi format.
 */
function extractText(value: any): string {
  if (!value) return "";

  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value
      .map((block) => {
        if (!block) return "";

        if (typeof block === "string") {
          return block;
        }

        if (Array.isArray(block.children)) {
          return block.children
            .map((child: any) => {
              if (!child) return "";

              if (typeof child.text === "string") {
                return child.text;
              }

              if (Array.isArray(child.children)) {
                return child.children
                  .map((nested: any) => nested?.text || "")
                  .join("");
              }

              return "";
            })
            .join("");
        }

        return "";
      })
      .filter(Boolean)
      .join("\n\n")
      .trim();
  }

  return "";
}

/**
 * Splits the description into paragraphs while supporting both
 * Strapi rich-text output and Markdown-style paragraphs.
 */
function paragraphs(value?: any) {
  return extractText(value)
    .split(/\n{2,}|\r\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Renders a text string containing Markdown-style links:
 *
 * [View the location here](https://example.com)
 *
 * as a real clickable link.
 *
 * It also supports the format currently being used in Strapi:
 *
 * [**View the location here**](https://example.com)
 */
function renderMarkdownText(text: string) {
  const parts: React.ReactNode[] = [];

  const markdownLinkRegex =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = markdownLinkRegex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index);

    if (before) {
      parts.push(
        <span key={`text-${key++}`}>
          {renderInlineFormatting(before)}
        </span>
      );
    }

    let linkText = match[1];

    // Remove Markdown bold markers if present.
    linkText = linkText.replace(/\*\*/g, "");

    parts.push(
      <a
        key={`link-${key++}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#242124] underline decoration-[#C2A139] decoration-2 underline-offset-4 transition-colors duration-300 hover:text-[#C2A139]"
      >
        {linkText}
      </a>
    );

    lastIndex = markdownLinkRegex.lastIndex;
  }

  const remaining = text.slice(lastIndex);

  if (remaining) {
    parts.push(
      <span key={`text-${key++}`}>
        {renderInlineFormatting(remaining)}
      </span>
    );
  }

  return parts;
}

/**
 * Handles simple Markdown bold formatting without introducing
 * another dependency.
 */
function renderInlineFormatting(text: string) {
  const parts: React.ReactNode[] = [];

  const boldRegex = /\*\*(.*?)\*\*/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = boldRegex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index);

    if (before) {
      parts.push(
        <span key={`plain-${key++}`}>{before}</span>
      );
    }

    parts.push(
      <strong
        key={`bold-${key++}`}
        className="font-semibold"
      >
        {match[1]}
      </strong>
    );

    lastIndex = boldRegex.lastIndex;
  }

  const remaining = text.slice(lastIndex);

  if (remaining) {
    parts.push(
      <span key={`plain-${key++}`}>{remaining}</span>
    );
  }

  return parts;
}

/**
 * Renders Strapi structured rich-text content.
 *
 * This handles:
 * - normal text
 * - Strapi links
 * - Markdown links stored as plain text
 * - bold text
 */
function renderDescription(value: any) {
  if (!value) {
    return (
      <motion.p variants={fadeUp}>
        Property details will be available soon.
      </motion.p>
    );
  }

  /*
   * Structured Strapi rich text.
   *
   * Example:
   * [
   *   {
   *     type: "paragraph",
   *     children: [
   *       { type: "text", text: "View " },
   *       {
   *         type: "link",
   *         url: "https://maps.google.com",
   *         children: [
   *           { type: "text", text: "the location here" }
   *         ]
   *       }
   *     ]
   *   }
   * ]
   */
  if (Array.isArray(value)) {
    return value.map((block: any, blockIndex: number) => {
      if (!block) return null;

      const children = Array.isArray(block.children)
        ? block.children
        : [];

      return (
        <motion.p
          key={`description-block-${blockIndex}`}
          variants={fadeUp}
        >
          {children.map((child: any, childIndex: number) => {
            if (!child) return null;

            // Strapi link node
            if (child.type === "link" && child.url) {
              const linkText = Array.isArray(child.children)
                ? child.children
                    .map((nested: any) => nested?.text || "")
                    .join("")
                : "";

              return (
                <a
                  key={`description-link-${blockIndex}-${childIndex}`}
                  href={child.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#242124] underline decoration-[#C2A139] decoration-2 underline-offset-4 transition-colors duration-300 hover:text-[#C2A139]"
                >
                  {linkText}
                </a>
              );
            }

            // Normal Strapi text node
            if (typeof child.text === "string") {
              return (
                <span
                  key={`description-text-${blockIndex}-${childIndex}`}
                  className={child.bold ? "font-semibold" : undefined}
                >
                  {child.text}
                </span>
              );
            }

            return null;
          })}
        </motion.p>
      );
    });
  }

  /*
   * Fallback for plain strings / Markdown content.
   *
   * This is specifically what fixes the current content shown
   * in the screenshot:
   *
   * [**View the location here**](https://maps.app.goo.gl/...)
   */
  if (typeof value === "string") {
    return paragraphs(value).map((paragraph, index) => (
      <motion.p key={`description-${index}`} variants={fadeUp}>
        {renderMarkdownText(paragraph)}
      </motion.p>
    ));
  }

  return (
    <motion.p variants={fadeUp}>
      Property details will be available soon.
    </motion.p>
  );
}

function extractProject(property: Property): ProjectRelation | null {
  const raw: any = property.project;
  if (!raw) return null;

  if (raw.data?.attributes) {
    return { id: raw.data.id, ...raw.data.attributes };
  }

  return raw.data || raw.attributes || raw;
}

export default function PropertyPageClient({
  property,
}: {
  property: Property;
}) {
  if (!property) {
    return (
      <main className="min-h-screen bg-[#242124] text-[#F5F0E8]" />
    );
  }

  const images = mediaArray(property.images);
  const heroImage = mediaUrl(images[0]);
  const sideImage = mediaUrl(images[1] || images[0]);
  const galleryImages = images.slice(1, 4);

  const project = extractProject(property);
  const projectTitle = project?.Title || project?.title;
  const projectSlug = project?.slug;

  const label =
    property.vip
      ? "VIP"
      : property.marketing_label ||
        property.marketing_tags ||
        property.propertyType ||
        property.prop_status ||
        "Property";

  return (
    <main className="detail-page-main overflow-hidden bg-[#F5F0E8] text-[#242124]">
      <section className="relative flex min-h-[66svh] items-end overflow-hidden bg-[#242124] px-6 pb-20 pt-36 md:px-10 md:pt-44 lg:min-h-[74svh]">
        <Image
          src={heroImage}
          alt={property.title || "Property"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#242124]/34" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#242124]/88 via-[#242124]/48 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#242124]/94 via-[#242124]/56 to-[#242124]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242124]/98 via-[#242124]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 h-[58%] w-full bg-gradient-to-t from-[#242124] via-[#242124]/76 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp}>
              <Link
                href="/properties"
                className="mb-7 inline-flex items-center gap-3 border border-[#C2A139]/44 bg-[#242124]/62 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C2A139] shadow-[0_12px_36px_rgba(0,0,0,0.34)] backdrop-blur-md transition-all duration-300 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124]"
              >
                <ChevronLeft className="h-4 w-4" />
                Properties
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mb-5 flex flex-wrap gap-3"
            >
              <span className="border border-[#C2A139]/58 bg-[#242124]/72 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C2A139] shadow-[0_12px_34px_rgba(0,0,0,0.34)] backdrop-blur-md">
                {readable(label)}
              </span>

              {property.prop_status && (
                <span className="border border-[#F5F0E8]/24 bg-[#242124]/58 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#F5F0E8]/90 shadow-[0_12px_34px_rgba(0,0,0,0.3)] backdrop-blur-md">
                  {readable(property.prop_status)}
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-5xl font-montserrat text-[clamp(2.35rem,5.05vw,5.35rem)] font-bold leading-[0.98] tracking-[-0.065em] text-[#F5F0E8] drop-shadow-[0_16px_44px_rgba(0,0,0,0.72)]"
            >
              {property.title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 bg-[#F5F0E8] px-6 md:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            delay: 0.18,
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="property-summary-bar relative mx-auto -mt-12 grid w-full max-w-6xl overflow-hidden bg-white shadow-[0_28px_95px_rgba(36,33,36,0.18)] md:grid-cols-4"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-[#C2A139]/14">
            <div className="property-summary-gold-line h-full w-1/3 bg-gradient-to-r from-transparent via-[#C2A139] to-transparent" />
          </div>

          <SummaryItem
            label="Price"
            value={formatPropertyPrice(property)}
          />
          <SummaryItem
            label="Location"
            value={property.city || property.address || "Cyprus"}
            href={property.locationLink}
          />
          <SummaryItem
            label="Type"
            value={readable(property.propertyType) || "Residence"}
          />
          <SummaryItem
            label="Area"
            value={areaValue(property, "Upon Request")}
          />
        </motion.div>
      </section>

      <section className="bg-[#F5F0E8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
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
              Property Overview
            </motion.p>

            <div className="space-y-5 text-sm leading-7 text-[#242124]/74 md:text-[0.95rem] md:leading-8">
              {renderDescription(property.description)}
            </div>
          </motion.div>

          <EditorialImage
            src={sideImage}
            alt={property.title || "Property interior"}
          />
        </div>
      </section>

      <section className="bg-[#242124] px-6 py-16 text-[#F5F0E8] md:px-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl">
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
              Details
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-montserrat text-[clamp(2rem,3.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8]"
            >
              Residence Specifications
            </motion.h2>
          </motion.div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Spec
              icon={<BedDouble />}
              label="Bedrooms"
              value={bedroomValue(property)}
            />
            <Spec
              icon={<Bath />}
              label="Bathrooms"
              value={bathroomValue(property)}
            />
            <Spec
              icon={<Ruler />}
              label="Area"
              value={areaValue(property)}
            />
            <Spec
              icon={<Home />}
              label="Property Type"
              value={
                readable(property.propertyType) || "Residence"
              }
            />
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {galleryImages.map((image, index) => (
                <EditorialImage
                  key={index}
                  src={mediaUrl(image)}
                  alt={`${property.title || "Property"} gallery ${
                    index + 1
                  }`}
                  compact
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {projectTitle && projectSlug && (
        <section className="bg-[#F5F0E8] px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                Project Connection
              </p>

              <h2 className="font-montserrat text-[clamp(2rem,3.6vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#242124]">
                Part of {projectTitle}
              </h2>
            </div>

            <div className="max-w-2xl text-sm leading-7 text-[#242124]/68 md:text-[0.95rem] md:leading-8">
              This residence belongs to one of our carefully selected
              developments. View the full project to understand the
              wider concept, location and available units.
            </div>
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-3 border-t border-[#242124]/10 pt-8 sm:flex-row">
            <Link
              href={`/projects/${projectSlug}`}
              className="group inline-flex items-center justify-center gap-3 bg-[#242124] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] transition-all duration-300 hover:bg-[#C2A139] hover:text-[#242124]"
            >
              View Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <a
              href="mailto:info@tmsestates.com"
              className="group inline-flex items-center justify-center gap-3 border border-[#242124]/18 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#242124] transition-all duration-300 hover:border-[#C2A139] hover:text-[#C2A139]"
            >
              Request Details
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </section>
      )}

      <style jsx>{`
        .property-summary-bar {
          box-shadow:
            0 28px 95px rgba(36, 33, 36, 0.18),
            0 -10px 32px rgba(36, 33, 36, 0.1),
            inset 0 1px 0 rgba(194, 161, 57, 0.08);
        }

        .property-summary-gold-line {
          animation: propertySummaryGoldSweep
            4.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          opacity: 0.9;
          filter: drop-shadow(
            0 0 8px rgba(194, 161, 57, 0.45)
          );
        }

        :global(body:has(.detail-page-main) #page-footer) {
          padding-top: 0;
        }

        :global(body:has(.detail-page-main) #page-footer > div:first-child) {
          display: none;
        }

        @keyframes propertySummaryGoldSweep {
          0% {
            transform: translateX(-115%);
          }

          46%,
          100% {
            transform: translateX(320%);
          }
        }
      `}</style>
    </main>
  );
}

function SummaryItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string | null;
}) {
  return (
    <div className="group relative border-b border-[#242124]/8 bg-white px-6 py-6 transition-colors duration-300 last:border-b-0 hover:bg-[#F5F0E8] md:border-b-0 md:border-r md:px-8 md:last:border-r-0">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/70 to-transparent" />
      </div>

      <div className="relative z-10">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[#C2A139]">
          {label}
        </p>

        <p className="text-sm font-semibold leading-6 text-[#242124]">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-[#C2A139] underline decoration-[#C2A139]/40 decoration-2 underline-offset-4"
            >
              {value}
              <ArrowUpRight className="inline-block h-3.5 w-3.5 ml-1 mb-0.5" />
            </a>
          ) : (
            value
          )}
        </p>
      </div>
    </div>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="group relative min-h-[170px] overflow-hidden border border-[#F5F0E8]/12 bg-[#05070B]/22 p-6 transition-all duration-300 hover:border-[#C2A139]/55 hover:bg-[#05070B]/34">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#C2A139]/10 via-[#F5F0E8]/[0.025] to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="mb-7 flex h-11 w-11 items-center justify-center border border-[#C2A139]/34 bg-[#C2A139]/10 text-[#C2A139] transition-all duration-300 group-hover:bg-[#C2A139] group-hover:text-[#242124]">
          <span className="[&>svg]:h-5 [&>svg]:w-5">
            {icon}
          </span>
        </div>

        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[#C2A139]/80">
          {label}
        </p>

        <p className="font-montserrat text-2xl font-semibold tracking-[-0.04em] text-[#F5F0E8]">
          {value}
        </p>
      </div>
    </div>
  );
}

function EditorialImage({
  src,
  alt,
  compact = false,
}: {
  src: string;
  alt: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      variants={fadeUp}
      className={`relative overflow-hidden shadow-[0_28px_90px_rgba(36,33,36,0.18)] ${
        compact
          ? "min-h-[280px]"
          : "min-h-[340px] md:min-h-[460px]"
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
