import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./shared/api/query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
