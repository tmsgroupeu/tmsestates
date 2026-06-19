import { fetchProjects } from "@/lib/cms";
import { Building2, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import OurProjectsClient from "./OurProjectsClient";

const API_URL =
  process.env.CMS_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tmsestates.onrender.com";

const getSafeUrl = (data: any): string | null => {
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
};

const extractText = (value: any): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((block: any) => block.children?.map((child: any) => child.text).join(" "))
      .join(" ")
      .trim();
  }
  return "";
};

const summarize = (text: string, fallback: string): string => {
  const clean = (text || fallback).replace(/\s+/g, " ").trim();
  const words = clean.split(" ").filter(Boolean);
  if (words.length <= 24) return clean;
  return `${words.slice(0, 24).join(" ")}…`;
};

export default async function OurProjects() {
  const { data: rawProjects } = await fetchProjects();

  if (!rawProjects?.length) return null;

  const projects = rawProjects.map((projectItem: any) => {
    const p = projectItem.attributes || projectItem;

    const title = p.Title || p.title || "Signature Project";
    const location = p.location || p.Location || p.city || p.City || "Cyprus";
    const completion = p.CompletionStatus || p.completionStatus || p.completionDate || "";
    const description = summarize(
      extractText(p.Description || p.description),
      "A carefully selected development designed for contemporary living and long-term value."
    );
    const slug = p.slug || p.Slug || "#";
    const image =
      getSafeUrl(p.coverimage || p.coverImage || p.CoverImage || p.image || p.Image) ||
      "/assets/hero-poster.jpg";

    return {
      id: projectItem.id || title,
      title,
      slug,
      location,
      completion,
      description,
      image,
    };
  });

  return (
    <section className="relative w-full overflow-hidden bg-[#05070B]/66 py-16 backdrop-blur-[1px] md:py-20 lg:flex lg:min-h-screen lg:items-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#05070B]/10 to-[#05070B]/24" />
      <div className="home-container relative">
        <div className="mb-9 grid gap-7 pb-3 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-3 text-[#C2A139]">
              <Building2 className="h-4 w-4" strokeWidth={1.7} />
              <p className="section-eyebrow">Our Projects</p>
            </div>
            <h2 className="section-heading mt-4 max-w-2xl">
              Signature <span className="text-[#C2A139]">Developments</span>
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-base leading-8 text-[#F5F0E8]/74 md:text-lg md:leading-9">
              Discover a portfolio of residential developments across Cyprus, thoughtfully designed for modern living and long-term value.
            </p>
            <Link
              href="/projects"
              className="group mt-7 inline-flex w-fit items-center gap-3 rounded-full border border-white/16 bg-[#F5F0E8] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0D1B2E] transition-all hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#05070B]"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <OurProjectsClient projects={projects} />
      </div>
    </section>
  );
}
