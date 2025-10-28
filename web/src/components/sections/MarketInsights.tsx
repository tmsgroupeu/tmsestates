/* ✅ Enhanced: ./src/components/sections/MarketInsights.tsx */

import { fetchProperties } from "@/lib/cms";
import PropertyCard from "@/components/PropertyCard";
import Section from "@/components/Section";

export default async function MarketInsights() {
  const { data: properties } = await fetchProperties({
    'pagination[pageSize]': '12', 'sort[0]': 'createdAt:desc'
  });
  const loopedProperties = [...properties, ...properties];

  return (
    <Section
      id="all-properties"
      title="Discover Your Perfect Property"
      subtitle="A curated selection of our finest available residences and investment opportunities across Limassol."

    >
      {/* ✅ FIX: Container is now full-width */}
      <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_4%,_black_96%,transparent_100%)]">
        <div className="flex w-max gap-6 py-4">
          {loopedProperties.map((p, index) => (
            // ✅ FIX: Card width is reduced for a more discreet look
            <div key={`${p.id}-${index}`} className="w-50 flex-shrink-0 scrolling-wrapper">
              <PropertyCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}