import type {
  ProductFiltersState,
  ProductSearchRequest,
  FilterOption,
  ProductSize,
} from "./types";

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

export const CATEGORY_OPTIONS: readonly FilterOption[] = [
  { label: "Shoes", value: "Shoes" },
  { label: "Apparel", value: "Apparel" },
  { label: "Accessories", value: "Accessories" },
  { label: "Jackets", value: "Jackets" },
  { label: "Sport", value: "Sport" },
  { label: "Beauty", value: "Beauty" },
];

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
