import { auth } from "@/shared/lib/firebase";

export async function getCurrentUser() {
  await auth.authStateReady();

  return auth.currentUser;
}
