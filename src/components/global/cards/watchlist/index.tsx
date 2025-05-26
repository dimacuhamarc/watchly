import { LuListVideo } from 'react-icons/lu'
import { formatDate } from '~/helpers/date'
import type { Watchlist } from '~/utils/types/watchlist'

interface WatchlistCardProps {
  type: 'list-page' | 'profile-page'
  watchlist: Watchlist
  onClick?: () => void
  active?: boolean
}

const WatchlistCard = ({ type, watchlist, onClick, active }: WatchlistCardProps) => {
  return (
    <div className={`flex w-full cursor-pointer flex-row items-center gap-4 rounded-xl border  p-4 shadow-sm transition-opacity duration-200 ease-in-out hover:opacity-80 ${active ? 'border-primary/50 bg-primary/10' : 'border-slate-700/50 bg-slate-900/50'}`} onClick={onClick}>
      <div className="flex h-12 w-12 flex-row items-center justify-center rounded-lg bg-primary/10 p-1">
        <LuListVideo className="h-8 w-8 text-xs text-primary" />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{watchlist.title}</h2>
        <p className="text-sm text-slate-200/50">
          {watchlist.public_watchlist
            ? 'Public Watchlist'
            : 'Private Watchlist'}
        </p>
        <p className="text-sm text-slate-200/50">
          {watchlist.createdAt === watchlist.updatedAt
            ? `Created on ${formatDate(watchlist.createdAt.toLocaleString())}`
            : `Updated on ${formatDate(watchlist.updatedAt.toLocaleString())}`}
        </p>
        {
          type === 'list-page' && (
            <p className="text-sm text-slate-200/50">
              {watchlist.description
                ? watchlist.description.length > 100
                  ? `${watchlist.description.slice(0, 100)}...`
                  : watchlist.description
                : 'No description provided.'}
            </p>
          )
        }
      </div>
    </div>
  )
}

export default WatchlistCard
