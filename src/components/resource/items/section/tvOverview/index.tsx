import React from "react";
import type { credits, tvDetails, videos } from "~/utils/types/tmdb-types";
import Image from "next/image";
import { DisplayAvatar } from "~/components/global/avatars";
import {
  FaCalendar,
  FaExternalLinkAlt,
  FaHeart,
  FaPlay,
  FaTv,
} from "react-icons/fa";
import { DecoratedTextWithIcon } from "~/components/global/decorated-text";
import { FaStar } from "react-icons/fa";
import { formatDate, formatRuntime } from "~/utils/data-formatting/date";
import { RoundedChip } from "~/components/global/chips";

interface TvOverviewProps {
  tv: tvDetails;
  credits: credits;
  videos: videos;
  setShowTrailerModal: (show: boolean) => void;
  setShowWatchProviderModal: (show: boolean) => void;
}

function TvOverview({
  tv,
  credits,
  videos,
  setShowTrailerModal,
  setShowWatchProviderModal,
}: TvOverviewProps) {
  const onTrailerClick = () => {
    setShowTrailerModal(true);
  };

  const onWatchlistClick = () => {
    // console.log("Watchlist clicked");
  };

  const onWhereToWatchClick = () => {
    setShowWatchProviderModal(true);
  };

  const getCrewMembers = (crew: credits["crew"], jobs: string[]) => {
    return crew
      .filter((member) => jobs.includes(member.job))
      .sort((a, b) => b.popularity - a.popularity);
  };

  return (
    <div className="flex flex-col justify-center gap-8 md:flex-row md:gap-4">
      <div className="relative h-[500px] w-[300px] flex-shrink-0 md:h-[600px] md:w-[400px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${tv?.poster_path}`}
          priority={true}
          alt={tv?.name || ""}
          fill
          className="rounded-2xl object-cover transition-all duration-300"
        />
      </div>
      <div className="flex flex-col gap-6 px-0 md:px-8">
        <div className="flex flex-col">
          <span className="text-2xl font-bold md:text-4xl">{tv?.name}</span>
          <span className="font text-lg md:text-xl">{tv?.tagline}</span>
        </div>
        <div className="flex flex-row gap-2 md:gap-4">
          <DecoratedTextWithIcon
            text={
              tv?.vote_average === 0
                ? "No Rating"
                : tv?.vote_average.toString() + "/10" || "No Rating"
            }
            icon={<FaStar className="text-yellow-500" />}
          />
          <DecoratedTextWithIcon
            text={
              tv?.first_air_date === ""
                ? "No Release Date"
                : formatDate(tv?.first_air_date || "No Available Date")
            }
            icon={<FaCalendar className="text-yellow-500" />}
          />
          <DecoratedTextWithIcon
            text={
              tv?.number_of_seasons === 0
                ? "No Seasons"
                : tv?.number_of_seasons.toString() +
                    (tv?.number_of_seasons === 1 ? " Season" : " Seasons") ||
                  "No Seasons"
            }
            icon={<FaTv className="text-yellow-500" />}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tv?.genres.map((genre) => (
            <RoundedChip key={genre.id} label={genre.name} />
          ))}
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <button className="btn btn-primary" onClick={onWhereToWatchClick}>
            <FaExternalLinkAlt /> Where to Watch
          </button>
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
        <p className="text-balance text-base">{tv?.overview}</p>

        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          {getCrewMembers(credits?.crew ?? [], ["Executive Producer"]).length >
            0 && (
            <div>
              <h1 className="mb-2 text-base">Executive Producers</h1>
              <div className="flex flex-col gap-4">
                {getCrewMembers(credits?.crew ?? [], ["Executive Producer"])
                  .slice(0, 3)
                  .map((producer) => (
                    <DisplayAvatar
                      key={producer.id}
                      name={producer.name}
                      image={producer.profile_path ?? ""}
                    />
                  ))}
              </div>
            </div>
          )}
          {getCrewMembers(credits?.crew ?? [], [
            "Producer",
            "Co-Producer",
            "Writer",
          ]).length > 0 && (
            <div>
              <h1 className="mb-2 text-base">Producers</h1>
              <div className="flex flex-col gap-4">
                {getCrewMembers(credits?.crew ?? [], [
                  "Producer",
                  "Co-Producer",
                  "Writer",
                ])
                  .slice(0, 3)
                  .map((producer) => (
                    <DisplayAvatar
                      key={producer.id}
                      name={producer.name}
                      image={producer.profile_path ?? ""}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TvOverview;
