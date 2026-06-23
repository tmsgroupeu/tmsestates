import Image from "next/image";
import { ArrowUpRight, Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Property } from "@/lib/cms";

const API =
  process.env.CMS_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tmsestates.onrender.com";

function asUrl(url?: string) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API}${url}`;
}

function mediaUrl(media: any) {
  if (!media) return "/assets/hero-poster.jpg";
  const item = media.attributes || media;
  const url =
    item.formats?.large?.url ||
    item.formats?.medium?.url ||
    item.formats?.small?.url ||
    item.url;

  return asUrl(url) || "/assets/hero-poster.jpg";
}

function formatPrice(price?: number, currency = "EUR") {
  if (!price) return "Price Upon Request";

  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

function readable(value?: string | null) {
  if (!value) return "";
  return value.replace(/[-_]/g, " ");
}

export default function PropertyCard({ p }: { p: Property }) {
  const imageData = (p as any).images?.data?.[0] || (p as any).images?.[0];
  const tag =
    (p as any).vip
      ? "VIP"
      : (p as any).marketing_label ||
        p.marketing_tags ||
        p.propertyType ||
        p.prop_status ||
        "Property";

  return (
    <Link
      href={`/properties/${p.slug}`}
      className="group relative min-h-[430px] overflow-hidden border border-[#242124]/10 bg-[#242124] shadow-[0_24px_80px_rgba(36,33,36,0.2)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C2A139]/60 hover:shadow-[0_34px_110px_rgba(36,33,36,0.28)] xl:min-h-[455px]"
    >
      <Image
        src={mediaUrl(imageData)}
        alt={p.title || "TMS Estates property"}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-[#05070B]/24 transition duration-500 group-hover:bg-[#05070B]/16" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05070B]/84 via-[#05070B]/42 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[82%] bg-gradient-to-t from-[#05070B]/100 via-[#05070B]/88 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[82%] bg-gradient-to-r from-[#05070B]/74 via-[#05070B]/42 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <span className="max-w-[72%] truncate border border-[#C2A139]/56 bg-[#05070B]/78 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#C2A139] shadow-[0_10px_35px_rgba(0,0,0,0.36)] backdrop-blur-md">
          {readable(tag)}
        </span>

        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/22 bg-[#05070B]/62 text-[#F5F0E8] shadow-[0_10px_32px_rgba(0,0,0,0.32)] backdrop-blur-md transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[#C2A139] group-hover:bg-[#C2A139] group-hover:text-[#242124]">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/22 bg-[#05070B]/78 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/92 shadow-[0_10px_28px_rgba(0,0,0,0.3)] backdrop-blur-md">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C2A139]" />
          <span className="truncate">{p.city || "Cyprus"}</span>
        </div>

        <h3 className="line-clamp-2 font-montserrat text-[1.38rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[#F5F0E8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.86)] md:text-[1.5rem] xl:text-[1.62rem]">
          {p.title}
        </h3>

        <p className="mt-3 text-sm font-semibold text-[#F5F0E8]/92 drop-shadow-[0_8px_22px_rgba(0,0,0,0.64)]">
          {formatPrice(p.price, p.currency)}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/16 pt-4 text-xs text-[#F5F0E8]/88">
          {p.bedrooms && (
            <span className="inline-flex items-center gap-2 bg-[#242124]/68 px-3 py-1.5 backdrop-blur-sm">
              <BedDouble className="h-4 w-4 text-[#C2A139]" />
              {p.bedrooms} Beds
            </span>
          )}

          {(p as any).bathrooms && (
            <span className="inline-flex items-center gap-2 bg-[#242124]/68 px-3 py-1.5 backdrop-blur-sm">
              <Bath className="h-4 w-4 text-[#C2A139]" />
              {(p as any).bathrooms} Baths
            </span>
          )}

          {p.area && (
            <span className="inline-flex items-center gap-2 bg-[#242124]/68 px-3 py-1.5 backdrop-blur-sm">
              <Ruler className="h-4 w-4 text-[#C2A139]" />
              {p.area} m²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
