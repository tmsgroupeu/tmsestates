/* FULL REPLACEMENT: src/app/[locale]/properties/page.tsx */
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import Filters from "@/components/Filters";
import { fetchProperties, Property } from "@/lib/cms";
import type { SearchParams } from "@/lib/types";

export const revalidate = 0; // Ensure filtering is dynamic

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function PropertiesPage({ searchParams }: Props) {
  const params = await searchParams;
  
  // 1. Determine active status from URL (defaults to '' which implies ALL)
  // If user clicks a tab, status will be 'for-sale' or 'for-rent'
  const activeStatus = params.status || '';

  // 2. Build API Filters
  const apiFilters: Record<string, string> = {
    "pagination[pageSize]": "100",
    "sort[0]": "updatedAt:desc",
  };

  // ✅ FIX: Map URL param 'status' -> DB field 'prop_status'
  if (activeStatus) {
      apiFilters["filters[prop_status][$eq]"] = activeStatus;
  }

  // Map other filters
  if (params.type) apiFilters["filters[propertyType][$eq]"] = params.type;
  if (params.city) apiFilters["filters[city][$eq]"] = params.city;
  if (params.beds) apiFilters["filters[bedrooms][$gte]"] = params.beds;
  if (params.min) apiFilters["filters[price][$gte]"] = params.min;
  if (params.max) apiFilters["filters[price][$lte]"] = params.max;
  if (params.ref) apiFilters["filters[id][$eq]"] = params.ref;

  // 3. Fetch Data
  const { data: properties } = await fetchProperties(apiFilters);
  
  // Fetch cities for dropdown (helper call)
  const { data: allData } = await fetchProperties({ "pagination[pageSize]": "200", "fields[0]": "city" });
  const cities = [...new Set(allData.map((p: any) => p.city).filter(Boolean))];

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      
      {/* Header */}
      <div className="bg-[#0A2342] pt-40 pb-20 px-6 text-center text-white">
         <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
            Our Portfolio
         </h1>
         <p className="text-white/70 max-w-2xl mx-auto">
            Discover the finest residential and investment opportunities in Cyprus.
         </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 pb-24 relative z-10">
         
         {/* Tabs */}
         <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-full p-1 shadow-lg border border-gray-100">
               {/* 
                  Note: The href keeps '?status=...' in the URL for clarity,
                  but the logic above maps it to 'prop_status' for Strapi.
               */}
               <Link 
                 href="/properties?status=for-sale" 
                 scroll={false}
                 className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all
                    ${activeStatus === 'for-sale' || !activeStatus 
                      ? 'bg-[#D4AF37] text-white shadow-md' 
                      : 'text-gray-500 hover:text-[#0A2342]'}
                 `}
               >
                 For Sale
               </Link>
               <Link 
                 href="/properties?status=for-rent" 
                 scroll={false}
                 className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all
                    ${activeStatus === 'for-rent' 
                      ? 'bg-[#D4AF37] text-white shadow-md' 
                      : 'text-gray-500 hover:text-[#0A2342]'}
                 `}
               >
                 For Rent
               </Link>
            </div>
         </div>

         {/* Filters Bar */}
         <div className="mb-12">
            <Filters cities={cities} />
         </div>

         {/* Results Grid */}
         {properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {properties.map((p: Property) => (
                  <PropertyCard key={p.id} p={p} />
               ))}
            </div>
         ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
               <div className="text-4xl mb-4">🔍</div>
               <h3 className="text-xl font-bold text-[#0A2342]">No properties found</h3>
               <p className="text-gray-500 mt-2">
                  Try adjusting your filters or switching tabs.
               </p>
            </div>
         )}

      </div>
    </main>
  );
}