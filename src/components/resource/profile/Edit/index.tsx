"use client";

import React from "react";

interface EditProfileProps {
  params: string;
}
import { useAuthenticated } from "~/hooks/useAuth";
import { useProfile } from "~/hooks/useProfile";

import { InitialAvatar, PhotoAvatar } from "~/components/global/avatars";
import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";
import { UploadButton, UploadDropzone } from "~/helpers/uploadThing";

function EditProfile({ params }: EditProfileProps) {
  const { username, cookiesLoaded } = useAuthenticated();
  const currentUsername = username ?? "";
  const { isCurrentUser, profileLoaded, profileData } = useProfile(
    params,
    currentUsername,
  );

  if (!profileLoaded || !cookiesLoaded) {
    return (
      <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4">
        <span className="loading loading-infinity loading-lg"></span>
        <h1>Loading Profile</h1>
      </div>
    );
  }

  if (!isCurrentUser) {
    return (
      <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 text-error">
        <span className="font-bold">Error Loading Page</span>
        <p>Unauthorized Access.</p>
        <Link href="/" className="btn btn-outline btn-error">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex w-full flex-row items-center gap-8 rounded-t-md bg-white px-10 py-6 text-base-content/60 shadow-xl">
        <h1 className="flex flex-row items-center gap-4">
          <Link
            href={`/p/${params}`}
            className="link flex items-center justify-center rounded-full p-1 text-slate-900"
          >
            <FaArrowCircleLeft className="text-xl" />
          </Link>
          <span className="text-2xl font-bold text-slate-900">
            Edit Profile
          </span>
          <span className="text-lg font-semibold text-primary">
            p/@{params}
          </span>
        </h1>
      </div>
      <div className="flex h-48 w-full flex-row items-center gap-8 bg-slate-800 px-20 pb-12 pt-12 text-base-content/60 shadow-xl lg:pt-16">
        {profileData?.profile_picture && (
          <div className="h-32 w-32 overflow-hidden rounded-full bg-slate-800 ring ring-slate-800 ring-offset-2 ring-offset-slate-800">
            <PhotoAvatar
              src={profileData?.profile_picture}
              alt={profileData?.username}
              isAutoSized={true}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {!profileData?.profile_picture && (
          <div className="h-32 w-32 overflow-hidden rounded-full bg-slate-700 ring ring-slate-800 ring-offset-2 ring-offset-slate-800">
            <InitialAvatar
              name={profileData?.first_name + " " + profileData?.last_name}
            />
          </div>
        )}
        <UploadButton
          appearance={{
            button:
              "ut-ready:bg-primary ut-uploading:cursor-not-allowed rounded bg-red-500 bg-none",
            container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
            allowedContent:
              "flex h-8 flex-col items-center justify-center px-2 text-white",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          className="*:text-slate-200 bg-slate-800"
        />
      </div>
      <div className="flex h-48 w-full flex-row items-center gap-8 bg-slate-800 px-20 pb-12 pt-12 text-base-content/60 shadow-xl lg:pt-16">

      </div>
    </>
  );
}

export default EditProfile;
