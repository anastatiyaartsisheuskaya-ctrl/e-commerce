import { PRODUCT_SORT_OPTIONS, type ProductSort } from "../../model/types";

interface ProductSortControlProps {
  value: ProductSort;
  onChange: (value: ProductSort) => void;
}

export function ProductSortControl({
  value,
  onChange,
}: ProductSortControlProps) {
  return (
    <div
      aria-label="Sort products by price"
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm"
    >
      <span className="text-muted-foreground">Sort by:</span>

      {PRODUCT_SORT_OPTIONS.map((option, index) => (
        <span key={option.value} className="inline-flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className="text-muted-foreground">
              |
            </span>
          )}

          <button
            type="button"
            aria-pressed={value === option.value}
            onClick={() =>
              onChange(value === option.value ? null : option.value)
            }
            className={
              value === option.value
                ? "font-medium text-primary underline underline-offset-4"
                : "text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
