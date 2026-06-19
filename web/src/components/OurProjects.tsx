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

export default async function OurProjects() {
  const { data: rawProjects } = await fetchProjects();

  if (!rawProjects?.length) return null;

  const projects = rawProjects.map((projectItem: any) => {
    const p = projectItem.attributes || projectItem;

    const title = p.Title || p.title || "Signature Project";
    const location = p.location || p.Location || p.city || p.City || "Cyprus";
    const completion = p.CompletionStatus || p.completionStatus || p.completionDate || "";
    const description =
      extractText(p.Description || p.description) ||
      "Discover a carefully selected development designed for contemporary living and long-term value.";
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
    <section className="relative w-full border-y border-white/10 bg-[#05070B]/82 py-20 backdrop-blur-sm md:py-28">
      <div className="home-container">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 text-[#C2A139]">
              <Building2 className="h-4 w-4" strokeWidth={1.7} />
              <p className="section-eyebrow">Our Projects</p>
            </div>
            <h2 className="section-heading mt-4">Signature Developments</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#F5F0E8]/70 md:text-lg md:leading-9">
              Discover a portfolio of residential developments across Cyprus, thoughtfully designed for modern living and long-term value.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/14 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] transition-all hover:border-[#C2A139] hover:text-[#C2A139]"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <OurProjectsClient projects={projects} />
      </div>
    </section>
  );
}
