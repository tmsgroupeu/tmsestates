/* FULL REPLACEMENT: src/components/Filters.tsx */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';

const inputClass = "w-full bg-transparent border-0 border-b border-gray-200 py-2.5 text-xs font-bold text-[#0A2342] placeholder-gray-400 focus:ring-0 focus:border-[#D4AF37] transition-colors appearance-none";
const labelClass = "text-[9px] uppercase tracking-widest text-gray-400 block mb-0";

export default function Filters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  // State
  const [propertyType, setPropertyType] = useState(sp.get("type") || "");
  const [city, setCity] = useState(sp.get("city") || "");
  const [bedrooms, setBedrooms] = useState(sp.get("beds") || "");
  const [maxPrice, setMaxPrice] = useState(sp.get("max") || "");
  const [refId, setRefId] = useState(sp.get("ref") || "");

  const apply = () => {
    const params = new URLSearchParams(sp.toString());
    
    // Status is preserved automatically
    if (propertyType) params.set("type", propertyType); else params.delete("type");
    if (city) params.set("city", city); else params.delete("city");
    if (bedrooms) params.set("beds", bedrooms); else params.delete("beds");
    if (maxPrice) params.set("max", maxPrice); else params.delete("max");
    if (refId) params.set("ref", refId); else params.delete("ref");

    router.push(`/properties?${params.toString()}`);
  };

  const reset = () => {
    const currentStatus = sp.get("status");
    router.push(currentStatus ? `/properties?status=${currentStatus}` : "/properties");
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl shadow-[#0A2342]/5 border border-gray-100 p-2 md:p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-8">
       
       {/* GRID FOR INPUTS */}
       <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:flex lg:items-center gap-6 px-4">
          
          <div className="lg:w-32">
             <label className={labelClass}>Location</label>
             <select className={inputClass} value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Any</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
             </select>
          </div>

          <div className="lg:w-32">
             <label className={labelClass}>Type</label>
             <select className={inputClass} value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">Any</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="penthouse">Penthouse</option>
                <option value="commercial">Commercial</option>
             </select>
          </div>

          <div className="lg:w-20">
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

          <div className="lg:w-32">
             <label className={labelClass}>Max Price</label>
             <input type="number" className={inputClass} placeholder="No Limit" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>

          <div className="lg:flex-1 min-w-[120px]">
             <label className={labelClass}>Ref ID</label>
             <div className="flex items-center">
                <input type="text" className={inputClass} placeholder="ID..." value={refId} onChange={(e) => setRefId(e.target.value)} />
                <Search size={14} className="text-gray-400 -ml-4" />
             </div>
          </div>

       </div>

       {/* BUTTONS */}
       <div className="flex items-center gap-2 p-1">
          <button onClick={apply} className="bg-[#0A2342] text-white h-12 px-6 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#D4AF37] transition-colors shadow-lg">
             Search
          </button>
          <button onClick={reset} className="h-12 w-12 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:text-[#0A2342] hover:border-gray-300 transition-all" title="Reset">
             <RotateCcw size={16} />
          </button>
       </div>

    </div>
  );
}
