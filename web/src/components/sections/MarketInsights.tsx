// UPDATED: src/components/sections/MarketInsights.tsx

import { fetchProperties } from "@/lib/cms";
import PropertyCard from "@/components/PropertyCard";
import Section from "@/components/Section";

export default async function MarketInsights() {
  const { data: properties = [] } = await fetchProperties({
    "pagination[pageSize]": "12",
    "sort[0]": "createdAt:desc",
  });

  if (!properties.length) return null;

  // By tripling the content, we create a very long track for a seamless manual scroll experience
  const looped = [...properties, ...properties, ...properties];

  return (
    <Section
      id="featured"
      title="Selected Listings"
      subtitle="Explore a rotating selection of hand-picked properties from our portfolio."
    >
      {/* 
        ✅ ENHANCEMENT: This container now allows for manual, gapless horizontal scrolling.
        - `overflow-x-auto` enables the scrollbar (often hidden on Mac/mobile).
        - `scroll-snap-type` makes the scrolling feel clean and crisp, stopping at the start of an item.
      */}
      <div className="w-full overflow-x-auto scroll-snap-type-x-mandatory pb-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_4%,_black_96%,transparent_100%)]">
        {/* 
          ✅ ENHANCEMENT: Removed the old "scrolling-wrapper" class. 
          We now use a simple flex container for a user-controlled scroll.
        */}
        <div className="flex w-max gap-6 py-4">
          {looped.map((p, index) => (
            <div
              key={`${p.id}-${index}`}
              className="w-[280px] flex-shrink-0 scroll-snap-align-start" // Enhanced width and added scroll-snap
            >
              <PropertyCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}