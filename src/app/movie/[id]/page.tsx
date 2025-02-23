"use client"

import React, { useEffect, useState } from 'react'
import { getMovieDetails } from '~/utils/api/tmdb'
import { movieDetails } from '~/utils/types/tmdb-types';

function MovieItemPage({ params }: { params: { id: string } }) {
  const { id }: { id: string } = React.use(params);
  const [movie, setMovie] = useState<movieDetails | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await getMovieDetails(id);
      setMovie(movie);
    }
    void fetchMovie();
  }, [id]);

  console.log(movie);

  return (
    <div>
      <h1>Movie Item Page</h1>
      <p>{id} == {movie?.id}</p>
      <h1>{movie?.title}</h1>
      <p>{movie?.overview}</p>
      <p>{movie?.release_date}</p>
      <p>{movie?.vote_average}</p>
      <p>{movie?.vote_count}</p>
      <p>{movie?.runtime}</p>
    </div>
  )
}

export default MovieItemPage