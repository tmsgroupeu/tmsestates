/* FULL REPLACEMENT: src/app/[locale]/properties/page.tsx */
import Link from "next/link";
import Image from "next/image";
import PropertyCard from "@/components/PropertyCard";
import Filters from "@/components/Filters";
import { fetchProperties, Property } from "@/lib/cms";
import type { SearchParams } from "@/lib/types";

export const revalidate = 0; // Ensure fresh data for filtering

// Define props for Next.js 15
type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function PropertiesPage({ searchParams }: Props) {
  // Await params for Next.js 15 compatibility
  const params = await searchParams;
  
  // Determine active tab (defaults to 'all')
  const activeStatus = params.status || 'all';

  // 1. Build Filter Params for Strapi
  const apiFilters: Record<string, string> = {
    "pagination[pageSize]": "100",
    "sort[0]": "updatedAt:desc",
  };

  // Status Filter: Map URL 'status' to Database 'prop_status'
  // 'all' means we don't send a status filter (show everything)
  if (activeStatus !== 'all') {
      apiFilters["filters[prop_status][$eq]"] = activeStatus;
  }

  // Map other filters
  if (params.type) apiFilters["filters[propertyType][$eq]"] = params.type;
  if (params.city) apiFilters["filters[city][$eq]"] = params.city;
  if (params.beds) apiFilters["filters[bedrooms][$gte]"] = params.beds;
  if (params.min) apiFilters["filters[price][$gte]"] = params.min;
  if (params.max) apiFilters["filters[price][$lte]"] = params.max;
  if (params.ref) apiFilters["filters[id][$eq]"] = params.ref;

  // 2. Fetch Data
  const { data: properties } = await fetchProperties(apiFilters);
  
  // Fetch cities for dropdown (helper call to get unique list)
  const { data: allData } = await fetchProperties({ "pagination[pageSize]": "200", "fields[0]": "city" });
  const cities = [...new Set(allData.map((p: any) => p.city).filter(Boolean))];

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      
      {/* --- HEADER --- */}
      {/* Increased bottom padding (pb-32) to create space for the overlapping filter bar */}
      <div className="relative pt-40 pb-32 px-6 text-center text-white overflow-hidden bg-[#0A2342]">
         
         {/* Background Image (Hero Poster) */}
         <div className="absolute inset-0 z-0">
             <Image 
               src="/assets/hero-poster.jpg" 
               alt="Background" 
               fill 
               className="object-cover"
               priority
             />
             {/* Navy Overlay for readability */}
             <div className="absolute inset-0 bg-[#0A2342]/85 backdrop-blur-[2px]" />
         </div>

         <div className="relative z-10 max-w-3xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4 drop-shadow-xl">
                Our Portfolio
             </h1>
             <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Discover the finest residential and investment opportunities across Cyprus.
             </p>
         </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 relative z-20 pb-24">
         
         {/* 
            THE "DOCK" CONTAINER 
            Negative margin pulls this section UP over the header background.
            This creates the "Attached" / "Dashboard" look.
         */}
         <div className="-mt-16 mb-16 space-y-4">
            
            {/* 1. TABS (Centered & Touching the Filters) */}
            <div className="flex justify-center relative z-10">
               <div className="inline-flex bg-white rounded-full p-1.5 shadow-xl border border-gray-100">
                  {['all', 'for-sale', 'for-rent'].map((tab) => (
                      <Link 
                        key={tab}
                        href={tab === 'all' ? '/properties' : `/properties?status=${tab}`} 
                        scroll={false}
                        className={`px-6 md:px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all
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

            {/* 2. FILTERS (The Dashboard) */}
            <Filters cities={cities} />
            
         </div>

         {/* --- RESULTS GRID --- */}
         <div className="min-h-[40vh]">
            {properties && properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((p: Property) => (
                    <PropertyCard key={p.id} p={p} />
                ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="text-4xl mb-4 opacity-50 grayscale">🔍</div>
                    <h3 className="text-lg font-bold text-[#0A2342]">No properties found</h3>
                    <p className="text-gray-400 text-sm mt-1 max-w-md mx-auto">
                       We couldn't find any matches for your current filters. 
                       Try adjusting the price range or switching between Rent/Sale.
                    </p>
                </div>
            )}
         </div>

      </div>
    </main>
  );
}
