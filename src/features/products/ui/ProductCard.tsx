import { useState, type MouseEvent } from "react";
import { Shirt } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

import type { Product } from "../model/types";
import type { AddCartItemInput } from "@/features/cart";

import { AddToCartDialog } from "./modal/AddToCartDialog";

import { ShoppingBagIcon } from "@/shared/images";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: AddCartItemInput) => void;
  cartQuantity?: number;
}

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function ProductCard({
  product,
  onAddToCart,
  cartQuantity = 0,
}: ProductCardProps) {
  const navigate = useNavigate({ from: "/products" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const discountPercent = Math.min(100, Math.max(0, product.salePercent));

  const hasDiscount = discountPercent > 0;

  const currentPrice = hasDiscount
    ? product.price * (1 - discountPercent / 100)
    : product.price;

  const handleCardClick = () =>
    navigate({
      to: "/products/$productId",
      params: { productId: product.id },
      search: (previous) => ({ ...previous }),
    });

  const handleOpenCartDialog = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  return (
    <>
      <article
        className="group cursor-pointer overflow-hidden rounded-2xl bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md"
        onClick={handleCardClick}
      >
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

          <div className="absolute inset-x-2 bottom-3 flex flex-wrap justify-center gap-1.5">
            {product.featured && <Badge>Featured</Badge>}

            {hasDiscount && (
              <Badge variant="accent">Sale -{discountPercent}%</Badge>
            )}

            {product.stock === 0 && (
              <Badge variant="secondary">Out of stock</Badge>
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

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={
                cartQuantity > 0
                  ? `Add ${product.name} to cart. ${cartQuantity} already in cart`
                  : `Add ${product.name} to cart`
              }
              disabled={product.stock <= 0}
              onClick={handleOpenCartDialog}
              className="relative size-9 shrink-0 text-muted-foreground hover:text-primary"
            >
              <ShoppingBagIcon className="size-5 text-cart" />

              {cartQuantity > 0 && (
                <Badge
                  variant="accent"
                  className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 py-0 text-[10px]"
                >
                  {cartQuantity}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </article>

      <AddToCartDialog
        product={product}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAdd={onAddToCart}
      />
    </>
  );
}
