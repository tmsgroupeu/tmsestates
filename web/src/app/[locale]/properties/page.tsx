/* FULL REPLACEMENT: src/app/[locale]/properties/page.tsx */
import Link from "next/link";
import Image from "next/image";
import PropertyCard from "@/components/PropertyCard";
import Filters from "@/components/Filters";
import { fetchProperties, Property } from "@/lib/cms";
import type { SearchParams } from "@/lib/types";

export const revalidate = 0;

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function PropertiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const activeStatus = params.status || 'all'; // Default to 'all' internally for UI

  // 2. Build Filter Params
  const apiFilters: Record<string, string> = {
    "pagination[pageSize]": "100",
    "sort[0]": "updatedAt:desc",
  };

  // Only filter by status if it's NOT 'all'
  if (activeStatus !== 'all') {
      apiFilters["filters[prop_status][$eq]"] = activeStatus;
  }

  // Other filters
  if (params.type) apiFilters["filters[propertyType][$eq]"] = params.type;
  if (params.city) apiFilters["filters[city][$eq]"] = params.city;
  if (params.beds) apiFilters["filters[bedrooms][$gte]"] = params.beds;
  if (params.min) apiFilters["filters[price][$gte]"] = params.min;
  if (params.max) apiFilters["filters[price][$lte]"] = params.max;
  if (params.ref) apiFilters["filters[id][$eq]"] = params.ref;

  const { data: properties } = await fetchProperties(apiFilters);
  const { data: allData } = await fetchProperties({ "pagination[pageSize]": "200", "fields[0]": "city" });
  const cities = [...new Set(allData.map((p: any) => p.city).filter(Boolean))];

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      
      {/* HEADER WITH POSTER BACKGROUND */}
      <div className="relative pt-48 pb-24 px-6 text-center text-white overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
             <Image 
               src="/assets/hero-poster.jpg" 
               alt="Background" 
               fill 
               className="object-cover"
               priority
             />
             <div className="absolute inset-0 bg-[#0A2342]/80 backdrop-blur-[2px]" />
         </div>

         <div className="relative z-10 max-w-3xl mx-auto">
             <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-4 drop-shadow-lg">
                Our Portfolio
             </h1>
             <p className="text-white/80 text-lg">
                Discover the finest residential and investment opportunities in Cyprus.
             </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 pb-24">
         
         {/* --- CONTROLS STRIPE (Tabs + Filters Integrated) --- */}
         <div className="flex flex-col gap-4">
             
             {/* TABS ROW */}
             <div className="flex justify-center">
                <div className="inline-flex bg-white rounded-full p-1.5 shadow-xl border border-gray-100">
                   {['all', 'for-sale', 'for-rent'].map((tab) => (
                      <Link 
                        key={tab}
                        href={tab === 'all' ? '/properties' : `/properties?status=${tab}`} 
                        scroll={false}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                           ${activeStatus === tab 
                             ? 'bg-[#0A2342] text-white shadow-md' 
                             : 'text-gray-500 hover:text-[#0A2342] hover:bg-gray-50'}
                        `}
                      >
                        {tab === 'all' ? 'All Listings' : tab.replace('-', ' ')}
                      </Link>
                   ))}
                </div>
             </div>

             {/* FILTERS STRIPE */}
             <Filters cities={cities} />
         </div>

         {/* --- RESULTS --- */}
         <div className="mt-12">
            {properties && properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((p: Property) => (
                    <PropertyCard key={p.id} p={p} />
                ))}
                </div>
            ) : (
                <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="text-4xl mb-4 opacity-50">🔍</div>
                    <h3 className="text-lg font-bold text-[#0A2342]">No properties found</h3>
                    <p className="text-gray-400 text-sm mt-1">Adjust your filters to see more results.</p>
                </div>
            )}
         </div>

      </div>
    </main>
  );
}
