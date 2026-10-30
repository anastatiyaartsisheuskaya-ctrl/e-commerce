import { useCallback, useMemo } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import type { ProductFiltersState } from "../types";

import {
  DEFAULT_PRODUCT_FILTERS,
  normalizeProductFilters,
} from "../helper/product-filters";

interface UpdateFiltersOptions {
  replace?: boolean;
}

export function useProductFilters() {
  const search = useSearch({
    from: "/_authenticated/products/",
  });

  const navigate = useNavigate({
    from: "/products/",
  });

  const filters = useMemo(() => normalizeProductFilters(search), [search]);

  const updateFilters = useCallback(
    (
      patch: Partial<ProductFiltersState>,
      options: UpdateFiltersOptions = {},
    ) => {
      void navigate({
        search: (previous) => ({
          ...previous,
          ...patch,
        }),
        replace: options.replace ?? false,
      });
    },
    [navigate],
  );

  const clearFilters = useCallback(() => {
    void navigate({
      search: (previous) => ({
        ...previous,
        ...DEFAULT_PRODUCT_FILTERS,
      }),
    });
  }, [navigate]);

  return {
    filters,
    updateFilters,
    clearFilters,
  };
}
