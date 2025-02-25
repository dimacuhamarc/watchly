"use client";

import React, { useState, useEffect } from 'react'
import {
  type tvDetails,
  type credits,
  type videos,
  type keywords,
  type watchProviders,
} from "~/utils/types/tmdb-types";
import { useRouter } from "next/navigation";
import { getKeywords, getTvDetails, getWatchProviders, getVideos, getCredits } from '~/utils/api/tmdb';
import { TvOverview, KeywordsSection, CastSection } from "~/components/resource/items/section";
import { findBestVideo } from '~/utils/data-formatting/item-data';
import { TrailerModal, WatchProviderModal, PosterModal } from '~/components/global/modals';

interface TVPageComponentProps {
  id: string;
}

function TVPageComponent({ id }: TVPageComponentProps) {
  const [tv, setTv] = useState<tvDetails | null>(null);
  const [credits, setCredits] = useState<credits | null>(null);
  const [videos, setVideos] = useState<videos | null>(null);
  const [keywords, setKeywords] = useState<keywords | null>(null);
  const [watchProviders, setWatchProviders] = useState<watchProviders | null>(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [showWatchProviderModal, setShowWatchProviderModal] = useState(false);
  const [showExpandPosterModal, setShowExpandPosterModal] = useState(false);
  

  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tvData, creditsData, videosData, keywordsData, watchProvidersData] = await Promise.all([
          getTvDetails(id),
          getCredits(id, "tv"),
          getVideos(id, "tv"),
          getKeywords(id, "tv"),
          getWatchProviders(id, "tv"),
        ]);

        if (!tvData) {
          router.push("/404");
          return;
        }

        setTv(tvData);
        setCredits(creditsData);
        setVideos(videosData);
        setKeywords(keywordsData);
        setWatchProviders(watchProvidersData);
      } catch (error) {
        console.error("Error fetching tv data:", error);
        router.push("/404");
      }
    };

    void fetchData();
  }, [id, router]);

  return (
    <>
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
      {keywords && <KeywordsSection keywords={keywords} />}
      {credits && <CastSection credits={credits} />}
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
          title={tv?.name ?? ""}
          watchProviders={watchProviders} 
        />
      )}
      {showExpandPosterModal && (
        <PosterModal
          isOpen={showExpandPosterModal}
          onClose={() => setShowExpandPosterModal(false)}
          posterPath={tv?.poster_path ?? ""}
        />
      )}
    </>
  )
}

export default TVPageComponent;
