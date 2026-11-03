import { useMutation } from "@tanstack/react-query";

import { cartKey, productKeys } from "@/shared/api";

import {
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../api/cart";

import type {
  AddCartItemDto,
  AddCartItemInput,
  CartResponse,
  MutationResponse,
  UpdateQuantityDto,
} from "./types";

import { queryClient } from "@/shared/api";

import { toast } from "@/shared/components/ui/toast";

const queryKey = [cartKey.cart] as const;

function validateAddCartItem(input: AddCartItemInput): AddCartItemDto {
  const selectedColor = input.selectedColor?.trim();
  const selectedSize = input.selectedSize?.trim();

  if (!selectedColor || !selectedSize) {
    throw new Error(
      "Please select both color and size before adding this product to your cart.",
    );
  }

  return {
    ...input,
    selectedColor,
    selectedSize,
  };
}

interface UpdateCartItemVariables extends UpdateQuantityDto {
  cartItemId: string;
}

export function useAddCartMutation() {
  return useMutation({
    mutationFn: (input: AddCartItemInput) =>
      addCartItem(validateAddCartItem(input)),

    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey });

      const previousCart = queryClient.getQueryData<CartResponse>(queryKey);

      if (
        previousCart &&
        newItem.selectedColor?.trim() &&
        newItem.selectedSize?.trim()
      ) {
        const existingItem = previousCart.items.find(
          (item) =>
            item.productId === newItem.productId &&
            item.selectedColor === newItem.selectedColor &&
            item.selectedSize === newItem.selectedSize,
        );

        if (existingItem) {
          queryClient.setQueryData<CartResponse>(queryKey, {
            ...previousCart,
            items: previousCart.items.map((item) =>
              item.id === existingItem.id
                ? {
                    ...item,
                    quantity: item.quantity + newItem.quantity,
                  }
                : item,
            ),
          });
        }
      }

      return { previousCart };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKey, context.previousCart);
      }

      toast.add({
        type: "error",
        title: "An Error accrued",
        description: _error.message,
      });
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [productKeys.all] as const });
      queryClient.setQueryData<CartResponse>(queryKey, {
        items: response.items,
      });
      toast.add({
        type: "success",
        title: "Product added successfully",
      });
    },
  });
}

export function useUpdateCartItemMutation() {
  return useMutation({
    mutationFn: ({ cartItemId, quantity }: UpdateCartItemVariables) =>
      updateCartItem(cartItemId, { quantity }),

    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousCart = queryClient.getQueryData<CartResponse>(queryKey);

      if (previousCart) {
        queryClient.setQueryData<CartResponse>(queryKey, {
          ...previousCart,
          items:
            quantity <= 0
              ? previousCart.items.filter((item) => item.id !== cartItemId)
              : previousCart.items.map((item) =>
                  item.id === cartItemId ? { ...item, quantity } : item,
                ),
        });
      }

      return { previousCart };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKey, context.previousCart);
      }
      toast.add({
        type: "error",
        title: "An Error accrued",
        description: _error.message,
      });
    },

    onSuccess: (response: MutationResponse) => {
      queryClient.setQueryData<CartResponse>(queryKey, {
        items: response.items,
      });
    },
  });
}

export function useRemoveCartItemMutation() {
  return useMutation({
    mutationFn: (cartItemId: string) => removeCartItem(cartItemId),

    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousCart = queryClient.getQueryData<CartResponse>(queryKey);

      if (previousCart) {
        queryClient.setQueryData<CartResponse>(queryKey, {
          ...previousCart,
          items: previousCart.items.filter((item) => item.id !== cartItemId),
        });
      }

      return { previousCart };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKey, context.previousCart);
      }
      toast.add({
        type: "error",
        title: "An Error accrued",
        description: _error.message,
      });
    },

    onSuccess: (response: MutationResponse) => {
      queryClient.setQueryData<CartResponse>(queryKey, {
        items: response.items,
      });
      toast.add({
        type: "success",
        title: "Product removed",
      });
    },
  });
}

export function useClearCartMutation() {
  return useMutation({
    mutationFn: clearCart,
    onError: (_error) => {
      toast.add({
        type: "error",
        title: "An Error accrued",
        description: _error.message,
      });
    },

    onSuccess: () => {
      queryClient.setQueryData<CartResponse>(queryKey, {
        items: [],
      });
      toast.add({
        type: "success",
        title: "Cart cleared",
      });
    },
  });
}
