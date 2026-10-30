import { useState } from "react";
import { isAxiosError } from "axios";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Shirt,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { useProductQuery } from "../model/query";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function ProductDetailsPage() {
  const { productId } = useParams({
    from: "/_authenticated/products/$productId",
  });

  const {
    data: product,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useProductQuery(productId);

  const [imageFailed, setImageFailed] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (isPending) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-14">
          <div className="aspect-4/5 animate-pulse rounded-2xl bg-muted" />

          <div className="space-y-5 py-4">
            <div className="h-5 w-1/4 animate-pulse rounded bg-muted" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-24 animate-pulse rounded bg-muted" />
            <div className="h-12 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  const isNotFound =
    isError && isAxiosError(error) && error.response?.status === 404;

  if (isError || !product) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="rounded-full bg-muted p-4">
          <ShoppingBag className="size-8 text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-semibold">
          {isNotFound || !isError
            ? "Product not found"
            : "Unable to load product"}
        </h1>

        <p className="max-w-md text-sm text-muted-foreground">
          {isNotFound || !isError
            ? "This product may have been removed or is no longer available."
            : "Something went wrong while loading the product. Please try again."}
        </p>

        {isError && !isNotFound && (
          <Button
            type="button"
            variant="outline"
            disabled={isFetching}
            onClick={() => void refetch()}
          >
            Try again
          </Button>
        )}

        <Button variant="default">
          <Link to="/products" search={(prev) => ({ ...prev })}>
            <ArrowLeft className="mr-2 size-4" />
            Back to products
          </Link>
        </Button>
      </main>
    );
  }

  const discountPercent = Math.min(100, Math.max(0, product.salePercent));

  const hasDiscount = discountPercent > 0;

  const currentPrice = hasDiscount
    ? product.price * (1 - discountPercent / 100)
    : product.price;

  const activeSize =
    selectedSize && product.sizes.some((size) => size === selectedSize)
      ? selectedSize
      : (product.sizes[0] ?? null);

  const activeColor =
    selectedColor && product.colors.includes(selectedColor)
      ? selectedColor
      : (product.colors[0] ?? null);

  const isOutOfStock = product.stock <= 0;

  const stockLabel = isOutOfStock
    ? "Out of stock"
    : product.stock <= 5
      ? `Only ${product.stock} left`
      : "In stock";

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      productId: product.id,
      size: activeSize,
      color: activeColor,
      quantity,
    });
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-14">
        <section className="min-w-0">
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
            {product.imageUrl && !imageFailed ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={() => setImageFailed(true)}
                className="size-full object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label="Product image unavailable"
                className="flex size-full items-center justify-center bg-primary/10 text-primary"
              >
                <Shirt className="size-full max-h-48" />
              </div>
            )}

            {product.featured && (
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                Featured
              </span>
            )}

            {hasDiscount && (
              <span className="absolute bottom-4 left-4 rounded-full bg-background px-3 py-1.5 text-sm font-semibold text-foreground">
                -{discountPercent}%
              </span>
            )}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              aria-pressed={isFavorite}
              onClick={() => setIsFavorite((previous) => !previous)}
              className="absolute right-4 top-4 size-10 rounded-full bg-background/90 hover:bg-background"
            >
              <Heart
                className={`size-5 ${
                  isFavorite ? "fill-primary text-primary" : ""
                }`}
              />
            </Button>
          </div>
        </section>

        <section className="min-w-0 space-y-7 py-2">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              {product.categoryAncestors.length > 0
                ? product.categoryAncestors.join(" / ") +
                  " / " +
                  product.category
                : product.category}
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl font-semibold tabular-nums">
                {priceFormatter.format(currentPrice)}
              </span>

              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through">
                  {priceFormatter.format(product.price)}
                </span>
              )}
            </div>
          </div>

          <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
            {product.description}
          </p>

          <div className="flex items-center gap-2 border-y py-4">
            <span
              aria-hidden="true"
              className={`size-2.5 rounded-full ${
                isOutOfStock
                  ? "bg-muted-foreground"
                  : product.stock <= 5
                    ? "bg-primary"
                    : "bg-primary"
              }`}
            />

            <span className="text-sm font-medium">{stockLabel}</span>

            {!isOutOfStock && (
              <span className="ml-auto text-sm text-muted-foreground">
                {product.stock} available
              </span>
            )}
          </div>

          {product.sizes.length > 0 && (
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">
                Size
                {activeSize && (
                  <span className="ml-2 text-muted-foreground">
                    — {activeSize}
                  </span>
                )}
              </legend>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant="outline"
                    aria-pressed={activeSize === size}
                    onClick={() => setSelectedSize(size)}
                    className={
                      activeSize === size
                        ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                        : ""
                    }
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </fieldset>
          )}

          {product.colors.length > 0 && (
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">
                Color
                {activeColor && (
                  <span className="ml-2 text-muted-foreground">
                    — {activeColor}
                  </span>
                )}
              </legend>

              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    type="button"
                    variant="outline"
                    aria-pressed={activeColor === color}
                    onClick={() => setSelectedColor(color)}
                    className={
                      activeColor === color
                        ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                        : ""
                    }
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="space-y-3">
            <p className="text-sm font-medium">Quantity</p>

            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 items-center rounded-lg border">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1 || isOutOfStock}
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="size-9 rounded-r-none"
                >
                  <Minus className="size-4" />
                </Button>

                <span
                  aria-live="polite"
                  className="min-w-10 text-center text-sm font-medium tabular-nums"
                >
                  {quantity}
                </span>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Increase quantity"
                  disabled={isOutOfStock || quantity >= product.stock}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(product.stock, current + 1),
                    )
                  }
                  className="size-9 rounded-l-none"
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              <span className="text-xs text-muted-foreground">
                Max. {product.stock} per order
              </span>
            </div>
          </div>

          <Button
            type="button"
            size="lg"
            className="h-12 w-full"
            disabled={
              isOutOfStock ||
              (product.sizes.length > 0 && !activeSize) ||
              (product.colors.length > 0 && !activeColor)
            }
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 size-5" />
            {isOutOfStock ? "Out of stock" : "Add to cart"}
          </Button>

          <p className="text-xs leading-5 text-muted-foreground">
            Availability is based on the current product stock. Final stock
            validation should also be performed by the backend when adding items
            to the cart.
          </p>
        </section>
      </div>
    </main>
  );
}
