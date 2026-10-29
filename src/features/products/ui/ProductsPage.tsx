import { Button } from "@/shared/components/ui/button";
import { useProductsQuery } from "../model/query";
import { ProductCard } from "./ProductCard";

export function ProductsPage() {
  const {
    data: products,
    isPending,
    isError,
    error,
    refetch,
  } = useProductsQuery();

  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-card shadow-sm"
            >
              <div className="aspect-9/10 animate-pulse bg-muted" />

              <div className="space-y-3 p-4">
                <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                <div className="h-5 w-2/5 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-80 flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-xl font-semibold">Unable to load products</h1>

        <p className="max-w-md text-sm text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."}
        </p>

        <Button type="button" onClick={() => void refetch()}>
          Try again
        </Button>
      </main>
    );
  }

  if (!products?.length) {
    return (
      <main className="flex min-h-80 flex-col items-center justify-center gap-2 px-4 text-center">
        <h1 className="text-xl font-semibold">No products yet</h1>

        <p className="text-sm text-muted-foreground">
          Products will appear here when they become available.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
      <section
        aria-label="Products"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => {}}
          />
        ))}
      </section>
    </main>
  );
}
