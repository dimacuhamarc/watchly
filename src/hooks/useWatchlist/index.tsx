import { useEffect, useState, useCallback } from 'react'
import type { Watchlist } from '~/utils/types/watchlist'

interface WatchlistState {
  message: string
  watchlists: Watchlist[]
  count: number
}

export function useWatchlist(userId: string) {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [watchlistLoaded, setWatchlistLoaded] = useState(false)

  const fetchWatchlistData = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/watchlist?userId=${id}`)
      const data = (await response.json()) as WatchlistState
      setWatchlists(data.watchlists)
    } catch (error) {
      setWatchlistLoaded(false)
      console.error('Error fetching watchlist data:', error)
    } finally {
      setWatchlistLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (userId) {
      void fetchWatchlistData(userId)
    }
  }, [userId, fetchWatchlistData])

  return { watchlistLoaded, watchlists, fetchWatchlistData }
}
