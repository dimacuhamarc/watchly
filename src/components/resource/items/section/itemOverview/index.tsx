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
import { RoundedChip, RectangleChip } from "~/components/global/chips";
import { DecoratedTextWithIcon } from "~/components/global/decorated-text";
import Link from "next/link";
import {
  type movieDetails,
  type movieCredits,
  type movieVideos,
} from "~/utils/types/tmdb-types";
import { DisplayAvatar } from "~/components/global/avatars";
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
    <div className="flex flex-col justify-center gap-8 md:flex-row md:gap-4">
      <div className="relative h-[500px] w-[300px] md:h-[600px] md:w-[400px] flex-shrink-0">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          priority={true}
          alt={movie?.title || ""}
          fill
          className="rounded-2xl object-cover transition-all duration-300"
        />
      </div>
      <div className="flex flex-col gap-6 px-0 md:px-8">
        <div className="flex flex-col">
          <span className="text-2xl font-bold md:text-4xl">{movie?.title}</span>
          <span className="font text-lg md:text-xl">{movie?.tagline}</span>
        </div>
        <div className="flex flex-row gap-2 md:gap-4">
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
            <RoundedChip key={genre.id} label={genre.name} />
          ))}
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
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
        <p className="text-base text-balance">{movie?.overview}</p>

        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <div>
            <h1 className="mb-2 text-base">Directed by</h1>
            <DisplayAvatar
              name={
                credits?.crew.find((crew) => crew.job === "Director")?.name ??
                ""
              }
              image={
                credits?.crew.find((crew) => crew.job === "Director")
                  ?.profile_path ?? ""
              }
            />
          </div>
          <div>
            <h1 className="mb-2 text-base">Produced by</h1>
            <DisplayAvatar
              name={
                credits?.crew.find((crew) => crew.job === "Producer")?.name ??
                ""
              }
              image={
                credits?.crew.find((crew) => crew.job === "Producer")
                  ?.profile_path ?? ""
              }
            />
          </div>
          <div>
            <h1 className="mb-2 text-base">Story by</h1>
            <DisplayAvatar
              name={
                credits?.crew.find(
                  (crew) => crew.job === "Novel" || crew.job === "Writer",
                )?.name ?? ""
              }
              image={
                credits?.crew.find(
                  (crew) => crew.job === "Novel" || crew.job === "Writer",
                )?.profile_path ?? ""
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemOverview;
