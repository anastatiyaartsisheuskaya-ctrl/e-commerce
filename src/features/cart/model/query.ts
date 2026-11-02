import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCart } from "../api/cart";
import { cartKey } from "@/shared/api";

export function useCartItemsQuery() {
  return useQuery({
    queryKey: [cartKey.cart],
    queryFn: getCart,
    placeholderData: keepPreviousData,
  });
}
