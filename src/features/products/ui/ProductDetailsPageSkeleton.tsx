import { Skeleton } from "@/shared/components/ui/skeleton";

export function ProductDetailsPageSkeleton() {
  return (
    <main
      aria-label="Loading product details"
      aria-busy="true"
      className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8"
    >
      <Skeleton className="mb-6 h-5 w-32" />

      <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-14">
        <section className="space-y-3">
          <Skeleton className="aspect-4/5 w-full rounded-2xl" />

          <div className="flex gap-3">
            <Skeleton className="size-16 rounded-lg" />
            <Skeleton className="size-16 rounded-lg" />
            <Skeleton className="size-16 rounded-lg" />
          </div>
        </section>

        <section className="space-y-7 py-2">
          <div className="space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-4/5" />
            <Skeleton className="h-8 w-32" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="flex items-center justify-between border-y py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="size-2.5 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-16" />

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} className="h-10 w-11 rounded-md" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>

          <Skeleton className="h-12 w-full rounded-md" />
        </section>
      </div>
    </main>
  );
}
