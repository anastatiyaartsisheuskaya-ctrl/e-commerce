import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface PriceFilterProps {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  onApply: (minPrice: number | undefined, maxPrice: number | undefined) => void;
}

export function PriceFilter({ minPrice, maxPrice, onApply }: PriceFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftMin, setDraftMin] = useState(minPrice?.toString() ?? "");
  const [draftMax, setDraftMax] = useState(maxPrice?.toString() ?? "");

  const parsedMin = draftMin.trim() === "" ? undefined : Number(draftMin);

  const parsedMax = draftMax.trim() === "" ? undefined : Number(draftMax);

  const hasInvalidNumber =
    (parsedMin !== undefined &&
      (!Number.isFinite(parsedMin) || parsedMin < 0)) ||
    (parsedMax !== undefined && (!Number.isFinite(parsedMax) || parsedMax < 0));

  const hasInvalidRange =
    parsedMin !== undefined && parsedMax !== undefined && parsedMin > parsedMax;

  const hasPriceFilter = minPrice !== undefined || maxPrice !== undefined;

  function applyPriceFilter() {
    if (hasInvalidNumber || hasInvalidRange) return;

    onApply(parsedMin, parsedMax);
    setIsOpen(false);
  }

  function clearPriceFilter() {
    setDraftMin("");
    setDraftMax("");
    onApply(undefined, undefined);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="h-10 min-w-36 justify-between rounded-full bg-card px-4 font-normal"
      >
        Price
        <ChevronDown className="ml-3 size-4" />
      </Button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="minPrice">Minimum price (€)</Label>
              <Input
                id="minPrice"
                type="number"
                min={0}
                step="0.01"
                value={draftMin}
                onChange={(event) => setDraftMin(event.target.value)}
                placeholder="No minimum"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPrice">Maximum price (€)</Label>
              <Input
                id="maxPrice"
                type="number"
                min={0}
                step="0.01"
                value={draftMax}
                onChange={(event) => setDraftMax(event.target.value)}
                placeholder="No maximum"
              />
            </div>

            {(hasInvalidNumber || hasInvalidRange) && (
              <p role="alert" className="text-sm text-destructive">
                {hasInvalidRange
                  ? "Minimum price cannot exceed maximum price."
                  : "Prices must be valid non-negative numbers."}
              </p>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={applyPriceFilter}
                disabled={hasInvalidNumber || hasInvalidRange}
                className="flex-1"
              >
                Apply
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={clearPriceFilter}
                disabled={!hasPriceFilter && !draftMin && !draftMax}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
