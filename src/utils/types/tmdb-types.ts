
type searchResult = {
  page: number;
  results: show[];
  total_pages: number;
  total_results: number;
}

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
}

type genre = {
  id: number;
  name: string;
}

type keywords = {
  id: number;
  keywords: keyword[];
}

type keyword = {
  id: number;
  name: string;
}

// {
//   "adult": false,
//   "backdrop_path": "/cyecB7godJ6kNHGONFjUyVN9OX5.jpg",
//   "belongs_to_collection": {
//     "id": 131292,
//     "name": "Iron Man Collection",
//     "poster_path": "/2Oa2vNw7Ht5yXjIBHAzWNnkG6Y4.jpg",
//     "backdrop_path": "/rI8zOWkRQJdlAyQ6WJOSlYK6JxZ.jpg"
//   },
//   "budget": 140000000,
//   "genres": [
//     {
//       "id": 28,
//       "name": "Action"
//     },
//     {
//       "id": 878,
//       "name": "Science Fiction"
//     },
//     {
//       "id": 12,
//       "name": "Adventure"
//     }
//   ],
//   "homepage": "https://www.marvel.com/movies/iron-man",
//   "id": 1726,
//   "imdb_id": "tt0371746",
//   "origin_country": [
//     "US"
//   ],
//   "original_language": "en",
//   "original_title": "Iron Man",
//   "overview": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
//   "popularity": 64.14,
//   "poster_path": "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
//   "production_companies": [
//     {
//       "id": 420,
//       "logo_path": "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
//       "name": "Marvel Studios",
//       "origin_country": "US"
//     },
//     {
//       "id": 7505,
//       "logo_path": "/837VMM4wOkODc1idNxGT0KQJlej.png",
//       "name": "Marvel Entertainment",
//       "origin_country": "US"
//     },
//     {
//       "id": 7297,
//       "logo_path": "/l29JYQVZbTcjZXoz4CUYFpKRmM3.png",
//       "name": "Fairview Entertainment",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "2008-04-30",
//   "revenue": 585174222,
//   "runtime": 126,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     },
//     {
//       "english_name": "Persian",
//       "iso_639_1": "fa",
//       "name": "فارسی"
//     },
//     {
//       "english_name": "Urdu",
//       "iso_639_1": "ur",
//       "name": "اردو"
//     },
//     {
//       "english_name": "Arabic",
//       "iso_639_1": "ar",
//       "name": "العربية"
//     }
//   ],
//   "status": "Released",
//   "tagline": "Heroes aren't born. They're built.",
//   "title": "Iron Man",
//   "video": false,
//   "vote_average": 7.648,
//   "vote_count": 26663
// }

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
}

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
}

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
}

type movieCredits = {
  id: number;
  cast: cast[];
  crew: crew[];
}

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
}



export type { searchResult, show, genre, keyword, keywords, movieDetails, movieCredits, movieVideos, cast, crew };


