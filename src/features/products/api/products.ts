import { api } from "@/shared/api/client";
import type { Product } from "../model/types";

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>("/products");

  return response.data;
}
