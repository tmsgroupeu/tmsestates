import Section from "@/components/Section"; // CORRECTED PATH
import PropertyCard from "@/components/PropertyCard"; // CORRECTED PATH
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// STATIC DATA FOR PRESENTATION
const exclusiveProperties = [
    { id: 1, attributes: { title: 'Seafront Villa in Amara', slug: 'seafront-villa-amara', city: 'Limassol', price: 4250000, currency: '€', bedrooms: 5, bathrooms: 6, area: 550, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
    { id: 2, attributes: { title: 'Penthouse at The One Tower', slug: 'penthouse-one-tower', city: 'Limassol', price: 6500000, currency: '€', bedrooms: 4, bathrooms: 5, area: 480, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
    { id: 3, attributes: { title: 'Modern Residence in Agios Athanasios', slug: 'modern-residence-agios', city: 'Limassol', price: 2100000, currency: '€', bedrooms: 4, bathrooms: 4, area: 320, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
];

export default function ExclusiveMandates() {
  return (
    <Section
      id="featured"
      title="Our Premier Collection"
      subtitle="Exclusive mandates on Limassol's most sought-after properties. Available only through TMS Estates."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exclusiveProperties.map((p) => <PropertyCard key={p.id} p={p} />)}
      </div>
      <div className="text-center mt-12">
        <Link href="/properties" className="btn btn-outline gap-2 group">
          Browse All Properties <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}