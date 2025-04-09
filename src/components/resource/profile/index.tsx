"use client";

import React from "react";
import { useEffect, useState } from "react";
import { InitialAvatar, PhotoAvatar } from "~/components/global/avatars";
import { useAuthenticated } from "~/hooks/useAuth";
import { fetchUserData } from "~/utils/api/apiRequests";
import { formatToYearMonth } from "~/helpers/date";
import type { SanitizedUserData } from "~/utils/types/data";
import { FaEllipsisH, FaShareAlt } from "react-icons/fa";
import ActivityList from "~/components/resource/profile/Activity";
import UserAbout from "~/components/resource/profile/About";
import UserMilestones from "~/components/resource/profile/Milestones";
import Link from "next/link";

function ProfileComponent() {
  const { userData: userDataFromCookie, userFollowData } = useAuthenticated();
  const [userData, setUserData] = useState<SanitizedUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const userDataName = userData ? `${userData.first_name}` : "User";

  useEffect(() => {
    const fetchData = async () => {
      if (
        userDataFromCookie &&
        typeof userDataFromCookie === "object" &&
        "id" in userDataFromCookie
      ) {
        try {
          const data = await fetchUserData(userDataFromCookie.id);
          if (!data) {
            throw new Error("No user data found");
          }
          setUserData(data);
        } catch (err) {
          setError(true);
          setErrorMessage("Failed to fetch user data");
          console.error("Error fetching user data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    void fetchData();
  }, [userDataFromCookie]);

  if (loading) {
    return (
      <>
        <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4">
          <span className="loading loading-infinity loading-lg"></span>
          {!error && <h1>Loading Profile</h1>}
          {error && (
            <div className="text-error">
              <span>Error Loading Profile! {errorMessage}</span>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Link href="/" className="mb-4 text-sm text-gray-500 hover:text-gray-200">
        Back to Home
      </Link>
      <div className="flex w-full flex-row items-center gap-4 rounded-t-md bg-white px-20 pb-6 pt-12 text-slate-900 shadow-md lg:pt-16">
        {userData?.profile_picture && (
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            <PhotoAvatar
              src={userData?.profile_picture}
              alt={userDataName}
              isAutoSized={true}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {!userData?.profile_picture && (
          <InitialAvatar
            name={userData?.first_name + " " + userData?.last_name}
          />
        )}
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold leading-none">
            {userData?.first_name + " " + userData?.last_name}
          </h1>
          <h2 className="text-md">
            <span className="text-primary">@{userData?.username}</span> |{" "}
            <span className="text-slate-900">
              Joined{" "}
              {formatToYearMonth(userData?.created_at?.toLocaleString() ?? "")}
            </span>
          </h2>
          <h2 className="text-md flex flex-row gap-2">
            <span className="text-primary">
              <span className="font-bold">{userFollowData?.followers}</span> Followers
            </span>
            <span className="text-slate-900">
              <span className="font-bold">{userFollowData?.following}</span> Following
            </span>
          </h2>
        </div>
        <div className="mb-auto ml-auto flex flex-col gap-2 lg:flex-row">
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-900 hover:bg-slate-200">
            <FaShareAlt />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-900 hover:bg-slate-200">
            <FaEllipsisH />
          </button>
        </div>
      </div>
      <div className="flex w-full flex-row gap-4 bg-white px-20 pb-8 text-slate-900 shadow-md">
        {false ? (
          <button className="btn btn-primary">Follow</button>
        ) : (
          <button className="btn btn-primary">Edit Profile</button>
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
          <UserAbout userData={userData} />
          <ActivityList userDataName={userDataName} />
        </div>
        <UserMilestones />
      </div>
    </>
  );
}

export default ProfileComponent;
