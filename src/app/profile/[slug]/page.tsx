
import React from 'react'
import AuthLayoutProvider from '~/components/layout/authLayoutProvider';
import ProfileV2 from '~/components/resource/profile/profilev2';

function ProfilePage({params}: { params: { slug: string } }) {
  const { slug }: { slug: string } = React.use(Promise.resolve(params));
  return (
    <AuthLayoutProvider>
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-start justify-start py-28 md:px-0">
        <ProfileV2 params={slug} />
      </div>
    </AuthLayoutProvider>
  );
}

export default ProfilePage