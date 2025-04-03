import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const callbackUrl = url.searchParams.get("callbackUrl") || "/";
  
  // Simply redirect to the callback URL or home page
  return NextResponse.redirect(new URL(callbackUrl, process.env.NEXTAUTH_URL));
}

export async function POST(req: Request) {
  // For POST requests, return a JSON response
  return NextResponse.json({ 
    error: "This endpoint does not support direct POST requests. Please use the sign-in form."
  }, { status: 405 });
}
