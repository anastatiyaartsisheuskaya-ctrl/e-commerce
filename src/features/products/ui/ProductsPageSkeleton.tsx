import { Skeleton } from "@/shared/components/ui/skeleton";

export function ProductsPageSkeleton() {
  return (
    <main
      aria-label="Loading products"
      aria-busy="true"
      className="mx-auto w-full max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full shrink-0 md:w-55">
          <Skeleton className="mb-5 h-4 w-24" />

          <div className="space-y-5">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="size-4 rounded-sm" />
                </div>

                {index === 2 && (
                  <div className="space-y-3 pl-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          <Skeleton className="h-10 w-full rounded-full sm:max-w-xs" />

          <div className="flex flex-wrap items-center gap-2">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-10 w-28 rounded-full" />
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-16 rounded-full" />
          </div>

          <div className="flex items-center gap-3 border-t pt-3">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-card shadow-sm"
              >
                <Skeleton className="aspect-9/10 w-full rounded-none" />

                <div className="flex min-h-44 flex-col justify-between gap-3 p-4">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-2/3" />

                    <Skeleton className="h-9 w-full rounded-md" />

                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-9" />
                      <Skeleton className="h-8 w-9" />
                      <Skeleton className="h-8 w-9" />
                      <Skeleton className="h-8 w-9" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="size-8 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
