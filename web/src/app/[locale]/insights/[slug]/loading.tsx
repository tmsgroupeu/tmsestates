// NEW FILE: web/src/app/insights/[slug]/loading.tsx
import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main>
      <Skeleton className="h-[50vh] w-full" />
      <div className="section !py-16">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-6 w-1/4 mb-12" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-[90%]" />
            <Skeleton className="h-5 w-[95%]" />
          </div>
        </div>
      </div>
    </main>
  );
}
