import type {
  SanitizedWatchlistCollection,
  WatchlistResponse,
} from '~/utils/types/data'
import WatchlistCard from '~/components/global/cards/watchlist'

interface ListViewProps {
  watchlists: SanitizedWatchlistCollection[]
  onWatchlistClick: (watchlistId: string) => void
  activeWatchlistId?: string | null
  setActiveWatchlistData: (data: WatchlistResponse | null) => void
}

const ListView = ({
  watchlists,
  onWatchlistClick,
  activeWatchlistId,
}: ListViewProps) => {
  if (watchlists.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No watchlists found. Create a new one to get started!
      </div>
    )
  }

  const handleOnClick = (watchlistId: string) => {
    onWatchlistClick(watchlistId)
  }

  return (
    <div className="flex flex-col">
      {watchlists && (
        <div className="flex flex-col gap-2">
          {watchlists
            .slice() // avoid mutating the original array
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
            )
            .map((watchlist) => (
              <WatchlistCard
                key={watchlist.id}
                type="list-page"
                watchlist={watchlist}
                onClick={() => handleOnClick(watchlist.id)}
                active={watchlist.id === activeWatchlistId}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default ListView
