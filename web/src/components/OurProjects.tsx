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
    <section id="projects" className="tms-section relative z-10 w-full scroll-mt-28">
      <div className="tms-shell">
        <div className="border-y border-white/12 py-14 md:py-20">
          <div className="mb-10 grid gap-8 lg:grid-cols-12 lg:items-end md:mb-14">
            <div className="lg:col-span-7">
              <div className="mb-5 inline-flex items-center gap-2 border border-gold/25 bg-black-premium/18 px-4 py-2 backdrop-blur-sm">
                <Building2 className="h-3.5 w-3.5 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  Our Projects
                </span>
              </div>
              <h2 className="font-display text-[clamp(2.4rem,5vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-ivory text-balance">
                Signature <span className="text-gold">Developments</span>
              </h2>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10">
              <p className="max-w-2xl text-base leading-relaxed text-ivory/72 md:text-lg">
                Discover a portfolio of residential developments across Cyprus, thoughtfully designed for modern living and long-term value.
              </p>
              <Link
                href="/projects"
                className="group mt-7 inline-flex items-center gap-3 border-b border-gold/60 pb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ivory transition duration-300 hover:border-gold hover:text-gold"
              >
                View All Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <OurProjectsClient projects={cleanProjects} />
        </div>
      </div>
    </section>
  );
}
