/** @format */

'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import type { SanitizedWatchlistItem } from '~/utils/types/data'
import type { movieDetails, tvDetails } from '~/utils/types/tmdb-types'
import { formatDate } from '~/helpers/date'
import { RoundedChip } from '../../chips'
import Link from 'next/link'
import { LuArrowRight, LuInfo } from 'react-icons/lu'

const STATUS_MAP = {
  WANT_TO_WATCH: 'Want to Watch',
  WATCHING: 'Watching',
  WATCHED: 'Watched',
  DROPPED: 'Dropped',
  SKIPPED: 'Skipped',
  FINISHED: 'Finished',
  RECOMMENDED: 'Recommended',
}

const MEDIA_TYPE_MAP = {
  MOVIE: 'Film',
  TV_SHOW: 'TV',
  DEFAULT: 'Unknown',
}

interface WatchItemProps {
  tmdbItem: movieDetails | tvDetails
  watchlistItem: SanitizedWatchlistItem
}

const WatchItem = ({ tmdbItem, watchlistItem }: WatchItemProps) => {
  const [isToggled, setIsToggled] = useState(false)
  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  return (
    <div
      key={watchlistItem.itemId}
      onClick={handleToggle}
      className={`card relative duration-300 *:transition-all hover:scale-95 hover:bg-gray-100/20`}
    >
      <div
        className={`absolute left-1 right-1 top-4 z-10 flex h-full flex-col items-start gap-2 rounded-full ${isToggled ? '' : 'hidden'} px-2 py-1 text-xs text-white`}
      >
        {isToggled && (
          <>
            <h1 className="flex items-center gap-2 text-xl font-semibold">
              {('title' in tmdbItem ? tmdbItem.title : tmdbItem.name) ?? ''}
              <RoundedChip
                label={watchlistItem.mediaType in MEDIA_TYPE_MAP ? MEDIA_TYPE_MAP[watchlistItem.mediaType as keyof typeof MEDIA_TYPE_MAP] : MEDIA_TYPE_MAP.DEFAULT}
              />
            </h1>
            <span className="text-sm text-gray-300">
              {tmdbItem.genres.map((genre) => genre.name).join(', ')}
            </span>
            <span className="text-sm text-gray-300">
              {'runtime' in tmdbItem && tmdbItem.runtime
                ? `${tmdbItem.runtime} min`
                : ''}
            </span>
            <p className="text-justify">{tmdbItem.overview}</p>
            <RoundedChip
              label={STATUS_MAP[watchlistItem.status] || 'Unknown'}
            />
            <span className="text-sm text-gray-300">
              Last updated at{' '}
              {formatDate(watchlistItem.updatedAt?.toString() ?? '')}
            </span>
          </>
        )}
        <div className="absolute bottom-10 right-6 flex w-full items-center justify-end gap-2">
          <Link
            href={`/${watchlistItem.mediaType === 'MOVIE' ? 'movie' : 'tv'}/${watchlistItem.itemId}`}
            className={` z-20 flex h-8 w-fit items-center justify-center rounded-full bg-gray-800/50 px-2 text-white transition-all duration-300 hover:bg-gray-800`}
            onClick={(e) => {
              e.stopPropagation()
              setIsToggled(!isToggled)
            }}
          >
            View Movie <LuArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href={`#`}
            className={`z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800/50 text-white transition-all duration-300 hover:bg-gray-800`}
            onClick={(e) => {
              e.stopPropagation()
              setIsToggled(!isToggled)
            }}
          >
            <LuInfo className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${tmdbItem.poster_path}`}
        alt={'title' in tmdbItem ? tmdbItem.title : tmdbItem.name}
        width={500}
        height={500}
        className={`${isToggled ? 'blur-sm brightness-50' : 'bg-white'} group max-h-[402px] min-h-[402px] max-w-[268px] rounded-2xl transition-all duration-300 group-hover:translate-y-2 group-hover:scale-110`}
      />
    </div>
  )
}

export default WatchItem
