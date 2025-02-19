/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"

import React, { useState } from 'react'
import { FaSearch, FaArrowRight } from 'react-icons/fa'
import { searchMovie } from '~/utils/api/tmdb'

interface props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSearchResults: (results: any) => void
}

export default function SearchComponent({ onSearchResults }: props) {
  const [search, setSearch] = useState("")

  const handleSearch = async () => {
    const data = await searchMovie(search)
    onSearchResults(data)
  }
  
  return (
    <label className="input input-bordered flex w-full md:input-lg input-md items-center gap-2 transition-all duration-300 rounded-full">
      <FaSearch className="text-gray-400" />
      <input type="text" className="grow" placeholder="Search Shows and Movies" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          void handleSearch()
        }
      }} />
      <button className="btn btn-circle btn-sm" onClick={handleSearch}><FaArrowRight /></button>
    </label>
  )
}
