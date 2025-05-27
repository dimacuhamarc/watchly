import axios from 'axios'
import type {
  searchResult,
  genre,
  keywords,
  movieDetails,
  credits,
  videos,
  watchProviders,
  tvDetails,
} from '~/utils/types/tmdb-types'

const tmdbApiLongKey = process.env.NEXT_PUBLIC_TMDB_API_LONGKEY

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
})

export const tmdbApiLong = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_LONGKEY}`,
  },
})

export const searchMovie = async (query: string, page = 1) => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    params: { query: query, language: 'en-US', page: page.toString() },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data as searchResult
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const searchTv = async (query: string, page = 1) => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/tv',
    params: { query: query, language: 'en-US', page: page.toString() },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data as searchResult
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getGenres = async (genres_ids: number[]) => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list',
    params: { with_genres: genres_ids.join(',') },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data as genre[]
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getKeywords = async (id: string, type: 'movie' | 'tv') => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/${type}/${id}/keywords`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  }
  try {
    const response = await axios.request(options)
    if (type === 'tv') {
      const data = response.data as {
        results: Array<{ id: number; name: string }>
      }
      return {
        id: parseInt(id),
        keywords: data.results,
      } as keywords
    }
    return response.data as keywords
  } catch (error) {
    console.error('Error fetching keywords:', error)
    return null
  }
}

export const getMovieDetails = async (id: string) => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data as movieDetails
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getCredits = async (id: string, type: 'movie' | 'tv') => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/${type}/${id}/credits`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data as credits
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getVideos = async (id: string, type: 'movie' | 'tv') => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/${type}/${id}/videos`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data as videos
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getSearchSuggestions = async (
  query: string,
  type: 'movie' | 'tv',
) => {
  if (!query || query.length < 2) return []

  const options = {
    method: 'GET',
    url:
      type === 'movie'
        ? 'https://api.themoviedb.org/3/search/movie'
        : 'https://api.themoviedb.org/3/search/tv',
    params: {
      query: query,
      include_adult: 'true',
      language: 'en-US',
      page: '1',
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  }

  try {
    const response = await axios.request(options)
    const results = response.data as searchResult
    return results.results.slice(0, 5)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getWatchProviders = async (id: string, type: 'movie' | 'tv') => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/${type}/${id}/watch/providers`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data as watchProviders
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getTvDetails = async (id: string) => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${id}`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data as tvDetails
  } catch (error) {
    console.error(error)
    return null
  }
}



// const tmdbIds = [1242, 13335, 550];
// const apiKey = 'YOUR_TMDB_API_KEY';

// async function fetchMovieDetails() {
//   const results = await Promise.all(
//     tmdbIds.map(id =>
//       fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
//         .then(res => res.json())
//     )
//   );

//   console.log(results); // Array of movie objects
// }

// fetchMovieDetails();

export const getBatchMovieDetails = async (ids: string[]) => {
  if (!ids || ids.length === 0) return []

  const movies = await Promise.all(
    ids.map(async (id) => {
      try {
        const response = await tmdbApiLong.get(`/movie/${id}`, {
          params: { language: 'en-US' },
        })
        return response.data as movieDetails
      } catch (error) {
        console.error(`Error fetching details for movie ID ${id}:`, error)
        return null
      }
    }),
  )
  return movies.filter((movie) => movie !== null) as movieDetails[]
}

export const getBatchTvDetails = async (ids: string[]) => {
  if (!ids || ids.length === 0) return []

  const shows = await Promise.all(
    ids.map(async (id) => {
      try {
        const response = await tmdbApiLong.get(`/tv/${id}`, {
          params: { language: 'en-US' },
        })
        return response.data as tvDetails
      } catch (error) {
        console.error(`Error fetching details for TV ID ${id}:`, error)
        return null
      }
    }),
  )
  return shows.filter((show) => show !== null) as tvDetails[]
}