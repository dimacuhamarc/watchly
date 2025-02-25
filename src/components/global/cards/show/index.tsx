import React from "react";
import Image from "next/image";
import { FaStar, FaArrowRight } from "react-icons/fa";
import type { show, tvShow } from "~/utils/types/tmdb-types";
import { DecoratedTextWithIcon } from "../../decorated-text";
import { formatDate } from "~/utils/data-formatting/date";
import { getTitle, getReleaseDate } from "~/utils/data-formatting/item-data";

interface ShowProps {
  result: show | tvShow;
  onClick: () => void;
}

function Show({ result, onClick }: ShowProps) {
  return (
    <div className="card-wrapper h-[600px] max-w-[400px] min-md:max-w-[268px]" key={result.id} onClick={onClick}>
      <div className="group card transition-all duration-300 hover:scale-95 hover:bg-gray-100/20">
        <div className="card-body flex flex-col items-center justify-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
            alt={getTitle(result)}
            width={500}
            height={500}
            className="max-h-[402px] min-h-[402px] max-w-[268px] rounded-2xl transition-all duration-300 group-hover:translate-y-2 group-hover:scale-110"
          />
          <div className="card-section flex w-full flex-row items-center justify-between transition-all duration-300 group-hover:-mb-2 group-hover:mt-8">
            <div className="w-full">
              <h2 className="w-full truncate text-md md:text-xl font-bold">
                {getTitle(result)}
              </h2>
              <p className="text-sm md:text-base">
                {" "}
                {getReleaseDate(result) ? formatDate(getReleaseDate(result)!) : null}
              </p>
              <DecoratedTextWithIcon
                text={
                  result.vote_average === 0
                    ? "No Rating"
                    : result.vote_average.toFixed(1) + "/10" || "No Rating"
                }
                icon={<FaStar className="text-yellow-500" />}
              />
            </div>
            <div className="card-actions hidden transition-all duration-300 group-hover:block">
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;
