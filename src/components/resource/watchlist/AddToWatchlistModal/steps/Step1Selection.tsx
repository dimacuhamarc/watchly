/** @format */

import React from 'react'
import ListView from '~/components/global/cards/watchlist/ListView'
import { useState, useEffect } from 'react'
import type { SanitizedWatchlistCollection } from '~/utils/types/data'
import { useAuthenticated } from '~/hooks/useAuth'

interface Step1SelectionProps {
  onStepChange: () => void
  setWatchlistId: (id: string) => void
}

function Step1Selection({ onStepChange, setWatchlistId }: Step1SelectionProps) {
  const [watchlists, setWatchlists] = useState<SanitizedWatchlistCollection[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(false)
  const { userData } = useAuthenticated()

  useEffect(() => {
    if (!userData) {
      console.log('User data is not available')
      return
    }

    const fetchWatchlists = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/watchlist?userId=${userData.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch watchlists')
        }

        const responseData = (await response.json()) as {
          watchlists?: SanitizedWatchlistCollection[]
        }
        const watchlistsData =
          responseData && Array.isArray(responseData.watchlists)
            ? responseData.watchlists
            : []
        setWatchlists(watchlistsData)
      } catch (error) {
        console.error('Error fetching watchlists:', error)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchWatchlists()
  }, [userData])

  return (
    <div className="">
      {isLoading ? (
        <div>Loading watchlists...</div>
      ) : watchlists.length > 0 ? (
        <ListView
          onWatchlistClick={(watchlistId: string) => {
            setWatchlistId(watchlistId)
            onStepChange()
          }}
          watchlists={watchlists}
          activeWatchlistId={null}
          setActiveWatchlistData={() => {
            console.log('Set active watchlist ID')
          }}
        />
      ) : (
        <div>No watchlists found</div>
      )}
    </div>
  )
}

export default Step1Selection
