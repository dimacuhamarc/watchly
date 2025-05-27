const WatchlistItemStatus = {
  WANT_TO_WATCH: 'WANT_TO_WATCH',
  WATCHING: 'WATCHING',
  WATCHED: 'WATCHED',
  DROPPED: 'DROPPED',
  SKIPPED: 'SKIPPED',
  FINISHED: 'FINISHED',
  RECOMMENDED: 'RECOMMENDED',
} as const

type WatchlistItemStatusType =
  (typeof WatchlistItemStatus)[keyof typeof WatchlistItemStatus]

export { WatchlistItemStatus, type WatchlistItemStatusType }

const Media = {
  MOVIE: 'MOVIE',
  TV_SHOW: 'TV_SHOW',
} as const

type MediaType = (typeof Media)[keyof typeof Media]

export { Media, type MediaType }

interface SanitizedUserData {
  id: string
  email: string
  username: string
  bio: string
  first_name?: string
  last_name?: string
  created_at?: Date | string
  profile_picture?: string
  public_profile?: boolean
  location?: string
}

interface SanitizedProfileData extends SanitizedUserData {
  followers?: number
  following?: number
  isCurrentUser?: boolean | null
}

interface SanitizedWatchlistCollection {
  id: string
  title: string
  description?: string
  public_watchlist: boolean
  cover_image?: string
  createdAt: Date | string
  updatedAt: Date | string
  items: SanitizedWatchlistItem[]
  userId: string
}

interface SanitizedWatchlistItem {
  id: string
  watchlistId: string
  itemId: string
  mediaType: MediaType
  status: WatchlistItemStatusType
  notes?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

interface WatchlistMetadata {
  count: number
  owner: string
}

interface WatchlistResponse {
  watchlistData: SanitizedWatchlistCollection | null
  watchlistItems: SanitizedWatchlistItem[] | null
  metadata: WatchlistMetadata
}

interface ApiResponse<T> {
  status: 'success' | 'error'
  message: string
  data?: T
  error?: string
}
interface CookieUserData {
  id: string
  email: string
  username: string
}

interface UserFollowData {
  followers: number
  following: number
}

interface ProfileState {
  state: {
    status: string
    message: string
    ownProfileData: SanitizedProfileData
  }
}

export type {
  SanitizedUserData,
  CookieUserData,
  UserFollowData,
  SanitizedProfileData,
  ProfileState,
  ApiResponse,
  SanitizedWatchlistCollection,
  SanitizedWatchlistItem,
  WatchlistMetadata,
  WatchlistResponse,
}
