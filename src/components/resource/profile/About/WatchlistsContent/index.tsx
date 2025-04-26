import React from "react";

import { LuPlus } from "react-icons/lu";
import type { Watchlist } from "~/utils/types/watchlist";
import { WatchlistCard } from "~/components/global/cards/index";

function WatchlistsContent({ watchlists }: { watchlists: Watchlist[] }) {
  return (
    <>
      <button
        className="btn btn-ghost sticky top-0 z-10 flex w-full items-center gap-2 rounded-lg border-2 border-slate-900/50 bg-slate-900/50 text-left shadow-md transition-all duration-200 ease-in-out hover:opacity-80"
        onClick={() => {
          console.log("Create a watchlist");
        }}
        type="button"
      >
        <LuPlus className="h-8 w-8 text-xs text-primary" />
        <h2 className="text-lg font-semibold">Create a Watchlist</h2>
      </button>
      <div className="flex flex-col gap-2 overflow-y-auto md:max-h-[220px]">
        {watchlists?.map((watchlist) => (
          <WatchlistCard key={watchlist.id} watchlist={watchlist} />
        ))}
        {watchlists?.map((watchlist) => (
          <WatchlistCard key={watchlist.id} watchlist={watchlist} />
        ))}
      </div>
    </>
  );
}

export default WatchlistsContent;
