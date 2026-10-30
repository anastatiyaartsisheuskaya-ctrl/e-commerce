import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

import { ProductsPage } from "@/features/products";

import {
  DEFAULT_PRODUCT_FILTERS,
  productFiltersSearchSchema,
} from "@/features/products/model/helper/product-filters";

export const Route = createFileRoute("/_authenticated/products/")({
  validateSearch: productFiltersSearchSchema,

  search: {
    middlewares: [stripSearchParams(DEFAULT_PRODUCT_FILTERS)],
  },

  component: ProductsPage,
});
