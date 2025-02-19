import React from "react";
import Image from "next/image";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { show } from "~/utils/types/tmdb-types";

interface ShowProps {
  result: show;
}

function Show({ result }: ShowProps) {
  return (
    <div className="card-wrapper h-[600px] max-w-[400px] min-md:max-w-[268px]" key={result.id}>
      <div className="group card transition-all duration-300 hover:scale-95 hover:bg-gray-100/20">
        <div className="card-body flex flex-col items-center justify-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
            alt={result.title}
            width={500}
            height={500}
            className="max-h-[402px] min-h-[402px] max-w-[268px] rounded-2xl transition-all duration-300 group-hover:translate-y-2 group-hover:scale-110"
          />
          <div className="card-section flex w-full flex-row items-center justify-between transition-all duration-300 group-hover:-mb-2 group-hover:mt-8">
            <div className="w-full">
              <h2 className="w-full truncate text-md md:text-xl font-bold">
                {result.title}
              </h2>
              <p className="text-sm md:text-base">
                {" "}
                {new Date(result.release_date).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm md:text-base flex flex-row items-center gap-1">
                {" "}
                {result.vote_average} <FaStar className="text-yellow-500" />
              </p>
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
