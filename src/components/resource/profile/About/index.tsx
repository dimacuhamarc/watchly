"use client";

import React, { useState, useMemo, useCallback } from "react";
import AboutContent from "./AboutContent";
import FavoritesContent from "./FavoritesContent";
import ActivitiesContent from "./ActivitiesContent";
import WatchlistsContent from "./WatchlistsContent";

import type { Watchlist } from "~/utils/types/watchlist";

interface UserAboutProps {
  userData: {
    id: string;
    bio?: string;
  } | null;
  watchlistData: Watchlist[];
}

const UserAbout = React.memo(function UserAbout({ userData, watchlistData }: UserAboutProps) {
  const [activeTab, setActiveTab] = useState("watchlists");

  const onClickTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const tabButtons = useMemo(() => (
    <div role="tablist" className="tabs-boxed tabs mb-2 border border-slate-700/50 bg-slate-800/50 md:overflow-auto overflow-x-scroll">
      <a
        onClick={() => onClickTab("about")}
        role="tab"
        className={`tab font-semibold ${activeTab === "about" ? "tab-active" : ""}`}
      >
        About
      </a>
      <a
        onClick={() => onClickTab("watchlists")}
        role="tab"
        className={`tab font-semibold ${activeTab === "watchlists" ? "tab-active" : ""}`}
      >
        Watchlists
      </a>
      <a
        onClick={() => onClickTab("favorites")}
        role="tab"
        className={`tab font-semibold ${activeTab === "favorites" ? "tab-active" : ""}`}
      >
        Favorites
      </a>
      <a
        onClick={() => onClickTab("activities")}
        role="tab"
        className={`tab font-semibold ${activeTab === "activities" ? "tab-active" : ""}`}
      >
        Activities
      </a>
    </div>
  ), [activeTab, onClickTab]);

  const currentTabContent = useMemo(() => {
    if (activeTab === "about") return AboutContent({ bio: userData?.bio });
    if (activeTab === "watchlists" && userData?.id) return <WatchlistsContent watchlists={watchlistData} />;
    if (activeTab === "favorites") return <FavoritesContent />;
    if (activeTab === "activities") return ActivitiesContent();
    return null;
  }, [activeTab, userData?.bio, userData?.id, watchlistData]);

  return (
    <div className="flex flex-col gap-2">
      {tabButtons}
      {currentTabContent}
    </div>
  );
});

export default UserAbout;
