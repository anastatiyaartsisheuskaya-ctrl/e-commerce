import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

interface PriceFilterProps {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  onApply: (minPrice: number | undefined, maxPrice: number | undefined) => void;
}

export function PriceFilter({ minPrice, maxPrice, onApply }: PriceFilterProps) {
  const [open, setOpen] = useState(false);
  const [draftMin, setDraftMin] = useState(minPrice?.toString() ?? "");
  const [draftMax, setDraftMax] = useState(maxPrice?.toString() ?? "");

  const parsedMin = draftMin.trim() === "" ? undefined : Number(draftMin);

  const parsedMax = draftMax.trim() === "" ? undefined : Number(draftMax);

  const invalidNumber =
    (parsedMin !== undefined &&
      (!Number.isFinite(parsedMin) || parsedMin < 0)) ||
    (parsedMax !== undefined && (!Number.isFinite(parsedMax) || parsedMax < 0));

  const invalidRange =
    parsedMin !== undefined && parsedMax !== undefined && parsedMin > parsedMax;

  const hasValue = minPrice !== undefined || maxPrice !== undefined;

  function handleApply() {
    if (invalidNumber || invalidRange) return;

    onApply(parsedMin, parsedMax);
    setOpen(false);
  }

  function handleClear() {
    setDraftMin("");
    setDraftMax("");
    onApply(undefined, undefined);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="h-10 min-w-32 justify-between rounded-full bg-card px-4 font-normal"
          />
        }
      >
        Price
        {hasValue && <span className="text-primary">•</span>}
        <ChevronDown className="ml-2 size-4" />
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="min-price">Minimum price</Label>
          <Input
            id="min-price"
            type="number"
            min={0}
            step="0.01"
            placeholder="No minimum"
            value={draftMin}
            onChange={(event) => setDraftMin(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-price">Maximum price</Label>
          <Input
            id="max-price"
            type="number"
            min={0}
            step="0.01"
            placeholder="No maximum"
            value={draftMax}
            onChange={(event) => setDraftMax(event.target.value)}
          />
        </div>

        {(invalidNumber || invalidRange) && (
          <p role="alert" className="text-sm text-destructive">
            {invalidRange
              ? "Minimum price cannot exceed maximum price."
              : "Enter valid non-negative prices."}
          </p>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={handleApply}
            disabled={invalidNumber || invalidRange}
            className="flex-1"
          >
            Apply
          </Button>

          <Button type="button" variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
