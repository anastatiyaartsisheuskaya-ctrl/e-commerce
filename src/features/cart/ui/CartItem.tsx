import { useState } from "react";
import { Minus, Plus, Shirt, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

import type { CartItem as CartItemType } from "../model/types";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (cartItemId: string, quantity: number) => void;
  onRemove: (cartItemId: string) => void;
  isUpdating?: boolean;
  isRemoving?: boolean;
}

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function CartItem({
  item,
  onQuantityChange,
  onRemove,
  isUpdating = false,
  isRemoving = false,
}: CartItemProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const { product, quantity } = item;

  const discountPercent = Math.min(100, Math.max(0, product.salePercent));

  const hasDiscount = discountPercent > 0;

  const unitPrice = product.price * (1 - discountPercent / 100);
  const subtotal = unitPrice * quantity;

  const hasValidStock = Number.isFinite(product.stock);

  const isOutOfStock = hasValidStock && product.stock <= 0;
  const reachedStockLimit = hasValidStock && quantity >= product.stock;

  return (
    <article className="flex min-w-0 flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:gap-6">
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl bg-muted sm:h-48 sm:w-40">
        {product.imageUrl && !imageFailed ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="size-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`No image available for ${product.name}`}
            className="flex size-full items-center justify-center bg-primary/10 text-primary"
          >
            <Shirt className="size-2/3 max-h-40" />
          </div>
        )}

        {hasDiscount && (
          <div className="absolute left-2 top-2">
            <Badge variant="accent">Sale -{discountPercent}%</Badge>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">
        <div className="space-y-3">
          <h2 className="line-clamp-2 text-base font-medium leading-6">
            {product.name}
          </h2>

          <div className="flex flex-col gap-3.5 text-sm">
            <p>
              <span className="mr-2 font-semibold text-muted-foreground/50">
                Price:
              </span>
              <span className="font-medium tabular-nums">
                {priceFormatter.format(unitPrice)}
              </span>

              {hasDiscount && (
                <span className="ml-2 text-xs text-muted-foreground line-through">
                  {priceFormatter.format(product.price)}
                </span>
              )}
            </p>

            <div className="flex gap-3.5">
              <p>
                <span className="mr-2 font-semibold text-muted-foreground/50">
                  Color:
                </span>
                {item.selectedColor}
              </p>

              <p>
                <span className="mr-2 font-semibold text-muted-foreground/50">
                  Size:
                </span>
                {item.selectedSize}
              </p>
            </div>
          </div>

          {isOutOfStock && <Badge variant="secondary">Out of stock</Badge>}
        </div>

        {/* Quantity and subtotal */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 items-center rounded-lg border bg-background">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Decrease quantity"
                disabled={quantity <= 1 || isUpdating}
                onClick={() => onQuantityChange(item.id, quantity - 1)}
                className="size-8 rounded-r-none"
              >
                <Minus className="size-3.5" />
              </Button>

              <span
                aria-live="polite"
                className="min-w-8 text-center text-sm font-medium tabular-nums"
              >
                {quantity}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Increase quantity"
                disabled={isUpdating || isOutOfStock || reachedStockLimit}
                onClick={() => onQuantityChange(item.id, quantity + 1)}
                className="size-8 rounded-l-none"
              >
                <Plus className="size-3.5" />
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Remove ${product.name} from cart`}
              disabled={isRemoving}
              onClick={() => onRemove(item.id)}
              className="size-9 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground">Subtotal</p>
            <p className="font-semibold tabular-nums">
              {priceFormatter.format(subtotal)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
