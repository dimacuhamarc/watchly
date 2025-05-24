import { useState, useEffect } from 'react'
import MovieQuotes from '~/utils/constants/movie-quotes'

export default function useMovieQuote() {
  const [quote, setQuote] = useState<string | null>(null)
  const [movie, setMovie] = useState<string | null>(null)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MovieQuotes.length)
    const randomQuote = MovieQuotes[randomIndex]?.quote
    const randomMovie = MovieQuotes[randomIndex]?.movie
    if (randomQuote) {
      setQuote(randomQuote)
    }
    if (randomMovie) {
      setMovie(randomMovie)
    }
  }, [])

  return { quote, movie }
}
