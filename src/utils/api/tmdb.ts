import axios from "axios";
import type {
  searchResult,
  genre,
  keywords,
  movieDetails,
  movieCredits,
  movieVideos,
  watchProviders,
} from "~/utils/types/tmdb-types";

const tmdbApiLongKey = process.env.NEXT_PUBLIC_TMDB_API_LONGKEY;

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
});

export const tmdbApiLong = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_LONGKEY}`,
  },
});

export const searchMovie = async (query: string, page = 1) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: { query: query, language: "en-US", page: page.toString() },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data as searchResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchTv = async (query: string, page = 1) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/tv",
    params: { query: query, language: "en-US", page: page.toString() },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data as searchResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGenres = async (genres_ids: number[]) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/genre/movie/list",
    params: { with_genres: genres_ids.join(",") },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data as genre[];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getKeywords = async (id: string) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/keywords`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data as keywords;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMovieDetails = async (id: string) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data as movieDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMovieCredits = async (id: string) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/credits`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data as movieCredits;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMovieVideos = async (id: string) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/videos`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data as movieVideos;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSearchSuggestions = async (query: string, type: "movie" | "tv") => {
  if (!query || query.length < 2) return [];

  const options = {
    method: "GET",
    url: type === "movie" ? "https://api.themoviedb.org/3/search/movie" : "https://api.themoviedb.org/3/search/tv",
    params: {
      query: query,
      include_adult: "true",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  };

  try {
    const response = await axios.request(options);
    const results = response.data as searchResult;
    console.log(results);
    return results.results.slice(0, 5);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWatchProviders = async (id: string) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiLongKey}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data as watchProviders;
  } catch (error) {
    console.error(error);
    return null;
  }
};
