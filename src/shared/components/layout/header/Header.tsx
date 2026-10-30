import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import logo from "@/shared/images/logo.svg";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="mx-auto flex min-h-20 max-w-[1800px] flex-wrap items-center gap-x-5 gap-y-3 px-4 py-4 sm:min-h-23.5 sm:flex-nowrap sm:gap-8 sm:px-8 lg:px-14">
        <Link
          to="/products"
          aria-label="2nd Hand Market home"
          className="order-1 shrink-0"
        >
          <img
            src={logo}
            alt="2nd Hand Market"
            className="h-auto w-22 sm:w-27"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="order-2 ml-auto flex shrink-0 items-center gap-4 text-sm sm:order-3 sm:gap-5"
        >
          <Link
            to="/products"
            className="py-1 underline-offset-8 transition-opacity underline hover:opacity-80"
          >
            Home
          </Link>

          <Link
            to="/"
            className="py-1 underline-offset-8 transition-opacity underline hover:opacity-80"
          >
            Cart
          </Link>

          <Link
            to="/login"
            aria-label="Account"
            title="Account"
            className="ml-2 inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-primary-foreground/15 sm:ml-6"
          >
            <UserRound
              aria-hidden="true"
              className="size-full fill-current stroke-primary"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}
