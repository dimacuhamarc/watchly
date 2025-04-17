import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { favorites } from "~/server/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { id: userId } = await params;

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const userFavorites = await db.query.favorites.findFirst({
      where: (favorites, { eq }) => eq(favorites.userId, userId),
    });

    if (!userFavorites) {
      await db.insert(favorites).values({
        id: uuidv4(),
        userId: userId,
        movieIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return NextResponse.json(
        { error: "Creating favorites collection for this user. Please retry the request." },
        { status: 404 }
      );
    }

    return NextResponse.json(userFavorites, { status: 200 });
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch user favorites" },
      { status: 500 }
    );
  }
}