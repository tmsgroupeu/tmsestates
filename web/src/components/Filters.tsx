"use client";

import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const propertyTypes = [
  "House",
  "Apartment",
  "Villa",
  "Commercial/Offices",
  "Plot/Land",
];

const bedrooms = ["1", "2", "3", "4", "5"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.24em] text-[#C2A139]">
      {children}
    </label>
  );
}

const fieldClass =
  "h-12 w-full border border-[#242124]/10 bg-white px-4 text-sm font-semibold text-[#242124] outline-none transition-all placeholder:text-[#242124]/34 focus:border-[#C2A139]/70 focus:bg-[#F5F0E8]";

export default function Filters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [city, setCity] = useState(sp.get("city") || "");
  const [propertyType, setPropertyType] = useState(sp.get("type") || "");
  const [beds, setBeds] = useState(sp.get("beds") || "");
  const [min, setMin] = useState(sp.get("min") || "");
  const [max, setMax] = useState(sp.get("max") || "");
  const [ref, setRef] = useState(sp.get("ref") || "");

  const currentStatus = sp.get("status");

  const hasFilters = useMemo(
    () => city || propertyType || beds || min || max || ref,
    [city, propertyType, beds, min, max, ref],
  );

  const pushParams = (params: URLSearchParams) => {
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const apply = () => {
    const params = new URLSearchParams(sp.toString());

    city ? params.set("city", city) : params.delete("city");
    propertyType ? params.set("type", propertyType) : params.delete("type");
    beds ? params.set("beds", beds) : params.delete("beds");
    min ? params.set("min", min) : params.delete("min");
    max ? params.set("max", max) : params.delete("max");
    ref ? params.set("ref", ref) : params.delete("ref");

    pushParams(params);
  };

  const reset = () => {
    setCity("");
    setPropertyType("");
    setBeds("");
    setMin("");
    setMax("");
    setRef("");

    const params = new URLSearchParams();
    if (currentStatus) params.set("status", currentStatus);
    pushParams(params);
  };

  return (
    <div className="property-filter-shell relative overflow-hidden bg-white shadow-[0_28px_95px_rgba(36,33,36,0.16)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-[#C2A139]/14">
        <div className="filter-gold-line h-full w-1/3 bg-gradient-to-r from-transparent via-[#C2A139] to-transparent" />
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-2 md:p-6 xl:grid-cols-[1fr_1fr_0.75fr_0.75fr_0.75fr_0.8fr_auto] xl:items-end">
        <div>
          <FieldLabel>Location</FieldLabel>
          <select
            className={fieldClass}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All Locations</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel>Property Type</FieldLabel>
          <select
            className={fieldClass}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">All Types</option>
            {propertyTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel>Beds</FieldLabel>
          <select
            className={fieldClass}
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
          >
            <option value="">Any</option>
            {bedrooms.map((item) => (
              <option key={item} value={item}>
                {item}+
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel>Min Price</FieldLabel>
          <input
            className={fieldClass}
            inputMode="numeric"
            value={min}
            onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))}
            placeholder="€ Min"
          />
        </div>

        <div>
          <FieldLabel>Max Price</FieldLabel>
          <input
            className={fieldClass}
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))}
            placeholder="€ Max"
          />
        </div>

        <div>
          <FieldLabel>Reference</FieldLabel>
          <input
            className={fieldClass}
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="ID"
          />
        </div>

        <div className="flex gap-2 md:col-span-2 xl:col-span-1">
          <button
            onClick={apply}
            className="group inline-flex h-12 flex-1 items-center justify-center gap-3 bg-[#242124] px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] transition-all hover:bg-[#C2A139] hover:text-[#242124] xl:flex-none"
          >
            <Search className="h-4 w-4" />
            Search
          </button>

          <button
            onClick={reset}
            className="grid h-12 w-12 place-items-center border border-[#242124]/12 text-[#242124]/54 transition-all hover:border-[#C2A139]/70 hover:text-[#C2A139]"
            title="Reset filters"
          >
            {hasFilters ? <RotateCcw className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <style jsx>{`
        .property-filter-shell {
          box-shadow:
            0 28px 95px rgba(36, 33, 36, 0.16),
            0 -10px 32px rgba(36, 33, 36, 0.08),
            inset 0 1px 0 rgba(194, 161, 57, 0.08);
        }

        .filter-gold-line {
          animation: filterGoldSweep 4.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          opacity: 0.9;
          filter: drop-shadow(0 0 8px rgba(194, 161, 57, 0.45));
        }

        @keyframes filterGoldSweep {
          0% {
            transform: translateX(-115%);
          }
          46%,
          100% {
            transform: translateX(320%);
          }
        }
      `}</style>
    </div>
  );
}
