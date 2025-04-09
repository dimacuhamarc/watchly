"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { useAuthenticated } from "~/hooks/useAuth";
import { useProfile } from "~/hooks/useProfile";

import { formatToYearMonth } from "~/helpers/date";
import { InitialAvatar, PhotoAvatar } from "~/components/global/avatars";
import { FaEllipsisH, FaLink, FaShareAlt } from "react-icons/fa";

import ActivityList from "./Activity";
import UserAbout from "./About";
import UserMilestones from "./Milestones";
import copyToClipboard from "~/helpers/clipboard";

interface Profilev2Props {
  params: string;
}

function ProfileV2({ params }: Profilev2Props) {
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

  // Show loading state while profile is loading
  if (!profileLoaded) {
    return (
      <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4">
        <span className="loading loading-infinity loading-lg"></span>
        <h1>Loading Profile</h1>
      </div>
    );
  }

  // Show error state if we've loaded but have no data
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

  // DEBUG
  // console.log({
  //   isCurrentUser,
  //   profileLoaded,
  //   profileData,
  //   currentUsername,
  // })

  return (
    <>
      <Link href="/" className="mb-4 text-sm text-gray-500 hover:text-gray-200">
        Back to Home
      </Link>
      <div className="flex w-full flex-row items-center gap-8 rounded-t-md bg-white px-20 pb-6 pt-12 text-slate-900 shadow-md lg:pt-16">
        {profileData?.profile_picture && (
          <div className="relative h-32 w-32 overflow-hidden rounded-full">
            <PhotoAvatar
              src={profileData?.profile_picture}
              alt={profileData?.username}
              isAutoSized={true}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {!profileData?.profile_picture && (
          <InitialAvatar
            name={profileData?.first_name + " " + profileData?.last_name}
          />
        )}
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold leading-none">
            {profileData?.first_name + " " + profileData?.last_name}
          </h1>
          <h2 className="text-md">
            <span className="text-primary">@{profileData?.username}</span>
          </h2>
          <h2 className="text-md flex flex-row gap-2">
            <Link href={"/"} className="link text-primary">
              <span className="font-bold">{profileData?.followers}</span>{" "}
              Followers
            </Link>
            <Link href={"/"} className="link text-slate-900">
              <span className="font-bold">{profileData?.followers}</span>{" "}
              Followers
            </Link>
          </h2>
          <h2 className="text-md">
            <span className="text-slate-900">
              Joined{" "}
              {formatToYearMonth(
                profileData?.created_at?.toLocaleString() ?? "",
              )}
            </span>
          </h2>
        </div>
        <div className="mb-auto ml-auto flex flex-col gap-2 lg:flex-row">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-900 hover:bg-slate-200"
            onClick={(event) => {
              event.preventDefault();
              void copyToClipboard(
                `${window.location.origin}/profile/${profileData?.username}`,
              );
            }}
          >
            <FaLink />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-900 hover:bg-slate-200">
            <FaEllipsisH />
          </button>
        </div>
      </div>
      <div className="flex w-full flex-row gap-4 bg-white px-20 pb-8 text-slate-900 shadow-md">
        {isCurrentUser ? (
          <button className="btn btn-primary">Edit Profile</button>
        ) : (
          <button className="btn btn-primary">Follow</button>
        )}
        <button className="btn">
          Watchlists
          <div className="badge">3</div>
        </button>
        <button className="btn">
          Favorites
          <div className="badge">24</div>
        </button>
      </div>
      <div className="flex w-full flex-col gap-14 rounded-b-md bg-white px-4 pb-8 text-slate-900 shadow-md md:flex-row md:px-8 lg:px-16">
        <div className="flex w-full flex-col gap-4">
          <UserAbout userData={profileData} />
          <ActivityList userDataName={userDataName} />
        </div>
        <UserMilestones />
      </div>
    </>
  );
}

export default ProfileV2;
