import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { db } from "~/server/db";
import { cookies } from "next/headers";
import { signJwtAccessToken } from "~/utils/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    // Create a session token using the edge-compatible jose library
    const token = await signJwtAccessToken({
      id: user.id,
      email: user.email,
      name: user.name ?? user.username,
    });

    // Set the session cookie
    cookies().set({
      name: "next-auth.session-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    // Return user info (excluding password)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name ?? user.username,
        image: user.profile_picture,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
