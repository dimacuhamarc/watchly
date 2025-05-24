'use client'

import React, { useState, useEffect } from 'react'
import { SearchBar } from '~/components/global/inputs'
import { ShowCard, SkeletonCard } from '~/components/global/cards'
import type { searchResult } from '~/utils/types/tmdb-types'
import useArtificialDelay from '~/hooks/useArtificialDelay'
import useMovieQuote from '~/hooks/useMovieQuote'
import { searchMovie } from '~/utils/api/tmdb'
import { useRouter } from 'next/navigation'

function SearchPageComponent() {
  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<searchResult | null>(null)
  const [searchType, setSearchType] = useState<'movie' | 'tv'>('movie')
  const [searchLength, setSearchLength] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [shouldStartDelay, setShouldStartDelay] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const quote = useMovieQuote()
  const isLoading = useArtificialDelay(shouldStartDelay ? 1000 : 0)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && shouldStartDelay) {
      setShouldStartDelay(false)
    }
  }, [isLoading, shouldStartDelay])

  const handleSearchResults = (results: searchResult, searchQuery: string) => {
    setShouldStartDelay(true)
    setSearch(searchQuery)
    if (
      results?.results?.length === 0 ||
      results?.results?.length === undefined
    ) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
      results.results.sort((a, b) => {
        const aRating = 'vote_average' in a ? a.vote_average : 0
        const bRating = 'vote_average' in b ? b.vote_average : 0
        return bRating - aRating
      })
      setSearchResults(results)
      setSearchLength(results.results.length)
    }
  }

  const handlePageChange = async (page: number) => {
    window.scrollTo(0, 0)
    setPage(page)
    const results = await searchMovie(search, page)
    setSearchResults(results)
    setSearchLength(results.results.length)
  }

  const handleShowCardClick = (id: number) => {
    if (searchType === 'movie') {
      router.push(`/movie/${id}`)
    } else {
      router.push(`/tv/${id}`)
    }
  }

  const renderContent = () => {
    if (isLoading && shouldStartDelay) {
      return Array.from({ length: searchLength }).map((_, index) => (
        <SkeletonCard key={index} />
      ))
    }

    if (searchResults?.results) {
      return searchResults.results
        .map((result) => {
          if ('poster_path' in result && result.poster_path !== null) {
            return (
              <ShowCard
                key={result.id}
                result={result}
                onClick={() => handleShowCardClick(result.id)}
              />
            )
          }
          return null
        })
        .filter(Boolean)
    }

    return null
  }

  return (
    <>
      <SearchBar
        onSearchResults={handleSearchResults}
        onClear={() => setPage(1)}
        onSetSearchType={setSearchType}
      />
      {isEmpty ? (
        <div className="my-auto w-3/4 text-center">
          <p className="text-2xl">&quot;{quote.quote}&quot;</p>
          <span className="text-base">- {quote.movie}</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {renderContent()}
          </div>
          <div className="join">
            <button
              className="btn join-item"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              «
            </button>
            <button className="btn join-item">{page}</button>
            <button
              className="btn join-item"
              disabled={page === searchResults?.total_pages}
              onClick={() => handlePageChange(page + 1)}
            >
              »
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default SearchPageComponent
