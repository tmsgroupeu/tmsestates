// NEW FILE: web/src/app/insights/loading.tsx
import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-paper">
      {/* --- 1. Skeleton Header --- */}
      <section className="bg-white border-b border-muted">
        <div className="section text-center !py-16 md:!py-20">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
        </div>
      </section>

      {/* --- 2. Skeleton Grid --- */}
      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-muted bg-white overflow-hidden">
              <Skeleton className="aspect-[16/9]" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                 <div className="pt-4 border-t border-muted/70">
                   <Skeleton className="h-5 w-1/3" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
