"use client";

import React, { useEffect, useState } from "react";
import AboutContent from "./AboutContent";
import FavoritesContent from "./FavoritesContent";
import ActivitiesContent from "./ActivitiesContent";
import WatchlistsContent from "./WatchlistsContent";

interface UserAboutProps {
  userData: {
    bio?: string;
  } | null;
}

function UserAbout({ userData }: UserAboutProps) {
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);

  const enableBio = true;

  if (!enableBio) {
    return (
      <div className="flex flex-col gap-2 py-4">
        <h1 className="text-2xl font-semibold leading-none">About</h1>
        <div className="flex flex-col">No bio yet.</div>
      </div>
    );
  }

  const onClickTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col gap-2 py-4">
      <div role="tablist" className="tabs-boxed tabs mb-2 bg-slate-900/50 md:overflow-auto overflow-x-scroll">
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
      {activeTab === "about" && AboutContent({ bio: userData?.bio })}
      {activeTab === "watchlists" && WatchlistsContent()}
      {activeTab === "favorites" && (
        <FavoritesContent favorites={["test", "test2"]} />
      )}
      {activeTab === "activities" && ActivitiesContent()}
    </div>
  );
}

export default UserAbout;
