import { NextResponse } from 'next/server'
import { getCurrentUser } from '~/lib/common/cookies'
import { getWatchlistById, getWatchlistItemsById } from '~/lib/watchlist'
import { watchlistItems, watchlist } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '~/server/db'

// localhost:3000/api/watchlist/[id]
// http://localhost:3000/api/watchlist/29ea8795-9056-4bfe-b9be-4a589d3a8fb7
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id: watchlistId } = await params

    if (!watchlistId) {
      return NextResponse.json(
        { error: 'Watchlist ID is required' },
        { status: 400 },
      )
    }

    const SanitizedWatchlistCollection = await getWatchlistById(watchlistId)

    if (!SanitizedWatchlistCollection) {
      return NextResponse.json(
        { error: 'Watchlist not found' },
        { status: 404 },
      )
    }

    if (SanitizedWatchlistCollection.public_watchlist === false) {
      const currentUser = await getCurrentUser()
      if (
        !currentUser ||
        SanitizedWatchlistCollection.userId !== currentUser.id
      ) {
        return NextResponse.json(
          { error: 'Unauthorized access to private watchlist' },
          { status: 403 },
        )
      }
    }

    const items = await getWatchlistItemsById(watchlistId)

    return NextResponse.json(
      {
        status: 'success',
        message: `${watchlistId} items fetched successfully`,
        watchlistItems: items,
        watchlistData: SanitizedWatchlistCollection,
        metadata: {
          count: items.length,
          owner: SanitizedWatchlistCollection.userId,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching watchlist items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch watchlist items' },
      { status: 500 },
    )
  }
}

// Adding items to a watchlist
// localhost:3000/api/watchlist/[id]
// const watchlistId = '29ea8795-9056-4bfe-b9be-4a589d3a8fb7';

// fetch(`/api/watchlist/${watchlistId}`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     itemId: '1668',      // Example IMDB ID
//     mediaType: 'TV_SHOW',       // 'MOVIE', 'TV_SHOW'
//     status: 'WANT_TO_WATCH',  // 'WANT_TO_WATCH', 'WATCHING', 'WATCHED', etc.
//     notes: 'Testing from console'
//   }),
//   credentials: 'include'      // Important for sending cookies/auth info
// })
// .then(response => response.json())
// .then(data => console.log('Success:', data))
// .catch(error => console.error('Error:', error));

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id: watchlistId } = await params

  if (!watchlistId) {
    return NextResponse.json(
      { error: 'Watchlist ID is required' },
      { status: 400 },
    )
  }

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { itemId, mediaType, status, notes } = body

    if (!itemId || !mediaType || !status) {
      return NextResponse.json(
        { error: 'Item ID, media type, and status are required' },
        { status: 400 },
      )
    }

    // add db logic to insert the item into the watchlistItems
    const newItem = {
      id: crypto.randomUUID(), // Generate a unique ID for the item
      watchlistId,
      itemId,
      mediaType,
      status,
      notes: notes || null, // Optional notes
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const existingItem = await db.query.watchlistItems.findFirst({
      where: eq(watchlistItems.itemId, itemId) &&
        eq(watchlistItems.watchlistId, watchlistId),
    })
    
    if (existingItem) {
      return NextResponse.json(
        { error: 'Item already exists in the watchlist' },
        { status: 409 },
      )
    }

    // Here you would typically insert the newItem into the database
    const result = await db.insert(watchlistItems).values(newItem)
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to add item to watchlist' },
        { status: 500 },
      )
    }
    // If you have a watchlist table, you might want to update it as well
    await db
      .update(watchlist)
      .set({ updatedAt: new Date() })
      .where(eq(watchlist.id, watchlistId))

    return NextResponse.json(
      {
        status: 'success',
        message: 'Item added to watchlist successfully',
        data: {
          watchlistId,
          itemId,
          mediaType,
          status,
          notes,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error adding item to watchlist:', error)
    return NextResponse.json(
      { error: 'Failed to add item to watchlist' },
      { status: 500 },
    )
  }
}
