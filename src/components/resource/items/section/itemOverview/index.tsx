import React from "react";
import Image from "next/image";
import {
  FaStar,
  FaCalendar,
  FaClock,
  FaExternalLinkAlt,
  FaPlay,
  FaHeart,
} from "react-icons/fa";
import { formatDate, formatRuntime } from "~/utils/data-formatting/date";
import Chip from "~/components/global/chips";
import { DecoratedTextWithIcon } from "~/components/global/decorated-text";
import Link from "next/link";
import {
  type movieDetails,
  type movieCredits,
  type movieVideos,
} from "~/utils/types/tmdb-types";

interface ItemOverviewProps {
  movie: movieDetails;
  credits: movieCredits;
  videos: movieVideos;
  setShowTrailerModal: (show: boolean) => void;
}

function ItemOverview({
  movie,
  credits,
  videos,
  setShowTrailerModal,
}: ItemOverviewProps) {
  const onTrailerClick = () => {
    setShowTrailerModal(true);
  };

  const onWatchlistClick = () => {
    console.log("Watchlist clicked");
  };

  const onWhereToWatchClick = () => {
    console.log("Where to watch clicked");
  };

  return (
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
        <div className="flex flex-row gap-4">
          <Link
            className="btn btn-primary"
            href={`https://www.google.com/search?q=${movie?.title} where to watch`}
            onClick={onWhereToWatchClick}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt /> Where to Watch
          </Link>
          <button
            className="btn btn-primary"
            disabled={!videos?.results?.length}
            onClick={onTrailerClick}
          >
            <FaPlay /> Trailer
          </button>
          <button
            className="btn-white btn btn-outline cursor-not-allowed"
            disabled={true}
            onClick={onWatchlistClick}
          >
            <FaHeart /> Add to Watchlist
          </button>
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
      </div>
    </div>
  );
}

export default ItemOverview;

{
  /* <h1>Cast</h1>
        <div className="flex w-full flex-row">
          {credits?.cast.slice(0, 5).map((cast) => (
            <div key={cast.id} className="flex w-full flex-row items-center gap-2">
              <div className="avatar">
                <div className="h-8 w-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
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
        </div> */
}
