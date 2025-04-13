"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { useAuthenticated } from "~/hooks/useAuth";
import { useProfile } from "~/hooks/useProfile";

import { formatToYearMonth } from "~/helpers/date";
import { InitialAvatar, PhotoAvatar } from "~/components/global/avatars";
import { FaCalendar, FaEllipsisH, FaLink, FaUsers, FaArrowCircleLeft } from "react-icons/fa";

import ActivityList from "./Activity";
import UserAbout from "./About";
import UserMilestones from "./Milestones";
import copyToClipboard from "~/helpers/clipboard";
import ButtonWithTooltip from "~/components/global/buttons/buttonWithTooltip";

interface ProfileProps {
  params: string;
}

function Profile({ params }: ProfileProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { username, cookiesLoaded } = useAuthenticated();
  const currentUsername = username ?? "";
  const { isCurrentUser, profileLoaded, profileData } = useProfile(
    params,
    currentUsername,
  );
  const userDataName = profileData ? `${profileData.first_name}` : "User";
  useEffect(() => {
    if (profileData === null) {
      setError(true);
    }
    if (!cookiesLoaded && !profileLoaded) {
      setLoading(true);
    }
  }, [profileData, cookiesLoaded, profileLoaded]);

  if (!profileLoaded) {
    return (
      <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4">
        <span className="loading loading-infinity loading-lg"></span>
        <h1>Loading Profile</h1>
      </div>
    );
  }

  if (profileData === null) {
    return (
      <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 text-error">
        <span className="font-bold">Error Loading Profile</span>
        <p>The requested profile could not be found.</p>
        <p>Please check the URL or try again later.</p>
        <Link href="/" className="btn btn-outline btn-error">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex h-48 w-full flex-row items-center gap-8 rounded-t-md bg-gradient-to-r from-orange-400 to-orange-600 px-20 pb-6 pt-12 text-base-content/60 shadow-xl lg:pt-16">
        <Link
          href={`/`}
          className="link flex items-center justify-center rounded-full p-1 text-slate-900 absolute top-4 left-4"
        >
          <FaArrowCircleLeft className="text-xl" />
        </Link>
        {profileData?.profile_picture && (
          <div className="absolute -bottom-16 left-16 h-32 w-32 overflow-hidden rounded-full bg-slate-800 ring ring-slate-800 ring-offset-2 ring-offset-slate-800">
            <PhotoAvatar
              src={profileData?.profile_picture}
              alt={profileData?.username}
              isAutoSized={true}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {!profileData?.profile_picture && (
          <div className="absolute -bottom-16 left-16 h-32 w-32 overflow-hidden rounded-full bg-slate-700 ring ring-slate-800 ring-offset-2 ring-offset-slate-800">
            <InitialAvatar
              name={profileData?.first_name + " " + profileData?.last_name}
            />
          </div>
        )}
      </div>
      <div className="flex w-full flex-row gap-4 bg-slate-800 px-16 pt-20 text-base-content/60 shadow-xl">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold leading-none">
            {profileData?.first_name + " " + profileData?.last_name}
          </h1>
          <h2 className="text-md">
            <span className="link-no-underline text-slate-200/50 hover:text-primary">
              @{profileData?.username}
            </span>
          </h2>
          <h2 className="text-md flex flex-row gap-4">
            <Link
              href={"/"}
              className="link flex flex-row items-center gap-2 text-primary"
            >
              <FaUsers />
              <span className="font-bold">
                {profileData?.followers == 0 ? "1.4k" : profileData?.followers}{" "}
                Followers
              </span>{" "}
            </Link>
            <span className="text-md flex flex-row items-center gap-2 text-slate-200/50">
              <FaCalendar />
              Joined{" "}
              {formatToYearMonth(
                profileData?.created_at?.toLocaleString() ?? "",
              )}
            </span>
          </h2>
        </div>
        <div className="mb-auto ml-auto flex flex-col gap-2 lg:flex-row">
          {isCurrentUser ? (
            <Link href={`/p/` + username + `/edit`} className="btn btn-primary btn-sm">Edit Profile</Link>
          ) : (
            <button className="btn btn-primary btn-sm">Follow</button>
          )}
          <ButtonWithTooltip
            onClick={() => {
              void copyToClipboard(window.location.href);
            }}
            tooltip="Share Profile"
            tooltipPressed="Copied profile link."
          >
            <FaLink />
          </ButtonWithTooltip>
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-200/50 hover:bg-slate-900/50">
            <FaEllipsisH />
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-14 rounded-b-md bg-slate-800 px-4 pb-8 text-base-content/60 shadow-xl md:flex-row md:px-8 lg:px-16">
        <div className="flex w-full flex-col gap-4">
          <UserAbout userData={profileData} />
          <ActivityList userDataName={userDataName} />
        </div>
        <UserMilestones />
      </div>
    </>
  );
}

export default Profile;
