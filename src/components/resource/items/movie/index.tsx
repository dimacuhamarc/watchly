"use client";

import React, { useEffect, useState } from "react";
import {
  type movieDetails,
  type movieCredits,
  type movieVideos,
  type keywords,
  type watchProviders,
} from "~/utils/types/tmdb-types";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getKeywords,
  getWatchProviders,
} from "~/utils/api/tmdb";
import { useRouter } from "next/navigation";
import { ItemOverview, KeywordsSection, CastSection } from "~/components/resource/items/section";
import { TrailerModal, WatchProviderModal } from "~/components/global/modals";
import { findBestVideo } from "~/utils/data-formatting/item-data";

interface MoviePageComponentProps {
  id: string;
}

function MoviePageComponent({ id }: MoviePageComponentProps) {
  const [movie, setMovie] = useState<movieDetails | null>(null);
  const [credits, setCredits] = useState<movieCredits | null>(null);
  const [videos, setVideos] = useState<movieVideos | null>(null);
  const [keywords, setKeywords] = useState<keywords | null>(null);
  const [watchProviders, setWatchProviders] = useState<watchProviders | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [isWatchProviderModalOpen, setIsWatchProviderModalOpen] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, creditsData, videosData, keywordsData, watchProvidersData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
          getKeywords(id),
          getWatchProviders(id),
        ]);

        if (!movieData) {
          router.push("/404");
          return;
        }

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData);
        setKeywords(keywordsData);
        setWatchProviders(watchProvidersData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        router.push("/404");
      }
    };

    void fetchData();
  }, [id, router]);

  return (
    <>
      {movie && credits && videos && (
        <ItemOverview
          movie={movie}
          credits={credits}
          videos={videos}
          setShowTrailerModal={setIsTrailerModalOpen}
          setShowWatchProviderModal={setIsWatchProviderModalOpen}
        />
      )}
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
          title={movie?.title || ""}
          watchProviders={watchProviders}
        />
      )}
    </>
  );
}

export default MoviePageComponent;
