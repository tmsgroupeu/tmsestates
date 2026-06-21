import Image from "next/image";
import Filters from "@/components/Filters";
import PropertyCard from "@/components/PropertyCard";
import { Link } from "@/i18n/routing";
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

const statusTabs = [
  { label: "All Listings", value: "all" },
  { label: "For Sale", value: "for-sale" },
  { label: "For Rent", value: "for-rent" },
];

function buildTabHref(status: string) {
  return status === "all" ? "/properties" : `/properties?status=${status}`;
}

export default async function PropertiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const activeStatus = params.status || "all";

  const apiFilters: Record<string, string> = {
    "pagination[pageSize]": "100",
    "sort[0]": "updatedAt:desc",
    populate: "*",
  };

  if (activeStatus !== "all") {
    apiFilters["filters[prop_status][$eq]"] = activeStatus;
  }

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
    activeStatus !== "all",
    params.city,
    params.type,
    params.beds,
    params.min,
    params.max,
    params.ref,
  ].filter(Boolean).length;

  return (
    <main className="overflow-hidden bg-[#F5F0E8] text-[#242124]">
      <section className="relative flex min-h-[54svh] items-end overflow-hidden bg-[#242124] px-6 pb-20 pt-36 md:px-10 md:pt-44 lg:min-h-[62svh]">
        <Image
          src="/assets/hero-poster.jpg"
          alt="TMS Estates properties"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#242124]/42" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#242124]/92 via-[#242124]/58 to-[#242124]/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242124]/96 via-[#242124]/38 to-transparent" />
        <div className="absolute bottom-0 left-0 h-[48%] w-full bg-gradient-to-t from-[#242124] via-[#242124]/72 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
              Property Portfolio
            </p>

            <h1 className="max-w-4xl font-montserrat text-[clamp(2.7rem,5.8vw,6.6rem)] font-bold leading-[0.96] tracking-[-0.07em] text-[#F5F0E8]">
              Browse Available
              <span className="block text-[#C2A139]">Properties</span>
            </h1>
          </div>

          <p className="max-w-xl border-l border-[#C2A139]/50 bg-[#242124]/44 px-5 py-5 text-sm leading-7 text-[#F5F0E8]/86 shadow-[0_22px_70px_rgba(0,0,0,0.2)] backdrop-blur-[2px] md:text-base md:leading-8">
            Explore residential and investment opportunities across Cyprus.
            Filter by location, type, bedrooms or price to quickly find the
            properties most relevant to you.
          </p>
        </div>
      </section>

      <section className="relative z-20 bg-[#F5F0E8] px-6 md:px-10">
        <div className="mx-auto -mt-12 w-full max-w-7xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex overflow-hidden bg-white shadow-[0_18px_60px_rgba(36,33,36,0.12)]">
              {statusTabs.map((tab) => (
                <Link
                  key={tab.value}
                  href={buildTabHref(tab.value)}
                  scroll={false}
                  className={`border-r border-[#242124]/8 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors last:border-r-0 md:px-7 ${
                    activeStatus === tab.value
                      ? "bg-[#242124] text-[#F5F0E8]"
                      : "text-[#242124]/58 hover:bg-[#F5F0E8] hover:text-[#242124]"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>

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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
