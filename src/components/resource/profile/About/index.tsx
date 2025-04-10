import React from "react";

interface UserAboutProps {
  userData: {
    bio?: string;
  } | null;
}

function UserAbout({ userData }: UserAboutProps) {
  const enableBio = true;

  if (!enableBio) {
    return (
      <div className="flex flex-col gap-2 py-4">
        <h1 className="text-2xl font-semibold leading-none">About</h1>
        <div className="flex flex-col">
          No bio yet.
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 py-4">
      <div role="tablist" className="tabs tabs-boxed bg-slate-900/50 mb-2">
        <a role="tab" className="tab font-semibold tab-active">About</a>
        <a role="tab" className="tab font-semibold">Watchlists</a>
        <a role="tab" className="tab font-semibold">Favorites</a>
        <a role="tab" className="tab font-semibold">Activities</a>
      </div>
      <h1 className="text-2xl font-semibold leading-none">About</h1>
      <p className="text-md">{userData?.bio != "" ? userData?.bio : "No bio available"}</p>
    </div>
  );
}

export default UserAbout;
