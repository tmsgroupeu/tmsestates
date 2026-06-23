import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  MapPin,
  Ruler,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { fetchProjects } from "@/lib/cms";

export const revalidate = 0;

const API_URL =
  process.env.CMS_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tmsestates.onrender.com";

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

export default async function ProjectsPage() {
  const { data: rawProjects } = await fetchProjects();

  const projects = (rawProjects || []).map((projectItem: any) => {
    const p = projectItem.attributes || projectItem;

    const title = p.Title || p.title || "Signature Project";
    const slug = p.slug || p.Slug || "#";
    const location = p.Location || p.location || p.city || "Cyprus";
    const status =
      p.CompletionStatus || p.completionStatus || p.Status || p.status || "";
    const scale = p.Scale || p.scale || "";

    const image =
      getSafeUrl(
        p.coverImage || p.coverimage || p.CoverImage || p.image || p.Image,
      ) || "/assets/hero-poster.jpg";

    return {
      id: projectItem.id || title,
      title,
      slug,
      location,
      status,
      scale,
      image,
    };
  });

  return (
    <main className="listing-page-main overflow-hidden bg-[#F5F0E8] text-[#242124]">
      <section className="relative flex min-h-[56svh] items-end overflow-hidden bg-[#242124] px-6 pb-20 pt-36 md:px-10 md:pt-44 lg:min-h-[64svh]">
        <Image
          src="/assets/hero-poster.jpg"
          alt="TMS Estates projects"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#242124]/52" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#242124]/92 via-[#242124]/52 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#242124]/96 via-[#242124]/68 to-[#242124]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242124]/98 via-[#242124]/48 to-transparent" />
        <div className="absolute bottom-0 left-0 h-[54%] w-full bg-gradient-to-t from-[#242124] via-[#242124]/78 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl">
          <div>
            <p className="mb-5 w-fit border border-[#C2A139]/44 bg-[#242124]/62 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139] shadow-[0_12px_36px_rgba(0,0,0,0.34)] backdrop-blur-md">
              Project Portfolio
            </p>

            <h1 className="max-w-4xl font-montserrat text-[clamp(2.35rem,4.8vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.065em] text-[#F5F0E8] drop-shadow-[0_18px_48px_rgba(0,0,0,0.76)]">
              Signature
              <span className="block text-[#C2A139]">Developments</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="relative z-20 bg-[#F5F0E8] px-6 md:px-10">
        <div className="project-summary-bar relative mx-auto -mt-12 grid w-full max-w-6xl overflow-hidden bg-white shadow-[0_28px_95px_rgba(36,33,36,0.18)] md:grid-cols-3">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-[#C2A139]/14">
            <div className="h-full w-1/3 animate-shine bg-gradient-to-r from-transparent via-[#C2A139] to-transparent" />
          </div>

          <SummaryItem label="Developments" value={`${projects.length}`} />
          <SummaryItem label="Locations" value="Across Cyprus" />
          <SummaryItem label="Focus" value="Residential & Investment" />
        </div>
      </section>

      <section className="bg-[#F5F0E8] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 border-b border-[#242124]/10 pb-8">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                Explore Projects
              </p>

              <h2 className="font-montserrat text-[clamp(2rem,3.6vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#242124]">
                Current Portfolio
              </h2>
            </div>
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project: any, index: number) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group relative min-h-[430px] overflow-hidden border border-[#242124]/10 bg-[#242124] shadow-[0_24px_80px_rgba(36,33,36,0.22)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C2A139]/60 hover:shadow-[0_34px_110px_rgba(36,33,36,0.3)] xl:min-h-[455px]"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-[#05070B]/22 transition duration-500 group-hover:bg-[#05070B]/14" />
                  <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#05070B]/78 via-[#05070B]/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-[#05070B]/100 via-[#05070B]/72 to-transparent" />
                  <div className="absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-[#05070B]/52 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
                    <span className="inline-flex items-center gap-2 border border-[#C2A139]/56 bg-[#05070B]/78 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#C2A139] shadow-[0_10px_35px_rgba(0,0,0,0.36)] backdrop-blur-md">
                      <Building2 className="h-3.5 w-3.5" />
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="grid h-11 w-11 place-items-center rounded-full border border-white/22 bg-[#05070B]/62 text-[#F5F0E8] shadow-[0_10px_32px_rgba(0,0,0,0.32)] backdrop-blur-md transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[#C2A139] group-hover:bg-[#C2A139] group-hover:text-[#242124]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="relative overflow-hidden border border-white/12 bg-[#05070B]/62 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur-md md:p-5">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/82 to-transparent" />

                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.location && (
                          <span className="inline-flex max-w-full items-center gap-2 border border-white/24 bg-[#05070B]/82 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_28px_rgba(0,0,0,0.34)] backdrop-blur-md">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C2A139]" />
                            <span className="truncate">{project.location}</span>
                          </span>
                        )}

                        {project.status && (
                          <span className="inline-flex max-w-full items-center gap-2 border border-[#C2A139]/58 bg-[#05070B]/82 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#C2A139] shadow-[0_10px_28px_rgba(0,0,0,0.34)] backdrop-blur-md">
                            <CalendarClock className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{project.status}</span>
                          </span>
                        )}

                        {project.scale && (
                          <span className="inline-flex max-w-full items-center gap-2 border border-white/24 bg-[#05070B]/82 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_28px_rgba(0,0,0,0.34)] backdrop-blur-md">
                            <Ruler className="h-3.5 w-3.5 shrink-0 text-[#C2A139]" />
                            <span className="truncate">{project.scale}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="line-clamp-2 font-montserrat text-[1.65rem] font-bold leading-[1.02] tracking-[-0.055em] text-white drop-shadow-[0_12px_34px_rgba(0,0,0,0.9)] xl:text-[1.9rem]">
                        {project.title}
                      </h3>

                      <span className="mt-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C2A139] drop-shadow-[0_8px_22px_rgba(0,0,0,0.78)]">
                        Explore Project
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-[#242124]/10 bg-white p-10 text-center shadow-[0_22px_70px_rgba(36,33,36,0.08)]">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C2A139]">
                No Projects
              </p>

              <h3 className="font-montserrat text-2xl font-semibold tracking-[-0.04em] text-[#242124]">
                Projects will be available soon.
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#242124]/62">
                Once project entries are published in Strapi, they will appear
                here automatically.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
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
          {value}
        </p>
      </div>
    </div>
  );
}
