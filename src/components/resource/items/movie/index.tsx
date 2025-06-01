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
import { GeneralCard } from '~/components/global/cards'

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
  const [belongsToCollection, setBelongsToCollection] =
    useState<collection | null>(null)
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false)
  const [isWatchProviderModalOpen, setIsWatchProviderModalOpen] =
    useState(false)
  const [isExpandPosterModalOpen, setIsExpandPosterModalOpen] = useState(false)

  const [activeTab, setActiveTab] = useState<
    'cast' | 'collection' | 'keywords'
  >('cast')
  const router = useRouter()
  console.log(belongsToCollection)
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
      <div
        role="tablist"
        className="tabs tabs-bordered w-full self-start md:w-auto"
      >
        <a
          role="tab"
          className={`tab ${activeTab === 'cast' && 'tab-active'}`}
          onClick={() => setActiveTab('cast')}
        >
          Cast
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 'keywords' && 'tab-active'}`}
          onClick={() => setActiveTab('keywords')}
        >
          Keywords
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 'collection' && 'tab-active'}`}
          onClick={() => setActiveTab('collection')}
        >
          Collection
        </a>
      </div>
      {keywords && activeTab === 'keywords' && (
        <KeywordsSection keywords={keywords} />
      )}
      {credits && activeTab === 'cast' && <CastSection credits={credits} />}
      {belongsToCollection && activeTab === 'collection' && (
        <div>
          {belongsToCollection && (
            <GeneralCard
              src={belongsToCollection.poster_path ?? ''}
              label={belongsToCollection.name}
            />
          )}
        </div>
      )}

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
      <AddToWatchlistModal tmdbId={id} title={title ?? ''} type="MOVIE" />
    </>
  )
}

export default MoviePageComponent
