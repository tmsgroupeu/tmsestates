/* FULL REPLACEMENT: src/components/Filters.tsx */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';
import { Search, RotateCcw, MapPin, Target, SlidersHorizontal, Home, Bed } from 'lucide-react';
import PriceSlider from "./ui/PriceSlider";

export default function Filters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [expanded, setExpanded] = useState(false);
  const [keyword, setKeyword] = useState(sp.get("keyword") || "");
  const [city, setCity] = useState(sp.get("city") || "");
  const [status, setStatus] = useState(sp.get("status") || "");
  const [propertyType, setPropertyType] = useState(sp.get("type") || "");
  const [bedrooms, setBedrooms] = useState(sp.get("beds") || "");
  const [refId, setRefId] = useState(sp.get("ref") || "");
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({
    min: Number(sp.get("min")) || 0,
    max: Number(sp.get("max")) || 5000000
  });

  const apply = () => {
    const params = new URLSearchParams(sp.toString());
    
    if (keyword) params.set("keyword", keyword); else params.delete("keyword");
    if (city) params.set("city", city); else params.delete("city");
    if (status) params.set("status", status); else params.delete("status");
    if (propertyType) params.set("type", propertyType); else params.delete("type");
    if (bedrooms) params.set("beds", bedrooms); else params.delete("beds");
    if (priceRange.min > 0) params.set("min", priceRange.min.toString()); else params.delete("min");
    if (priceRange.max < 5000000) params.set("max", priceRange.max.toString()); else params.delete("max");
    if (refId) params.set("ref", refId); else params.delete("ref");

    router.push(`/properties?${params.toString()}`);
  };

  const reset = () => {
    setKeyword("");
    setCity("");
    setStatus("");
    setPropertyType("");
    setBedrooms("");
    setRefId("");
    setPriceRange({ min: 0, max: 5000000 });
    router.push("/properties");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') apply();
  };

  const inputWrapperClass = "relative flex items-center bg-white/60 backdrop-blur-md rounded-full border border-white/80 px-4 py-3 focus-within:ring-2 focus-within:ring-[#D4AF37]/50 focus-within:border-[#D4AF37] transition-all group shadow-sm w-full";
  const selectClass = "w-full bg-transparent border-none outline-none text-sm font-bold text-[#0A2342] placeholder-[#0A2342]/40 appearance-none ml-2 cursor-pointer";
  const labelClass = "text-[10px] uppercase tracking-widest text-[#0A2342]/70 font-bold mb-2 ml-4 block";
  const iconClass = "text-[#0A2342]/50 group-focus-within:text-[#D4AF37] transition-colors shrink-0";

  return (
    // MAIN BAR CONTAINER - Apple Glass Morphism
    <div className="w-full relative isolate z-30">
       <div className={`absolute inset-0 bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(10,35,66,0.1)] -z-10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${expanded ? 'rounded-3xl' : 'rounded-full'}`} />
       {/* Noise texture overlay */}
       <div className={`absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none -z-10 transition-all duration-500 ${expanded ? 'rounded-3xl' : 'rounded-full'}`} 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
       
       <div className="p-4 md:p-6 flex flex-col gap-6 w-full">
          
          {/* PRIMARY VIEW: Search Bar & Actions */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
             <div className="flex-1 w-full">
                <div className={inputWrapperClass}>
                   <Search size={18} className={iconClass} />
                   <input 
                      type="text" 
                      className="w-full bg-transparent border-none outline-none text-base md:text-lg font-bold text-[#0A2342] placeholder-[#0A2342]/40 ml-3" 
                      placeholder="Search Signature Developments by name, location, or keyword..." 
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      onKeyDown={handleKeyDown}
                   />
                </div>
             </div>

             <div className="flex items-center gap-3 w-full md:w-auto">
                <button onClick={() => setExpanded(!expanded)} className="h-[52px] px-8 flex items-center justify-center gap-2 rounded-full border border-[#0A2342]/30 text-[#0A2342] hover:bg-[#0A2342] hover:text-white transition-all bg-white/40 backdrop-blur-md shadow-sm font-bold uppercase text-xs tracking-widest flex-1 md:flex-none">
                   <SlidersHorizontal size={16} /> Filters
                </button>
                <button onClick={apply} className="h-[52px] px-8 flex items-center justify-center gap-2 rounded-full text-white bg-[#0A2342] hover:bg-[#D4AF37] transition-all shadow-md font-bold uppercase text-xs tracking-widest flex-1 md:flex-none">
                   Search
                </button>
             </div>
          </div>

          {/* EXPANDABLE VIEW: Advanced Filters */}
          <div className={`w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 pb-2 border-t border-white/20 mt-2">
                 
                 {/* Destination */}
                 <div>
                    <label className={labelClass}>Destination</label>
                    <div className={inputWrapperClass}>
                       <MapPin size={18} className={iconClass} />
                       <select className={selectClass} value={city} onChange={(e) => setCity(e.target.value)}>
                          <option value="">All Cyprus</option>
                          {cities.map(c => <option key={c} value={c}>{c}</option>)}
                       </select>
                    </div>
                 </div>

                 {/* Phase */}
                 <div>
                    <label className={labelClass}>Phase</label>
                    <div className={inputWrapperClass}>
                       <Target size={18} className={iconClass} />
                       <select className={selectClass} value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option value="">All Phases</option>
                          <option value="Planned">Planned</option>
                          <option value="Under Construction">Under Construction</option>
                          <option value="Completed">Completed Residences</option>
                       </select>
                    </div>
                 </div>

                 {/* Property Type */}
                 <div>
                    <label className={labelClass}>Type</label>
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

                 {/* Bedrooms */}
                 <div>
                    <label className={labelClass}>Bedrooms</label>
                    <div className={inputWrapperClass}>
                       <Bed size={18} className={iconClass} />
                       <select className={selectClass} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                          <option value="">Any</option>
                          <option value="1">1+ Bedroom</option>
                          <option value="2">2+ Bedrooms</option>
                          <option value="3">3+ Bedrooms</option>
                          <option value="4">4+ Bedrooms</option>
                          <option value="5">5+ Bedrooms</option>
                       </select>
                    </div>
                 </div>

                 {/* Price Slider */}
                 <div className="lg:col-span-2">
                    <label className={labelClass}>Price Range</label>
                    <div className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-3xl border border-white/80">
                       <PriceSlider 
                          min={0} 
                          max={5000000} 
                          initialMin={priceRange.min}
                          initialMax={priceRange.max}
                          onChange={(min, max) => setPriceRange({ min, max })} 
                       />
                    </div>
                 </div>

                 {/* Ref ID & Reset */}
                 <div className="lg:col-span-2 flex items-end gap-3">
                    <div className="flex-1 w-full">
                        <label className={labelClass}>Ref ID</label>
                        <div className={`${inputWrapperClass} !py-[13px]`}>
                           <Search size={16} className={iconClass} />
                           <input 
                              type="text" 
                              className={selectClass} 
                              placeholder="Reference ID" 
                              value={refId} 
                              onChange={(e) => setRefId(e.target.value)} 
                              onKeyDown={handleKeyDown}
                           />
                        </div>
                    </div>
                    <button onClick={reset} className="h-[52px] px-8 flex items-center justify-center gap-2 rounded-full border border-[#0A2342]/20 text-[#0A2342]/60 hover:text-[#0A2342] hover:bg-white/80 transition-all bg-white/50 backdrop-blur-md font-bold uppercase text-xs tracking-widest shrink-0" title="Reset Filters">
                        <RotateCcw size={16} /> Reset
                    </button>
                 </div>

              </div>
          </div>
       </div>
    </div>
  );
}
