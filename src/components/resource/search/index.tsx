"use client"

import React, { useState, useEffect } from 'react'
import { SearchBar } from '~/components/global/inputs'
import { ShowCard, SkeletonCard } from '~/components/global/cards'
import type { searchResult, show } from '~/utils/types/tmdb-types'
import useArtificialDelay from '~/hooks/useArtificialDelay'

function SearchPageComponent() {
  const [searchResults, setSearchResults] = useState<searchResult | null>(null);
  const [searchLength, setSearchLength] = useState<number>(0);
  const [shouldStartDelay, setShouldStartDelay] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const isLoading = useArtificialDelay(shouldStartDelay ? 1000 : 0);

  useEffect(() => {
    if (!isLoading && shouldStartDelay) {
      setShouldStartDelay(false);
    }
  }, [isLoading, shouldStartDelay]);
  
  const handleSearchResults = (results: searchResult) => {
    setShouldStartDelay(true);
    if (results?.results?.length === 0 || results?.results?.length === undefined) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      results.results.sort(
        (a: show, b: show) => b.vote_average - a.vote_average,
      );
      setSearchResults(results);
      setSearchLength(results.results.length);
    }
  };

  const renderContent = () => {
    if (isLoading && shouldStartDelay) {
      return Array.from({ length: searchLength }).map((_, index) => (
        <SkeletonCard key={index} />
      ));
    }

    if (searchResults?.results) {
      return searchResults.results.map(
        (result: show) =>
          result.poster_path !== null && (
            <ShowCard key={result.id} result={result} />
          ),
      );
    } else if (isEmpty) {
      return <div className="text-center text-2xl">No results found</div>;
    }

    return null;
  };
  
  return (
    <>
      <SearchBar onSearchResults={handleSearchResults} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {renderContent()}
      </div>
    </>
  )
}

export default SearchPageComponent