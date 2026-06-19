"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarClock, ChevronLeft, MapPin, Ruler } from "lucide-react";
import { Link } from "@/i18n/routing";
import PropertyCard from "./PropertyCard";

const API_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337";

type MediaLike = any;

function getSafeUrl(data: MediaLike): string | null {
  if (!data) return null;
  const item = Array.isArray(data) ? data[0] : data.data ? (Array.isArray(data.data) ? data.data[0] : data.data) : data;
  if (!item) return null;
  const url = item.attributes?.url || item.url || item.formats?.large?.url || item.formats?.medium?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${API_URL}${url}`;
}

function getMediaArray(data: MediaLike): any[] {
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

function paragraphs(value: string): string[] {
  return value
    .split(/\n{2,}|\r\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function highlightsFrom(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value)
    .split(/\n|•|·|- /)
    .map((item) => item.trim())
    .filter((item) => item && !/^highlights$/i.test(item));
}

function firstDefined(...values: any[]) {
  return values.find((value) => value !== undefined && value !== null && String(value).trim() !== "");
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProjectPageClient({ project }: { project: any }) {
  const p = project?.attributes || project || {};

  const title = firstDefined(p.Title, p.title, "Signature Development");
  const location = firstDefined(p.Location, p.location, p.Destination, p.destination, p.city, "Cyprus");
  const status = firstDefined(p.Status, p.status, p.CompletionStatus, p.completionStatus, p.completionDate, "");
  const scale = firstDefined(p.Scale, p.scale, "");
  const overview = extractText(firstDefined(p.ProjectOverview, p.projectOverview, p.Overview, p.overview, p.Description, p.description));
  const overviewParagraphs = paragraphs(overview);
  const highlights = highlightsFrom(firstDefined(p.Highlights, p.highlights));

  const coverUrl = getSafeUrl(firstDefined(p.coverImage, p.coverimage, p.image)) || "/assets/hero-poster.jpg";
  const galleryUrls = getMediaArray(firstDefined(p.gallery, p.Gallery)).map((img) => getSafeUrl(img)).filter(Boolean) as string[];
  const visualOne = galleryUrls[0] || coverUrl;
  const visualTwo = galleryUrls[1] || galleryUrls[0] || coverUrl;
  const visualThree = galleryUrls[2] || galleryUrls[1] || coverUrl;

  const connectedPropertiesRaw = p.properties?.data || p.properties || [];
  const connectedProperties = Array.isArray(connectedPropertiesRaw) ? connectedPropertiesRaw : [];

  const firstHalf = overviewParagraphs.slice(0, Math.max(2, Math.ceil(overviewParagraphs.length / 2)));
  const secondHalf = overviewParagraphs.slice(firstHalf.length);

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070B] text-[#F5F0E8]">
      <section className="relative flex min-h-[92svh] items-end overflow-hidden pt-32">
        <Image src={coverUrl} alt={title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,11,0.94),rgba(5,7,11,0.62)_45%,rgba(5,7,11,0.78)),linear-gradient(to_top,rgba(5,7,11,1),rgba(5,7,11,0.08)_58%)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-16 md:px-10 lg:pb-24 xl:px-16">
          <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C2A139] transition-colors hover:text-[#F5F0E8]">
            <ChevronLeft className="h-4 w-4" /> Projects
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.42em] text-[#C2A139]">Project</p>
              <h1 className="max-w-5xl font-montserrat text-[clamp(4rem,9vw,10rem)] font-bold leading-[0.88] tracking-[-0.08em] text-[#F5F0E8]">
                {title}
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.72, ease: [0.16, 1, 0.3, 1] } } }}
              className="grid grid-cols-1 overflow-hidden border border-white/12 bg-[#0D1B2E]/36 backdrop-blur-xl sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
            >
              <ProjectMeta icon={<MapPin className="h-4 w-4" />} label="Location" value={location} />
              {status && <ProjectMeta icon={<CalendarClock className="h-4 w-4" />} label="Status" value={status} />}
              {scale && <ProjectMeta icon={<Ruler className="h-4 w-4" />} label="Scale" value={scale} />}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#05070B] py-16 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="order-2 lg:order-1">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C2A139]">Project Overview</p>
              <div className="space-y-6 text-lg leading-9 text-[#F5F0E8]/78">
                {firstHalf.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
            <EditorialImage src={visualOne} alt={`${title} visual`} className="order-1 lg:order-2" />
          </div>

          {secondHalf.length > 0 && (
            <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <EditorialImage src={visualTwo} alt={`${title} visual`} />
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <div className="space-y-6 text-lg leading-9 text-[#F5F0E8]/78">
                  {secondHalf.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="relative overflow-hidden border border-white/12 bg-[#0D1B2E]/42 p-7 backdrop-blur-xl md:p-10">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C2A139]">Highlights</p>
              {highlights.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {highlights.map((item, index) => (
                    <div key={item} className="flex gap-4 border border-white/10 bg-white/[0.035] p-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C2A139]">{String(index + 1).padStart(2, "0")}</span>
                      <p className="text-sm leading-7 text-[#F5F0E8]/78">{item}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-3">
                  {location && <HighlightCard label="Location" value={location} />}
                  {status && <HighlightCard label="Status" value={status} />}
                  {scale && <HighlightCard label="Scale" value={scale} />}
                </div>
              )}
            </motion.div>
            <EditorialImage src={visualThree} alt={`${title} visual`} compact />
          </div>
        </div>
      </section>

      {connectedProperties.length > 0 && (
        <section className="relative z-10 border-t border-white/10 bg-[#0D1B2E]/40 py-16 backdrop-blur-md md:py-24">
          <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 xl:px-16">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#C2A139]">Residences</p>
                <h2 className="font-montserrat text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.07em] text-[#F5F0E8]">
                  Available Units
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {connectedProperties.map((rawProp: any) => {
                const propData = rawProp.attributes || rawProp;
                propData.id = rawProp.id || propData.id;
                return <PropertyCard key={propData.id || propData.slug} p={propData} />;
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function ProjectMeta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border-b border-white/10 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#C2A139]/30 bg-[#C2A139]/10 text-[#C2A139]">{icon}</div>
      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[#C2A139]/80">{label}</p>
      <p className="text-sm font-semibold leading-6 text-[#F5F0E8]">{value}</p>
    </div>
  );
}

function EditorialImage({ src, alt, compact = false, className = "" }: { src: string; alt: string; compact?: boolean; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      className={`relative overflow-hidden border border-white/12 bg-[#0D1B2E]/30 shadow-[0_30px_120px_rgba(0,0,0,0.36)] ${compact ? "min-h-[360px]" : "min-h-[420px] lg:min-h-[560px]"} ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/45 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/55 to-transparent" />
    </motion.div>
  );
}

function HighlightCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.035] p-5">
      <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.28em] text-[#C2A139]">{label}</p>
      <p className="text-sm font-semibold leading-6 text-[#F5F0E8]">{value}</p>
    </div>
  );
}
