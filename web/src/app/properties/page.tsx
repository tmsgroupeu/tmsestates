// web/src/app/properties/page.tsx
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties, Property } from "@/lib/cms";

export const revalidate = 3600;

export default async function PropertiesPage() {
  const { data: properties } = await fetchProperties({
    "pagination[pageSize]": "99",
    "sort[0]": "updatedAt:desc",
  });

  return (
    <main className="min-h-screen bg-[color:var(--paper)]">
      {/* Header */}
      <section className="bg-white border-b border-[color:var(--muted)]">
        <div className="section text-center !py-16 md:!py-20">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-[color:var(--navy)]">
            Discover Our Collection
          </h1>
          <p className="mt-4 text-lg text-[color:var(--muted-foreground)] max-w-2xl mx-auto">
            A curated selection of prime residences and investment opportunities across Cyprus.
          </p>
        </div>
      </section>

      {/* Grid → Carousel on mobile */}
      <section className="section">
        {properties && properties.length > 0 ? (
          <div className="stack-cards-carousel md:grid-cols-2 lg:grid-cols-3">
            {properties.map((p: Property) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-[color:var(--navy)]">
              No Properties Found
            </h2>
            <p className="mt-2 text-[color:var(--muted-foreground)]">
              Please check back later for new listings.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
