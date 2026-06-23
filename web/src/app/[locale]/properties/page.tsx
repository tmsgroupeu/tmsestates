import Image from "next/image";
import Filters from "@/components/Filters";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties, Property } from "@/lib/cms";

export const revalidate = 0;

type SearchParams = {
  status?: string;
  city?: string;
  type?: string;
  beds?: string;
  min?: string;
  max?: string;
  ref?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function PropertiesPage({ searchParams }: Props) {
  const params = await searchParams;

  const apiFilters: Record<string, string> = {
    "pagination[pageSize]": "100",
    "sort[0]": "updatedAt:desc",
    populate: "*",
  };

  if (params.type) apiFilters["filters[propertyType][$eq]"] = params.type;
  if (params.city) apiFilters["filters[city][$eq]"] = params.city;
  if (params.beds) apiFilters["filters[bedrooms][$gte]"] = params.beds;
  if (params.min) apiFilters["filters[price][$gte]"] = params.min;
  if (params.max) apiFilters["filters[price][$lte]"] = params.max;
  if (params.ref) apiFilters["filters[id][$eq]"] = params.ref;

  const { data: properties } = await fetchProperties(apiFilters);

  const { data: allData } = await fetchProperties({
    "pagination[pageSize]": "200",
    "fields[0]": "city",
  });

  const cities = [
    ...new Set((allData || []).map((p: any) => p.city).filter(Boolean)),
  ].sort();

  const activeFilters = [
    params.city,
    params.type,
    params.beds,
    params.min,
    params.max,
    params.ref,
  ].filter(Boolean).length;

  return (
    <main className="listing-page-main overflow-hidden bg-[#F5F0E8] text-[#242124]">
      <section className="relative flex min-h-[54svh] items-end overflow-hidden bg-[#242124] px-6 pb-20 pt-36 md:px-10 md:pt-44 lg:min-h-[62svh]">
        <Image
          src="/assets/hero-poster.jpg"
          alt="TMS Estates properties"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#242124]/52" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#242124]/92 via-[#242124]/52 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#242124]/96 via-[#242124]/68 to-[#242124]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242124]/98 via-[#242124]/48 to-transparent" />
        <div className="absolute bottom-0 left-0 h-[54%] w-full bg-gradient-to-t from-[#242124] via-[#242124]/78 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
          <div>
            <p className="mb-5 w-fit border border-[#C2A139]/44 bg-[#242124]/62 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139] shadow-[0_12px_36px_rgba(0,0,0,0.34)] backdrop-blur-md">
              Property Portfolio
            </p>

            <h1 className="max-w-4xl font-montserrat text-[clamp(2.7rem,5.8vw,6.6rem)] font-bold leading-[0.96] tracking-[-0.07em] text-[#F5F0E8] drop-shadow-[0_18px_48px_rgba(0,0,0,0.76)]">
              Browse Available
              <span className="block text-[#C2A139]">Properties</span>
            </h1>
          </div>

          <p className="max-w-xl border border-[#F5F0E8]/18 border-l-[#C2A139]/70 bg-[#242124]/72 px-5 py-5 text-sm leading-7 text-[#F5F0E8]/92 shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-md md:text-base md:leading-8">
            Explore residential and investment opportunities across Cyprus.
            Filter by location, type, bedrooms or price to quickly find the
            properties most relevant to you.
          </p>
        </div>
      </section>

      <section className="relative z-20 bg-[#F5F0E8] px-6 md:px-10">
        <div className="mx-auto -mt-12 w-full max-w-7xl">
          <div className="mb-4 flex justify-end">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#242124]/46">
              {properties?.length || 0} results
              {activeFilters > 0 ? ` · ${activeFilters} active filters` : ""}
            </p>
          </div>

          <Filters cities={cities} />
        </div>
      </section>

      <section className="bg-[#F5F0E8] px-6 pb-20 pt-14 md:px-10 md:pb-24 md:pt-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-9 grid gap-5 border-b border-[#242124]/10 pb-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                Results
              </p>
              <h2 className="font-montserrat text-[clamp(1.9rem,3vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#242124]">
                Available Residences
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-[#242124]/66 md:text-[0.95rem] md:leading-8">
              Each listing is connected to live CMS data. Open a property to see
              full details, project connection, specifications and enquiry
              options.
            </p>
          </div>

          {properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((p: Property) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <div className="border border-[#242124]/10 bg-white p-10 text-center shadow-[0_22px_70px_rgba(36,33,36,0.08)]">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C2A139]">
                No Results
              </p>
              <h3 className="font-montserrat text-2xl font-semibold tracking-[-0.04em] text-[#242124]">
                No properties match your current filters.
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#242124]/62">
                Try widening the price range, selecting all locations, or
                switching between sale and rent listings.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
