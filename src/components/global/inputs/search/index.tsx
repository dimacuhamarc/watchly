/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import React, { useState, useEffect } from 'react'
import { FaSearch, FaArrowRight } from 'react-icons/fa'
import { searchMovie, getSearchSuggestions, searchTv } from '~/utils/api/tmdb'
import type { searchResult, show, tvShow } from '~/utils/types/tmdb-types'
import { getTitle } from '~/helpers/item-data'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

interface props {
  onSearchResults: (results: searchResult, searchQuery: string) => void
  onClear: () => void
  onSetSearchType: (type: 'movie' | 'tv') => void
}

export default function SearchComponent({
  onSearchResults,
  onClear,
  onSetSearchType,
}: props) {
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<(show | tvShow)[]>([])
  const [searchType, setSearchType] = useState<'movie' | 'tv'>('movie')
  const debouncedSearch = useDebounce(search, 300) // 300ms delay

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      void handleSuggestions()
      void handleSearch()
    } else if (debouncedSearch.length === 0) {
      setSuggestions([])
      onSearchResults(
        {
          page: 1,
          results: [],
          total_pages: 1,
          total_results: 0,
        },
        '',
      )
    } else {
      setSuggestions([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, searchType])

  const handleSearch = async () => {
    if (searchType === 'movie') {
      const data = await searchMovie(search)
      onSearchResults(data, search)
    } else {
      const data = await searchTv(search)
      onSearchResults(data, search)
    }
  }

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearch('')
    setSuggestions([])
    setSearchType(searchType)
    onSetSearchType(searchType)
    onSearchResults(
      {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      },
      '',
    )
    onClear?.()
  }

  const handleSuggestions = async () => {
    const data = await getSearchSuggestions(debouncedSearch, searchType)
    const uniqueTitles = Array.from(
      new Set(
        data.map((item) => {
          if ('title' in item) {
            return item.title
          }
          return item.name
        }),
      ),
    ).map((title) => {
      return data.find((item) => {
        if ('title' in item) {
          return item.title === title
        }
        return item.name === title
      })
    })
    setSuggestions(
      uniqueTitles.filter((item): item is show | tvShow => {
        if (!item) return false
        return true
      }),
    )
  }

  const onSearchTypeChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: 'movie' | 'tv',
  ) => {
    e.preventDefault()
    setSearchType(type === 'movie' ? 'tv' : 'movie')
    setSearch('')
    setSuggestions([])
    onSetSearchType(type === 'movie' ? 'tv' : 'movie')
  }

  return (
    <div className="dropdown w-full">
      <label className="input input-md input-bordered flex w-full items-center gap-2 rounded-full transition-all duration-300 md:input-lg">
        <ul className="menu menu-horizontal menu-xs mr-0 gap-2 rounded-box md:menu-sm md:pr-2">
          {searchType === 'movie' && (
            <li>
              <button
                className={`btn btn-xs md:btn-sm ${searchType === 'movie' ? 'btn-primary' : ''}`}
                onClick={(e) => {
                  onSearchTypeChange(e, 'movie')
                }}
              >
                MOVIE
              </button>
            </li>
          )}
          {searchType === 'tv' && (
            <li>
              <button
                className={`btn btn-xs md:btn-sm ${searchType === 'tv' ? 'btn-primary' : ''}`}
                onClick={(e) => {
                  onSearchTypeChange(e, 'tv')
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
          placeholder={`Search for ${searchType === 'movie' ? 'Movies' : 'TV Shows'}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              void handleSearch()
              setSuggestions([])
            }
          }}
        />

        {search.length > 0 && (
          <div className="flex flex-row items-center gap-2">
            <button className="btn btn-circle btn-sm" onClick={handleSearch}>
              <FaArrowRight />
            </button>
            <button
              className="btn btn-sm max-md:absolute max-md:right-[13%] max-md:mt-24 max-md:translate-x-[50%]"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        )}
      </label>

      {suggestions.length > 0 && (
        <ul className="menu dropdown-content z-50 mt-4 w-full rounded-box bg-base-200 p-2 shadow-lg">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <button
                className="py-2"
                onClick={() => {
                  setSearch(getTitle(suggestion))
                  setSuggestions([])
                  void handleSearch()
                }}
              >
                {getTitle(suggestion)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
