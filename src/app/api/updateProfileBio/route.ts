import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { verifyJwt } from "~/helpers/jwt";

// Define the expected request body type
interface UpdateProfileRequest {
  bio?: string;
}

export async function PATCH(req: Request) {
  try {
    // Get the session token from cookies
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('next-auth.session-token') ?? cookieStore.get('__Secure-next-auth.session-token');
    
    if (!authCookie) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
    
    // Decode the session token to get the user ID
    const userData = authCookie ? await verifyJwt(authCookie.value) : null
    
    if (!userData) {
      return NextResponse.json(
        { message: "Invalid session" },
        { status: 401 }
      );
    }
    
    // Get data from request body
    const { bio } = await req.json() as UpdateProfileRequest;
    
    // Update fields only if they are provided
    const updateData: Record<string, unknown> = {};
    
    if (bio !== undefined) updateData.bio = bio;
    
    // Check if we have any fields to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No fields to update" },
        { status: 400 }
      );
    }
    
    // Update the user in the database
    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userData.id));
    
    // Return success response with updated data
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

