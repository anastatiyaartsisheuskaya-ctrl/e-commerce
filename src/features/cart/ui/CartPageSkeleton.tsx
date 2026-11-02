import { Skeleton } from "@/shared/components/ui/skeleton";

export function CartPageSkeleton() {
  return (
    <main
      aria-label="Loading shopping cart"
      aria-busy="true"
      className="mx-auto w-full max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-[2rem] bg-card shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-6 sm:px-8 sm:py-7">
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>

          <Skeleton className="h-5 w-36" />
        </div>

        <div className="border-t border-border/70" />

        <div className="grid gap-x-10 gap-y-8 p-5 sm:p-8 lg:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:gap-6"
            >
              <Skeleton className="h-48 w-full shrink-0 rounded-2xl sm:w-40" />

              <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">
                <div className="space-y-4">
                  <Skeleton className="h-5 w-4/5" />

                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-28 rounded-lg" />
                    <Skeleton className="size-9 rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="ml-auto h-3 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border/70 bg-muted/30 px-5 py-6 sm:px-8 sm:py-7">
          <div className="ml-auto max-w-md space-y-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-10" />
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-28" />
            </div>

            <Skeleton className="h-12 w-full rounded-md" />

            <Skeleton className="mx-auto h-3 w-4/5" />
          </div>
        </div>
      </div>
    </main>
  );
}
