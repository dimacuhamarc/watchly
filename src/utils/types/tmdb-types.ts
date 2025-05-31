/** @format */

type searchResult = {
  page: number
  results: show[] | tvShow[]
  total_pages: number
  total_results: number
}

type show = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type tvShow = {
  id: number
  name: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  original_language: string
  origin_country: string[]
  backdrop_path: string
  video: boolean
}

type tvDetails = {
  adult: boolean
  backdrop_path: string
  created_by: {
    id: number
    credit_id: string
    name: string
    original_name: string
    gender: number
    profile_path: string
  }[]
  episode_run_time: number[]
  first_air_date: string
  genres: genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    episode_type: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
  }
  name: string
  next_episode_to_air: string | null
  networks: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  seasons: {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
  }[]
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

type genre = {
  id: number
  name: string
}

type keywords = {
  id: number
  keywords: keyword[]
}

type keyword = {
  id: number
  name: string
}

type collection = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

type movieDetails = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type cast = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
}

type crew = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

type credits = {
  id: number
  cast: cast[]
  crew: crew[]
}

type videos = {
  id: number
  results: {
    id: string
    key: string
    name: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    iso_3166_1: string
    iso_639_1: string
  }[]
}

type watchProviders = {
  id: number
  results: Record<string, watchProvider>
}

type watchProvider = {
  link: string
  flatrate?: {
    logo_path: string
    provider_name: string
    display_priority: number
    provider_id: number
  }[]
  buy?: {
    logo_path: string
    provider_name: string
    display_priority: number
    provider_id: number
  }[]
  rent?: {
    logo_path: string
    provider_name: string
    display_priority: number
    provider_id: number
  }[]
}

export type {
  searchResult,
  show,
  genre,
  keyword,
  keywords,
  movieDetails,
  credits,
  videos,
  cast,
  crew,
  watchProviders,
  watchProvider,
  tvShow,
  tvDetails,
  collection,
}
