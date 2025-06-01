import { cookies } from "next/headers";
import type { SanitizedUserData } from "~/utils/types/data";
import { verifyJwt } from "~/helpers/jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const authCookie =
    cookieStore.get("next-auth.session-token") ??
    cookieStore.get("__Secure-next-auth.session-token");

  if (!authCookie) {
    return null;
  }

  try {
    const userData = await verifyJwt(authCookie.value) as SanitizedUserData;
    return userData;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
}