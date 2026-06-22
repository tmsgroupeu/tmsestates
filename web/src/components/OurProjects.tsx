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
      .map((block: any) =>
        block.children?.map((child: any) => child.text).join(" "),
      )
      .join(" ")
      .trim();
  }
  return "";
};

const summarize = (text: string, fallback: string): string => {
  const clean = (text || fallback).replace(/\s+/g, " ").trim();
  const words = clean.split(" ").filter(Boolean);
  if (words.length <= 26) return clean;
  return `${words.slice(0, 26).join(" ")}…`;
};

export default async function OurProjects() {
  const { data: rawProjects } = await fetchProjects();

  if (!rawProjects?.length) return null;

  const projects = rawProjects.map((projectItem: any) => {
    const p = projectItem.attributes || projectItem;

    const title = p.Title || p.title || "Signature Project";
    const location = p.location || p.Location || p.city || p.City || "Cyprus";
    const completion =
      p.CompletionStatus || p.completionStatus || p.completionDate || "";
    const description = summarize(
      extractText(p.Description || p.description),
      "A carefully selected development designed for contemporary living and long-term value.",
    );
    const slug = p.slug || p.Slug || "#";
    const image =
      getSafeUrl(
        p.coverimage || p.coverImage || p.CoverImage || p.image || p.Image,
      ) || "/assets/hero-poster.jpg";

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
    <section className="relative w-full overflow-hidden bg-[#05070B]/62 py-14 backdrop-blur-[1px] md:py-18 lg:flex lg:min-h-screen lg:items-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05070B]/8 via-transparent to-[#05070B]/22" />

      <div className="home-container relative">
        <div className="mb-8 grid gap-7 pb-3 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>

            <h2 className="max-w-2xl font-montserrat text-[clamp(2.1rem,3vw,3.35rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8]">
              Signature <span className="block text-[#C2A139]">Developments</span>
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end lg:pt-10">
            <p className="text-base leading-6 text-[#F5F0E8]/80 md:text-[1.04rem] md:leading-7">
              Discover a portfolio of residential developments across Cyprus,
              thoughtfully designed for modern living and long-term value.
            </p>

            <Link
              href="/projects"
              className="group relative mt-7 inline-flex min-h-[54px] w-fit items-center justify-center overflow-hidden border border-[#C2A139]/70 bg-[#242124]/72 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8] shadow-[0_22px_64px_rgba(0,0,0,0.32)] backdrop-blur-[10px] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_28px_84px_rgba(194,161,57,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A139]/70 md:px-8"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5F0E8] to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
              <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#C2A139] transition-all duration-500 group-hover:w-full" />
              <span className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/28 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

              <span className="relative z-10 flex items-center gap-4">
                View All Projects
                <span className="flex h-8 w-8 items-center justify-center border border-[#C2A139]/55 bg-[#05070B]/28 text-[#C2A139] transition-all duration-500 group-hover:border-[#242124]/40 group-hover:bg-[#242124] group-hover:text-[#F5F0E8]">
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          </div>
        </div>

        <OurProjectsClient projects={projects} />
      </div>
    </section>
  );
}
