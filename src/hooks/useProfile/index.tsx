"use client";

import { useEffect, useState, useCallback } from "react";
import type { SanitizedProfileData } from "~/utils/types/data";

interface ProfileState {
  status: string;
  message: string;
  profileData: SanitizedProfileData;
}

export function useProfile(username: string, currentUsername: string) {
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileData, setProfileData] = useState<SanitizedProfileData | null>(
    null,
  );

  if (!username || currentUsername === undefined) {
    throw new Error("Error: username or currentUsername is undefined");
  }

  const fetchProfileData = useCallback(async (username: string) => {
    try {
      const response = await fetch(`/api/profile/${username}`);
      const data = (await response.json()) as ProfileState;
      if (data.status !== "success") {
        return;
      }
      setProfileData(data.profileData);
    } catch (error) {
      setProfileLoaded(false);
      console.error("Error fetching profile data:", error);
    } finally {
      setProfileLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (username) {
      void fetchProfileData(username);
    }
  }, [username, fetchProfileData]);

  const isCurrentUser = profileData?.username === currentUsername;

  const isPublicProfile = profileData?.public_profile === true;

  return {
    isPublicProfile,
    isCurrentUser,
    profileLoaded,
    profileData,
    fetchProfileData,
  };
}
