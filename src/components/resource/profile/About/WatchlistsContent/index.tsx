import React, { useCallback } from "react";

import { LuPlus } from "react-icons/lu";
import type { Watchlist } from "~/utils/types/watchlist";
import { WatchlistCard } from "~/components/global/cards/index";

const WatchlistsContent = React.memo(function WatchlistsContent({ watchlists }: { watchlists: Watchlist[] }) {
  const handleCreateClick = useCallback(() => {
    console.log("Create a watchlist");
  }, []);
  
  return (
    <>
      <button
        className="btn btn-ghost sticky border border-slate-700/50 top-0 z-10 flex w-full items-center gap-2 rounded-lg bg-slate-900/50 text-left shadow-md transition-all duration-200 ease-in-out hover:opacity-80"
        onClick={handleCreateClick}
        type="button"
      >
        <LuPlus className="h-8 w-8 text-xs text-primary" />
        <h2 className="text-lg font-semibold">Create a Watchlist</h2>
      </button>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {watchlists?.length > 0 ? (
          watchlists.map((watchlist) => (
            <WatchlistCard key={watchlist.id} watchlist={watchlist} />
          ))
        ) : (
          <p className="text-md text-slate-400">No watchlists available</p>
        )}
      </div>
    </>
  );
});

export default WatchlistsContent;
