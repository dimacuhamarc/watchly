type searchResult = {
  page: number;
  results: show[] | tvShow[];
  total_pages: number;
  total_results: number;
};

type show = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type tvShow = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  origin_country: string[];
  backdrop_path: string;
  video: boolean;
};

type genre = {
  id: number;
  name: string;
};

type keywords = {
  id: number;
  keywords: keyword[];
};

type keyword = {
  id: number;
  name: string;
};

type movieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
};

type crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

type movieCredits = {
  id: number;
  cast: cast[];
  crew: crew[];
};

type movieVideos = {
  id: number;
  results: {
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    iso_3166_1: string;
    iso_639_1: string;
  }[];
};

type watchProviders = {
  id: number;
  results: Record<string, watchProvider>;
};

type watchProvider = {
  link: string;
  flatrate?: {
    logo_path: string;
    provider_name: string;
    display_priority: number;
    provider_id: number;
  }[];
  buy?: {
    logo_path: string;
    provider_name: string;
    display_priority: number;
    provider_id: number;
  }[];
  rent?: {
    logo_path: string;
    provider_name: string;
    display_priority: number;
    provider_id: number;
  }[];
};

export type {
  searchResult,
  show,
  genre,
  keyword,
  keywords,
  movieDetails,
  movieCredits,
  movieVideos,
  cast,
  crew,
  watchProviders,
  watchProvider,
  tvShow,
};
