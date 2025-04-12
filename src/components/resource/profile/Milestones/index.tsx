import React from "react";
import { FaRocket, FaSearch, FaStar, FaTrophy } from "react-icons/fa";

const mockMilestones = [
  { icon: FaTrophy, title: "Joined the Revolution!", date: "April 1 2025" },
  { icon: FaStar, title: "First 10 Favorites", date: "April 2 2025" },
  { icon: FaStar, title: "First 20 Favorites", date: "April 2 2025" },
  { icon: FaStar, title: "First 50 Favorites", date: "April 3 2025" },
  { icon: FaStar, title: "First 100 Favorites", date: "April 4 2025" },
  { icon: FaSearch, title: "Genre Explorer", date: "April 3 2025" },
  { icon: FaRocket, title: "Genre Master", date: "April 5 2025" },
];

function UserMilestones() {
  const enableMockMilestones = true;
  const sortedMilestones = [...mockMilestones].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (!enableMockMilestones) {
    return (
      <div className="flex w-full flex-col gap-4 rounded-md bg-slate-900/50 p-4 md:w-3/5">
        <h1 className="text-xl font-semibold leading-none">Badges</h1>
        <div className="flex max-h-[400px] flex-col gap-2 overflow-y-auto">
          <p>No milestones yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full md:w-3/5">
      <h1 className="text-xl font-semibold leading-none">Milestones</h1>
      <div className="flex w-full flex-col gap-4 rounded-md py-4">
        <div className="flex max-h-[435px] flex-col gap-2 overflow-y-auto">
          {sortedMilestones.map((milestone, index) => (
            <div
              key={index}
              className="flex w-full flex-row items-center gap-4 rounded-xl bg-slate-900/50 p-4 shadow-sm"
            >
              <milestone.icon className="h-8 w-8 text-xs text-primary" />
              <div className="flex w-full flex-col items-start justify-between rounded-md">
                <p className="text-md flex flex-row">{milestone.title}</p>
                <p className="text-sm font-semibold">{milestone.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserMilestones;
