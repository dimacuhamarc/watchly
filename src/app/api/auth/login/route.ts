import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { db } from "~/server/db";
import { cookies } from "next/headers";
import { signJwtAccessToken } from "~/helpers/jwt";

export async function POST(req: Request) {
  try {
    // Define the expected structure of the request body
    const body = await req.json() as { email: string; password: string };
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find the user in the database
    const user = await db.query.users.findFirst({
      where: (users, { or, eq }) => 
        or(
          eq(users.username, email),
          eq(users.email, email)
        )
    });

    if (!user?.password_hash) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    try {
      // Create a session token using the edge-compatible jose library
      const token = await signJwtAccessToken({
        id: user.id,
        email: user.email,
        username: user?.display_name ?? user?.username ?? undefined,
      });

      // Set the session cookie
      const cookieStore = await cookies();
      
      // Make sure the cookie is set properly
      cookieStore.set({
        name: "next-auth.session-token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });

      // Return user info (excluding password) and include a callbackUrl for redirection
      return NextResponse.json({
        ok: true,
        url: "/", // Provide a default callback URL for redirection
        user: {
          id: user.id,
          email: user.email,
          name: user.display_name ?? user.username,
          image: user.profile_picture,
        }
      });
    } catch (jwtError) {
      console.error("JWT signing error:", jwtError);
      return NextResponse.json(
        { error: "Session creation failed", details: process.env.NODE_ENV !== "production" ? String(jwtError) : undefined },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Authentication failed", details: process.env.NODE_ENV !== "production" ? String(error) : undefined },
      { status: 500 }
    );
  }
}
