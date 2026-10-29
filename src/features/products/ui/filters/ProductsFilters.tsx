import { X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import {
  CATEGORY_OPTIONS,
  COLOR_OPTIONS,
  SIZE_OPTIONS,
} from "../../model/product-filters";
import type { ProductFiltersState, ProductSort } from "../../model/types";

import { MultiSelectFilter } from "./MultiSelectFilter";
import { PriceFilter } from "./PriceFilter";
import { ProductSearchInput } from "./ProductSearchInput";
import { ProductSortControl } from "./ProductSortControl";
import { SaleFilter } from "./SaleFilter";

interface ProductsFiltersProps {
  filters: ProductFiltersState;
  onChange: (patch: Partial<ProductFiltersState>) => void;
  onClear: () => void;
}

interface ActiveChip {
  key: string;
  label: string;
  onRemove: () => void;
}

export function ProductsFilters({
  filters,
  onChange,
  onClear,
}: ProductsFiltersProps) {
  const chips: ActiveChip[] = [];

  if (filters.name.trim()) {
    chips.push({
      key: "name",
      label: `Name: ${filters.name.trim()}`,
      onRemove: () => onChange({ name: "" }),
    });
  }

  filters.colors.forEach((color) => {
    chips.push({
      key: `color-${color}`,
      label: color,
      onRemove: () =>
        onChange({
          colors: filters.colors.filter((item) => item !== color),
        }),
    });
  });

  filters.sizes.forEach((size) => {
    chips.push({
      key: `size-${size}`,
      label: size,
      onRemove: () =>
        onChange({
          sizes: filters.sizes.filter((item) => item !== size),
        }),
    });
  });

  filters.categories.forEach((category) => {
    chips.push({
      key: `category-${category}`,
      label: category,
      onRemove: () =>
        onChange({
          categories: filters.categories.filter((item) => item !== category),
        }),
    });
  });

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    chips.push({
      key: "price",
      label: `${filters.minPrice ?? "0"} € – ${filters.maxPrice ?? "∞"} €`,
      onRemove: () =>
        onChange({
          minPrice: undefined,
          maxPrice: undefined,
        }),
    });
  }

  if (filters.saleOnly) {
    chips.push({
      key: "sale",
      label: "Sale",
      onRemove: () => onChange({ saleOnly: false }),
    });
  }

  const hasActiveFilters = chips.length > 0 || filters.sortBy !== null;

  return (
    <section aria-label="Product filters" className="space-y-4">
      <ProductSearchInput
        value={filters.name}
        onChange={(name) => onChange({ name })}
      />

      <div className="flex flex-wrap items-center gap-2">
        <MultiSelectFilter
          label="Color"
          options={COLOR_OPTIONS}
          value={filters.colors}
          onChange={(colors) => onChange({ colors })}
        />

        <MultiSelectFilter
          label="Size"
          options={SIZE_OPTIONS}
          value={filters.sizes}
          onChange={(sizes) => onChange({ sizes })}
        />

        <MultiSelectFilter
          label="Category"
          options={CATEGORY_OPTIONS}
          value={filters.categories}
          onChange={(categories) => onChange({ categories })}
        />

        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onApply={(minPrice, maxPrice) => onChange({ minPrice, maxPrice })}
        />

        <div className="ml-auto">
          <SaleFilter
            value={filters.saleOnly}
            onChange={(saleOnly) => onChange({ saleOnly })}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground"
            >
              {chip.label}

              <button
                type="button"
                aria-label={`Remove filter ${chip.label}`}
                onClick={chip.onRemove}
                className="rounded-full transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </span>
          ))}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="border-t pt-3">
        <ProductSortControl
          value={filters.sortBy}
          onChange={(sortBy: ProductSort) => onChange({ sortBy })}
        />
      </div>
    </section>
  );
}
