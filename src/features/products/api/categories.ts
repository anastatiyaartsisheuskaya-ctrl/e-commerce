import { api } from "@/shared/api";
import type { Category, CategoriesHierarchyResponse } from "../model/types";

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/categories");

  return response.data;
}

export async function getCategoriesHierarchy(): Promise<CategoriesHierarchyResponse> {
  const response = await api.get<CategoriesHierarchyResponse>(
    "/categories/hierarchy",
  );

  return response.data;
}
