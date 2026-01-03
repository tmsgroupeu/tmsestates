/* UPDATED: src/components/Filters.tsx */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none transition-all bg-white text-[#0A2342]";
const labelClass = "text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block";

export default function Filters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  // State
  const [propertyType, setPropertyType] = useState(sp.get("type") || "");
  const [city, setCity] = useState(sp.get("city") || "");
  const [bedrooms, setBedrooms] = useState(sp.get("beds") || "");
  const [minPrice, setMinPrice] = useState(sp.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(sp.get("max") || "");
  const [refId, setRefId] = useState(sp.get("ref") || "");

  // Note: "Status" (Sale/Rent) is handled by the Tabs in the parent page, not here.

  const apply = () => {
    const params = new URLSearchParams(sp.toString()); // Keep existing params (like status)
    
    if (propertyType) params.set("type", propertyType); else params.delete("type");
    if (city) params.set("city", city); else params.delete("city");
    if (bedrooms) params.set("beds", bedrooms); else params.delete("beds");
    if (minPrice) params.set("min", minPrice); else params.delete("min");
    if (maxPrice) params.set("max", maxPrice); else params.delete("max");
    if (refId) params.set("ref", refId); else params.delete("ref");

    router.push(`/properties?${params.toString()}`);
  };

  const reset = () => {
    // Keep the current status (rent/sale) but clear filters
    const currentStatus = sp.get("status");
    if (currentStatus) {
       router.push(`/properties?status=${currentStatus}`);
    } else {
       router.push("/properties");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        {/* 1. Property Type */}
        <div>
          <label className={labelClass}>Type</label>
          <select className={inputClass} value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">All Types</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
            <option value="penthouse">Penthouse</option>
            <option value="commercial">Commercial</option>
            <option value="plot">Land / Plot</option>
          </select>
        </div>

        {/* 2. City */}
        <div>
          <label className={labelClass}>Location</label>
          <select className={inputClass} value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cyprus</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* 3. Bedrooms */}
        <div>
          <label className={labelClass}>Bedrooms</label>
          <select className={inputClass} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* 4. Reference Number */}
        <div>
          <label className={labelClass}>Reference ID</label>
          <div className="relative">
             <input 
               type="text" 
               className={inputClass} 
               placeholder="e.g. 8452"
               value={refId}
               onChange={(e) => setRefId(e.target.value)}
             />
             <Search className="absolute right-3 top-3 text-gray-400 h-4 w-4" />
          </div>
        </div>

        {/* 5. Price Range (Spans 2 cols on desktop) */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
           <div>
              <label className={labelClass}>Min Price (€)</label>
              <input type="number" className={inputClass} placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
           </div>
           <div>
              <label className={labelClass}>Max Price (€)</label>
              <input type="number" className={inputClass} placeholder="No Limit" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
           </div>
        </div>

        {/* 6. Buttons (Spans 2 cols) */}
        <div className="lg:col-span-2 flex items-end gap-3">
          <button onClick={apply} className="flex-1 h-[46px] rounded-xl bg-[#0A2342] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#D4AF37] transition-colors">
            Search Properties
          </button>
          <button onClick={reset} className="px-6 h-[46px] rounded-xl border border-gray-200 text-gray-500 font-bold text-sm uppercase tracking-wider hover:border-[#0A2342] hover:text-[#0A2342] transition-colors">
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}