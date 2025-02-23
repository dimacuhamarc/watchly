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
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        priority={true}
        alt={movie?.title || ""}
        width={400}
        height={600}
        className="h-auto w-full rounded-2xl transition-all duration-300 md:h-[502px] md:min-h-[402px]"
      />
      <div className="flex flex-col gap-4 px-0 md:px-8">
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
        <p>{movie?.overview}</p>
        
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <div>
            <h1 className="text-base mb-2">Directed by</h1>
            <DisplayAvatar
              name={
                credits?.crew.find((crew) => crew.job === "Director")?.name ?? ""
              }
              image={
                credits?.crew.find((crew) => crew.job === "Director")?.profile_path ??
                ""
              }
            />
          </div>
          <div>
            <h1 className="text-base mb-2">Produced by</h1>
            <DisplayAvatar
              name={
                credits?.crew.find((crew) => crew.job === "Producer")?.name ?? ""
              }
              image={
                credits?.crew.find((crew) => crew.job === "Producer")?.profile_path ??
                ""
              }
            />
          </div>
          <div>
            <h1 className="text-base mb-2">Story by</h1>
            <DisplayAvatar
              name={
                credits?.crew.find((crew) => crew.job === "Novel" || crew.job === "Writer")?.name ?? ""
              }
              image={
                credits?.crew.find((crew) => crew.job === "Novel" || crew.job === "Writer")?.profile_path ??
                ""
              }
            />
          </div>
          
        </div>
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
