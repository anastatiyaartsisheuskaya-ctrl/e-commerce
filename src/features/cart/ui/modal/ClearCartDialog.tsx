import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useClearCartMutation } from "../../model/mutation";
import { Trash2 } from "lucide-react";

interface ClearCartDialogProps {
  disabled: boolean;
}

export function ClearCartDialog({ disabled }: ClearCartDialogProps) {
  const [open, setOpen] = useState(false);
  const clearCartMutation = useClearCartMutation();

  const handleClearCart = () => {
    clearCartMutation.mutate(undefined, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            disabled={disabled || clearCartMutation.isPending}
          />
        }
      >
        <Trash2 />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clear your cart?</DialogTitle>

          <DialogDescription>
            Are you sure you want to remove all products from your cart? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={clearCartMutation.isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={clearCartMutation.isPending}
            onClick={handleClearCart}
          >
            {clearCartMutation.isPending ? "Clearing..." : "Clear cart"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
