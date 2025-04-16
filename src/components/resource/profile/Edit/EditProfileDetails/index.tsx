"use client";

import React, { useEffect, useState } from "react";

import type { SanitizedProfileData, ProfileState } from "~/utils/types/data";
import UpdateProfileLayoutProvider from "~/components/layout/updateProfileLayoutProvider";

import { useForm } from "react-hook-form";

interface EditProfileDetailsProps {
  params: string;
  profileData: SanitizedProfileData;
}

const copy = {
  title: "Profile Details",
  description: "This contains your profile details.",
};

function EditProfileDetails({ params, profileData }: EditProfileDetailsProps) {
  const { register, handleSubmit, watch } = useForm<SanitizedProfileData>();
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscription = watch((value) => {
      const firstName = value.first_name;
      const lastName = value.last_name;
      const location = value.location;

      if (!firstName || !lastName || !location) {
        setIsSubmitEnabled(true);
        return;
      }

      if (
        firstName.toLowerCase() !== profileData?.first_name?.toLowerCase() ||
        lastName.toLowerCase() !== profileData?.last_name?.toLowerCase() ||
        location.toLowerCase() !== profileData?.location?.toLowerCase()
      ) {
        setIsSubmitEnabled(true);
        return;
      }

      setError(null);
      setIsSubmitEnabled(false);
    });

    return () => subscription.unsubscribe();
  }, [watch, profileData]);

  // Update the onSubmit function to handle JSON parsing errors

const onSubmit = async (data: SanitizedProfileData) => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch(`/api/updateProfileDetails`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        location: data.location,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const responseText = await response.text();
    if (!responseText) {
      console.log("Empty response received");
      setError("Empty response from server");
      return;
    }

    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsedStorage = JSON.parse(authStorage) as ProfileState;
        if (parsedStorage.state?.ownProfileData) {
          parsedStorage.state.ownProfileData.first_name = data.first_name;
          parsedStorage.state.ownProfileData.last_name = data.last_name;
          parsedStorage.state.ownProfileData.location = data.location;

          localStorage.setItem('auth-storage', JSON.stringify(parsedStorage));
          console.log('Profile details updated in local storage');
        }
      }
    } catch (storageError) {
      console.error('Error updating profile details in local storage:', storageError);
    }
    
  } catch (error) {
    console.error('Error updating profile:', error);
    setError(error instanceof Error ? error.message : 'Failed to update profile');
  } finally {
    setLoading(false);
    setIsSubmitEnabled(false);
  }
};

  return (
    <UpdateProfileLayoutProvider
      sectionTitle={copy.title}
      sectionDescription={copy.description}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col justify-between gap-8 md:flex-row"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">
              First Name
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-slate-800">
              <input
                type="text"
                className="grow"
                placeholder="First Name"
                defaultValue={profileData.first_name}
                {...register("first_name")}
              />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">
              Last Name
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-slate-800">
              <input
                type="text"
                className="grow"
                placeholder="Last Name"
                defaultValue={profileData.last_name}
                {...register("last_name")}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">
              Location
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-slate-800">
              <input
                type="text"
                className="grow"
                placeholder="Location"
                defaultValue={profileData.location}
                {...register("location")}
              />
            </label>
          </div>
          <div
            className={`${isSubmitEnabled && !loading ? "flex" : "hidden"} flex-col gap-2 transition-all duration-200 ease-in-out`}
          >
            <button className="btn btn-primary">Save Changes</button>
          </div>
          <div
            className={`${loading ? "flex" : "hidden"} flex-col gap-2 transition-all duration-200 ease-in-out`}
          >
            Saving..
          </div>
        </div>
      </form>
    </UpdateProfileLayoutProvider>
  );
}

export default EditProfileDetails;
