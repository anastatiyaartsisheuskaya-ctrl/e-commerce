import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "@/shared/lib/firebase";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import logo from "@/shared/images/logo.svg";

import { getAuthErrorMessage } from "../model/getAuthErrorMessage";
import { loginSchema, type LoginFormValues } from "../model/auth.schema";

import { useNavigate } from "@tanstack/react-router";

export function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      console.log("Login successful:", userCredential.user);
      navigate({ to: "/products" });
    } catch (error: unknown) {
      console.error("Login failed:", error);
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
                Welcome back
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="text-sm leading-6 text-muted-foreground">
                Enter your details below to access your account.
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
                  <p className="text-sm text-destructive" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />

                {errors.password && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.password.message}
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
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Create an account
              </Link>
            </p>

            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
