
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
