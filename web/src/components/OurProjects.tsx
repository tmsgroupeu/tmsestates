/* FULL REPLACEMENT: src/components/OurProjects.tsx */
import { Building2 } from "lucide-react";
import { fetchProjects } from "@/lib/cms";
import OurProjectsClient from "./OurProjectsClient";

export const revalidate = 0;

const API_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337";

// ✅ RESTORED HYPER-RESILIENT IMAGE EXTRACTOR
const getSafeUrl = (data: any) => {
  if (!data) return null;
  
  // 1. Handle Arrays (Because 'coverimage' is Multiple Media in Strapi)
  let item = Array.isArray(data) ? data[0] : data;
  
  // 2. Handle Strapi v4 'data' wrapper if it exists
  if (item && item.data) {
    item = Array.isArray(item.data) ? item.data[0] : item.data;
  }
  
  if (!item) return null;

  // 3. Handle 'attributes' wrapper OR flat structure
  const attributes = item.attributes || item;
  const url = attributes?.url || item.url;
  
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

// Helper to safely extract text from Strapi Rich Text blocks
const extractText = (desc: any): string => {
  if (!desc) return "";
  if (typeof desc === 'string') return desc;
  if (Array.isArray(desc)) {
    try {
      return desc.map((block: any) => block.children?.map((child: any) => child.text).join(" ")).join(" ");
    } catch(e) { return ""; }
  }
  return "";
};

export default async function OurProjects() {
  const { data: rawProjects } = await fetchProjects();

  if (!rawProjects?.length) return null;

  // 1. Clean the Strapi Data for the Client Component
  const cleanProjects = rawProjects.map((projectItem: any) => {
      const p = projectItem.attributes || projectItem;
      
      const title = p.Title || p.title || "Signature Project";
      const location = p.location || p.Location || p.city || p.City || "Cyprus";
      const completion = p.CompletionStatus || p.completionStatus || "";
      const rawDesc = p.Description || p.description;
      const description = extractText(rawDesc) || "Exclusive details available upon request.";
      const slug = p.slug || p.Slug || '#';
      
      // ✅ FIX: Added 'p.coverimage' (lowercase i) to match your Strapi screenshot perfectly
      const rawImage = p.coverimage || p.coverImage || p.CoverImage || p.image || p.Image;
      const imgUrl = getSafeUrl(rawImage);
      const finalImage = imgUrl || '/assets/hero-poster.jpg';

      return {
          id: projectItem.id || title,
          title,
          slug,
          location,
          completion,
          description,
          image: finalImage
      };
  });

  return (
    <section className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-b border-white/10 py-20">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 w-full">
        
        {/* --- HEADER --- */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-white drop-shadow-xl mb-6">
            Signature Developments
          </h2>
          <p className="text-white/80 text-lg font-light leading-relaxed">
            Discover a portfolio of residential developments across Cyprus, each carefully planned to meet the needs of today's buyers while supporting future growth and investment potential.
          </p>
        </div>

        {/* --- INTERACTIVE CAROUSEL --- */}
        <OurProjectsClient projects={cleanProjects} />

        {/* --- CTA --- */}
        <div className="mt-16 flex justify-center">
            <a href="/properties" className="group inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm bg-white/5 hover:bg-[#D4AF37] border border-white/20 hover:border-[#D4AF37] transition-all px-8 py-4 rounded-full">
               View All Projects
               <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
            </a>
        </div>

      </div>
    </section>
  );
}