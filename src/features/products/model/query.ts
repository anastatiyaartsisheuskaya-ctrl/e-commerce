import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { productKeys } from "@/shared/api/queryKeys";

export function useProductsQuery() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: getProducts,
  });
}
