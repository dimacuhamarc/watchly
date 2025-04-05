'use client'

import React from 'react'
import { useEffect, useState } from 'react';
import { useAuthenticated } from "~/hooks/useAuth";
import { fetchUserData } from "~/utils/api/apiRequests";
import type { SanitizedUserData } from "~/utils/types/data";

function ProfileComponent() {
  const { userData: userDataFromCookie } = useAuthenticated();
  const [userData, setUserData] = useState<SanitizedUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userDataFromCookie && typeof userDataFromCookie === 'object' && 'id' in userDataFromCookie) {
        try {
          const data = await fetchUserData(userDataFromCookie.id);
          if (!data) {
            throw new Error("No user data found");
          }
          setUserData(data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    void fetchData();
  }, [userDataFromCookie]);

  return (
    <div>
      {loading && (
        <>
          <h1 className="text-4xl font-bold">Loading...</h1>
          <p>Loading user data...</p>
        </>
        )
      }
      {
        !loading && userDataFromCookie && userData && !error && (
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Profile</h1>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">User Data:</p>
              <pre className="p-4 rounded-md">{userDataFromCookie?.id}</pre>
              <pre className="p-4 rounded-md">{userDataFromCookie?.email}</pre>
              <pre className="p-4 rounded-md">@{userData?.username}</pre>
              <pre className="p-4 rounded-md">{userData?.first_name}</pre>
              <pre className="p-4 rounded-md">{userData?.last_name}</pre>
              <pre className="p-4 rounded-md">{userData?.created_at}</pre>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ProfileComponent