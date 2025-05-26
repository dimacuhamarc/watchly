import type { SanitizedWatchlistCollection } from '~/utils/types/data'
import WatchlistCard from '~/components/global/cards/watchlist'

interface ListViewProps {
  watchlists: SanitizedWatchlistCollection[]
  onWatchlistClick: (watchlistId: string) => void
  activeWatchlistId?: string | null
  setActiveWatchlistData: (data: SanitizedWatchlistCollection | null) => void
}

const ListView = ({ watchlists, onWatchlistClick, activeWatchlistId, setActiveWatchlistData }: ListViewProps) => {
  if (watchlists.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No watchlists found. Create a new one to get started!
      </div>
    )
  }

  const handleOnClick = (watchlistId: string) => {
    onWatchlistClick(watchlistId)
    const selectedWatchlist = watchlists.find(w => w.id === watchlistId) ?? null
    setActiveWatchlistData(selectedWatchlist)
  }

  return (
    <div className="flex flex-col">
      {watchlists && (
        <div className='flex flex-col gap-2'>
          {watchlists.map((watchlist) => (
            <WatchlistCard
              key={watchlist.id}
              type="list-page"
              watchlist={watchlist}
              onClick={() => handleOnClick(watchlist.id)}
              active={watchlist.id === activeWatchlistId ? true : false}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ListView
