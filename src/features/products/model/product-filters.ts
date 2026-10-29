import type {
  ProductFiltersState,
  ProductSearchRequest,
  ProductSize,
  FilterOption,
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

export const SIZE_OPTIONS: readonly FilterOption[] = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  ...[
    "36",
    "36.5",
    "37",
    "37.5",
    "38",
    "38.5",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
  ].map((size) => ({ label: size, value: size })),
];

export const CATEGORY_OPTIONS: readonly FilterOption[] = [
  { label: "Shoes", value: "Shoes" },
  { label: "Apparel", value: "Apparel" },
  { label: "Accessories", value: "Accessories" },
  { label: "Belts", value: "Belts" },
  { label: "Leather belts", value: "Leather belts" },
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
    ...(state.categories[0] ? { category: state.categories[0] } : {}),
    ...(state.colors[0] ? { color: state.colors[0] } : {}),
    ...(state.sizes[0] ? { size: state.sizes[0] as ProductSize } : {}),
    ...(state.minPrice !== undefined ? { minPrice: state.minPrice } : {}),
    ...(state.maxPrice !== undefined ? { maxPrice: state.maxPrice } : {}),
    ...(state.saleOnly ? { onSale: true } : {}),
    ...(sortPrice ? { sortPrice } : {}),
  };
}
