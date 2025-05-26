import React from 'react'
import AuthLayoutProvider from '~/components/layout/authLayoutProvider'
import { getWatchlistCollections, getWatchlistData } from './actions'
import ListPageContent from '~/components/resource/watchlists'

export async function generateMetadata() {
  return {
    title: `My List | Watchly`,
    description: `My List | Watchly`,
  }
}

async function ListsPage() {
  try {
    const watchlistCollection = await getWatchlistCollections()

    return (
      <AuthLayoutProvider>
        <ListPageContent watchlists={watchlistCollection} />
      </AuthLayoutProvider>
    )
  } catch (error) {
    console.error('Error loading watchlists:', error)
    return (
      <AuthLayoutProvider>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="mb-4 text-2xl font-bold">My Watchlists</h1>
          <div className="text-center">
            <p className="mb-4 text-red-500">Failed to load watchlists</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </AuthLayoutProvider>
    )
  }
}

export default ListsPage
