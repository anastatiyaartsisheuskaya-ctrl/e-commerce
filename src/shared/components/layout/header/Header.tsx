import { Link } from "@tanstack/react-router";
import { UserRound, LogOut } from "lucide-react";
import logo from "@/shared/images/logo.svg";
import { Button } from "../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../ui/popover";
import { auth } from "@/shared/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "@tanstack/react-router";

export function Header() {
  const navigate = useNavigate();
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
            to="/cart"
            className="py-1 underline-offset-8 transition-opacity underline hover:opacity-80"
          >
            Cart
          </Link>

          <Popover>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Account"
                  title="Account"
                  className="ml-2 size-9 rounded-full text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground sm:ml-3"
                />
              }
            >
              <UserRound className="size-5" />
            </PopoverTrigger>

            <PopoverContent align="end" className="w-64 space-y-2">
              <PopoverHeader>
                <PopoverTitle className="truncate text-sm font-medium">
                  <span className="text-primary font-bold">Login:</span>{" "}
                  {auth.currentUser?.email}
                </PopoverTitle>
              </PopoverHeader>

              <Button
                variant="destructive"
                className="w-full"
                onClick={() =>
                  signOut(auth)
                    .then(() => {
                      navigate({ to: "/login" });
                    })
                    .catch((error) => {
                      console.error("Logout error: ", error);
                    })
                }
              >
                <LogOut className="mr-2 size-4" />
                Log out
              </Button>
            </PopoverContent>
          </Popover>
        </nav>
      </div>
    </header>
  );
}
