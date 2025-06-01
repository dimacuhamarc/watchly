/** @format */

'use client'

import React, { useEffect, useState } from 'react'
import {
  type movieDetails,
  type credits,
  type videos,
  type keywords,
  type watchProviders,
  type collection,
} from '~/utils/types/tmdb-types'
import {
  getMovieDetails,
  getCredits,
  getVideos,
  getKeywords,
  getWatchProviders,
} from '~/utils/api/tmdb'
import { useRouter } from 'next/navigation'
import {
  MovieOverview,
  KeywordsSection,
  CastSection,
} from '~/components/resource/items/section'
import {
  TrailerModal,
  WatchProviderModal,
  PosterModal,
} from '~/components/global/modals'
import { findBestVideo } from '~/helpers/item-data'
import AddToWatchlistModal from '../../watchlist/AddToWatchlistModal'
import Image from 'next/image'

interface MoviePageComponentProps {
  id: string
}

function MoviePageComponent({ id }: MoviePageComponentProps) {
  const [movie, setMovie] = useState<movieDetails | null>(null)
  const [credits, setCredits] = useState<credits | null>(null)
  const [videos, setVideos] = useState<videos | null>(null)
  const [keywords, setKeywords] = useState<keywords | null>(null)
  const [watchProviders, setWatchProviders] = useState<watchProviders | null>(
    null,
  )
  const [belongsToCollection, setBelongsToCollection] = useState<collection | null>(null)
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false)
  const [isWatchProviderModalOpen, setIsWatchProviderModalOpen] =
    useState(false)
  const [isExpandPosterModalOpen, setIsExpandPosterModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          movieData,
          creditsData,
          videosData,
          keywordsData,
          watchProvidersData,
        ] = await Promise.all([
          getMovieDetails(id),
          getCredits(id, 'movie'),
          getVideos(id, 'movie'),
          getKeywords(id, 'movie'),
          getWatchProviders(id, 'movie'),
        ])

        if (!movieData) {
          router.push('/404')
          return
        }

        setMovie(movieData)
        setCredits(creditsData)
        setVideos(videosData)
        setKeywords(keywordsData)
        setWatchProviders(watchProvidersData)
        setBelongsToCollection(movieData.belongs_to_collection ?? null)
      } catch (error) {
        console.error('Error fetching movie data:', error)
        router.push('/404')
      }
    }

    void fetchData()
  }, [id, router])

  const { title } = movie ?? {}

  console.log(belongsToCollection)
  return (
    <>
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path ?? ''}`}
        alt={movie?.title ?? 'Movie Backdrop'}
        className="fixed inset-0 -z-10 h-screen w-screen object-cover opacity-40"
        width={1920}
        height={1080}
        priority
      />
      {movie && credits && videos && (
        <MovieOverview
          movie={movie}
          credits={credits}
          videos={videos}
          setShowTrailerModal={setIsTrailerModalOpen}
          setShowWatchProviderModal={setIsWatchProviderModalOpen}
          setShowExpandPosterModal={setIsExpandPosterModalOpen}
        />
      )}

      <div>
        {belongsToCollection && (
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <h2 className="text-2xl font-bold">Part of</h2>
            <div className="flex flex-col items-center gap-4">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${belongsToCollection.poster_path}`}
                alt={belongsToCollection.name}
                width={300/2}
                height={450/2}
                className="rounded-lg"
              />
              <span className="text-lg font-semibold">{belongsToCollection.name}</span>
            </div>
          </div>
        )}
      </div>

      {keywords && <KeywordsSection keywords={keywords} />}
      {credits && <CastSection credits={credits} />}
      {videos?.results?.length && isTrailerModalOpen && (
        <TrailerModal
          videoKey={findBestVideo(videos)}
          isOpen={isTrailerModalOpen}
          onClose={() => setIsTrailerModalOpen(false)}
        />
      )}
      {isWatchProviderModalOpen && (
        <WatchProviderModal
          isOpen={isWatchProviderModalOpen}
          onClose={() => setIsWatchProviderModalOpen(false)}
          title={movie?.title ?? ''}
          watchProviders={watchProviders}
        />
      )}
      {isExpandPosterModalOpen && (
        <PosterModal
          isOpen={isExpandPosterModalOpen}
          onClose={() => setIsExpandPosterModalOpen(false)}
          posterPath={movie?.poster_path ?? ''}
        />
      )}
      <AddToWatchlistModal tmdbId={id} title={title ?? ''} type='MOVIE' />
    </>
  )
}

export default MoviePageComponent
