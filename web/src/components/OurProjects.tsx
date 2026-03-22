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
    <section className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-6 w-full">
      
      {/* --- HEADER --- */}
      <div className="mb-8 md:mb-10 text-center md:text-left max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-4 backdrop-blur-md">
          <Building2 className="h-3 w-3" />
          Signature Developments
        </div>
        <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white drop-shadow-xl">
              Our Projects
            </h2>
            <div className="hidden md:block w-32 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
        </div>
      </div>

      {/* --- INTERACTIVE CAROUSEL --- */}
      {/* This renders the animated client component we built previously */}
      <OurProjectsClient projects={cleanProjects} />

    </section>
  );
}