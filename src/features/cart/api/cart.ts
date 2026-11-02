import { api } from "@/shared/api";

import type {
  AddCartItemDto,
  CartResponse,
  MutationResponse,
  UpdateQuantityDto,
} from "../model/types";

export async function getCart(): Promise<CartResponse> {
  const { data } = await api.get<CartResponse>("/cart");

  return data;
}

export async function addCartItem(
  item: AddCartItemDto,
): Promise<MutationResponse> {
  const { data } = await api.post<MutationResponse>("/cart/items", item);

  return data;
}

export async function updateCartItem(
  cartItemId: string,
  body: UpdateQuantityDto,
): Promise<MutationResponse> {
  const { data } = await api.patch<MutationResponse>(
    `/cart/items/${encodeURIComponent(cartItemId)}`,
    body,
  );

  return data;
}

export async function removeCartItem(
  cartItemId: string,
): Promise<MutationResponse> {
  const { data } = await api.delete<MutationResponse>(
    `/cart/items/${encodeURIComponent(cartItemId)}`,
  );

  return data;
}
