import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Clear the auth cookie
  const cookieStore = await cookies();
  cookieStore.set({
    name: "next-auth.session-token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  // Also clear any secure variants
  cookieStore.set({
    name: "__Secure-next-auth.session-token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  // Redirect to homepage after logout
  return NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL ?? 'http://localhost:3000'));
}
