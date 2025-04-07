import React from "react";
import AuthLayoutProvider from "~/components/layout/authLayoutProvider";
import ProfileComponent from "~/components/resource/profile";

function ProfilePage() {
  return (
    <AuthLayoutProvider>
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-start justify-start py-28 md:px-0">
        <ProfileComponent />
      </div>
    </AuthLayoutProvider>
  );
}

export default ProfilePage;
