import { useState } from "react";
import { Heart, ShoppingBag, Shirt } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import type { Product } from "../model/types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const discountPercent = Math.min(100, Math.max(0, product.salePercent));

  const hasDiscount = discountPercent > 0;

  const currentPrice = hasDiscount
    ? product.price * (1 - discountPercent / 100)
    : product.price;

  return (
    <article className="group overflow-hidden rounded-2xl bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-9/10 overflow-hidden bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            role="img"
            aria-label={`No image available for ${product.name}`}
            className="flex size-full items-center justify-center bg-primary/10 text-primary"
          >
            <Shirt className="size-full max-h-40" />
          </div>
        )}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={
            isFavorite
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((previous) => !previous)}
          className="absolute right-3 top-3 size-9 rounded-full bg-white/90 text-foreground shadow-sm hover:bg-white"
        >
          <Heart
            className={`size-5 ${
              isFavorite ? "fill-primary text-primary" : ""
            }`}
          />
        </Button>

        <div className="absolute inset-x-2 bottom-3 flex flex-wrap justify-center gap-1.5">
          {product.featured && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Featured
            </span>
          )}

          {hasDiscount && (
            <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
              Sale -{discountPercent}%
            </span>
          )}

          {product.stock === 0 && (
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Out of stock
            </span>
          )}
        </div>
      </div>

      <div className="flex min-h-28 flex-col justify-between gap-3 p-4">
        <h2
          className="line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground"
          title={product.name}
        >
          {product.name}
        </h2>

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold tabular-nums">
              {priceFormatter.format(currentPrice)}
            </span>

            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {priceFormatter.format(product.price)}
              </span>
            )}
          </div>

          {onAddToCart ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Add ${product.name} to cart`}
              disabled={product.stock <= 0}
              onClick={() => onAddToCart(product)}
              className="size-8 shrink-0 text-muted-foreground hover:text-foreground"
            >
              <ShoppingBag className="size-5" />
            </Button>
          ) : (
            <ShoppingBag
              aria-hidden="true"
              className="size-5 shrink-0 text-muted-foreground"
            />
          )}
        </div>
      </div>
    </article>
  );
}
