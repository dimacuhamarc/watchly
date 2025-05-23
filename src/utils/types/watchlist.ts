import type { MediaType, WatchlistItemStatusType } from './data'

type Watchlist = {
  id: string
  userId: string
  title: string
  description?: string
  public_watchlist: boolean
  cover_image?: string
  createdAt: Date | string
  updatedAt: Date | string
}

type WatchlistItem = {
  id: string
  watchlistId: string
  itemId: string
  mediaType: MediaType
  status: WatchlistItemStatusType
  notes?: string
  createdAt: Date | string
  updatedAt: Date | string
}

type WatchlistRequest = {
  title: string
  description?: string
  public_watchlist: boolean
}

export type { Watchlist, WatchlistItem, WatchlistRequest }
