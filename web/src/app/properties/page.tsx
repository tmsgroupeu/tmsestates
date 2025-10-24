// src/app/properties/page.tsx
import Link from "next/link";
import Image from "next/image";
import { fetchProperties } from "@/lib/cms";
import PropertyCard from "@/components/PropertyCard";

/* -------------------- Utilities -------------------- */

function attrs<T = any>(p: any): T {
  return (p?.attributes ?? p ?? {}) as T;
}
function dedupe<T>(arr: T[]) {
  return Array.from(new Set(arr));
}
function qs(input: Record<string, string | number | undefined>) {
  const s = new URLSearchParams();
  for (const [k, v] of Object.entries(input)) if (v !== undefined && v !== "") s.set(k, String(v));
  return s.toString();
}

function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

function buildFilters(sp: Record<string, string | undefined>) {
  const f: Record<string, string> = {};
  if (sp.city)   f["filters[city][$eq]"] = sp.city;
  if (sp.status) f["filters[status][$eq]"] = sp.status;
  if (sp.min)    f["filters[price][$gte]"] = sp.min!;
  if (sp.max)    f["filters[price][$lte]"] = sp.max!;
  if (sp.search) {
    f["filters[$or][0][title][$containsi]"]       = sp.search!;
    f["filters[$or][1][city][$containsi]"]        = sp.search!;
    f["filters[$or][2][address][$containsi]"]     = sp.search!;
    f["filters[$or][3][description][$containsi]"] = sp.search!;
  }
  switch (sp.sort) {
    case "price-asc":  f["sort"] = "price:asc"; break;
    case "price-desc": f["sort"] = "price:desc"; break;
    case "area-asc":   f["sort"] = "area:asc"; break;
    case "area-desc":  f["sort"] = "area:desc"; break;
    case "newest":     f["sort"] = "publishedAt:desc"; break;
    default:           f["sort"] = "publishedAt:desc";
  }
  return f;
}

