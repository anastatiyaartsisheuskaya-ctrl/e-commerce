import { useMemo } from "react";

import { Button } from "@/shared/components/ui/button";

import { useProductFilters } from "../model/hook/useProductFilters";

import { useDebouncedValue } from "@/shared/helpers";
import { useProductsQuery } from "../model/query";

import { toProductSearchRequest } from "../model/helper/product-filters";

import { ProductsFilters } from "./filters/ProductsFilters";
import { ProductCard } from "./ProductCard";

import { CategoriesSidebar } from "./CategoriesSidebar";

export function ProductsPage() {
  const { filters, updateFilters, clearFilters } = useProductFilters();

  const debouncedName = useDebouncedValue(filters.name, 300);

  const request = useMemo(
    () =>
      toProductSearchRequest({
        ...filters,
        name: debouncedName,
      }),
    [filters, debouncedName],
  );

  const {
    data: products,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  } = useProductsQuery(request);

  const visibleProducts = useMemo(() => {
    const result = [...(products ?? [])];

    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters.sortBy]);

  if (isPending && !products) {
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

  if (isError && !products) {
    return (
      <main className="flex min-h-80 flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-xl font-semibold">Unable to load products</h1>

        <p className="text-sm text-muted-foreground">
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

  return (
    <main className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <CategoriesSidebar
          selectedCategories={filters.categories}
          onChange={(categories) => updateFilters({ categories })}
        />
        <div className="min-w-0 flex-1 space-y-6">
          <ProductsFilters
            filters={filters}
            onChange={updateFilters}
            onClear={clearFilters}
          />

          {isFetching && (
            <p role="status" className="text-xs text-muted-foreground">
              Updating products...
            </p>
          )}

          {isError && products && (
            <p role="alert" className="text-sm text-destructive">
              Couldn't refresh products. Showing the previous results.
            </p>
          )}

          {!visibleProducts.length && !isFetching ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-2 text-center">
              <h2 className="text-xl font-semibold">No products found</h2>

              <p className="text-sm text-muted-foreground">
                Try changing your filters or clearing them.
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="mt-2"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <section
              aria-label="Products"
              aria-busy={isFetching}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
