// src/components/sections/MarketInsights.tsx
import { fetchProperties } from "@/lib/cms";
import type { Property } from "@/lib/cms";          // ✅ add this
import PropertyCard from "@/components/PropertyCard";
import Section from "@/components/Section";
import Link from "next/link";

export default async function MarketInsights() {
  const { data: properties = [] } = await fetchProperties({
    "pagination[pageSize]": "12",
    "sort[0]": "createdAt:desc",
  });

  if (!properties.length) return null;

  // ✅ make the array typed
  const looped: Property[] = [...properties, ...properties];

  return (
    <Section
      id="selected-listings"
      title="Selected Listings"
      subtitle="Explore a rotating selection of hand-picked properties from our portfolio."
      variant="dark"
      className="relative"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/35 via-transparent to-slate-950/70" />

      <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_4%,_black_96%,transparent_100%)]">
        <div className="flex w-max gap-6 py-4 scrolling-wrapper md:[animation-duration:70s]">
          {looped.map((p: Property, index: number) => (   // ✅ typed here
            <div key={`${p.id}-${index}`} className="w-[260px] flex-shrink-0">
              <PropertyCard p={p} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center md:justify-end">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_14px_40px_rgba(56,189,248,0.35)] transition-all hover:bg-sky-500 hover:shadow-[0_18px_60px_rgba(56,189,248,0.5)]"
        >
          View all properties <span className="text-xs">→</span>
        </Link>
      </div>
    </Section>
  );
}
