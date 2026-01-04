/* UPDATED: src/components/ExclusiveMandates.tsx */
import Link from "next/link";
import { Crown } from "lucide-react";
import { headers } from "next/headers";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/lib/cms";

export const revalidate = 0;

export default async function ExclusiveMandates() {
  headers();
  
  // Fetch VIP properties
  const { data: items } = await fetchProperties({
    "filters[vip][$eq]": "true",
    "populate": "*",
    "sort": "updatedAt:desc",
    "pagination[pageSize]": "3"
  });

  if (!items?.length) return null;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
          <Crown className="h-3 w-3 text-[#D4AF37]" />
          The Collection
        </div>
        <h2 className="mt-4 text-3xl font-bold font-montserrat text-white drop-shadow-lg md:text-4xl">
          Exclusive Mandates
        </h2>
      </div>

      {/* Grid using the Universal Card */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
           <PropertyCard key={item.id} p={item} showVipBadge={true} />
        ))}
      </div>
    </section>
  );
}