'use client'

import { useState, useCallback, useEffect } from 'react'
import type { SanitizedWatchlistCollection, WatchlistResponse } from '~/utils/types/data'
import { LuPlus } from 'react-icons/lu'
import ListView from '~/components/global/cards/watchlist/ListView'
import dynamic from 'next/dynamic'
import WatchlistModal from '~/components/resource/watchlist/modal'
import { useRouter } from 'next/navigation'

const WatchlistDetail = dynamic(
  () => import('~/components/resource/watchlist/detail'),
  {
    loading: () => <p>Loading watchlist...</p>,
  },
)

interface ListPageContentProps {
  watchlists: SanitizedWatchlistCollection[]
}

const ListPageContent = ({ watchlists: initialWatchlists }: ListPageContentProps) => {
  const router = useRouter()
  const [selectedWatchlistId, setSelectedWatchlistId] = useState<string | null>(null)
  const [activeWatchlistData, setActiveWatchlistData] = useState<WatchlistResponse | null>(null)
  const [watchlists, setWatchlists] = useState<SanitizedWatchlistCollection[]>(initialWatchlists)

  useEffect(() => {
    setWatchlists(initialWatchlists)
  }, [initialWatchlists])

  useEffect(() => {
    if (selectedWatchlistId) {
      const getWatchlistData = async ({ watchlistId }: { watchlistId: string }) => {
        try {
          const response = await fetch(`/api/watchlist/${watchlistId}`)
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return await response.json() as WatchlistResponse | null
        }
        catch (error) {
          console.error("Failed to fetch watchlist data:", error)
          return null
        }
      }

      getWatchlistData({ watchlistId: selectedWatchlistId })
        .then((data) => {
          if (data) {
            // If the API returns the full WatchlistResponse shape, set as is
            if ('watchlistData' in data && 'watchlistItems' in data && 'metadata' in data) {
              setActiveWatchlistData(data)
            } else {
              // fallback for legacy shape
              setActiveWatchlistData(data as WatchlistResponse)
            }
          } else {
            setActiveWatchlistData(null)
          }
        })
        .catch((error) => {
          console.error("Error fetching watchlist data:", error)
          setActiveWatchlistData(null)
        })
    }
  }, [selectedWatchlistId])

  const handleCreateClick = useCallback(() => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement
    modal?.showModal()
  }, [])

  const handleWatchlistCreated = useCallback(() => {
    router.refresh()
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement
    modal?.close()
  }, [router])

  if (watchlists.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No watchlists found. Create a new one to get started!
      </div>
    )
  }

  const handleWatchlistClick = (watchlistId: string) => {
    setSelectedWatchlistId(watchlistId)
  }

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[320px_1fr] overflow-hidden">
      <aside className="border-r border-slate-700 py-6 pl-2 pr-3.5 flex flex-col h-screen overflow-y-auto">
        <h1 className="mb-6 text-2xl font-bold">My Watchlists</h1>
        <button
          className="btn btn-ghost sticky top-0 z-10 mb-2 flex w-full items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/50 text-left shadow-md transition-all duration-200 ease-in-out hover:opacity-80"
          onClick={handleCreateClick}
          type="button"
        >
          <LuPlus className="h-8 w-8 text-xs text-primary" />
          <h2 className="text-lg font-semibold">Create a Watchlist</h2>
        </button>
        <ListView
          watchlists={watchlists}
          onWatchlistClick={handleWatchlistClick}
          activeWatchlistId={selectedWatchlistId}
          setActiveWatchlistData={() => {}}
        />
      </aside>
      <main>
        {selectedWatchlistId ? (
          <WatchlistDetail
            watchlistId={selectedWatchlistId}
            data={activeWatchlistData ? activeWatchlistData : null}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h2 className="mb-2 text-2xl font-medium">Select a watchlist</h2>
            <p className="text-slate-400">
              Choose a watchlist from the sidebar or create a new one.
            </p>
          </div>
        )}
      </main>
      <WatchlistModal onAddWatchlist={handleWatchlistCreated} />
    </div>
  )
}

export default ListPageContent