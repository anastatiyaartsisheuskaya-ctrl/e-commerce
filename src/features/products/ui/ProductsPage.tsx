import { useMemo } from "react";

import { Button } from "@/shared/components/ui/button";

import { useProductFilters } from "../model/hook/useProductFilters";
import { useAddCartMutation } from "@/features/cart";

import { useDebouncedValue } from "@/shared/helpers";
import { useProductsQuery } from "../model/query";
import { useCartItemsQuery } from "@/features/cart";

import { toProductSearchRequest } from "../model/helper/product-filters";

import { ProductsFilters } from "./filters/ProductsFilters";
import { ProductCard } from "./ProductCard";

import { CategoriesSidebar } from "./CategoriesSidebar";

import type { AddCartItemInput } from "@/features/cart";

import { ProductsPageSkeleton } from "./ProductsPageSkeleton";

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
  const { data: cart } = useCartItemsQuery();

  const cartQuantities = useMemo(() => {
    const quantities = new Map<string, number>();

    for (const item of cart?.items ?? []) {
      const currentQuantity = quantities.get(item.productId) ?? 0;

      quantities.set(item.productId, currentQuantity + item.quantity);
    }

    return quantities;
  }, [cart?.items]);
  const { mutate } = useAddCartMutation();

  const visibleProducts = useMemo(() => {
    const result = [...(products ?? [])];

    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters.sortBy]);

  const handleAddToCart = (product: AddCartItemInput) => {
    mutate(product);
  };

  if (isPending && !products) {
    return <ProductsPageSkeleton />;
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
      <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
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
                <ProductCard
                  key={product.id}
                  product={product}
                  cartQuantity={cartQuantities.get(product.id) ?? 0}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
