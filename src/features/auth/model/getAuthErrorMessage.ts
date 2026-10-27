export function getAuthErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = error.code;

    if (typeof code === "string") {
      switch (code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          return "Invalid email or password.";

        case "auth/invalid-email":
          return "Please enter a valid email address.";

        case "auth/too-many-requests":
          return "Too many attempts. Please try again later.";

        case "auth/network-request-failed":
          return "Network error. Please check your connection.";

        default:
          return "Unable to sign in. Please try again.";
      }
    }
  }

  return "Something went wrong. Please try again.";
}
