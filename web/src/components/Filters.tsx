/* Corrected: ./components/Filters.tsx */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from 'react'; // <-- FIX: Import React to solve the ts(2686) error

const statuses = [
  { value: "", label: "Any Status" },
  { value: "for-sale", label: "For Sale" },
  { value: "for-rent", label: "For Rent" },
];

const inputClass = "w-full border-muted rounded-lg px-4 py-2 h-12 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-shadow bg-white";

export default function Filters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  // Explicitly use React.useState for clarity
  const [status, setStatus] = React.useState(sp.get("status") || "");
  const [city, setCity] = React.useState(sp.get("city") || "");
  const [minPrice, setMinPrice] = React.useState(sp.get("min") || "");
  const [maxPrice, setMaxPrice] = React.useState(sp.get("max") || "");

  const apply = () => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (city) params.set("city", city);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  const reset = () => router.push("/properties");

  return (
    <div className="grid gap-4 md:grid-cols-5 bg-white border border-muted/80 rounded-2xl p-4 shadow-soft">
      <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <select className={inputClass} value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Any City</option>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input className={inputClass} type="number" min={0} placeholder="Min Price (€)" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      <input className={inputClass} type="number" min={0} placeholder="Max Price (€)" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

      <div className="flex gap-2 md:col-span-1">
        <button onClick={apply} className="btn btn-primary w-full !h-12">Apply</button>
        <button onClick={reset} className="btn btn-outline w-full !h-12">Reset</button>
      </div>
    </div>
  );
}