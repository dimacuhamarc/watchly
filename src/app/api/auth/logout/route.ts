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

  // Return success
  return NextResponse.json({ 
    success: true, 
    message: "Logged out successfully" 
  });
}
