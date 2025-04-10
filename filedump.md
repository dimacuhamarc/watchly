const userlist = await db.select().from(users);

const response = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.TMDB_API_KEY}`);
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const data = await response.json();

const watchProvidersResponse = await fetch(`https://api.themoviedb.org/3/movie/550/watch/providers?api_key=${process.env.TMDB_API_KEY}`);
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const watchProvidersData = await watchProvidersResponse.json();

movie id 250

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
const filteredWatchProvidersData = watchProvidersData.results.PH.flatrate;

console.log(data);


console.log(filteredWatchProvidersData);


interface MovieData {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  tagline: string;
}

interface WatchProvidersData {
  results: {
    PH: {
      flatrate: Array<{
        logo_path: string;
        provider_name: string;
      }>;
    };
  };
}

{/*

<p>📺 Track Your Watchlist</p>
<p>💡 Get Personalized Recommendations</p>
<p>🌎 Find What&apos;s Available Near You</p> */}