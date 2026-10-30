import type {
  ProductFiltersState,
  ProductSearchRequest,
  FilterOption,
  ProductSize,
} from "../types";

export const COLOR_OPTIONS: readonly FilterOption[] = [
  { label: "White", value: "White" },
  { label: "Black", value: "Black" },
  { label: "Dark", value: "Dark" },
  { label: "Grey", value: "Grey" },
  { label: "Brown", value: "Brown" },
  { label: "Blue", value: "Blue" },
  { label: "Red", value: "Red" },
  { label: "Green", value: "Green" },
  { label: "Pink", value: "Pink" },
  { label: "Yellow", value: "Yellow" },
];

export const SIZE_OPTIONS = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
] as const satisfies readonly FilterOption<ProductSize>[];

export function createInitialProductFilters(): ProductFiltersState {
  return {
    name: "",
    colors: [],
    sizes: [],
    categories: [],
    minPrice: undefined,
    maxPrice: undefined,
    saleOnly: false,
    sortBy: null,
  };
}

export function toProductSearchRequest(
  state: ProductFiltersState,
): ProductSearchRequest {
  const search = state.name.trim();

  const sortPrice =
    state.sortBy === "price-asc"
      ? "asc"
      : state.sortBy === "price-desc"
        ? "desc"
        : undefined;

  return {
    ...(search ? { search } : {}),
    ...(state.categories.length ? { category: [...state.categories] } : {}),
    ...(state.colors.length ? { color: [...state.colors] } : {}),
    ...(state.sizes.length ? { size: [...state.sizes] } : {}),
    ...(state.minPrice !== undefined ? { minPrice: state.minPrice } : {}),
    ...(state.maxPrice !== undefined ? { maxPrice: state.maxPrice } : {}),
    ...(state.saleOnly ? { onSale: true } : {}),
    ...(sortPrice ? { sortPrice } : {}),
  };
}

import { z } from "zod";

const productSizeSchema = z.enum(["XS", "S", "M", "L", "XL"]);

const priceSchema = z.number().finite().nonnegative();

const sortSchema = z.enum(["price-asc", "price-desc"]);

export const productFiltersSearchSchema = z.object({
  name: z.string().optional(),
  categories: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(productSizeSchema).optional(),
  minPrice: priceSchema.optional(),
  maxPrice: priceSchema.optional(),
  saleOnly: z.boolean().optional(),
  sortBy: sortSchema.nullable().optional(),
});

export const DEFAULT_PRODUCT_FILTERS: ProductFiltersState = {
  name: "",
  categories: [],
  colors: [],
  sizes: [],
  minPrice: undefined,
  maxPrice: undefined,
  saleOnly: false,
  sortBy: null,
};

export function normalizeProductFilters(
  search: Partial<ProductFiltersState>,
): ProductFiltersState {
  return {
    name: search.name ?? DEFAULT_PRODUCT_FILTERS.name,
    categories: [...(search.categories ?? [])],
    colors: [...(search.colors ?? [])],
    sizes: [...(search.sizes ?? [])],
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    saleOnly: search.saleOnly ?? DEFAULT_PRODUCT_FILTERS.saleOnly,
    sortBy: search.sortBy ?? DEFAULT_PRODUCT_FILTERS.sortBy,
  };
}
