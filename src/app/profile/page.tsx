import React from "react";
import AuthLayoutProvider from "~/components/layout/authLayoutProvider";
import ProfileComponent from "~/components/resource/profile";

function ProfilePage() {
  return (
    <AuthLayoutProvider>
      <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col items-center justify-start gap-4 px-14 py-44 md:px-0">
        <ProfileComponent />
      </div>
    </AuthLayoutProvider>
  );
}

export default ProfilePage;
