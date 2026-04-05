/* FULL REPLACEMENT: src/components/Filters.tsx */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';
import { RotateCcw, MapPin, Target } from 'lucide-react';

export default function Filters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [city, setCity] = useState(sp.get("city") || "");
  const [status, setStatus] = useState(sp.get("status") || "");

  const updateSearch = (newCity: string, newStatus: string) => {
    const params = new URLSearchParams(sp.toString());
    
    // Clear old irrelevant params just in case
    params.delete("type");
    params.delete("beds");
    params.delete("min");
    params.delete("max");
    params.delete("ref");

    if (newCity) params.set("city", newCity); else params.delete("city");
    if (newStatus) params.set("status", newStatus); else params.delete("status");

    router.push(`/properties?${params.toString()}`);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCity(val);
    updateSearch(val, status);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setStatus(val);
    updateSearch(city, val);
  };

  const reset = () => {
    setCity("");
    setStatus("");
    router.push("/properties");
  };

  const inputWrapperClass = "relative flex items-center bg-white/60 backdrop-blur-md rounded-full border border-white/80 px-4 py-3 focus-within:ring-2 focus-within:ring-[#D4AF37]/50 focus-within:border-[#D4AF37] transition-all group shadow-sm flex-1";
  const selectClass = "w-full bg-transparent border-none outline-none text-sm font-bold text-[#0A2342] placeholder-gray-400 appearance-none ml-2 cursor-pointer";
  const labelClass = "text-[10px] uppercase tracking-widest text-[#0A2342]/70 font-bold mb-2 ml-4 block";
  const iconClass = "text-[#0A2342]/50 group-focus-within:text-[#D4AF37] transition-colors shrink-0";

  return (
    // MAIN BAR CONTAINER - Apple Glass Morphism
    <div className="w-full relative isolate z-30">
       <div className="absolute inset-0 bg-white/30 backdrop-blur-xl rounded-[3rem] border border-white/40 shadow-[0_8px_32px_rgba(10,35,66,0.1)] -z-10" />
       {/* Noise texture overlay */}
       <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay rounded-[3rem] pointer-events-none -z-10" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
       
       <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 lg:gap-6 items-end justify-between">
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
             
             {/* 1. Location */}
             <div className="w-full">
                <label className={labelClass}>Select Destination</label>
                <div className={inputWrapperClass}>
                   <MapPin size={18} className={iconClass} />
                   <select className={selectClass} value={city} onChange={handleCityChange}>
                      <option value="">All Cyprus Collections</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
             </div>

             {/* 2. Status */}
             <div className="w-full">
                <label className={labelClass}>Development Phase</label>
                <div className={inputWrapperClass}>
                   <Target size={18} className={iconClass} />
                   <select className={selectClass} value={status} onChange={handleStatusChange}>
                      <option value="">All Phases</option>
                      <option value="Planned">Planned</option>
                      <option value="Under Construction">Under Construction</option>
                      <option value="Completed">Completed Residences</option>
                   </select>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <button onClick={reset} className="h-[52px] px-8 flex items-center justify-center gap-2 rounded-full border border-gray-200/50 text-[#0A2342]/60 hover:text-[#0A2342] hover:border-[#0A2342]/30 hover:bg-white/80 transition-all bg-white/50 backdrop-blur-md shadow-sm font-bold uppercase text-xs tracking-widest leading-none mt-4 md:mt-0" title="Reset Filters">
                <RotateCcw size={16} /> Reset
             </button>
          </div>
       </div>
    </div>
  );
}
