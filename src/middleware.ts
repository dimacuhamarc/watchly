import { NextResponse } from "next/server";
import { auth } from "~/utils/api/auth";
import { type NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/auth",
  "/",
  "/onboarding",
  "/api/auth",

  "/search",
];

const PRIVATE_PATHS = [
  "/profile",
  "/search",
];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuth = !!session;
  
  const isAuthPath = request.nextUrl.pathname.startsWith("/auth");
  const isPublicPath = isAuthPath || PUBLIC_PATHS.some(path => 
    request.nextUrl.pathname.startsWith(path));
  
  if (!isAuth && !isPublicPath || PRIVATE_PATHS.some(path =>
    request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/onboarding?type=signin", request.url));
  }

  if (isAuth && isAuthPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};