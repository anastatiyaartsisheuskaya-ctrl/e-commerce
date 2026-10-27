import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "@/shared/lib/firebase";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import logo from "@/shared/images/logo.svg";

import { getAuthErrorMessage } from "../model/getAuthErrorMessage";
import { registerSchema, type RegisterFormValues } from "../model/auth.schema";

export function RegisterPage() {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      console.log("Registration successful:", userCredential.user);
    } catch (error: unknown) {
      console.error("Registration failed:", error);
      setError(getAuthErrorMessage(error));
    }
  }

  return (
    <main className="min-h-svh bg-background p-4 text-foreground sm:p-6 lg:p-10">
      <div className="mx-auto grid min-h-[calc(100svh-3rem)] max-w-6xl overflow-hidden rounded-3xl border bg-card shadow-sm lg:min-h-[calc(100svh-5rem)] lg:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex xl:p-14">
          <div
            aria-hidden="true"
            className="absolute -right-32 -top-32 size-96 rounded-full border border-current/15"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-48 -left-20 size-96 rounded-full border border-current/15"
          />

          <div className="relative w-fit text-xl font-semibold tracking-[0.2em]">
            <img src={logo} alt="Second Hand Studio" />
          </div>

          <div className="relative max-w-md space-y-5">
            <p className="text-xs font-medium uppercase tracking-[0.25em] opacity-70">
              Your everyday essentials
            </p>

            <h1 className="text-5xl font-semibold leading-tight tracking-tight xl:text-6xl">
              Good design.
              <br />
              Better everyday.
            </h1>

            <p className="max-w-sm text-base leading-7 opacity-75">
              Discover thoughtful essentials made to fit your style and your
              everyday life.
            </p>
          </div>

          <p className="relative text-sm opacity-60">
            Find your next favorite.
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Get started
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Create an account
              </h2>

              <p className="text-sm leading-6 text-muted-foreground">
                Enter your details below to create your account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />

                {errors.email && (
                  <p role="alert" className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />

                {errors.password && (
                  <p role="alert" className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>

                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword")}
                />

                {errors.confirmPassword && (
                  <p role="alert" className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="h-11 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
