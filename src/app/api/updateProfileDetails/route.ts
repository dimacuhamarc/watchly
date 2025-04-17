import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { verifyJwt } from "~/helpers/jwt";

interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  location?: string;
  bio?: string;
}

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('next-auth.session-token') ?? cookieStore.get('__Secure-next-auth.session-token');
    
    if (!authCookie) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    
    const userData = authCookie ? await verifyJwt(authCookie.value) : null
    
    if (!userData) {
      return NextResponse.json(
        { message: "Invalid session" },
        { status: 401 }
      );
    }
    
    const { first_name, last_name, location, bio } = await req.json() as UpdateProfileRequest;
    
    const updateData: Record<string, unknown> = {};
    
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (location !== undefined) updateData.location = location;
    if (bio !== undefined) updateData.bio = bio;
    
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No fields to update" },
        { status: 400 }
      );
    }
    
    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userData.id));
    
    return NextResponse.json(
      { 
        message: "Profile updated successfully",
        updatedFields: Object.keys(updateData),
        updatedData: updateData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Failed to update profile", error: String(error) },
      { status: 500 }
    );
  }
}

