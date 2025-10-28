// web/src/components/sections/PropertyMarquee.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";

type Item = {
  id: number;
  href: string;
  title: string;
  city?: string;
  price?: number | null;
  currency?: string | null;
  coverUrl?: string | null;
};

export default function PropertyMarquee({ items }: { items: Item[] }) {
  // Ensure we have enough items to loop smoothly
  const list = useMemo(() => {
    const src = items?.length ? items : [];
    if (src.length >= 8) return src;
    // tile to avoid gaps
    return Array.from({ length: Math.ceil(8 / Math.max(src.length, 1)) })
      .flatMap(() => src)
      .slice(0, 8);
  }, [items]);

  const row = [...list, ...list]; // duplicate for seamless loop

  return (
    <div className="relative">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />

      <div className="overflow-hidden">
        <div className="marquee group">
          {row.map((it, idx) => (
            <Link
              key={`${it.id}-${idx}`}
              href={it.href}
              className="marquee-card group/item"
              aria-label={it.title}
            >
              <div
                className="h-40 w-64 min-w-64 overflow-hidden rounded-xl border border-ink/10 bg-white/70 backdrop-blur shadow-sm transition hover:shadow-lg"
                style={{ backgroundImage: `url(${it.coverUrl ?? "/placeholders/property.jpg"})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div className="mt-3">
                <p className="line-clamp-1 text-sm font-semibold text-ink">{it.title}</p>
                <p className="line-clamp-1 text-xs text-ink/60">{it.city || "—"}</p>
                <p className="mt-1 text-xs font-semibold text-ink">{formatPrice(it.price, it.currency)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee {
          display: flex;
          gap: 16px;
          will-change: transform;
          animation: scroll 60s linear infinite; /* slow & elegant */
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        .marquee-card {
          display: flex;
          flex-direction: column;
          width: 16rem; /* 256px */
          text-decoration: none;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* because we duplicated the row */
        }
      `}</style>
    </div>
  );
}

function formatPrice(price?: number | null, currency?: string | null) {
  if (!price) return "Price on request";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency || "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `€${price.toLocaleString()}`;
  }
}
