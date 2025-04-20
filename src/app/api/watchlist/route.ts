import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    const userWatchlists = await db.query.watchlist.findMany({
      where: (watchlist, { eq }) => eq(watchlist.userId, userId),
    });

    const count = userWatchlists.length;

    return NextResponse.json(
      {
        message: "Watchlists fetched successfully",
        watchlists: userWatchlists,
        count: count,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching user watchlists:", error);
    return NextResponse.json(
      { error: "Failed to fetch user watchlists" },
      { status: 500 },
    );
  }
}
