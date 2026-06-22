"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, MapPin, Ruler } from "lucide-react";

interface MiniPropertyProps {
  data: {
    title: string;
    city: string;
    slug: string;
    imageUrl: string;
    bedrooms?: number;
    area?: number;
  };
}

export default function MiniPropertyCard({ data }: MiniPropertyProps) {
  const safeTitle =
    typeof data.title === "string" ? data.title : "Exclusive Property";
  const safeCity = typeof data.city === "string" ? data.city : "Cyprus";
  const safeSlug = typeof data.slug === "string" ? data.slug : "#";
  const safeImage =
    typeof data.imageUrl === "string" ? data.imageUrl : "/placeholder.jpg";
  const safeBeds =
    typeof data.bedrooms === "number" || typeof data.bedrooms === "string"
      ? data.bedrooms
      : null;
  const safeArea =
    typeof data.area === "number" || typeof data.area === "string"
      ? data.area
      : null;

  if (safeSlug === "#") return null;

  return (
    <Link
      href={`/properties/${safeSlug}`}
      className="group my-3 block w-full max-w-[290px] overflow-hidden border border-[#F5F0E8]/12 bg-[#242124] shadow-[0_18px_55px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#C2A139]/55"
    >
      <div className="relative h-34 w-full bg-[#05070B]">
        <Image
          src={safeImage}
          alt={safeTitle}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="290px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/88 via-[#05070B]/22 to-transparent" />

        <div className="absolute right-3 top-3 border border-[#C2A139]/45 bg-[#242124]/76 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#C2A139] backdrop-blur-md">
          View
        </div>
      </div>

      <div className="p-4">
        <h4 className="line-clamp-2 font-montserrat text-sm font-semibold leading-tight tracking-[-0.035em] text-[#F5F0E8]">
          {safeTitle}
        </h4>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#F5F0E8]/58">
          <MapPin className="h-3 w-3 text-[#C2A139]" />
          <span>{safeCity}</span>
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-[#F5F0E8]/10 pt-3">
          {safeBeds ? (
            <div className="flex items-center gap-1.5 text-[10px] text-[#F5F0E8]/76">
              <BedDouble className="h-3.5 w-3.5 text-[#C2A139]" />
              {safeBeds} Bed
            </div>
          ) : null}

          {safeArea ? (
            <div className="flex items-center gap-1.5 text-[10px] text-[#F5F0E8]/76">
              <Ruler className="h-3.5 w-3.5 text-[#C2A139]" />
              {safeArea} m²
            </div>
          ) : null}

          <ArrowRight className="ml-auto h-3.5 w-3.5 -rotate-45 text-[#C2A139] transition-transform group-hover:rotate-0" />
        </div>
      </div>
    </Link>
  );
}
