import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "~/server/db";
import { users, favorites } from "~/server/db/schema";
import { v4 as uuidv4 } from 'uuid';

import type { SignUpRequest } from "~/utils/types/auth";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json() as SignUpRequest;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);
    
    const userId = uuidv4();

    await db.insert(users).values({
      id: userId,
      username,
      email,
      password_hash: hashedPassword,
      emailVerified: null,
    });

    await db.insert(favorites).values({
      id: uuidv4(),
      userId: userId,
      movieIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
