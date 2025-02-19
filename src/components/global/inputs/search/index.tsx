/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import React, { useState } from 'react'
import { FaSearch, FaArrowRight } from 'react-icons/fa'
import { searchMovie, getSearchSuggestions } from '~/utils/api/tmdb'
import type { searchResult, show } from '~/utils/types/tmdb-types'

interface props {
  onSearchResults: (results: searchResult) => void
}

export default function SearchComponent({ onSearchResults }: props) {
  const [search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState<show[]>([])

  const handleSearch = async () => {
    const data = await searchMovie(search)
    onSearchResults(data)
  }

  const handleClear = () => {
    setSearch("")
    setSuggestions([])
    onSearchResults({
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    })
  }

  const handleSuggestions = async () => {
    const data = await getSearchSuggestions(search)
    
    const uniqueTitles = Array.from(
      new Set(data.map((item) => item.title))
    ).map((title) => {
      return data.find((item) => item.title === title)
    })

    setSuggestions(uniqueTitles.filter((item): item is NonNullable<typeof item> => item !== undefined))
  }

  return (
    <div className="dropdown w-full">
      <label className="input input-bordered flex w-full md:input-lg input-md items-center gap-2 transition-all duration-300 rounded-full">
        <FaSearch className="text-gray-400" />
        <input 
          type="text" 
          className="grow" 
          placeholder="Search Shows and Movies" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              void handleSearch()
              setSuggestions([])
            }
          }} 
          onKeyUp={handleSuggestions}
        />
        <button className="btn btn-circle btn-sm" onClick={handleSearch}>
          <FaArrowRight />
        </button>
        {search.length > 0 && 
          <button className="btn btn-sm" onClick={handleClear}>Clear</button>
        }
      </label>

      {suggestions.length > 0 && (
        <ul className="dropdown-content menu bg-base-200 w-full mt-4 p-2 shadow-lg rounded-box z-50">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <button 
                className="py-2"
                onClick={() => {
                  setSearch(suggestion.title)
                  setSuggestions([])
                  void handleSearch()
                }}
              >
                {suggestion.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
