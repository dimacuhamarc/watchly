import React from "react";

interface UserAboutProps {
  userData: {
    bio?: string;
  } | null;
}

function UserAbout({ userData }: UserAboutProps) {
  return (
    <div className="flex flex-col gap-2 py-4">
      <h1 className="text-2xl font-semibold leading-none">About</h1>
      <p className="text-md">{userData?.bio != "" ? userData?.bio : "No bio available"}</p>
    </div>
  );
}

export default UserAbout;
