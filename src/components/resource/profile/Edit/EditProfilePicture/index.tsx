import React from "react";

import type { SanitizedProfileData, ProfileState } from "~/utils/types/data";
import { UploadButton } from "~/helpers/uploadThing";
import { UserAvatar } from "~/components/global/avatars";
import UpdateProfileLayoutProvider from "~/components/layout/updateProfileLayoutProvider";
import type { ClientUploadedFileData } from "uploadthing/types";

interface EditProfilePictureProps {
  params: string;
  profileData: SanitizedProfileData; // Replace with actual type
  setNewProfilePicture: (url: string) => void;
  newProfilePicture: string | null;
}

const copy = {
  title: "Display Picture",
  description:
    "This will be your display picture across the platform. <br /> You can change it at any time. <br/> <span class='text-red-500'>Note: </span> This will be your display picture across the platform.",
};

function EditProfilePicture({
  params,
  profileData,
  setNewProfilePicture,
  newProfilePicture,
}: EditProfilePictureProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (res: ClientUploadedFileData<any>[]) => {
    if (res && res.length > 0 && res[0]?.ufsUrl) {
      setNewProfilePicture(res[0].ufsUrl);
      try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsedStorage = JSON.parse(authStorage) as ProfileState;
          if (parsedStorage.state?.ownProfileData) {
            parsedStorage.state.ownProfileData.profile_picture = res[0].ufsUrl;
            localStorage.setItem('auth-storage', JSON.stringify(parsedStorage));
            console.log('Profile picture updated in local storage');
          }
        }
      } catch (error) {
        console.error('Error updating profile picture in local storage:', error);
      }
    }
    console.log("Form submitted");
  };

  return (
    <UpdateProfileLayoutProvider
      sectionTitle={copy.title}
      sectionDescription={copy.description}
    >
      <div className="mx-auto flex w-2/3 flex-col items-center gap-8 md:flex-row">
        <div className="flex flex-row gap-2">
          <UserAvatar
            name={
              (profileData?.first_name ?? "") +
                " " +
                (profileData?.last_name ?? "") || null
            }
            username={params}
            profilePicture={
              newProfilePicture ?? profileData?.profile_picture ?? ""
            }
          />
        </div>
        <UploadButton
          appearance={{
            button:
              "ut-ready:bg-primary ut-uploading:cursor-not-allowed rounded bg-red-500 bg-none",
            container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
            allowedContent:
              "flex h-8 flex-col items-center justify-center px-2 text-white",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={onSubmit}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          className="bg-slate-800 *:text-slate-200"
        />
      </div>
    </UpdateProfileLayoutProvider>
  );
}

export default EditProfilePicture;
