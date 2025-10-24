"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const statuses = [
  { value: "", label: "Any Status" },
  { value: "for-sale", label: "For Sale" },
  { value: "for-rent", label: "For Rent" },
  { value: "sold", label: "Sold" },
];

export default function Filters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [status, setStatus] = useState(sp.get("status") || "");
  const [city, setCity] = useState(sp.get("city") || "");
  const [minPrice, setMinPrice] = useState(sp.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(sp.get("max") || "");

  useEffect(() => {
    setStatus(sp.get("status") || "");
    setCity(sp.get("city") || "");
    setMinPrice(sp.get("min") || "");
    setMaxPrice(sp.get("max") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  const apply = () => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (city) params.set("city", city);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  const reset = () => router.push("/properties");

  const inputClass = "border rounded-lg px-3 py-2 h-10 focus:ring-2 focus:ring-neutral-900/10";

  return (
    <div className="grid gap-3 md:grid-cols-5 bg-white border rounded-2xl p-4 shadow-[0_1px_0_#eee]">
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

      <input className={inputClass} type="number" min={0} placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      <input className={inputClass} type="number" min={0} placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

      <div className="flex gap-2">
        <button onClick={apply} className="flex-1 rounded-lg bg-black text-white px-3 h-10">Apply</button>
        <button onClick={reset} className="flex-1 rounded-lg border px-3 h-10">Reset</button>
      </div>
    </div>
  );
}
