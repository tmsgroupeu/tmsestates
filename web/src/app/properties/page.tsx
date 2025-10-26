/* Fully Updated: ./app/properties/page.tsx */

import { Suspense } from 'react';
import Filters from '@/components/Filters';
import PropertyCard from '@/components/PropertyCard';
import { Skeleton } from '@/components/Skeleton';
import { fetchProperties } from '@/lib/cms';
import type { Property } from '@/lib/cms';

// This is a simple type for search parameters, you can create a dedicated types file if you prefer
type SearchParams = {
  status?: string;
  city?: string;
  min?: string;
  max?: string;
};

// ... (buildStrapiQuery function from your previous version can be reused here if needed)

async function PropertiesList({ searchParams }: { searchParams: SearchParams }) {
  const { data: properties } = await fetchProperties({ /* pass your filters here */ });

  if (properties.length === 0) {
    return <p className="text-center text-muted-foreground col-span-full mt-12">No properties match your criteria. Please try different filters.</p>;
  }
  return <>{properties.map((p: Property) => <PropertyCard key={p.id} p={p} />)}</>;
}

function PropertiesSkeleton() {
    return <>{Array.from({ length: 6 }).map((_, i) => ( <div key={i}> <Skeleton className="aspect-[4/3] rounded-xl" /> <Skeleton className="h-6 w-3/4 mt-4" /> <Skeleton className="h-4 w-1/2 mt-2" /> </div> ))}</>;
}

export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
    const { data: allProperties } = await fetchProperties({ 'pagination[pageSize]': '100' });
    
    // THE FIX IS HERE: map p.city directly, no .attributes
    const cities = [...new Set(allProperties.map(p => p.city).filter(Boolean) as string[])];

    return (
    <main>
      <div className="section pt-32 pb-16 bg-muted">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-montserrat text-navy">Explore Our Properties</h1>
            <p className="mt-2 text-muted-foreground">Find your next home or investment in Limassol.</p>
        </div>
      </div>

      <div className="section">
        <div className="mb-12"> <Filters cities={cities} /> </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<PropertiesSkeleton />} key={JSON.stringify(searchParams)}>
              <PropertiesList searchParams={searchParams} />
            </Suspense>
        </div>
      </div>
    </main>
  );
}