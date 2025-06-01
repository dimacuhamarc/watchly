/** @format */

'use client'

import React, { useState, useEffect } from 'react'
import {
  type tvDetails,
  type credits,
  type videos,
  type keywords,
  type watchProviders,
} from '~/utils/types/tmdb-types'
import { useRouter } from 'next/navigation'
import {
  getKeywords,
  getTvDetails,
  getWatchProviders,
  getVideos,
  getCredits,
} from '~/utils/api/tmdb'
import {
  TvOverview,
  KeywordsSection,
  CastSection,
} from '~/components/resource/items/section'
import { findBestVideo } from '~/helpers/item-data'
import {
  TrailerModal,
  WatchProviderModal,
  PosterModal,
} from '~/components/global/modals'
import Image from 'next/image'
import AddToWatchlistModal from '../../watchlist/AddToWatchlistModal'
import SeasonsSection from '../section/seasons'

interface TVPageComponentProps {
  id: string
}

function TVPageComponent({ id }: TVPageComponentProps) {
  const [tv, setTv] = useState<tvDetails | null>(null)
  const [credits, setCredits] = useState<credits | null>(null)
  const [videos, setVideos] = useState<videos | null>(null)
  const [keywords, setKeywords] = useState<keywords | null>(null)
  const [watchProviders, setWatchProviders] = useState<watchProviders | null>(
    null,
  )
  const [showTrailerModal, setShowTrailerModal] = useState(false)
  const [showWatchProviderModal, setShowWatchProviderModal] = useState(false)
  const [showExpandPosterModal, setShowExpandPosterModal] = useState(false)
  const [seasons, setSeasons] = useState<tvDetails['seasons'] | null>(null)
  const [activeTab, setActiveTab] = useState<
    'cast' | 'seasons' | 'keywords'
  >('cast')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          tvData,
          creditsData,
          videosData,
          keywordsData,
          watchProvidersData,
        ] = await Promise.all([
          getTvDetails(id),
          getCredits(id, 'tv'),
          getVideos(id, 'tv'),
          getKeywords(id, 'tv'),
          getWatchProviders(id, 'tv'),
        ])

        if (!tvData) {
          router.push('/404')
          return
        }

        setTv(tvData)
        setCredits(creditsData)
        setVideos(videosData)
        setKeywords(keywordsData)
        setWatchProviders(watchProvidersData)
        setSeasons(tvData.seasons)
        console.log('TV Data:', tvData.seasons)
      } catch (error) {
        console.error('Error fetching tv data:', error)
        router.push('/404')
      }
    }

    void fetchData()
  }, [id, router])

  console.log(seasons)

  return (
    <>
      <Image
        src={`https://image.tmdb.org/t/p/original/${tv?.backdrop_path ?? ''}`}
        alt={tv?.name ?? 'Movie Backdrop'}
        className="fixed inset-0 -z-10 h-screen w-screen object-cover opacity-40"
        width={1920}
        height={1080}
        priority
      />
      {tv && credits && videos && (
        <TvOverview
          tv={tv}
          credits={credits}
          videos={videos}
          setShowTrailerModal={setShowTrailerModal}
          setShowWatchProviderModal={setShowWatchProviderModal}
          setShowExpandPosterModal={setShowExpandPosterModal}
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
          className={`tab ${activeTab === 'seasons' && 'tab-active'}`}
          onClick={() => setActiveTab('seasons')}
        >
          Seasons
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 'keywords' && 'tab-active'}`}
          onClick={() => setActiveTab('keywords')}
        >
          Keywords
        </a>
      </div>
      {keywords && activeTab === 'keywords' && <KeywordsSection keywords={keywords} />}
      {credits && activeTab === 'cast' && <CastSection credits={credits} />}
      {seasons && activeTab === 'seasons' && <SeasonsSection seasons={seasons} />}
      
      {videos?.results?.length && showTrailerModal && (
        <TrailerModal
          videoKey={findBestVideo(videos)}
          isOpen={showTrailerModal}
          onClose={() => setShowTrailerModal(false)}
        />
      )}
      {watchProviders && showWatchProviderModal && (
        <WatchProviderModal
          isOpen={showWatchProviderModal}
          onClose={() => setShowWatchProviderModal(false)}
          title={tv?.name ?? ''}
          watchProviders={watchProviders}
        />
      )}
      {showExpandPosterModal && (
        <PosterModal
          isOpen={showExpandPosterModal}
          onClose={() => setShowExpandPosterModal(false)}
          posterPath={tv?.poster_path ?? ''}
        />
      )}
      <AddToWatchlistModal tmdbId={id} title={tv?.name ?? ''} type="TV_SHOW" />
    </>
  )
}

export default TVPageComponent
