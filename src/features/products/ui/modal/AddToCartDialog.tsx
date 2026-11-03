import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import type { Product } from "../../model/types";
import type { AddCartItemInput } from "@/features/cart";

interface AddToCartDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: AddCartItemInput) => void;
}

export function AddToCartDialog({
  product,
  open,
  onOpenChange,
  onAdd,
}: AddToCartDialogProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  const hasOptions = product.colors.length > 0 && product.sizes.length > 0;

  const canAdd =
    Boolean(selectedColor) && Boolean(selectedSize) && product.stock > 0;

  function handleAdd() {
    if (!selectedColor || !selectedSize || !canAdd) return;

    onAdd({
      productId: product.id,
      selectedColor,
      selectedSize,
      quantity: 1,
    });

    onOpenChange(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setSelectedColor(undefined);
      setSelectedSize(undefined);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to cart</DialogTitle>
          <DialogDescription>
            Choose the color and size for {product.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="space-y-2">
            <Label htmlFor={`product-color-${product.id}`}>Color</Label>

            {product.colors.length > 0 ? (
              <Select
                value={selectedColor ?? ""}
                onValueChange={(value) => setSelectedColor(value ?? undefined)}
              >
                <SelectTrigger
                  id={`product-color-${product.id}`}
                  className="h-10 w-full"
                >
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>

                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-muted-foreground">
                No colors available.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Size</Label>

            {product.sizes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    aria-pressed={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-10"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No sizes available.
              </p>
            )}
          </div>

          {!hasOptions && (
            <p role="alert" className="text-sm text-destructive">
              Required product options are unavailable.
            </p>
          )}

          {product.stock <= 0 && (
            <p role="alert" className="text-sm text-destructive">
              This product is currently out of stock.
            </p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>

          <Button type="button" disabled={!canAdd} onClick={handleAdd}>
            Add to cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
