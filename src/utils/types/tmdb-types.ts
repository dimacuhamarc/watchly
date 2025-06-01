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

type seasons = {
  seasons: seasonItem[]
}

type seasonItem = {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
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
  seasons,
}

// similar to the item

// {
//   "page": 1,
//   "results": [
//     {
//       "adult": false,
//       "backdrop_path": "/1RAxtBxslR4OZCZC1vxIRUxjR7a.jpg",
//       "genre_ids": [
//         9648,
//         12,
//         35
//       ],
//       "id": 9637,
//       "original_language": "en",
//       "original_title": "Scooby-Doo",
//       "overview": "When the Mystery Inc. gang is invited to Spooky Island, a popular amusement park, they soon discover that the attractions aren't the only things that are spooky. Strange things are happening, and it's up to Scooby, Shaggy, Fred, Daphne, and Velma to uncover the truth behind the mysterious happenings.",
//       "popularity": 9.5366,
//       "poster_path": "/mTAiBJGg8mqEfnYHHbi37ZoRSZm.jpg",
//       "release_date": "2002-06-14",
//       "title": "Scooby-Doo",
//       "video": false,
//       "vote_average": 6.089,
//       "vote_count": 4524
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/ohcDvA5DfIuOrID3ZqsGQNv3AsI.jpg",
//       "genre_ids": [
//         10751,
//         16,
//         35,
//         12
//       ],
//       "id": 9642,
//       "original_language": "fr",
//       "original_title": "Astérix et les Vikings",
//       "overview": "Asterix and Obelix have been given a tough mission: Transform the chief's lazy nephew Justforkix into a warrior. When the Vikings abduct him and bring him back to their homeland, Asterix and Obelix must travel to Norway to rescue Justforkix.",
//       "popularity": 2.3229,
//       "poster_path": "/dW9h1Ez6PRx8PnZUVT27MnG8Wu5.jpg",
//       "release_date": "2006-04-12",
//       "title": "Asterix and the Vikings",
//       "video": false,
//       "vote_average": 6.1,
//       "vote_count": 717
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/6Cld2xtKYfWnWK3w3gfJRRA82vd.jpg",
//       "genre_ids": [
//         14,
//         35,
//         18
//       ],
//       "id": 9647,
//       "original_language": "en",
//       "original_title": "Scrooged",
//       "overview": "Frank Cross is a wildly successful television executive whose cold ambition and curmudgeonly nature has driven away the love of his life. But after firing a staff member on Christmas Eve, Frank is visited by a series of ghosts who give him a chance to re-evaluate his actions and right the wrongs of his past.",
//       "popularity": 4.7407,
//       "poster_path": "/uO0znfB2ZzTXA1IS7jkrjNbpkYK.jpg",
//       "release_date": "1988-11-22",
//       "title": "Scrooged",
//       "video": false,
//       "vote_average": 6.8,
//       "vote_count": 1573
//     },
//   ],
//   "total_pages": 11230,
//   "total_results": 224593
// }