import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { CartItem } from "./CartItem";
import type { CartItem as CartItemType } from "../model/types";

import { useCartItemsQuery } from "../model/query";
import {
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from "../model/mutation";

import { CartPageSkeleton } from "./CartPageSkeleton";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

function getDiscountedPrice(price: number, salePercent: number) {
  const discount = Math.min(100, Math.max(0, salePercent || 0));

  return price * (1 - discount / 100);
}

export function CartPage() {
  const { data: cart, isPending, isError, error } = useCartItemsQuery();

  const updateMutation = useUpdateCartItemMutation();
  const removeMutation = useRemoveCartItemMutation();

  const items: CartItemType[] = cart?.items ?? [];

  const updatingItemId = updateMutation.isPending
    ? updateMutation.variables?.cartItemId
    : null;

  const removingItemId = removeMutation.isPending
    ? removeMutation.variables
    : null;

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) =>
      total +
      getDiscountedPrice(item.product.price, item.product.salePercent) *
        item.quantity,
    0,
  );

  const handleQuantityChange = (cartItemId: string, quantity: number) => {
    updateMutation.mutate({
      cartItemId,
      quantity,
    });
  };

  const handleRemove = (cartItemId: string) => {
    removeMutation.mutate(cartItemId);
  };

  if (isPending) {
    return <CartPageSkeleton />;
  }

  if (isError) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <ShoppingBag className="size-10 text-muted-foreground" />

        <h1 className="text-xl font-semibold">Unable to load your cart</h1>

        <p className="max-w-md text-sm text-muted-foreground">
          {error.message}
        </p>

        <Button variant="outline" render={<Link to="/products" search={{}} />}>
          <ArrowLeft className="mr-2 size-4" />
          Continue shopping
        </Button>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-5 px-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingBag className="size-9" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>

          <p className="text-sm text-muted-foreground">
            Looks like you haven't added anything to your cart yet.
          </p>
        </div>

        <Button render={<Link to="/products" search={{}} />}>
          Continue shopping
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-card shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-6 sm:px-8 sm:py-7">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Your cart
            </h1>

            <p className="text-sm text-muted-foreground">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Link
            to="/products"
            search={{}}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Continue shopping
          </Link>
        </div>

        <div className="border-t border-border/70" />

        <div className="grid gap-x-10 gap-y-8 p-5 sm:p-8 lg:grid-cols-2">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              isUpdating={updatingItemId === item.id}
              isRemoving={removingItemId === item.id}
            />
          ))}
        </div>

        <div className="border-t border-border/70 bg-muted/30 px-5 py-6 sm:px-8 sm:py-7">
          <div className="ml-auto max-w-md space-y-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total items</span>

              <span className="font-medium">{totalItems}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Total</span>

              <span className="text-2xl font-semibold tabular-nums">
                {priceFormatter.format(totalPrice)}
              </span>
            </div>

            <Button type="button" disabled className="h-12 w-full">
              Checkout coming soon
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Delivery costs and details will be calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
