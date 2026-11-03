import { Button } from "../button";
import { Minus, Plus } from "lucide-react";

interface StepperProps {
  quantity: number;
  stock: number;
  isPending?: boolean;
  isOutOfStock: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function Stepper({
  quantity,
  stock,
  isPending = false,
  isOutOfStock,
  onIncrease,
  onDecrease,
}: StepperProps) {
  return (
    <div
      className="inline-flex h-10 items-center rounded-lg border"
      onClick={(event) => event.stopPropagation()}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Decrease quantity"
        disabled={quantity <= 1 || isOutOfStock || isPending}
        onClick={onDecrease}
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
        disabled={isOutOfStock || quantity >= stock || isPending}
        onClick={onIncrease}
        className="size-9 rounded-l-none"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
