import type { SanitizedWatchlistCollection } from '~/utils/types/data'
import { getCookies } from '~/utils/api/apiRequests'
import { getCurrentUser } from '~/lib/common/cookies'

const apiURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export async function getWatchlistCollections() {
  const cookieHeader = await getCookies()
  const userData = await getCurrentUser() 
  if (!userData) {
    throw new Error('User not authenticated')
  }
  return fetch(`${apiURL}/api/watchlist?userId=${userData.id}`, {
    headers: {
      Cookie: cookieHeader,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    const response = res.json() as Promise<{
      status: string
      message: string
      watchlists: SanitizedWatchlistCollection[]
      error?: string
    }>
    if (!res.ok) {
      return response.then((data) => {
        throw new Error(data.error ?? 'Failed to fetch watchlist collections')
      })
    }
    return response.then((data) => {
      if (data.status !== 'success') {
        throw new Error(data.error ?? 'Failed to fetch watchlist collections')
      }
      return data.watchlists
    })
  })
}