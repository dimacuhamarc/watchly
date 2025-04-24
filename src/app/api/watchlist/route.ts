import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { watchlist } from "~/server/db/schema";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { verifyJwt } from "~/helpers/jwt";
import { isFeatureEnabled } from "~/helpers/featureFlag/featureFlag";

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

interface CreateWatchlistRequest {
  title: string;
  description?: string;
  public_watchlist: boolean;
  cover_image?: string;
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const authCookie =
      cookieStore.get("next-auth.session-token") ??
      cookieStore.get("__Secure-next-auth.session-token");

    if (!authCookie) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 },
      );
    }
    const userData = authCookie ? await verifyJwt(authCookie.value) : null;

    if (!userData) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    const body = (await request.json()) as CreateWatchlistRequest;
    const userId = userData.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID are required" },
        { status: 400 },
      );
    }

    if (isFeatureEnabled("FEATURE_FLAG_LIMITED_WATCHLIST")) {
      const userWatchlists = await db.query.watchlist.findMany({
        where: (watchlist, { eq }) => eq(watchlist.userId, userId),
      });
      const count = userWatchlists.length;
      if (count > 10) {
        return NextResponse.json(
          { error: "User has reached the maximum number of watchlists" },
          { status: 400 },
        );
      }
    }

    const { title, description, public_watchlist, cover_image } = body;

    const newWatchlistId = uuidv4();

    const [newWatchlist] = await db
      .insert(watchlist)
      .values({
        id: newWatchlistId,
        userId: userId,
        title: title,
        description: description ?? null,
        public_watchlist: public_watchlist,
        cover_image: cover_image ?? null,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Watchlist created successfully",
        watchlist: newWatchlist,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating watchlist:", error);
    return NextResponse.json(
      { error: "Failed to create watchlist" },
      { status: 500 },
    );
  }
}
