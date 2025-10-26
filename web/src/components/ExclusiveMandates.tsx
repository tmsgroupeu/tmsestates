/* Fully Updated: ./components/ExclusiveMandates.tsx */

import Section from "@/components/Section";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchProperties } from "@/lib/cms";

export default async function ExclusiveMandates() {
  const { data: properties } = await fetchProperties({
    'pagination[pageSize]': '3',
    'sort[0]': 'createdAt:desc'
  });

  return (
    <Section
      id="featured"
      title="Our Premier Collection"
      subtitle="Exclusive mandates on Limassol's most sought-after properties, available only through TMS Estates."
      className="bg-paper"
    >
      {properties.length === 0 ? (
        <p className="text-center text-muted-foreground">
          New exclusive properties are coming soon. Please check back later.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      )}

      <div className="text-center mt-16">
        <Link href="/properties" className="btn btn-primary gap-2 group shadow-lg">
          Explore All Properties <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}