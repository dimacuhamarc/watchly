"use client";

import React, { useState } from "react";

interface EditProfileProps {
  params: string;
}
import { useAuthenticated } from "~/hooks/useAuth";
import { useProfile } from "~/hooks/useProfile";

import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";
import {
  LoadingScreen,
  UnauthorizedAccess,
} from "~/components/utility/screens";
import EditProfilePicture from "./EditProfilePicture";
import EditProfileDetails from "./EditProfileDetails";
import EditProfileBio from "./EditProfileBio";

function EditProfile({ params }: EditProfileProps) {
  const [newProfilePicture, setNewProfilePicture] = useState<string | null>(
    null,
  );
  const { username, cookiesLoaded } = useAuthenticated();
  const currentUsername = username ?? "";
  const { isCurrentUser, profileLoaded, profileData } = useProfile(
    params,
    currentUsername,
  );

  if (!profileLoaded || !profileData) {
    return LoadingScreen({
      loadingMessage: "",
    });
  }

  if (!isCurrentUser && profileLoaded && cookiesLoaded) {
    return UnauthorizedAccess({
      errorMessage: "Unauthorized Access",
      errorDetails: "You are not authorized to edit this profile.",
      redirectLink: {
        href: `/p/${currentUsername}`,
        label: "Go to your profile",
      },
    });
  }

  const sectionClassName =
    "flex w-full flex-col md:flex-row items-center justify-between gap-8 bg-slate-800 md:px-20 md:pb-12 md:pt-12 text-base-content/60 shadow-xl lg:pt-16 px-8 pb-4 pt-4";

  return (
    <>
      <div className="relative flex w-full flex-row items-center gap-8 rounded-t-md bg-white px-10 py-6 text-base-content/60 shadow-xl">
        <h1 className="flex flex-row items-center gap-4">
          <Link
            href={`/p/${params}`}
            className="link flex items-center justify-center rounded-full p-1 text-slate-900"
            prefetch
          >
            <FaArrowCircleLeft className="text-xl" />
          </Link>
          <span className="text-lg font-semibold text-primary">
            p/{params}
          </span>
        </h1>
      </div>
      <div className={sectionClassName}>
        <EditProfilePicture
          params={params}
          profileData={profileData}
          setNewProfilePicture={setNewProfilePicture}
          newProfilePicture={newProfilePicture}
        />
      </div>
      <div className={sectionClassName}>
        <EditProfileDetails params={params} profileData={profileData} />
      </div>
      <div className={sectionClassName + " rounded-b-md"}>
        <EditProfileBio params={params} profileData={profileData} />
      </div>
    </>
  );
}

export default EditProfile;
