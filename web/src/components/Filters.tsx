/* FULL REPLACEMENT: src/components/Filters.tsx */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';
import { Search, RotateCcw, MapPin, Home, Bed, Euro } from 'lucide-react';
import PriceSlider from "./ui/PriceSlider"; // Ensure this path is correct based on where you saved Step 1

// Styling Constants
const inputWrapperClass = "relative flex items-center bg-gray-50 rounded-full border border-gray-100 px-4 py-3 focus-within:ring-2 focus-within:ring-[#D4AF37]/50 focus-within:border-[#D4AF37] transition-all group";
const selectClass = "w-full bg-transparent border-none outline-none text-sm font-bold text-[#0A2342] placeholder-gray-400 appearance-none ml-2 cursor-pointer";
const labelClass = "text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 ml-4 block";
const iconClass = "text-gray-400 group-focus-within:text-[#D4AF37] transition-colors shrink-0";

export default function Filters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  // State
  const [propertyType, setPropertyType] = useState(sp.get("type") || "");
  const [city, setCity] = useState(sp.get("city") || "");
  const [bedrooms, setBedrooms] = useState(sp.get("beds") || "");
  const [refId, setRefId] = useState(sp.get("ref") || "");
  
  // Slider State (Default 100k - 5M)
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({
    min: Number(sp.get("min")) || 0,
    max: Number(sp.get("max")) || 5000000
  });

  const apply = () => {
    const params = new URLSearchParams(sp.toString());
    
    if (propertyType) params.set("type", propertyType); else params.delete("type");
    if (city) params.set("city", city); else params.delete("city");
    if (bedrooms) params.set("beds", bedrooms); else params.delete("beds");
    
    // Price
    if (priceRange.min > 0) params.set("min", priceRange.min.toString()); else params.delete("min");
    if (priceRange.max < 5000000) params.set("max", priceRange.max.toString()); else params.delete("max");

    if (refId) params.set("ref", refId); else params.delete("ref");

    router.push(`/properties?${params.toString()}`);
  };

  const reset = () => {
    const currentStatus = sp.get("status");
    setPriceRange({ min: 0, max: 5000000 });
    setPropertyType("");
    setCity("");
    setBedrooms("");
    setRefId("");
    router.push(currentStatus ? `/properties?status=${currentStatus}` : "/properties");
  };

  return (
    // MAIN BAR CONTAINER - Designed to look like a cockpit
    <div className="w-full bg-white rounded-[2rem] shadow-xl shadow-[#0A2342]/5 border border-white p-6 md:p-8">
       
       <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-end">

          {/* --- LEFT SECTION: FILTERS --- */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
             {/* 1. Location */}
             <div>
                <label className={labelClass}>Location</label>
                <div className={inputWrapperClass}>
                   <MapPin size={18} className={iconClass} />
                   <select className={selectClass} value={city} onChange={(e) => setCity(e.target.value)}>
                      <option value="">All Cyprus</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
             </div>

             {/* 2. Type */}
             <div>
                <label className={labelClass}>Property Type</label>
                <div className={inputWrapperClass}>
                   <Home size={18} className={iconClass} />
                   <select className={selectClass} value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                      <option value="">All Types</option>
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="commercial">Commercial</option>
                      <option value="plot">Plot / Land</option>
                   </select>
                </div>
             </div>

             {/* 3. Bedrooms */}
             <div>
                <label className={labelClass}>Bedrooms</label>
                <div className={inputWrapperClass}>
                   <Bed size={18} className={iconClass} />
                   <select className={selectClass} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                      <option value="">Any Beds</option>
                      <option value="1">1+ Bedroom</option>
                      <option value="2">2+ Bedrooms</option>
                      <option value="3">3+ Bedrooms</option>
                      <option value="4">4+ Bedrooms</option>
                      <option value="5">5+ Bedrooms</option>
                   </select>
                </div>
             </div>

             {/* 4. Price Slider (Replaces simple input) */}
             <div>
                <label className={labelClass}>Price Range</label>
                <div className="px-2">
                   <PriceSlider 
                      min={0} 
                      max={5000000} 
                      initialMin={priceRange.min}
                      initialMax={priceRange.max}
                      onChange={(min, max) => setPriceRange({ min, max })} 
                   />
                </div>
             </div>

          </div>

          {/* --- RIGHT SECTION: ACTIONS --- */}
          <div className="w-full lg:w-auto flex items-center gap-3">
             
             {/* Ref ID (Hidden on mobile? No, let's keep it compacted) */}
             <div className="flex-1 lg:w-32">
                <label className={`${labelClass} lg:hidden`}>Ref ID</label>
                <div className={`${inputWrapperClass} !py-2.5`}>
                   <Search size={16} className={iconClass} />
                   <input 
                      type="text" 
                      className={selectClass} 
                      placeholder="Ref ID" 
                      value={refId} 
                      onChange={(e) => setRefId(e.target.value)} 
                   />
                </div>
             </div>

             {/* Search Button */}
             <button onClick={apply} className="bg-[#0A2342] text-white h-[46px] px-8 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#D4AF37] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex-1 lg:flex-none">
                Search
             </button>

             {/* Reset Button */}
             <button onClick={reset} className="h-[46px] w-[46px] flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-[#0A2342] hover:border-[#0A2342] hover:bg-white transition-all bg-gray-50" title="Reset Filters">
                <RotateCcw size={18} />
             </button>

          </div>

       </div>
    </div>
  );
}
