import { createFileRoute } from "@tanstack/react-router";
import { ProductDetailsPage } from "@/features/products";

export const Route = createFileRoute("/_authenticated/products/$productId")({
  component: ProductDetailsPage,
});
