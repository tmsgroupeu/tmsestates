import Image from "next/image";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";
import { fetchProjects } from "@/lib/cms";

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
  return url.startsWith("http") ? url : `${API_URL}${url}`;
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

export default async function ProjectsPage() {
  const { data: rawProjects } = await fetchProjects();
  const projects = (rawProjects || []).map((projectItem: any) => {
    const p = projectItem.attributes || projectItem;
    const title = p.Title || p.title || "Signature Project";
    const slug = p.slug || p.Slug || "#";
    const location = p.location || p.Location || p.city || p.City || "Cyprus";
    const description = extractText(p.Description || p.description) || "A carefully evaluated development designed for long-term value.";
    const rawImage = p.coverimage || p.coverImage || p.CoverImage || p.image || p.Image;
    return {
      id: projectItem.id || title,
      title,
      slug,
      location,
      description,
      image: getSafeUrl(rawImage) || "/assets/hero-poster.jpg",
    };
  });

  return (
    <main className="relative min-h-screen bg-[var(--brand-black)] pt-32 pb-24">
      <div className="lux-container space-y-10">
        <section className="lux-box rounded-[2rem] md:rounded-[2.75rem] p-8 md:p-12 lg:p-16">
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(194,161,57,0.32)] bg-[rgba(194,161,57,0.08)] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--gold)] mb-6 backdrop-blur-md">
              <Building2 className="h-3.5 w-3.5" />
              Our Projects
            </div>
            <h1 className="lux-heading">Signature <span className="text-[var(--gold)]">Developments</span></h1>
            <p className="lux-copy mt-7 max-w-2xl">
              Discover a portfolio of residential developments across Cyprus, thoughtfully designed for modern living and long-term value.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project: any) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group relative min-h-[460px] overflow-hidden rounded-[1.75rem] border border-[rgba(245,240,232,0.10)] bg-[rgba(5,7,11,0.46)] shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,7,11,0.96)] via-[rgba(13,27,46,0.54)] to-transparent" />
              <div className="absolute top-5 right-5 rounded-full border border-[rgba(245,240,232,0.16)] bg-[rgba(245,240,232,0.08)] p-3 text-[var(--ivory)] backdrop-blur-md transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={18} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--stone)]">
                  <MapPin size={13} /> {project.location}
                </div>
                <h2 className="font-montserrat text-3xl font-bold tracking-[-0.04em] text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">{project.title}</h2>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[rgba(245,240,232,0.68)]">{project.description}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
