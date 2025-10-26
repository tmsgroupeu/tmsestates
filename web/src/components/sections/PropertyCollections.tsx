/* Fully Updated & Dynamic: ./src/components/sections/PropertyCollections.tsx */

import Section from "@/components/Section";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { fetchProperties } from "@/lib/cms"; // Import the fetch function
import { ArrowRight } from "lucide-react";

// This is now an async server component, just like ExclusiveMandates
export default async function PropertyCollections() {

  // We will fetch another 3 properties, but this time we'll "offset" them
  // to avoid showing the same ones from the "Premier Collection" section.
  // This shows variety to the user.
  const { data: properties } = await fetchProperties({
    'pagination[start]': '3', // Start from the 4th item (index 3)
    'pagination[limit]': '3',  // Get the next 3 items
    'sort[0]': 'createdAt:desc',
  });
  
  // If there are fewer than 4 properties in the CMS, this section won't render.
  if (properties.length === 0) {
    return null; 
  }

  return (
    <Section
      id="collections"
      title="Discover More Opportunities"
      subtitle="From modern apartments to exclusive villas, explore a wider range of our available properties in Limassol."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* We are now mapping over live data from Strapi that matches the correct type */}
        {properties.map((p) => <PropertyCard key={p.id} p={p} />)}
      </div>

      <div className="text-center mt-16">
        <Link href="/properties" className="btn btn-outline gap-2 group">
          Browse All Categories <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}