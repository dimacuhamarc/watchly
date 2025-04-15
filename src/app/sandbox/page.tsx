"use client";
import React, { useEffect } from "react";
import { UploadButton } from "~/helpers/uploadThing";
import { useAuthenticated } from "~/hooks/useAuth";
import { useAuthStore } from "~/store/authStore";

export default function SignInPage() {
  const { currentUser, fetchAuthState, fetchProfileData, ownProfileData } = useAuthStore();
  const { username } = useAuthenticated()

  useEffect(() => {
    if (localStorage.getItem("auth-storage")) {
      void fetchAuthState();
      void fetchProfileData(currentUser?.username ?? "");
    }
  }, [fetchAuthState, fetchProfileData, currentUser?.username]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        ownProfileData && (
          <div>
            <h1>{ownProfileData.username}</h1>
            <p>{ownProfileData.bio}</p>
            <p>{ownProfileData.first_name} {ownProfileData.last_name}</p>
          </div>
        )
      }
      <UploadButton
        endpoint="imageUploader"
        appearance={{
          button:
            "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
          container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
          allowedContent:
            "flex h-8 flex-col items-center justify-center px-2 text-white",
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}