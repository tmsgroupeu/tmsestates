import { Building2, ArrowRight } from "lucide-react";
import { fetchProjects } from "@/lib/cms";
import OurProjectsClient from "./OurProjectsClient";
import { Link } from "@/i18n/routing";

export const revalidate = 0;

const API_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337";

const getSafeUrl = (data: any) => {
  if (!data) return null;
  let item = Array.isArray(data) ? data[0] : data;
  if (item && item.data) item = Array.isArray(item.data) ? item.data[0] : item.data;
  if (!item) return null;
  const attributes = item.attributes || item;
  const url = attributes?.url || item.url;
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_URL}${url}`;
};

const extractText = (desc: any): string => {
  if (!desc) return "";
  if (typeof desc === "string") return desc;
  if (Array.isArray(desc)) {
    try {
      return desc.map((block: any) => block.children?.map((child: any) => child.text).join(" ")).join(" ");
    } catch {
      return "";
    }
  }
  return "";
};

export default async function OurProjects() {
  const { data: rawProjects } = await fetchProjects();
  if (!rawProjects?.length) return null;

  const cleanProjects = rawProjects.map((projectItem: any) => {
    const p = projectItem.attributes || projectItem;
    const title = p.Title || p.title || "Signature Project";
    const location = p.location || p.Location || p.city || p.City || "Cyprus";
    const completion = p.CompletionStatus || p.completionStatus || "";
    const rawDesc = p.Description || p.description;
    const description = extractText(rawDesc) || "Exclusive details available upon request.";
    const slug = p.slug || p.Slug || "#";
    const rawImage = p.coverimage || p.coverImage || p.CoverImage || p.image || p.Image;
    const imgUrl = getSafeUrl(rawImage);

    return {
      id: projectItem.id || title,
      title,
      slug,
      location,
      completion,
      description,
      image: imgUrl || "/assets/hero-poster.jpg",
    };
  });

  return (
    <section className="relative z-10 w-full">
      <div className="relative z-10">
        <div className="mb-10 md:mb-12 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16 items-end p-3 md:p-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(194,161,57,0.32)] bg-[rgba(194,161,57,0.08)] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--gold)] mb-5 backdrop-blur-md">
              <Building2 className="h-3.5 w-3.5" />
              Our Projects
            </div>
            <h2 className="font-montserrat text-4xl md:text-6xl font-bold leading-[1.02] tracking-[-0.04em] text-[var(--ivory)]">
              Signature <span className="text-[var(--gold)]">Developments</span>
            </h2>
          </div>

          <div className="lg:border-l lg:border-[rgba(245,240,232,0.10)] lg:pl-10">
            <p className="lux-copy max-w-2xl">
              Discover a portfolio of residential developments across Cyprus, thoughtfully designed for modern living and long-term value.
            </p>
            <Link href="/projects" className="lux-btn group mt-7">
              View All Projects
              <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <OurProjectsClient projects={cleanProjects} />
      </div>
    </section>
  );
}
