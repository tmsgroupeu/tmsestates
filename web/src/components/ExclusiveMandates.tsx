/* FULL REPLACEMENT: src/components/ExclusiveMandates.tsx */
import Link from "next/link";
import { Crown } from "lucide-react";
import { headers } from "next/headers";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/lib/cms";

export const revalidate = 0;

export default async function ExclusiveMandates() {
  headers();
  
  const { data: items } = await fetchProperties({
    "filters[vip][$eq]": "true",
    "populate": "*",
    "sort": "updatedAt:desc",
    "pagination[pageSize]": "3"
  });

  if (!items?.length) return null;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 w-full">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md mb-4">
          <Crown className="h-3 w-3 text-[#D4AF37]" />
          The Collection
        </div>
        <h2 className="text-3xl font-bold font-montserrat text-white drop-shadow-lg md:text-4xl">
          Exclusive Mandates
        </h2>
      </div>

      {/* 
         ✅ FIX: The Grid Layout
         - 'gap-8' creates breathing room.
         - 'md:grid-cols-2 lg:grid-cols-3' handles responsiveness perfectly.
         - Crucially: We don't apply extra heights or flex-grow here. 
           The card handles its own height naturally.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
           <div key={item.id} className="w-full">
               {/* 
                  Passing 'showVipBadge' ensures the Gold Crown appears.
                  The card itself is responsible for its aspect ratio.
               */}
               <PropertyCard p={item} showVipBadge={true} />
           </div>
        ))}
      </div>
    </section>
  );
}
