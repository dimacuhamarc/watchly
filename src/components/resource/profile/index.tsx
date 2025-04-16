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
import { useAuthStore } from "~/store/authStore";
import type { SanitizedProfileData } from "~/utils/types/data";
import { LoadingScreen, UnauthorizedAccess } from "~/components/utility/screens";
import { LuLock } from "react-icons/lu";
interface ProfileProps {
  params: string;
}

function Profile({ params }: ProfileProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ data, setData ] = useState<SanitizedProfileData | null>(null);
  const { username, cookiesLoaded } = useAuthenticated();
  const currentUsername = username ?? "";
  const { isCurrentUser, profileLoaded, profileData } = useProfile(
    params,
    currentUsername,
  );
  const { ownProfileData, fetchProfileData } = useAuthStore();

  useEffect(() => {
    if (cookiesLoaded) {
      void fetchProfileData(currentUsername);
    }
  }
  , [cookiesLoaded, fetchProfileData, currentUsername]);

  const userDataName = profileData ? `${profileData.first_name}` : "User";
  useEffect(() => {
    if (profileData === null) {
      setError(true);
    }
    if (!cookiesLoaded && !profileLoaded) {
      setLoading(true);
    }
    if (isCurrentUser) {
      setData(ownProfileData);
      setLoading(false);
    } else {
      setError(false);
      setData(profileData);
      setLoading(false);
    }
    
  }, [profileData, cookiesLoaded, profileLoaded, isCurrentUser, ownProfileData]);

  if (!profileLoaded || loading) {
    return LoadingScreen({
      loadingMessage: "Loading Profile",
    })
  }

  if (profileData?.public_profile === false && !isCurrentUser) {
    return UnauthorizedAccess({
      errorMessage: "Unauthorized Access",
      errorDetails: "This profile is private.",
      redirectLink: {
        href: `/`,
        label: "Go to home",
      },
    })
  }

  if (profileData === null && !error) {
    return UnauthorizedAccess({
      errorMessage: "Profile Not Found",
      errorDetails: "The requested profile could not be found.",
      redirectLink: {
        href: `/p/${currentUsername}`,
        label: "Go to your profile",
      },
    })
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
        {data?.profile_picture && (
          <div className="absolute -bottom-16 left-16 h-32 w-32 overflow-hidden rounded-full bg-slate-800 ring ring-slate-800 ring-offset-2 ring-offset-slate-800">
            <PhotoAvatar
              src={data?.profile_picture}
              alt={data?.username}
              isAutoSized={true}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {!data?.profile_picture && (
          <div className="absolute -bottom-16 left-16 h-32 w-32 overflow-hidden rounded-full bg-slate-700 ring ring-slate-800 ring-offset-2 ring-offset-slate-800">
            <InitialAvatar
              name={data?.first_name + " " + data?.last_name}
            />
          </div>
        )}
      </div>
      <div className="flex w-full flex-row gap-4 bg-slate-800 px-16 pt-20 text-base-content/60 shadow-xl">
        <div className="flex flex-col">
          <h1 className="flex flex-row items-center  gap-4 text-2xl font-semibold leading-none">
            {(!data?.first_name || !data?.last_name) 
              ? "No Name Provided"
              : data?.first_name + " " + data?.last_name} {!profileData?.public_profile && <LuLock className="text-slate-200/50 text-lg" />}
          </h1>
          
          <h2 className="text-md">
            <span className="link-no-underline text-slate-200/50 hover:text-primary">
              @{data?.username ?? ""}
            </span>
          </h2>
          <h2 className="text-md flex flex-row gap-4">
            <Link
              href={"/"}
              className="link flex flex-row items-center gap-2 text-primary"
            >
              <FaUsers />
              <span className="font-bold">
                {data?.followers == 0 ? "1.4k" : data?.followers}{" "}
                Followers
              </span>{" "}
            </Link>
            <span className="text-md flex flex-row items-center gap-2 text-slate-200/50">
              <FaCalendar />
              Joined{" "}
              {formatToYearMonth(
                data?.created_at?.toLocaleString() ?? "",
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
          <UserAbout userData={data} />
          <ActivityList userDataName={userDataName} />
        </div>
        <UserMilestones />
      </div>
    </>
  );
}

export default Profile;
