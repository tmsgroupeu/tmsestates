/* NEW FILE: src/components/ui/PriceSlider.tsx */
"use client";

import { useState, useEffect, useRef } from "react";

interface PriceSliderProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
  initialMin?: number;
  initialMax?: number;
}

export default function PriceSlider({ min, max, onChange, initialMin, initialMax }: PriceSliderProps) {
  const [minVal, setMinVal] = useState(initialMin || min);
  const [maxVal, setMaxVal] = useState(initialMax || max);
  const minValRef = useRef(minVal);
  const maxValRef = useRef(maxVal);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

  // Update visual range width
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="relative w-full h-12 flex items-center justify-center pt-4">
      {/* Hidden Sliders for Interaction */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 50000);
          setMinVal(value);
          minValRef.current = value;
          onChange(value, maxVal);
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 50000);
          setMaxVal(value);
          maxValRef.current = value;
          onChange(minVal, value);
        }}
        className="thumb thumb--right"
        style={{ zIndex: 4 }}
      />

      {/* Visual Track */}
      <div className="relative w-full">
        <div className="absolute top-0 left-0 w-full h-1.5 rounded bg-gray-200" />
        <div ref={range} className="absolute top-0 h-1.5 rounded bg-[#D4AF37]" />
        
        {/* Value Labels */}
        <div className="absolute top-5 left-0 text-[10px] text-gray-400 font-bold uppercase">
           €{new Intl.NumberFormat('en', { notation: "compact" }).format(minVal)}
        </div>
        <div className="absolute top-5 right-0 text-[10px] text-gray-400 font-bold uppercase">
           €{new Intl.NumberFormat('en', { notation: "compact" }).format(maxVal)}
        </div>
      </div>

      <style jsx>{`
        input[type="range"] {
          pointer-events: none;
          position: absolute;
          height: 0;
          width: 100%;
          outline: none;
        }
        /* Custom Thumb Styles */
        .thumb {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
        }
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: all;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          background-color: #0A2342;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          margin-top: 1px; 
        }
      `}</style>
    </div>
  );
}
