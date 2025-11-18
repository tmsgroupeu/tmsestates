// UPDATED: web/src/app/properties/page.tsx
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties, Property } from "@/lib/cms";
import Filters from "@/components/Filters";
import type { SearchParams } from "@/lib/types";

export const revalidate = 3600;

// This page now accepts search parameters for server-side filtering
export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  // Construct filter parameters for the Strapi API call
  const params: Record<string, string> = {
    "pagination[pageSize]": "99",
    "sort[0]": "updatedAt:desc",
  };
  if (searchParams.status) params["filters[status][$eq]"] = searchParams.status;
  if (searchParams.city) params["filters[city][$eq]"] = searchParams.city;
  if (searchParams.min) params["filters[price][$gte]"] = searchParams.min;
  if (searchParams.max) params["filters[price][$lte]"] = searchParams.max;


  const { data: properties } = await fetchProperties(params);

  // For the city filter dropdown, we fetch all unique cities
  const { data: allProperties } = await fetchProperties({ "pagination[pageSize]": "200", "fields[0]": "city" });
  const cities = [...new Set(allProperties.map(p => p.city).filter(Boolean))];

  return (
    <main className="min-h-screen bg-paper">
      {/* --- Header Section --- */}
      <section className="bg-white border-b border-muted">
        <div className="section text-center !pt-32 !pb-12 md:!pt-40 md:!pb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-navy">
            Discover Our Collection
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated selection of prime residences and investment opportunities across Cyprus.
          </p>
        </div>
      </section>

      {/* --- Filters Section --- */}
      <section className="section !py-6 sticky top-[96px] z-30 bg-paper/80 backdrop-blur-md">
        <Filters cities={cities} />
      </section>

      {/* --- Grid Section --- */}
      <section className="section !pt-8">
        {properties && properties.length > 0 ? (
          <div className="stack-cards-carousel md:grid-cols-2 lg:grid-cols-3">
            {properties.map((p: Property) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-xl bg-white border border-muted">
            <h2 className="text-2xl font-semibold text-navy">
              No Properties Match Your Criteria
            </h2>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your filters or check back later for new listings.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
