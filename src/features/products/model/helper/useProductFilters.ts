import { useCallback, useState } from "react";

import { createInitialProductFilters } from "../product-filters";
import type { ProductFiltersState } from "../types";

export function useProductFilters() {
  const [filters, setFilters] = useState<ProductFiltersState>(
    createInitialProductFilters,
  );

  const updateFilters = useCallback((patch: Partial<ProductFiltersState>) => {
    setFilters((current) => ({
      ...current,
      ...patch,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(createInitialProductFilters());
  }, []);

  return {
    filters,
    updateFilters,
    clearFilters,
  };
}
