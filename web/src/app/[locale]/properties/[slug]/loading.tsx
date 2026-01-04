import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <Skeleton className="h-10 w-96" />
      <Skeleton className="h-5 w-64 mt-3" />
      <Skeleton className="h-8 w-48 mt-4" />
      <div className="grid gap-4 sm:grid-cols-2 mt-8">
        <Skeleton className="aspect-[4/3] rounded-xl" />
        <Skeleton className="aspect-[4/3] rounded-xl" />
      </div>
      <Skeleton className="h-4 w-3/4 mt-8" />
      <Skeleton className="h-4 w-2/3 mt-2" />
    </article>
  );
}
