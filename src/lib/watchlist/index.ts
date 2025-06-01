import { watchlistItems, watchlist } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '~/server/db'

export async function getWatchlistById(watchlistId: string) {
  const watchlistData = await db
    .select()
    .from(watchlist)
    .where(eq(watchlist.id, watchlistId))
    .execute()

  if (watchlistData.length === 0) {
    return null
  }
  const sanitizedWatchlist = watchlistData[0]
  return sanitizedWatchlist
}

export async function getWatchlistItemsById(watchlistId: string) {
  const items = await db
    .select()
    .from(watchlistItems)
    .where(eq(watchlistItems.watchlistId, watchlistId))
    .execute()

  return items
}
