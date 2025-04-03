import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password, callbackUrl = "/" } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // Find the user by email
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email)
    });
    
    if (!user?.password_hash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    
    // Verify password
    const isPasswordValid = await compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    
    // Return success - let the client-side handle the actual sign-in via NextAuth
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name || user.username
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      { 
        error: "Authentication failed",
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
