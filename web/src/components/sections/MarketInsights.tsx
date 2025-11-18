// web/src/components/sections/MarketInsights.tsx
import { fetchProperties } from "@/lib/cms";
import PropertyCard from "@/components/PropertyCard";
import Section from "@/components/Section";

export default async function MarketInsights() {
  const { data: properties = [] } = await fetchProperties({
    "pagination[pageSize]": "12",
    "sort[0]": "createdAt:desc",
  });

  if (!properties.length) return null;

  const looped = [...properties, ...properties];

  return (
    <Section
      id="featured"
      title="Selected Listings"
      subtitle="Explore a rotating selection of hand-picked properties from our portfolio."
    >
      {/* Mobile: manual swipe; Desktop: subtle marquee feel */}
      <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_4%,_black_96%,transparent_100%)]">
        <div className="flex w-max gap-6 py-4 scrolling-wrapper md:[animation-duration:70s]">
          {looped.map((p, index) => (
            <div
              key={`${p.id}-${index}`}
              className="w-[260px] flex-shrink-0"
            >
              <PropertyCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
