import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users, follow } from "~/server/db/schema";
import { eq, count } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const userData = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .execute()

    if (userData.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const userId = userData[0]!.id;
    
    const followersCount = await db
      .select({ count: count() })
      .from(follow)
      .where(eq(follow.followedUserId, userId))
      .execute()
      .then((result) => Number(result[0]?.count));

    const followingCount = await db
      .select({ count: count() })
      .from(follow)
      .where(eq(follow.userId, userId))
      .execute()
      .then((result) => Number(result[0]?.count));

    return NextResponse.json({
      status: "success",
      message: "User profile data fetched successfully",
      profileData: {
        id: userData[0]!.id,
        username: userData[0]!.username,
        first_name: userData[0]!.first_name,
        last_name: userData[0]!.last_name,
        profile_picture: userData[0]!.profile_picture,
        email: userData[0]!.email,
        bio: userData[0]!.bio,
        public_profile: userData[0]!.public_profile,
        created_at: userData[0]!.created_at,
        followers: 10,
        following: followingCount,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}