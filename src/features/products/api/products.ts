import { api } from "@/shared/api";
import type { Product, ProductSearchRequest } from "../model/types";

export async function getProducts(
  data: ProductSearchRequest,
): Promise<Product[]> {
  const response = await api.post<Product[]>("/products", data);

  return response.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);

  return response.data;
}
