import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts, getProductById } from "../api/products";
import { getCategories, getCategoriesHierarchy } from "../api/categories";
import { productKeys, categoriesKey } from "@/shared/api";
import type { ProductSearchRequest } from "./types";

export function useProductsQuery(filters: ProductSearchRequest) {
  return useQuery({
    queryKey: [productKeys.all, filters],
    queryFn: () => getProducts(filters),
    placeholderData: keepPreviousData,
  });
}

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: [productKeys.product, id],
    queryFn: () => getProductById(id),
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: [categoriesKey.all],
    queryFn: getCategories,
  });
}

export function useCategoriesHierarchyQuery() {
  return useQuery({
    queryKey: [categoriesKey.all, categoriesKey.hierarchy],
    queryFn: getCategoriesHierarchy,
  });
}
