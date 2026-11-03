import { Skeleton } from "@/shared/components/ui/skeleton";

export function ProductsPageSkeleton() {
  return (
    <main
      aria-label="Loading products"
      aria-busy="true"
      className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <aside className="w-full shrink-0 md:w-55">
          <Skeleton className="mb-5 h-3 w-20" />

          <div className="border-t border-border/60">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="border-b border-border/60">
                <div className="flex h-13 items-center justify-between">
                  <Skeleton
                    className={`h-4 ${index === 0 ? "w-28" : "w-20"}`}
                  />
                  <Skeleton className="size-3.5 rounded-sm" />
                </div>

                {index === 0 && (
                  <div className="pb-2 pl-2">
                    {Array.from({ length: 3 }, (_, childIndex) => (
                      <div
                        key={childIndex}
                        className="flex h-10 items-center border-b border-border/50 last:border-b-0"
                      >
                        <Skeleton
                          className={`h-3 ${
                            childIndex === 0
                              ? "w-12"
                              : childIndex === 1
                                ? "w-14"
                                : "w-20"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        <section className="min-w-0 flex-1 space-y-6">
          <Skeleton className="h-10 w-full rounded-full sm:max-w-80" />
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />

            <Skeleton className="ml-auto h-10 w-32 rounded-full" />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
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
                <div className="relative">
                  <Skeleton className="aspect-9/10 w-full rounded-none bg-primary/10" />
                  <Skeleton className="absolute right-3 top-3 size-9 rounded-full" />
                  <Skeleton className="absolute bottom-3 left-1/2 h-5 w-16 -translate-x-1/2 rounded-full" />
                </div>

                <div className="flex min-h-44 flex-col justify-between gap-3 p-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>

                    <Skeleton className="h-9 w-full rounded-md" />

                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-8 w-9 rounded-md" />
                      <Skeleton className="h-8 w-9 rounded-md" />
                      <Skeleton className="h-8 w-9 rounded-md" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="size-8 shrink-0 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