/* -------------------- Page -------------------- */

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;

  // View toggle
  const view = (sp.view === "list" ? "list" : "grid") as "grid" | "list";

  // Pagination
  const page = Math.max(1, Number(sp.page ?? 1));
  const pageSize = Math.min(24, Math.max(6, Number(sp.pageSize ?? 12)));

  // Build Strapi query
  const filters = buildFilters(sp);
  filters["pagination[page]"] = String(page);
  filters["pagination[pageSize]"] = String(pageSize);

  // Fetch data
  const resp = (await fetchProperties(filters)) as any;
  const data = (resp?.data ?? []) as any[];
  const meta = resp?.meta;
  const total = Number(meta?.pagination?.total ?? data.length);
  const pageCount: number =
    Number(meta?.pagination?.pageCount ?? (data.length < pageSize ? 1 : page + 1));

  // Cities for facet + Explore section
  let cities: string[] = [];
  try {
    const seed = (await fetchProperties({
  "pagination[pageSize]": "200",
  "fields[0]": "city",
  sort: "city:asc",
})) as any;

cities = dedupe<string>(
  (seed?.data ?? [])
    .map((p: any) => attrs(p).city)
    .filter(isNonEmptyString)
).slice(0, 12);
  } catch {
    cities = dedupe<string>(
  data
    .map((p: any) => attrs(p).city)
    .filter(isNonEmptyString)
).slice(0, 12);
  }

  // Active context
  const titleCity = sp.city ? ` in ${sp.city}` : "";
  const titleSearch = sp.search ? ` — “${sp.search}”` : "";
  const headerLine = `Properties${titleCity}${titleSearch}`;

  const activeSort = sp.sort ?? "newest";
  const baseParams = {
    search: sp.search,
    city: sp.city,
    status: sp.status,
    min: sp.min,
    max: sp.max,
    sort: activeSort,
    pageSize,
    view,
  };

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative h-[42vh] min-h-[360px] w-full overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/55" />
        <div className="relative z-10 h-full flex items-end">
          <div className="section pb-10 w-full">
            <div className="glass-dark rounded-2xl px-5 py-4 inline-flex items-center gap-3">
              <span className="text-white/80 text-sm">Explore</span>
              <span className="h-5 w-px bg-white/25" />
              <span className="text-white font-semibold">
                {total.toLocaleString()} properties{titleCity}
              </span>
            </div>
            <h1 className="mt-4 text-white text-3xl sm:text-4xl font-bold drop-shadow">
              Luxury Real Estate{titleCity}
            </h1>
            <p className="text-white/85 mt-2 max-w-2xl">
              Curated homes with expert guidance — filter, compare and book a private viewing.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* ---------- FILTER DOCK ---------- */}
        <div className="glass rounded-2xl p-4 sticky top-[84px] z-30">
          <form method="GET" className="grid gap-3 md:grid-cols-7 items-end">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Search</label>
              <input
                name="search"
                defaultValue={sp.search ?? ""}
                placeholder="City, address, keyword…"
                className="w-full glass rounded-lg px-3 py-2"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <select
                name="city"
                defaultValue={sp.city ?? ""}
                className="w-full glass rounded-lg px-3 py-2"
              >
                <option value="">All</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                defaultValue={sp.status ?? ""}
                className="w-full glass rounded-lg px-3 py-2"
              >
                <option value="">Any</option>
                <option value="for-sale">For Sale</option>
                <option value="to-rent">To Rent</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            {/* Price */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">Min €</label>
                <input
                  name="min"
                  inputMode="numeric"
                  defaultValue={sp.min ?? ""}
                  className="w-full glass rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max €</label>
                <input
                  name="max"
                  inputMode="numeric"
                  defaultValue={sp.max ?? ""}
                  className="w-full glass rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium mb-1">Sort</label>
              <select
                name="sort"
                defaultValue={activeSort}
                className="w-full glass rounded-lg px-3 py-2"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="area-asc">Area ↑</option>
                <option value="area-desc">Area ↓</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary w-full">
                Apply
              </button>
              <Link href="/properties" className="btn btn-outline" prefetch={false}>
                Clear
              </Link>
            </div>
          </form>

          {/* Active chips + view toggle */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2 text-sm">
              {sp.search && (
                <span className="glass rounded-full px-3 py-1">Search: {sp.search}</span>
              )}
              {sp.city && <span className="glass rounded-full px-3 py-1">City: {sp.city}</span>}
              {sp.status && (
                <span className="glass rounded-full px-3 py-1">Status: {sp.status}</span>
              )}
              {(sp.min || sp.max) && (
                <span className="glass rounded-full px-3 py-1">
                  Price: {sp.min ? `€${sp.min}` : "Any"} – {sp.max ? `€${sp.max}` : "Any"}
                </span>
              )}
              {sp.sort && <span className="glass rounded-full px-3 py-1">Sort: {sp.sort}</span>}
            </div>

            <div className="flex items-center gap-1 text-sm">
              <span className="hidden sm:inline text-neutral-600 mr-1">View:</span>
              <Link
                href={`/properties?${qs({ ...baseParams, view: "grid", page: 1 })}`}
                prefetch={false}
                className={`px-3 py-1 rounded-full ${
                  view === "grid" ? "glass" : "hover:underline"
                }`}
              >
                Grid
              </Link>
              <Link
                href={`/properties?${qs({ ...baseParams, view: "list", page: 1 })}`}
                prefetch={false}
                className={`px-3 py-1 rounded-full ${
                  view === "list" ? "glass" : "hover:underline"
                }`}
              >
                List
              </Link>
            </div>
          </div>
        </div>

        {/* ---------- HEADER LINE ---------- */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--navy)]">{headerLine}</h2>
            <p className="text-neutral-600">
              {total.toLocaleString()} result{total === 1 ? "" : "s"} · refined by your filters
            </p>
          </div>
          <div className="glass rounded-full px-4 py-2 text-sm">
            Showing page {page} of {pageCount}
          </div>
        </div>

        {/* ---------- RESULTS ---------- */}
        {data.length > 0 ? (
          <>
            {view === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((p: any) => (
                  <PropertyCard key={p.id} p={p} />
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {data.map((p: any) => {
                  const a = attrs(p);
                  const img =
                    a.images?.data?.[0]?.attributes?.url ||
                    "/placeholder.jpg";
                  const price =
                    typeof a.price === "number"
                      ? a.price.toLocaleString()
                      : a.price;
                  const currency = a.currency ?? "€";
                  return (
                    <Link
                      key={p.id}
                      href={`/properties/${a.slug ?? p.id}`}
                      prefetch={false}
                      className="glass rounded-2xl p-3 flex gap-4 items-center hover:bg-white/12 transition"
                    >
                      <div className="relative w-40 aspect-[4/3] rounded-xl overflow-hidden shrink-0">
                        <Image src={img} alt={a.title || "Property"} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-semibold truncate">{a.title ?? "Property"}</h3>
                          <div className="text-[var(--gold)] font-semibold">
                            {price ? `${currency}${price}` : "Price on request"}
                          </div>
                        </div>
                        <p className="text-sm text-neutral-600 truncate">
                          {[a.city, a.address].filter(Boolean).join(" • ")}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-neutral-700">
                          {a.bedrooms != null && <span className="glass rounded-full px-2 py-0.5">Beds {a.bedrooms}</span>}
                          {a.bathrooms != null && <span className="glass rounded-full px-2 py-0.5">Baths {a.bathrooms}</span>}
                          {a.area != null && <span className="glass rounded-full px-2 py-0.5">{a.area} m²</span>}
                          {a.status && <span className="glass rounded-full px-2 py-0.5">{String(a.status).replace("-", " ")}</span>}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* ---------- PAGINATION ---------- */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <Link
                className="btn btn-outline disabled:opacity-50"
                aria-disabled={page <= 1}
                href={`/properties?${qs({ ...baseParams, page: Math.max(1, page - 1) })}`}
                prefetch={false}
              >
                ← Prev
              </Link>
              <span className="px-3 py-1 rounded-full glass">
                Page {page} of {pageCount}
              </span>
              <Link
                className="btn btn-outline disabled:opacity-50"
                aria-disabled={page >= pageCount}
                href={`/properties?${qs({ ...baseParams, page: Math.min(pageCount, page + 1) })}`}
                prefetch={false}
              >
                Next →
              </Link>
            </div>
          </>
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <h3 className="text-xl font-semibold mb-2">No properties match your filters.</h3>
            <p className="text-neutral-600">
              Try adjusting your criteria or{" "}
              <Link href="/properties" className="underline">
                clear filters
              </Link>
              .
            </p>
          </div>
        )}

        {/* ---------- EXPLORE BY CITY ---------- */}
        {cities.length > 0 && (
          <section className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-[var(--navy)]">Explore by city</h3>
              {sp.city && (
                <Link href="/properties" prefetch={false} className="text-sm underline">
                  Reset city
                </Link>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {cities.map((c) => (
                <Link
                  key={c}
                  prefetch={false}
                  href={`/properties?${qs({ ...baseParams, city: c, page: 1 })}`}
                  className={`shrink-0 px-4 py-2 rounded-full ${
                    sp.city === c ? "glass" : "glass hover:bg-white/10"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
