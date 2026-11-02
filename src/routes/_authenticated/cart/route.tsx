import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "@/features/cart/ui/CartPage";

export const Route = createFileRoute("/_authenticated/cart")({
  component: CartPage,
});
