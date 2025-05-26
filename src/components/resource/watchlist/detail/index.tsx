'use client'

import Link from 'next/link'
import { LuExternalLink, LuArrowLeft } from 'react-icons/lu'
import type { WatchlistResponse } from '~/utils/types/data'
import { formatDate } from '~/helpers/date'

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
  if (!data || !data.watchlistData) {
    return (
      <div className="text-center text-gray-500">
        No watchlist data available.
      </div>
    )
  }
  return (
    <div className="relative">
      <PageControls isFullPage={isFullPage} watchlistId={watchlistId} />
      <h1 className="mb-4 text-2xl font-bold">{data?.watchlistData?.title}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p className="mb-2 text-sm text-slate-200/50">
        {data?.watchlistData?.public_watchlist
          ? 'Public Watchlist'
          : 'Private Watchlist'}
      </p>
      <p className="mb-4 text-sm text-slate-200/50">
        {data?.watchlistData?.createdAt === data?.watchlistData?.updatedAt && data?.watchlistData?.createdAt && data?.watchlistData?.updatedAt
          ? `Created on ${formatDate(data?.watchlistData?.createdAt.toLocaleString() ?? '')}`
          : `Updated on ${formatDate(data?.watchlistData?.updatedAt?.toLocaleString() ?? '')}`}
      </p>
      <p className="mb-6 text-sm text-slate-200/50">
        {data?.watchlistData?.description
          ? data?.watchlistData?.description.length > 100
            ? `${data?.watchlistData?.description.slice(0, 100)}...`
            : data?.watchlistData?.description
          : 'No description provided.'}
      </p>
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
