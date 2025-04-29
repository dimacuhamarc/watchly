import React, { useCallback } from "react";

import { LuPlus } from "react-icons/lu";
import { WatchlistCard } from "~/components/global/cards/index";
import WatchlistModal from "~/components/resource/watchlist/modal";
import { useWatchlist } from "~/hooks/useWatchlist";

interface WatchlistsContentProps {
  isCurrentUser: boolean;
  userId: string;
}

const WatchlistsContent = function WatchlistsContent({
  isCurrentUser,
  userId,
}: WatchlistsContentProps) {
  const {
    watchlistLoaded,
    fetchWatchlistData,
    watchlists: hookWatchlists,
  } = useWatchlist(userId);

  const handleCreateClick = useCallback(() => {
    console.log("Create a watchlist");
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal?.showModal();
  }, []);

  const handleAddWatchlist = useCallback(() => {
    void fetchWatchlistData(userId);
  }, [fetchWatchlistData, userId]);

  const SortedWatchlists =
    hookWatchlists.length === 0
      ? []
      : hookWatchlists.sort((a, b) => {
          const aDate = new Date(a.createdAt).getTime();
          const bDate = new Date(b.createdAt).getTime();
          return bDate - aDate;
        });

  return (
    <>
      {isCurrentUser && (
        <button
          className="btn btn-ghost sticky top-0 z-10 flex w-full items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/50 text-left shadow-md transition-all duration-200 ease-in-out hover:opacity-80"
          onClick={handleCreateClick}
          type="button"
        >
          <LuPlus className="h-8 w-8 text-xs text-primary" />
          <h2 className="text-lg font-semibold">Create a Watchlist</h2>
        </button>
      )}
      <div className="flex max-h-[320px] flex-col gap-2 overflow-y-auto">
        {SortedWatchlists?.length > 0 &&
          watchlistLoaded &&
          SortedWatchlists.map((watchlist) =>
            !watchlist.public_watchlist && !isCurrentUser ? null : (
              <WatchlistCard key={watchlist.id} watchlist={watchlist} />
            ),
          )}
      </div>
      <WatchlistModal onAddWatchlist={handleAddWatchlist} />
    </>
  );
};

export default WatchlistsContent;
