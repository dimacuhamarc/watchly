import React from "react";
import ActivityItem from "./ActivityItem";

const mockActivities = [
  { type: 'favorite' as const, movieTitle: 'Iron Man', timeAgo: '4 hours ago' },
  { type: 'favorite' as const, movieTitle: 'Iron Man 2', timeAgo: '2 days ago' },
  { type: 'add' as const, movieTitle: 'Interstellar', listName: 'Sci-fi Flicks', timeAgo: '2 days ago' },
  { type: 'add' as const, movieTitle: 'The Dark Knight', listName: 'Best Movies', timeAgo: '2 days ago' },
  { type: 'add' as const, movieTitle: 'The Dark Knight Rises', listName: 'Best Movies', timeAgo: '2 days ago' },
  { type: 'add' as const, movieTitle: 'Everything Everywhere All At Once', listName: 'Sci-Fi Watchlist', timeAgo: '2 days ago' }
];

function ActivityList({ userDataName }: { userDataName?: string }) {
  const enableMockActivities = true;

  if (!enableMockActivities) {
    return (
      <div className="flex flex-col gap-2 py-4">
        <h1 className="text-2xl font-semibold leading-none">Activity</h1>
        <div className="flex flex-col">
          No activities yet.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex flex-col gap-2 max-h-[225px] overflow-y-auto">
        {mockActivities.slice(0,3).map((activity, index) => (
          <ActivityItem
            key={index}
            type={activity.type}
            movieTitle={activity.movieTitle}
            listName={activity.listName}
            timeAgo={activity.timeAgo}
            name={userDataName ?? 'User'}
          />
        ))}
      </div>
    </div>
  );
}

export default ActivityList;
