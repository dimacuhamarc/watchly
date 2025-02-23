"use client";

import React, { useEffect, useState } from "react";
import {
  movieDetails,
  movieCredits,
  movieVideos,
} from "~/utils/types/tmdb-types";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from "~/utils/api/tmdb";
import Chip from "~/components/global/chips";
import Image from "next/image";
import { FaStar, FaCalendar, FaClock, FaTimes } from "react-icons/fa";
import { DecoratedTextWithIcon } from "~/components/global/decorated-text";
import { useRouter } from "next/navigation";
import { formatDate, formatRuntime } from "~/utils/data-formatting/date";
import Link from "next/link";

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
      <div className="flex flex-row justify-center gap-4">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={movie?.title || ""}
          width={400}
          height={500}
          className="max-h-[502px] min-h-[402px] rounded-2xl transition-all duration-300"
        />
        <div className="flex flex-col gap-4 px-8">
          <div className="flex flex-col">
            <span className="text-4xl font-bold">{movie?.title}</span>
            <span className="font text-xl">{movie?.tagline}</span>
          </div>
          <div className="flex flex-row gap-4">
            <DecoratedTextWithIcon
              text={
                movie?.vote_average === 0
                  ? "No Rating"
                  : movie?.vote_average.toString() + "/10" || "No Rating"
              }
              icon={<FaStar className="text-yellow-500" />}
            />
            <DecoratedTextWithIcon
              text={
                movie?.release_date === ""
                  ? "No Release Date"
                  : formatDate(movie?.release_date || "No Available Date")
              }
              icon={<FaCalendar className="text-yellow-500" />}
            />
            <DecoratedTextWithIcon
              text={
                movie?.runtime === 0
                  ? "No Runtime"
                  : formatRuntime(movie?.runtime || 0) || "No Runtime"
              }
              icon={<FaClock className="text-yellow-500" />}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {movie?.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} />
            ))}
          </div>
          <p>{movie?.overview}</p>
          <h1>Directed by</h1>
          <a
            href={`https://www.google.com/search?q=${credits?.crew.find((crew) => crew.job === "Director")?.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {credits?.crew.find((crew) => crew.job === "Director")?.name}
          </a>
          <h1>Cast</h1>
          <div className="flex w-full flex-row">
            {credits?.cast.slice(0, 5).map((cast) => (
              <div className="flex w-full flex-row items-center gap-2">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                      alt={cast.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <span>{cast.name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-4">
            <Link
              className="btn btn-primary"
              href={`https://www.google.com/search?q=${movie?.title} where to watch`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Where to Watch
            </Link>
            <button
              className="btn btn-primary"
              disabled={!videos?.results?.length}
              onClick={() => setIsTrailerModalOpen(true)}
            >
              Trailer
            </button>
            <Link
              className="btn-white btn btn-outline cursor-not-allowed"
              href="#"
            >
              Add to Watchlist
            </Link>
          </div>
        </div>
      </div>
      {videos?.results?.length && (
        <TrailerModal
          videoKey={findBestVideo(videos)}
          isOpen={isTrailerModalOpen}
          onClose={() => setIsTrailerModalOpen(false)}
        />
      )}
    </>
  );
}

const findBestVideo = (videos: movieVideos | null) => {
  if (!videos?.results?.length) return "";
  const officialTrailer = videos.results.find(
    (video) =>
      video.official && video.type === "Trailer" && video.site === "YouTube",
  );
  if (officialTrailer) return officialTrailer.key;
  const trailer = videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  if (trailer) return trailer.key;
  const teaser = videos.results.find(
    (video) => video.type === "Teaser" && video.site === "YouTube",
  );
  if (teaser) return teaser.key;
  return videos.results[0]?.key || "";
};

interface TrailerModalProps {
  videoKey: string;
  isOpen: boolean;
  onClose: () => void;
}

function TrailerModal({ videoKey, isOpen, onClose }: TrailerModalProps) {
  if (!isOpen) return null;

  if (!videoKey) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black opacity-75"
          onClick={onClose}
        ></div>
        <div className="relative z-50 w-full max-w-6xl p-4 text-center text-white">
          <p>No trailer available for this movie</p>
          <button
            className="mt-4 text-white hover:text-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-75"
        onClick={onClose}
      ></div>
      <div className="relative z-50 w-full max-w-6xl">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full rounded-xl"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
          ></iframe>
        </div>
        <button
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
          onClick={onClose}
        >
          <div className="btn btn-circle btn-sm" onClick={onClose}>
            <FaTimes />
          </div>
        </button>
      </div>
    </div>
  );
}

export default MoviePageComponent;
