"use client";

import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import React from "react";
import { useAuthenticated } from "~/hooks/useAuth";
import { useProfile } from "~/hooks/useProfile";

import { formatToYearMonth } from "~/helpers/date";
import { InitialAvatar, PhotoAvatar } from "~/components/global/avatars";
import {
  FaLink,
} from "react-icons/fa";

import UserAbout from "./About";
import UserMilestones from "./Milestones";
import copyToClipboard from "~/helpers/clipboard";
import ButtonWithTooltip from "~/components/global/buttons/buttonWithTooltip";
import { useAuthStore } from "~/store/authStore";
import type { SanitizedProfileData } from "~/utils/types/data";
import {
  LoadingScreen,
  UnauthorizedAccess,
  InformationScreen,
} from "~/components/utility/screens";
import {
  LuArrowLeft,
  LuCalendar,
  LuLock,
  LuUsers,
} from "react-icons/lu";
interface ProfileProps {
  params: string;
}

const Profile = function Profile({ params }: ProfileProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SanitizedProfileData | null>(null);
  const { username, cookiesLoaded } = useAuthenticated();
  const currentUsername = username ?? "";

  const { isCurrentUser, profileLoaded, profileData } = useProfile(
    params,
    currentUsername,
  );

  const { ownProfileData, fetchProfileData } = useAuthStore();

  const userId = useMemo(() => profileData?.id ?? "", [profileData?.id]);
  // const { watchlists, watchlistLoaded, fetchWatchlistData } =
  //   useWatchlist(userId);

  const fetchData = useCallback(() => {
    if (cookiesLoaded) {
      void fetchProfileData(currentUsername);
    }
  }, [
    cookiesLoaded,
    currentUsername,
    fetchProfileData,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
  }, [
    profileData,
    cookiesLoaded,
    profileLoaded,
    isCurrentUser,
    ownProfileData,
  ]);

  if (!profileLoaded || loading) {
    return LoadingScreen({
      loadingMessage: "Loading Profile",
    });
  }

  if (profileData?.public_profile === false && !isCurrentUser) {
    return UnauthorizedAccess({
      errorMessage: "Unauthorized Access",
      errorDetails: "This profile is private.",
      redirectLink: {
        href: `/`,
        label: "Go to home",
      },
      leftIcon: true,
    });
  }

  if (profileData === null && !error) {
    return UnauthorizedAccess({
      errorMessage: "Profile Not Found",
      errorDetails: "The requested profile could not be found.",
      redirectLink: {
        href: `/p/${currentUsername}`,
        label: "Go to your profile",
      },
      leftIcon: true,
    });
  }

  if (
    (profileData?.first_name === null || profileData?.last_name === null) &&
    isCurrentUser
  ) {
    return InformationScreen({
      message: "Setup Your Profile",
      details: "You need to set up your basic details to access your profile.",
      redirectLink: {
        href: `/p/${currentUsername}/edit`,
        label: "Proceed to setup",
      },
      rightIcon: true,
    });
  }

  if (
    (profileData?.first_name === null || profileData?.last_name === null) &&
    !isCurrentUser
  ) {
    return UnauthorizedAccess({
      errorMessage: "Profile Not Found",
      errorDetails: "This user has not set up their profile yet.",
      redirectLink: {
        href: `/p/${currentUsername}`,
        label: "Go to your profile",
      },
      leftIcon: true,
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 opacity-60"></div>

        <Link
          href={`/`}
          className="absolute left-6 top-6 z-10 h-10 w-10 rounded-full border border-white/10 bg-black/20 p-2 backdrop-blur-md transition-all hover:bg-black/30"
        >
          <LuArrowLeft className="text-xl" />
        </Link>
      </div>

      {/* Profile section - Full width with contained content */}
      <div className="relative w-full px-6 md:px-12 lg:px-24">
        <div className="-mt-24 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="z-10 flex flex-col items-start gap-6 md:flex-row md:items-end">
            {data?.profile_picture && (
              <div className="h-36 w-36 rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl">
                <PhotoAvatar
                  src={data?.profile_picture}
                  alt={data?.username}
                  isAutoSized={true}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            )}
            {!data?.profile_picture && (
              <div className="h-36 w-36 rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl">
                <InitialAvatar
                  name={data?.first_name + " " + data?.last_name}
                />
              </div>
            )}

            <div className="mb-2">
              <h1 className="flex flex-row items-center gap-4 text-3xl font-bold tracking-tight">
                {!data?.first_name || !data?.last_name
                  ? "No Name Provided"
                  : data?.first_name + " " + data?.last_name}{" "}
                {!profileData?.public_profile && (
                  <LuLock className="text-lg text-slate-200/50" />
                )}
              </h1>
              <p className="-mt-2 font-medium text-slate-400">
                @{data?.username ?? ""}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm">
                  <LuUsers className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {data?.followers == 0 ? "1.4m" : data?.followers} Followers
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm">
                  <LuCalendar className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium">
                    Joined{" "}
                    {formatToYearMonth(
                      data?.created_at?.toLocaleString() ?? "",
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="z-10 mt-4 flex gap-2 md:mt-0">
            <ButtonWithTooltip
              onClick={() => {
                void copyToClipboard(window.location.href);
              }}
              tooltip="Share Profile"
              tooltipPressed="Copied profile link."
            >
              <FaLink />
            </ButtonWithTooltip>
            {isCurrentUser ? (
              <Link
                href={`/p/` + username + `/edit`}
                className="btn btn-primary btn-sm rounded-full"
              >
                Edit Profile
              </Link>
            ) : (
              <button className="btn btn-primary btn-sm rounded-full">
                Follow
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile details section */}
      <div className="w-full max-h-[600px] px-6 md:px-12 lg:px-24 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <UserAbout isCurrentUser={isCurrentUser} userData={data} />
        </div>
        <div className="space-y-6">
          <UserMilestones />
        </div>
      </div>
    </div>
  );
};

export default Profile;
