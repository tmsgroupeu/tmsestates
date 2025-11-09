// UPDATED: web/src/app/properties/page.tsx
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties, Property } from "@/lib/cms"; // Assuming Property type is exported from cms lib

export const revalidate = 3600; // Revalidate this page every hour

export default async function PropertiesPage() {
  const { data: properties } = await fetchProperties({
    'pagination[pageSize]': '99', // Fetch all properties
    'sort[0]': 'updatedAt:desc',
  });

  return (
    <main className="min-h-screen bg-paper">
      {/* --- 1. Elegant Header --- */}
      <section className="bg-white border-b border-muted">
        <div className="section text-center !py-16 md:!py-20">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-navy">Discover Our Collection</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated selection of our finest available residences and investment opportunities across Limassol and beyond.
          </p>
        </div>
      </section>

      {/* --- 2. Properties Grid --- */}
      <section className="section">
        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map((p: Property) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-navy">No Properties Found</h2>
            <p className="mt-2 text-muted-foreground">Please check back later for new listings.</p>
          </div>
        )}
      </section>
    </main>
  );
}
