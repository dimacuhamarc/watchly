"use client";

import React, { useEffect, useState } from "react";
import {
  type movieDetails,
  type movieCredits,
  type movieVideos,
} from "~/utils/types/tmdb-types";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from "~/utils/api/tmdb";
import { useRouter } from "next/navigation";
import { ItemOverview } from "~/components/resource/items/section";
import { TrailerModal } from "~/components/global/modals";
import { findBestVideo } from "~/utils/data-formatting/item-data";
interface MoviePageComponentProps {
  id: string;
}

function MoviePageComponent({ id }: MoviePageComponentProps) {
  const [movie, setMovie] = useState<movieDetails | null>(null);
  const [credits, setCredits] = useState<movieCredits | null>(null);
  const [videos, setVideos] = useState<movieVideos | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, creditsData, videosData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
        ]);

        if (!movieData) {
          router.push("/404");
          return;
        }

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData);
        console.log(creditsData);
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
        />
      )}
      {videos?.results?.length && isTrailerModalOpen && (
        <TrailerModal
          videoKey={findBestVideo(videos)}
          isOpen={isTrailerModalOpen}
          onClose={() => setIsTrailerModalOpen(false)}
        />
      )}
    </>
  );
}

export default MoviePageComponent;
