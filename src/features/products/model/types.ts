export interface Category {
  category: string;
  parentCategory: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryAncestors: string[];
  price: number;
  salePercent: number;
  imageUrl: string | null;
  sizes: ProductSize[];
  colors: string[];
  stock: number;
  featured: boolean;
}

export type ProductSize = "XS" | "S" | "M" | "L" | "XL";

export const PRODUCT_SORT_OPTIONS = [
  { label: "Ascending price", value: "price-asc" },
  { label: "Descending price", value: "price-desc" },
] as const;

export type ProductSort = (typeof PRODUCT_SORT_OPTIONS)[number]["value"] | null;

export interface ProductFiltersState {
  name: string;
  colors: string[];
  sizes: ProductSize[];
  categories: string[];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  saleOnly: boolean;
  sortBy: ProductSort;
}

export interface ProductSearchRequest {
  search?: string;
  category?: string[];
  color?: string[];
  size?: ProductSize[];
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  sortPrice?: "asc" | "desc";
}

export interface FilterOption<T extends string = string> {
  label: string;
  value: T;
}
