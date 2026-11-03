import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getCurrentUser } from "@/shared/helpers";

import { Header } from "@/shared/components/layout/header";

import { Toaster } from "@/shared/components/ui/toast";

import { SupportChat } from "@/features/support";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const user = await getCurrentUser();

    if (!user) {
      throw redirect({
        to: "/login",
        replace: true,
      });
    }

    return { user };
  },

  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
      <SupportChat />
    </>
  );
}
