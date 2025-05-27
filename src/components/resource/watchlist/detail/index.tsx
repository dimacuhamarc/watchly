'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LuExternalLink, LuArrowLeft, LuLock } from 'react-icons/lu'
import type { WatchlistResponse } from '~/utils/types/data'
import { formatDate } from '~/helpers/date'
import { getBatchMovieDetails, getBatchTvDetails } from '~/utils/api/tmdb'
import { WatchItemCard } from '~/components/global/cards'
import { movieDetails, tvDetails } from '~/utils/types/tmdb-types'

interface WatchlistDetailProps {
  isFullPage?: boolean
  watchlistId: string
  data?: WatchlistResponse | null
}

const WatchlistDetail = ({
  isFullPage,
  watchlistId,
  data,
}: WatchlistDetailProps) => {
  const [movies, setMovies] = React.useState<movieDetails[]>([])
  const [shows, setShows] = React.useState<tvDetails[]>([])
  const [id, setId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (data?.watchlistData) {
      setId(data.watchlistData.id)
    }
  }, [data])

  React.useEffect(() => {
    const fetchMovies = async () => {
      if (data?.watchlistItems && data.watchlistItems.length > 0) {
        const movieIds = data.watchlistItems
          .filter((item) => item.mediaType === 'MOVIE')
          .map((item) => item.itemId)

        if (movieIds.length > 0) {
          const details = await getBatchMovieDetails(movieIds)
          setMovies(details)
        }
      }
    }

    fetchMovies()
  }, [data])

  React.useEffect(() => {
    const fetchShows = async () => {
      if (data?.watchlistItems && data.watchlistItems.length > 0) {
        const showIds = data.watchlistItems
          .filter((item) => item.mediaType === 'TV_SHOW')
          .map((item) => item.itemId)

        if (showIds.length > 0) {
          const details = await getBatchTvDetails(showIds)
          setShows(details)
        }
      }
    }

    fetchShows()
  }, [data])

  const mergeMoviesAndShows = () => {
    const allItems = [...movies, ...shows]
    return allItems
  }
  const mergedItems = mergeMoviesAndShows()

  if (!data || !data.watchlistData) {
    return (
      <div className="text-center text-gray-500">
        No watchlist data available.
      </div>
    )
  }

  if (watchlistId !== id) {
    setMovies([])
    setShows([])
    setId(watchlistId)
  }

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between border-b border-b-slate-700 px-6 py-6">
        <div className="flex flex-col gap-2">
          <h1 className="inline-flex items-center gap-2 text-2xl font-bold">
            {isFullPage && (
              <Link
                href={`/lists`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 p-2 backdrop-blur-md transition-all hover:bg-black/30"
              >
                <LuArrowLeft className="text-lg" />
              </Link>
            )}
            {data?.watchlistData?.title}{' '}
            {data?.watchlistData?.public_watchlist ? (
              ''
            ) : (
              <LuLock className="inline-block text-lg text-slate-400" />
            )}
            {!isFullPage && (
              <Link
                href={`/lists/${watchlistId}`}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 p-2 backdrop-blur-md transition-all hover:bg-black/30"
              >
                <LuExternalLink className="text-lg" />
              </Link>
            )}
          </h1>
          <h2 className="text-sm text-slate-400">
            {data?.watchlistData?.description
              ? data?.watchlistData?.description
              : 'No Description'}{' '}
            | Last Updated at{' '}
            {formatDate(data?.watchlistData?.updatedAt?.toString() || '')}
          </h2>
        </div>
      </div>
      <div>
        {mergedItems && mergedItems.length > 0 ? (
          <div className="flex flex-wrap gap-4 overflow-auto p-6">
            {mergedItems.map((tmdb) => {
              const matchedItems = data.watchlistItems
                ? data.watchlistItems.filter(
                    (item) => item.itemId.toString() === tmdb.id.toString(),
                  )
                : []

              return (
                <div
                  key={tmdb.id}
                  className="min-md:max-w-[268px] card h-[600px] w-full max-w-[268px]"
                  onClick={() => {}}
                >
                  {matchedItems.length > 0 &&
                    matchedItems.map((item) => (
                      <WatchItemCard
                        key={item.id}
                        tmdbItem={tmdb}
                        watchlistItem={item}
                      />
                    ))}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No movies found in this watchlist.
          </div>
        )}
      </div>
    </div>
  )
}

const PageControls = ({
  isFullPage,
  watchlistId,
}: {
  isFullPage?: boolean
  watchlistId: string
}) => {
  return (
    <>
      {isFullPage && (
        <Link
          href={`/lists`}
          className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 p-2 backdrop-blur-md transition-all hover:bg-black/30"
        >
          <LuArrowLeft className="text-lg" />
        </Link>
      )}
      {!isFullPage && (
        <Link
          href={`/lists/${watchlistId}`}
          target="_blank"
          className="absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 p-2 backdrop-blur-md transition-all hover:bg-black/30"
        >
          <LuExternalLink className="text-lg" />
        </Link>
      )}
    </>
  )
}

export default WatchlistDetail
