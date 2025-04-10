
import React from 'react'
import AuthLayoutProvider from '~/components/layout/authLayoutProvider';
import Profile from '~/components/resource/profile/index';

function ProfilePage({params}: { params: { slug: string } }) {
  const { slug }: { slug: string } = React.use(Promise.resolve(params));
  return (
    <AuthLayoutProvider>
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-start justify-start py-28 md:px-0">
        <Profile params={slug} />
      </div>
    </AuthLayoutProvider>
  );
}

export default ProfilePage