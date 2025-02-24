/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useState } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { searchMovie, getSearchSuggestions, searchTv } from "~/utils/api/tmdb";
import type { searchResult, show, tvShow } from "~/utils/types/tmdb-types";
import { getTitle } from "~/utils/data-formatting/item-data";
interface props {
  onSearchResults: (results: searchResult, searchQuery: string) => void;
  onClear: () => void;
}

export default function SearchComponent({ onSearchResults, onClear }: props) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<(show | tvShow)[]>([]);
  const [searchType, setSearchType] = useState<"movie" | "tv">("movie");

  const handleSearch = async () => {
    if (searchType === "movie") {
      const data = await searchMovie(search);
      onSearchResults(data, search);
    } else {
      const data = await searchTv(search);
      onSearchResults(data, search);
    }
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearch("");
    setSuggestions([]);
    setSearchType(searchType);
    onSearchResults(
      {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      },
      "",
    );
    onClear?.();
  };

  const handleSuggestions = async () => {
    const data = await getSearchSuggestions(search, searchType);
    const uniqueTitles = Array.from(
      new Set(data.map((item) => {
        if ('title' in item) {
          return item.title;
        }
        return (item).name;
      })),
    ).map((title) => {
      return data.find((item) => {
        if ('title' in item) {
          return item.title === title;
        }
        return (item).name === title;
      });
    });
    setSuggestions(
      uniqueTitles.filter((item): item is show | tvShow => {
        if (!item) return false;
        return true;
      })
    );
  };

  const onSearchTypeChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: "movie" | "tv",
  ) => {
    e.preventDefault();
    setSearchType(type === "movie" ? "tv" : "movie");
    setSearch("");
    setSuggestions([]);
  };

  return (
    <div className="dropdown w-full">
      <label className="input input-md input-bordered flex w-full items-center gap-2 rounded-full transition-all duration-300 md:input-lg">
        <ul className="menu menu-horizontal mr-0 gap-2 rounded-box pr-2">
          {searchType === "movie" && (
            <li>
              <button
                className={`btn btn-sm ${searchType === "movie" ? "btn-primary" : ""}`}
                onClick={(e) => {
                  onSearchTypeChange(e, "movie");
                }}
              >
                MOVIE
              </button>
            </li>
          )}
          {searchType === "tv" && (
            <li>
              <button
                className={`btn btn-sm ${searchType === "tv" ? "btn-primary" : ""}`}
                onClick={(e) => {
                  onSearchTypeChange(e, "tv");
                }}
              >
                TV
              </button>
            </li>
          )}
        </ul>
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          className="grow"
          placeholder={`Search for ${searchType === "movie" ? "Movies" : "TV Shows"}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              void handleSearch();
              setSuggestions([]);
            }
          }}
          onKeyUp={handleSuggestions}
        />

        {search.length > 0 && (
          <>
            <button className="btn btn-circle btn-sm" onClick={handleSearch}>
              <FaArrowRight />
            </button>
            <button className="btn btn-sm" onClick={handleClear}>
              Clear
            </button>
          </>
        )}
      </label>

      {suggestions.length > 0 && (
        <ul className="menu dropdown-content z-50 mt-4 w-full rounded-box bg-base-200 p-2 shadow-lg">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <button
                className="py-2"
                onClick={() => {
                  setSearch(getTitle(suggestion));
                  setSuggestions([]);
                  void handleSearch();
                }}
              >
                {getTitle(suggestion)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
