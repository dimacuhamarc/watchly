
const WatchlistItemStatus = {
  WANT_TO_WATCH: "WANT_TO_WATCH",
  WATCHING: "WATCHING",
  WATCHED: "WATCHED",
  DROPPED: "DROPPED",
  SKIPPED: "SKIPPED",
  FINISHED: "FINISHED",
  RECOMMENDED: "RECOMMENDED",
} as const;

type WatchlistItemStatusType = (typeof WatchlistItemStatus)[keyof typeof WatchlistItemStatus];

export { WatchlistItemStatus, type WatchlistItemStatusType };

const Media = {
  MOVIE: "MOVIE",
  TV_SHOW: "TV_SHOW",
} as const;

type MediaType = (typeof Media)[keyof typeof Media];

export { Media, type MediaType };

interface SanitizedUserData {
  id: string;
  email: string;
  username: string;
  bio?: string;
  first_name?: string;
  last_name?: string;
  created_at?: Date | string;
  profile_picture?: string;
}

interface CookieUserData {
  id: string;
  email: string;
  username: string;
}

export type { SanitizedUserData, CookieUserData };